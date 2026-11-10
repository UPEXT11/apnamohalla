/* ApnaMohalla — floating action button: language toggle + legal pages */
(function () {
  'use strict';

  function build() {
    const fab = document.createElement('div');
    fab.className = 'fab';
    fab.innerHTML = `
      <div class="fab-menu" id="fabMenu" hidden>
        <div class="fab-head" data-i18n="fab.legal">Legal &amp; Info</div>
        <div class="fab-lang">
          <button class="lang-btn" data-lang="en" id="langEn">EN</button>
          <button class="lang-btn" data-lang="hi" id="langHi">हिं</button>
        </div>
        <a class="fab-item" href="legal.html?page=privacy"><span>🔒</span><span data-i18n="fab.privacy">Privacy Policy</span></a>
        <a class="fab-item" href="legal.html?page=terms"><span>📜</span><span data-i18n="fab.terms">Terms of Service</span></a>
        <a class="fab-item" href="legal.html?page=cookies"><span>🍪</span><span data-i18n="fab.cookies">Cookie Policy</span></a>
        <a class="fab-item" href="legal.html?page=disclaimer"><span>⚠️</span><span data-i18n="fab.disclaimer">Disclaimer</span></a>
        <a class="fab-item" href="legal.html?page=refund"><span>💰</span><span data-i18n="fab.refund">Refund Policy</span></a>
        <a class="fab-item" href="legal.html?page=about"><span>🏘️</span><span data-i18n="fab.about">About Us</span></a>
      </div>
      <button class="fab-main" id="fabMain" aria-label="Menu">⚙️</button>
    `;
    document.body.appendChild(fab);

    const menu = fab.querySelector('#fabMenu');
    fab.querySelector('#fabMain').addEventListener('click', (e) => {
      e.stopPropagation();
      menu.hidden = !menu.hidden;
    });
    document.addEventListener('click', (e) => {
      if (!fab.contains(e.target)) menu.hidden = true;
    });

    fab.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.i18n.setLang(btn.getAttribute('data-lang'));
        menu.hidden = true;
      });
    });

    syncLangButtons(fab);
    window.i18n.apply();
  }

  function syncLangButtons(fab) {
    const lang = window.i18n.getLang();
    fab.querySelectorAll('.lang-btn').forEach((b) => {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    build();
    document.addEventListener('langchange', () => {
      const fab = document.querySelector('.fab');
      if (fab) syncLangButtons(fab);
    });
  });
})();
