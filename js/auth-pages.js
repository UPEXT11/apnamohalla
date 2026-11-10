/* ApnaMohalla — login & signup form handlers (async, talks to the API) */
(function () {
  'use strict';

  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  function setBusy(btn, busy, busyText, idleText) {
    btn.disabled = busy;
    btn.textContent = busy ? busyText : idleText;
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = loginForm.elements.email.value.trim();
      const password = loginForm.elements.password.value;
      const btn = loginForm.querySelector('button[type="submit"]');
      setBusy(btn, true, 'Logging in…', 'Log In');
      try {
        await window.ApnaAuth.login(email, password);
        window.showToast('✅ Welcome back!');
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 600);
      } catch (err) {
        window.showToast('❌ ' + err.message);
        setBusy(btn, false, '', 'Log In');
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = signupForm.elements.name.value.trim();
      const email = signupForm.elements.email.value.trim();
      const password = signupForm.elements.password.value;
      if (!name) { window.showToast('❌ Please enter your name'); return; }
      if (password.length < 4) { window.showToast('❌ Password must be at least 4 characters'); return; }
      const btn = signupForm.querySelector('button[type="submit"]');
      setBusy(btn, true, 'Creating…', 'Sign Up Free');
      try {
        await window.ApnaAuth.signup(name, email, password);
        window.showToast('🎉 Account created! Welcome to ApnaMohalla.');
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 600);
      } catch (err) {
        window.showToast('❌ ' + err.message);
        setBusy(btn, false, '', 'Sign Up Free');
      }
    });
  }
})();
