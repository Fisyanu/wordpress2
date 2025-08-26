(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Simple countdown to 7 days from now
  const target = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const ids = { d: 'd', h: 'h', m: 'm', s: 's' };
  function tick() {
    const diff = Math.max(0, target - Date.now());
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const set = (k, v) => { const el = document.getElementById(k); if (el) el.textContent = String(v).padStart(2, '0'); };
    set(ids.d, days); set(ids.h, hours); set(ids.m, mins); set(ids.s, secs);
  }
  setInterval(tick, 1000); tick();

  // Newsletter form behavior
  const newsForm = document.getElementById('newsletter-form');
  if (newsForm) {
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const note = document.getElementById('newsletter-note');
      if (note) note.textContent = 'Thanks! Check your inbox for a confirmation.';
      newsForm.reset();
    });
  }

  const footForm = document.getElementById('footer-newsletter-form');
  if (footForm) {
    footForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Subscribed!');
      footForm.reset();
    });
  }

  // Menu and submenu toggles
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const siteNav = document.querySelector('.site-nav');
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', function () {
      siteNav.classList.toggle('open');
    });
  }

  document.querySelectorAll('.submenu-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const parent = btn.closest('.has-submenu, .has-mega');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (parent) parent.classList.toggle('open');
    });
  });

  // Cart count demo
  const cartCount = document.getElementById('cart-count');
  document.querySelectorAll('[data-add-to-cart]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const current = Number(cartCount?.textContent || '0') || 0;
      if (cartCount) cartCount.textContent = String(current + 1);
    });
  });

  // Login modal
  const loginOpen = document.querySelector('[data-login-open]');
  const loginModal = document.getElementById('login-modal');
  if (loginOpen && loginModal) {
    function close() { loginModal.setAttribute('hidden', ''); }
    function open() { loginModal.removeAttribute('hidden'); }
    loginOpen.addEventListener('click', open);
    loginModal.querySelectorAll('[data-login-close]').forEach(function (el) {
      el.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }
})();


