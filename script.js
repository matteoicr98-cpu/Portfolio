// Basic site JS: nav toggle, year, simple page show animation
document.addEventListener('DOMContentLoaded', function () {
  // Nav toggle
  const navToggle = document.querySelectorAll('.nav-toggle');
  navToggle.forEach(btn => {
    btn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      document.body.classList.toggle('nav-open');
    });
  });

  // Close mobile nav on link click
  document.querySelectorAll('.site-nav a').forEach(a => a.addEventListener('click', () => {
    document.querySelectorAll('.nav-toggle').forEach(b => b.setAttribute('aria-expanded', 'false'));
    document.body.classList.remove('nav-open');
  }));

  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Page enter animation
  document.querySelectorAll('.page').forEach(p => requestAnimationFrame(() => p.classList.add('is-visible')));

  // Simple progressive enhancement: if JS disabled, still works as HTML site
});
