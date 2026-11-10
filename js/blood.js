/* ApnaMohalla — Blood Donor Finder */
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

  const nameInput = document.querySelector('#donorForm [name="name"]');
  if (user && nameInput) nameInput.value = user.name || '';

  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function renderDonors(list) {
    const box = document.getElementById('donorResults');
    const empty = document.getElementById('donorEmpty');
    box.innerHTML = '';
    empty.hidden = list.length !== 0;
    list.forEach((d) => {
      const wa = d.phone ? 'https://wa.me/' + String(d.phone).replace(/\D/g, '') : null;
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-top">
          <div class="avatar">${esc((d.name || '?')[0].toUpperCase())}</div>
          <div style="flex:1">
            <h4>${esc(d.name)}</h4>
            <span class="meta">📍 ${esc(d.city)}</span>
          </div>
          <span class="blood-badge">${esc(d.blood_group)}</span>
        </div>
        <div class="card-actions">
          ${wa ? `<a class="btn-wa-sm" href="${wa}" target="_blank" rel="noopener">💬 WhatsApp</a>` : ''}
          ${d.phone ? `<a class="btn-wa-sm" style="background:#0F172A" href="tel:${esc(d.phone)}">📞 Call</a>` : ''}
        </div>`;
      box.appendChild(card);
    });
    if (list.length) window.showToast(window.i18n.t('blood.found') + ': ' + list.length);
  }

  async function search() {
    const bg = document.getElementById('bloodGroup').value;
    const city = document.getElementById('donorCity').value.trim();
    const params = new URLSearchParams();
    if (bg) params.set('blood', bg);
    if (city) params.set('city', city);
    try {
      const res = await fetch('/api/donors?' + params.toString());
      const data = await res.json();
      renderDonors(Array.isArray(data) ? data : []);
    } catch (e) { window.showToast('❌ ' + e.message); }
  }

  document.getElementById('searchBtn').addEventListener('click', search);

  document.getElementById('donorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = e.target.elements;
    const body = {
      email: user ? user.email : '',
      name: f.name.value.trim(),
      blood_group: f.blood_group.value,
      city: f.city.value.trim(),
      phone: f.phone.value.trim(),
    };
    try {
      const res = await fetch('/api/donors', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'error');
      window.showToast('🩸 ' + window.i18n.t('blood.registered'));
      e.target.reset();
      if (user && nameInput) nameInput.value = user.name || '';
      search();
    } catch (err) { window.showToast('❌ ' + err.message); }
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  search();
})();
