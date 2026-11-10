/* ApnaMohalla — auth against the Python + SQLite backend.
   The real database lives in apnamohalla.db; only the logged-in
   user's session is kept in localStorage for convenience. */
(function () {
  'use strict';

  const SESSION_KEY = 'apnamohalla.session';

  const getSession = () => {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; }
  };
  const setSession = (u) => localStorage.setItem(SESSION_KEY, JSON.stringify(u));
  const clearSession = () => localStorage.removeItem(SESSION_KEY);

  async function api(path, body) {
    let res;
    try {
      res = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch {
      throw new Error('Cannot reach the server. Start it with: python server.py');
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    return data;
  }

  window.ApnaAuth = {
    isLoggedIn: () => !!getSession(),
    currentUser: getSession,

    async signup(name, email, password) {
      const data = await api('/api/signup', { name, email, password });
      setSession(data.user);
      return data;
    },

    async login(email, password) {
      const data = await api('/api/login', { email, password });
      setSession(data.user);
      return data;
    },

    logout() { clearSession(); },
  };

  /* Shared toast helper */
  window.showToast = function (msg) {
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(window.showToast._t);
    window.showToast._t = setTimeout(() => { t.hidden = true; }, 2600);
  };
})();
