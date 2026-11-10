#!/usr/bin/env python3
"""
ApnaMohalla — local backend with a real SQLite database.

Uses only Python's standard library (no pip installs needed):
  - sqlite3      -> the database
  - http.server  -> the web server + static file serving
  - hashlib/ssl  -> secure password hashing

Run:  python server.py
Open: http://localhost:8000
"""

import hashlib
import json
import os
import secrets
import sqlite3
import sys
import threading
import time
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

# Make console output UTF-8 safe on Windows (so emoji in logs don't crash the server)
for _stream in (sys.stdout, sys.stderr):
    if hasattr(_stream, 'reconfigure'):
        _stream.reconfigure(encoding='utf-8', errors='replace')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'apnamohalla.db')
HOST = '0.0.0.0'
PORT = int(os.environ.get('PORT', '8000'))

MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
}


# ----------------------------------------------------------------------
# Database
# ----------------------------------------------------------------------
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            phone TEXT,
            city TEXT,
            bio TEXT,
            blood_group TEXT,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            category TEXT NOT NULL,
            title TEXT NOT NULL,
            type TEXT,
            description TEXT,
            city TEXT,
            phone TEXT,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS donors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            name TEXT NOT NULL,
            blood_group TEXT NOT NULL,
            city TEXT NOT NULL,
            phone TEXT,
            available INTEGER DEFAULT 1,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS profile_sections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            content TEXT,
            position INTEGER DEFAULT 0
        );
        """
    )
    # Migrate existing tables that lack newer columns.
    cols = {r[1] for r in conn.execute('PRAGMA table_info(users)')}
    for name, typ in [('phone', 'TEXT'), ('city', 'TEXT'), ('bio', 'TEXT'), ('blood_group', 'TEXT')]:
        if name not in cols:
            conn.execute(f'ALTER TABLE users ADD COLUMN {name} {typ}')
    pcols = {r[1] for r in conn.execute('PRAGMA table_info(posts)')}
    if 'type' not in pcols:
        conn.execute('ALTER TABLE posts ADD COLUMN type TEXT')
    conn.commit()
    conn.close()


def hash_password(password, salt=None):
    if salt is None:
        salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100_000)
    return salt + ':' + digest.hex()


def verify_password(password, stored):
    try:
        salt = stored.split(':', 1)[0]
        return hash_password(password, salt) == stored
    except Exception:
        return False


# ----------------------------------------------------------------------
# HTTP handler
# ----------------------------------------------------------------------
class Handler(BaseHTTPRequestHandler):

    def _send_json(self, obj, status=200):
        data = json.dumps(obj).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _read_body(self):
        try:
            length = int(self.headers.get('Content-Length', 0))
        except ValueError:
            length = 0
        if length == 0:
            return {}
        try:
            return json.loads(self.rfile.read(length).decode('utf-8'))
        except Exception:
            return {}

    def _serve_file(self, path):
        if path in ('', '/'):
            path = '/index.html'
        rel = path.lstrip('/')
        full = os.path.normpath(os.path.join(BASE_DIR, rel))
        if not full.startswith(BASE_DIR + os.sep) or not os.path.isfile(full):
            self.send_error(404, 'Not found')
            return
        ext = os.path.splitext(full)[1].lower()
        ctype = MIME.get(ext, 'application/octet-stream')
        with open(full, 'rb') as f:
            content = f.read()
        self.send_response(200)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Length', str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    # ---- GET ----
    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        qs = parse_qs(parsed.query)

        if path == '/api/health':
            return self._send_json({'ok': True, 'db': os.path.exists(DB_PATH)})
        if path == '/api/donors':
            return self._list_donors(qs)
        if path == '/api/profile':
            return self._get_profile(qs)
        if path == '/api/posts':
            conn = get_db()
            rows = conn.execute('SELECT * FROM posts ORDER BY id DESC LIMIT 100').fetchall()
            conn.close()
            return self._send_json([dict(r) for r in rows])

        self._serve_file(path)

    # ---- POST ----
    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        body = self._read_body()

        if path == '/api/signup':
            self._signup(body)
        elif path == '/api/login':
            self._login(body)
        elif path == '/api/donors':
            self._register_donor(body)
        elif path == '/api/profile':
            self._update_profile(body)
        elif path == '/api/posts':
            self._create_post(body)
        else:
            self._send_json({'error': 'Not found'}, 404)

    # ---- Auth ----
    def _signup(self, body):
        name = (body.get('name') or '').strip()
        email = (body.get('email') or '').strip().lower()
        password = body.get('password') or ''

        if not name or not email or not password:
            return self._send_json({'error': 'All fields are required'}, 400)
        if len(password) < 4:
            return self._send_json({'error': 'Password must be at least 4 characters'}, 400)

        conn = get_db()
        try:
            cur = conn.execute(
                'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
                (name, email, hash_password(password)),
            )
            conn.commit()
            user_id = cur.lastrowid
        except sqlite3.IntegrityError:
            conn.close()
            return self._send_json({'error': 'An account with this email already exists'}, 409)
        conn.close()
        self._send_json({'ok': True, 'user': {'id': user_id, 'name': name, 'email': email}})

    def _login(self, body):
        email = (body.get('email') or '').strip().lower()
        password = body.get('password') or ''
        conn = get_db()
        row = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
        conn.close()
        if not row or not verify_password(password, row['password_hash']):
            return self._send_json({'error': 'Invalid email or password'}, 401)
        self._send_json({'ok': True, 'user': {'id': row['id'], 'name': row['name'], 'email': row['email']}})

    # ---- Donors ----
    def _list_donors(self, qs):
        blood = (qs.get('blood', [''])[0] or '').strip().upper()
        city = (qs.get('city', [''])[0] or '').strip().lower()
        sql = ('SELECT d.id, d.name, d.blood_group, d.city, d.phone, d.available, u.email '
               'FROM donors d LEFT JOIN users u ON u.id = d.user_id WHERE 1=1')
        params = []
        if blood:
            sql += ' AND d.blood_group = ?'
            params.append(blood)
        if city:
            sql += ' AND lower(d.city) = ?'
            params.append(city)
        sql += ' ORDER BY d.id DESC LIMIT 100'
        conn = get_db()
        rows = conn.execute(sql, params).fetchall()
        conn.close()
        self._send_json([dict(r) for r in rows])

    def _register_donor(self, body):
        name = (body.get('name') or '').strip()
        blood = (body.get('blood_group') or '').strip().upper()
        city = (body.get('city') or '').strip()
        phone = (body.get('phone') or '').strip()
        email = (body.get('email') or '').strip().lower()

        if not name or not blood or not city:
            return self._send_json({'error': 'Name, blood group and city are required'}, 400)

        conn = get_db()
        user_id = None
        if email:
            u = conn.execute('SELECT id FROM users WHERE email = ?', (email,)).fetchone()
            if u:
                user_id = u['id']
        cur = conn.execute(
            'INSERT INTO donors (user_id, name, blood_group, city, phone) VALUES (?, ?, ?, ?, ?)',
            (user_id, name, blood, city, phone),
        )
        conn.commit()
        donor_id = cur.lastrowid
        conn.close()
        self._send_json({'ok': True, 'id': donor_id})

    # ---- Profile ----
    def _get_profile(self, qs):
        email = (qs.get('email', [''])[0] or '').strip().lower()
        if not email:
            return self._send_json({'error': 'email is required'}, 400)
        conn = get_db()
        u = conn.execute(
            'SELECT id, name, email, phone, city, bio, blood_group FROM users WHERE email = ?',
            (email,),
        ).fetchone()
        if not u:
            conn.close()
            return self._send_json({'error': 'User not found'}, 404)
        secs = conn.execute(
            'SELECT id, title, content FROM profile_sections WHERE user_id = ? ORDER BY position, id',
            (u['id'],),
        ).fetchall()
        conn.close()
        profile = dict(u)
        profile['sections'] = [dict(s) for s in secs]
        self._send_json(profile)

    def _update_profile(self, body):
        email = (body.get('email') or '').strip().lower()
        if not email:
            return self._send_json({'error': 'email is required'}, 400)
        conn = get_db()
        u = conn.execute('SELECT id FROM users WHERE email = ?', (email,)).fetchone()
        if not u:
            conn.close()
            return self._send_json({'error': 'User not found'}, 404)
        uid = u['id']
        conn.execute(
            'UPDATE users SET phone=?, city=?, bio=?, blood_group=? WHERE id=?',
            (body.get('phone'), body.get('city'), body.get('bio'), body.get('blood_group'), uid),
        )
        conn.execute('DELETE FROM profile_sections WHERE user_id = ?', (uid,))
        for i, s in enumerate(body.get('sections') or []):
            title = (s.get('title') or '').strip()
            content = (s.get('content') or '').strip()
            if title or content:
                conn.execute(
                    'INSERT INTO profile_sections (user_id, title, content, position) VALUES (?, ?, ?, ?)',
                    (uid, title, content, i),
                )
        conn.commit()
        conn.close()
        self._send_json({'ok': True})

    # ---- Posts (future features) ----
    def _create_post(self, body):
        category = (body.get('category') or '').strip()
        title = (body.get('title') or '').strip()
        ptype = (body.get('type') or '').strip()
        if not category or not title:
            return self._send_json({'error': 'Category and title are required'}, 400)
        conn = get_db()
        user_id = None
        email = (body.get('email') or '').strip().lower()
        if email:
            u = conn.execute('SELECT id FROM users WHERE email = ?', (email,)).fetchone()
            if u:
                user_id = u['id']
        cur = conn.execute(
            'INSERT INTO posts (user_id, category, title, type, description, city, phone) '
            'VALUES (?, ?, ?, ?, ?, ?, ?)',
            (user_id, category, title, ptype,
             body.get('description'), body.get('city'), body.get('phone')),
        )
        conn.commit()
        post_id = cur.lastrowid
        conn.close()
        self._send_json({'ok': True, 'id': post_id})


# ----------------------------------------------------------------------
# Main
# ----------------------------------------------------------------------
def main():
    init_db()
    url = f'http://localhost:{PORT}'
    print(f'\n  ApnaMohalla running at {url}\n')
    print('  Press Ctrl+C to stop.\n')

    if '--no-browser' not in sys.argv and not os.environ.get('RENDER'):
        def _open():
            time.sleep(1.0)
            webbrowser.open(url)
        threading.Thread(target=_open, daemon=True).start()

    server = ThreadingHTTPServer((HOST, PORT), Handler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n  Server stopped.')


if __name__ == '__main__':
    main()
