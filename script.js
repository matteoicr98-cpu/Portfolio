const nav = document.querySelector('.nav');
const button = document.querySelector('.menu-button');
button.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  button.setAttribute('aria-expanded', open);
  button.textContent = open ? 'Close' : 'Menu';
});
document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open'); button.setAttribute('aria-expanded', 'false'); button.textContent = 'Menu';
}));
document.querySelector('#year').textContent = new Date().getFullYear();
