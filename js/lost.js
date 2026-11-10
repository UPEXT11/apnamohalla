/* ApnaMohalla — Lost & Found */
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

  const CAT = { pet: '🐾', documents: '📄', phone: '📱', other: '📦' };
  let posts = [];

  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function render() {
    const cat = document.getElementById('filterCat').value;
    const type = document.getElementById('filterType').value;
    const box = document.getElementById('lostResults');
    const empty = document.getElementById('lostEmpty');
    const list = posts.filter((p) => (!cat || p.category === cat) && (!type || p.type === type));
    box.innerHTML = '';
    empty.hidden = list.length !== 0;
    list.forEach((p) => {
      const isLost = p.type === 'lost';
      const wa = p.phone ? 'https://wa.me/' + String(p.phone).replace(/\D/g, '') : null;
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <span class="tag" style="background:${isLost ? '#FEF2F2' : '#F0FDF4'};color:${isLost ? '#DC2626' : '#16A34A'}">
          ${isLost ? '🔴 ' + window.i18n.t('lost.lost') : '🟢 ' + window.i18n.t('lost.found')}
        </span>
        <h4>${CAT[p.category] || '📦'} ${esc(p.title)}</h4>
        <div class="meta">📍 ${esc(p.city)}</div>
        ${p.description ? `<div class="meta" style="margin-top:6px">${esc(p.description)}</div>` : ''}
        <div class="card-actions">
          ${wa ? `<a class="btn-wa-sm" href="${wa}" target="_blank" rel="noopener">💬 ${window.i18n.t('lost.respond')}</a>` : ''}
          ${p.phone ? `<a class="btn-wa-sm" style="background:#0F172A" href="tel:${esc(p.phone)}">📞 Call</a>` : ''}
        </div>`;
      box.appendChild(card);
    });
  }

  async function load() {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      posts = Array.isArray(data) ? data : [];
      render();
    } catch (e) { window.showToast('❌ ' + e.message); }
  }

  document.getElementById('filterCat').addEventListener('change', render);
  document.getElementById('filterType').addEventListener('change', render);

  document.getElementById('lostForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = e.target.elements;
    const body = {
      email: user ? user.email : '',
      category: f.category.value,
      title: f.title.value.trim(),
      type: f.type.value,
      city: f.city.value.trim(),
      phone: f.phone.value.trim(),
      description: f.description.value.trim(),
    };
    try {
      const res = await fetch('/api/posts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'error');
      window.showToast('📢 ' + window.i18n.t('lost.posted'));
      e.target.reset();
      load();
    } catch (err) { window.showToast('❌ ' + err.message); }
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  load();
})();
