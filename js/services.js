/* ApnaMohalla — Local Services directory */
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

  const services = [
    { icon: '🔧', titleKey: 'svc.plumber', descKey: 'svc.plumberDesc', wa: 'Need a plumber in my area' },
    { icon: '⚡', titleKey: 'svc.electrician', descKey: 'svc.electricianDesc', wa: 'Need an electrician nearby' },
    { icon: '📚', titleKey: 'svc.tutor', descKey: 'svc.tutorDesc', wa: 'Looking for a tutor' },
    { icon: '🧹', titleKey: 'svc.househelp', descKey: 'svc.househelpDesc', wa: 'Looking for house help' },
    { icon: '🚗', titleKey: 'svc.driver', descKey: 'svc.driverDesc', wa: 'Need a driver' },
    { icon: '🩺', titleKey: 'svc.doctor', descKey: 'svc.doctorDesc', wa: 'Need a doctor consultation' },
    { icon: '🐾', titleKey: 'svc.petcare', descKey: 'svc.petcareDesc', wa: 'Need pet care help' },
    { icon: '🧺', titleKey: 'svc.laundry', descKey: 'svc.laundryDesc', wa: 'Need laundry pickup' },
  ];
  const PLACEHOLDER = '919000000000'; // TODO: replace with real provider numbers
  const grid = document.getElementById('servicesGrid');

  function render() {
    grid.innerHTML = '';
    services.forEach((s) => {
      const href = 'https://wa.me/' + PLACEHOLDER + '?text=' + encodeURIComponent(s.wa);
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `
        <div class="service-icon">${s.icon}</div>
        <h4>${window.i18n.t(s.titleKey)}</h4>
        <p>${window.i18n.t(s.descKey)}</p>
        <a class="btn-wa-sm" href="${href}" target="_blank" rel="noopener">💬 ${window.i18n.t('svc.ask')}</a>`;
      grid.appendChild(card);
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  render();
  document.addEventListener('langchange', render);
})();
