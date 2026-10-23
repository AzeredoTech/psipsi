const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    nav.classList.toggle('is-open', !isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
  }));
}

const calmToggle = document.querySelector('.calm-toggle');
if (calmToggle) {
  try {
    const savedCalmMode = localStorage.getItem('mirian-calm-mode') === 'true';
    document.body.classList.toggle('calm-mode', savedCalmMode);
    calmToggle.setAttribute('aria-pressed', String(savedCalmMode));
    calmToggle.addEventListener('click', () => {
      const enabled = calmToggle.getAttribute('aria-pressed') !== 'true';
      document.body.classList.toggle('calm-mode', enabled);
      calmToggle.setAttribute('aria-pressed', String(enabled));
      try { localStorage.setItem('mirian-calm-mode', String(enabled)); } catch {}
    });
  } catch {
    calmToggle.addEventListener('click', () => {
      const enabled = calmToggle.getAttribute('aria-pressed') !== 'true';
      document.body.classList.toggle('calm-mode', enabled);
      calmToggle.setAttribute('aria-pressed', String(enabled));
    });
  }
}

document.querySelectorAll('.routine-board input[type="checkbox"]').forEach((checkbox, index) => {
  const key = `mirian-routine-${index}`;
  try { checkbox.checked = sessionStorage.getItem(key) === 'true'; } catch {}
  checkbox.addEventListener('change', () => {
    try { sessionStorage.setItem(key, String(checkbox.checked)); } catch {}
  });
});

const audienceCards = [...document.querySelectorAll('.audience-card')];
try {
  const selectedAudience = sessionStorage.getItem('mirian-audience-choice');
  audienceCards.forEach((card) => card.classList.toggle('is-selected', card.dataset.audience === selectedAudience));
} catch {}
audienceCards.forEach((card) => card.addEventListener('click', () => {
  const selectedAudience = card.hash === '#adultos' ? 'adultos' : 'familia';
  try { sessionStorage.setItem('mirian-audience-choice', selectedAudience); } catch {}
  audienceCards.forEach((item) => item.classList.toggle('is-selected', item === card));
}));

const header = document.querySelector('.site-header');
if (header) {
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const name = document.querySelector('#contact-name').value.trim();
    const message = `Ol%C3%A1%2C%20Mirian!%20Meu%20nome%20%C3%A9%20${encodeURIComponent(name)}.%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20conversa.`;
    document.querySelector('#form-status').textContent = 'Abrindo o WhatsApp para você continuar o contato.';
    window.open(`https://wa.me/5522997870497?text=${message}`, '_blank', 'noopener,noreferrer');
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
