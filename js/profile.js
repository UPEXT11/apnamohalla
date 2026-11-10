/* ApnaMohalla — Profile page with dynamic custom sections */
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

  const form = document.getElementById('profileForm');
  const sectionsBox = document.getElementById('sectionsBox');

  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function sectionRow(title, content) {
    const row = document.createElement('div');
    row.className = 'section-row';
    row.innerHTML = `
      <div class="section-row-head">
        <input class="sec-title" data-i18n-placeholder="profile.sectionTitle" placeholder="Section title" value="${esc(title || '')}" />
        <button type="button" class="btn-remove" data-i18n="profile.remove">Remove</button>
      </div>
      <textarea class="sec-content" data-i18n-placeholder="profile.sectionContent" placeholder="Section content">${esc(content || '')}</textarea>`;
    row.querySelector('.btn-remove').addEventListener('click', () => row.remove());
    return row;
  }

  async function load() {
    try {
      const res = await fetch('/api/profile?email=' + encodeURIComponent(user.email));
      if (!res.ok) throw new Error('Could not load profile');
      const p = await res.json();
      form.phone.value = p.phone || '';
      form.city.value = p.city || '';
      form.blood_group.value = p.blood_group || '';
      form.bio.value = p.bio || '';
      (p.sections || []).forEach((s) => sectionsBox.appendChild(sectionRow(s.title, s.content)));
      window.i18n.apply();
    } catch (e) { window.showToast('❌ ' + e.message); }
  }

  document.getElementById('addSectionBtn').addEventListener('click', () => {
    sectionsBox.appendChild(sectionRow('', ''));
    window.i18n.apply();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const sections = [];
    sectionsBox.querySelectorAll('.section-row').forEach((row) => {
      sections.push({
        title: row.querySelector('.sec-title').value.trim(),
        content: row.querySelector('.sec-content').value.trim(),
      });
    });
    const body = {
      email: user.email,
      phone: form.phone.value.trim(),
      city: form.city.value.trim(),
      blood_group: form.blood_group.value,
      bio: form.bio.value.trim(),
      sections,
    };
    try {
      const res = await fetch('/api/profile', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'error');
      window.showToast('✅ ' + window.i18n.t('profile.saved'));
    } catch (err) { window.showToast('❌ ' + err.message); }
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  load();
})();
