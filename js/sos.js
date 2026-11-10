/* ApnaMohalla — Emergency SOS */
(function () {
  'use strict';

  if (!window.ApnaAuth.isLoggedIn()) { window.location.href = 'login.html'; return; }
  const user = window.ApnaAuth.currentUser();

  const chip = document.getElementById('userChip');
  if (user) { chip.textContent = '👤 ' + user.name; chip.hidden = false; document.getElementById('logoutBtn').hidden = false; }
  document.getElementById('logoutBtn').addEventListener('click', () => {
    window.ApnaAuth.logout();
    window.location.href = 'index.html';
  });

  const sos = [
    { num: '112', labelKey: 'sos.emergency', tel: '112' },
    { num: '108', labelKey: 'sos.ambulance', tel: '108' },
    { num: '100', labelKey: 'sos.police', tel: '100' },
    { num: '101', labelKey: 'sos.fire', tel: '101' },
    { num: '1091', labelKey: 'sos.women', tel: '1091' },
    { num: '1098', labelKey: 'sos.child', tel: '1098' },
  ];
  const grid = document.getElementById('sosGrid');

  function render() {
    grid.innerHTML = '';
    sos.forEach((s) => {
      const card = document.createElement('div');
      card.className = 'sos-card';
      card.innerHTML = `
        <div class="num">${s.num}</div>
        <div class="label">${window.i18n.t(s.labelKey)}</div>
        <a href="tel:${s.tel}">📞 ${window.i18n.t('sos.call')}</a>`;
      grid.appendChild(card);
    });
  }

  document.getElementById('shareSosBtn').addEventListener('click', () => {
    const lines = sos.map((s) => s.num + ' ' + window.i18n.t(s.labelKey)).join('\n');
    const msg = '🚨 Emergency helplines (India):\n' + lines + '\n— Shared via ApnaMohalla';
    window.location.href = 'https://wa.me/?text=' + encodeURIComponent(msg);
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  render();
  document.addEventListener('langchange', render);
})();
