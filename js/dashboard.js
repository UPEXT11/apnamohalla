/* ApnaMohalla — dashboard (gated cards, i18n, routing) */
(function () {
  'use strict';

  const features = [
    { icon: '🩸', titleKey: 'dash.blood', descKey: 'dash.bloodDesc', href: 'blood.html' },
    { icon: '🔍', titleKey: 'dash.lost', descKey: 'dash.lostDesc', href: 'lost.html' },
    { icon: '🧑‍🔧', titleKey: 'dash.services', descKey: 'dash.servicesDesc', href: null },
    { icon: '🚨', titleKey: 'dash.sos', descKey: 'dash.sosDesc', href: null },
  ];

  const loggedIn = window.ApnaAuth.isLoggedIn();
  const user = window.ApnaAuth.currentUser();

  function renderCards() {
    const grid = document.getElementById('cardsGrid');
    grid.innerHTML = '';
    features.forEach((f) => {
      const card = document.createElement('div');
      card.className = 'service-card' + (loggedIn ? '' : ' locked');
      card.innerHTML = `
        ${loggedIn ? '' : '<span class="lock-badge">🔒</span>'}
        <div class="service-icon">${f.icon}</div>
        <h4>${window.i18n.t(f.titleKey)}</h4>
        <p>${window.i18n.t(f.descKey)}</p>
        <span class="card-state">${loggedIn ? window.i18n.t('dash.open') : window.i18n.t('dash.signinToAccess')}</span>
      `;
      card.addEventListener('click', () => {
        if (!loggedIn) {
          window.showToast('🔒 ' + window.i18n.t('dash.gateSignin'));
          setTimeout(() => { window.location.href = 'login.html'; }, 900);
        } else if (f.href) {
          window.location.href = f.href;
        } else {
          window.showToast('✨ ' + window.i18n.t(f.titleKey) + ' — coming soon!');
        }
      });
      grid.appendChild(card);
    });
  }

  function applyAuthState() {
    const profileBtn = document.getElementById('profileBtn');
    const signinBtn = document.getElementById('signinBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userChip = document.getElementById('userChip');
    const authCta = document.getElementById('authCta');
    const gateNote = document.getElementById('gateNote');

    if (loggedIn && user) {
      document.getElementById('userName').textContent = user.name.split(' ')[0];
      if (profileBtn) profileBtn.hidden = false;
      signinBtn.hidden = true;
      logoutBtn.hidden = false;
      userChip.hidden = false;
      userChip.textContent = '👤 ' + user.name;
      authCta.hidden = true;
      gateNote.textContent = window.i18n.t('dash.unlocked');
    } else {
      document.getElementById('userName').textContent = 'neighbour';
      if (profileBtn) profileBtn.hidden = true;
      signinBtn.hidden = false;
      logoutBtn.hidden = true;
      userChip.hidden = true;
      authCta.hidden = false;
      gateNote.textContent = window.i18n.t('dash.gateSignin');
    }
  }

  document.getElementById('logoutBtn').addEventListener('click', () => {
    window.ApnaAuth.logout();
    window.location.href = 'index.html';
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  renderCards();
  applyAuthState();

  document.addEventListener('langchange', () => {
    renderCards();
    applyAuthState();
  });
})();
