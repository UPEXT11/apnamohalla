# ApnaMohalla 🏘️

A hyperlocal help platform for India — find blood donors, reunite lost items,
discover trusted local services and reach emergency help, all in your own mohalla.

## Run it

1. Make sure Python 3 is installed (it is on this machine).
2. **Double-click `run.bat`** — or run `python server.py` in a terminal.
3. Open **http://localhost:8000**

## Pages

| Page | What it is |
|------|------------|
| `index.html` | Landing page |
| `loader.html` | Splash screen |
| `login.html` / `signup.html` | Authentication |
| `dashboard.html` | Gated feature cards |
| `blood.html` | 🩸 Blood Donor Finder (search + register) |
| `profile.html` | 👤 Profile + dynamic custom sections |
| `legal.html?page=…` | Privacy, Terms, Cookies, Disclaimer, Refund, About |

## Features

- 🌐 **English / Hindi** toggle (bottom-right FAB)
- 📜 **Legal pages** reachable from the FAB
- 🩸 Blood donor search & registration (stored in SQLite)
- 👤 Profile with user-defined custom sections

## API endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET  | `/api/health` | Server + database check |
| POST | `/api/signup` | Create an account |
| POST | `/api/login` | Log in |
| GET  | `/api/donors?blood=&city=` | Search donors |
| POST | `/api/donors` | Register as a donor |
| GET  | `/api/profile?email=` | Read a profile |
| POST | `/api/profile` | Update profile + sections |
| GET/POST | `/api/posts` | Posts (future features) |

## Notes

- `apnamohalla.db` (SQLite) is created automatically on first run.
- Passwords are stored **hashed** (PBKDF2 + salt).
- This is a local prototype. To launch online, move the database to a hosted
  service (e.g. Supabase/Postgres).
