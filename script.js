const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menú');
    });
  });
}

// Resalta el enlace de navegación correspondiente a la sección visible.
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
}

// El formulario prepara un mensaje en WhatsApp; no almacena datos en el sitio.
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get('nombre') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('mensaje') || '').trim();
    const text = `Hola Pet&Pet. Soy ${name}. Mi correo es ${email}. ${message}`;
    const url = `https://wa.me/573002223334?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();
