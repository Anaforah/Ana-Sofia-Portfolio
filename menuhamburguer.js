const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-bar');
const links = document.querySelectorAll('.nav-bar a');

function toggleMenu() {
  const isOpen = menu.classList.toggle('open');
  document.body.classList.toggle('no-scroll', isOpen);

  if (isOpen) {
    hamburger.innerHTML = '&times;';
    hamburger.setAttribute('aria-label', 'Fechar menu');
  } else {
    hamburger.innerHTML = '&#9776;';
    hamburger.setAttribute('aria-label', 'Abrir menu');
  }
}

hamburger.addEventListener('click', toggleMenu);

links.forEach(link => {
  link.addEventListener('click', () => {
    if (menu.classList.contains('open')) {
      toggleMenu();
    }
  });
});
