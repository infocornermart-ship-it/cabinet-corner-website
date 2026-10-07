document.documentElement.classList.add('js');
const menu = document.querySelector('.menu');
const navigation = document.querySelector('#primary-navigation');
if (menu && navigation) {
  const setOpen = (open) => {
    navigation.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  menu.addEventListener('click', () => setOpen(menu.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      menu.focus();
    }
  });
  window.matchMedia('(max-width: 920px)').addEventListener('change', () => setOpen(false));
}
const sections = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  try {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top >= window.innerHeight) section.classList.add('motion-ready');
      observer.observe(section);
    });
  } catch {
    sections.forEach((section) => section.classList.remove('motion-ready'));
  }
}
const callbackDate = document.querySelector('[name="callback-date"]');
if (callbackDate) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date());
  const part = (type) => parts.find((item) => item.type === type).value;
  callbackDate.min = part('year') + '-' + part('month') + '-' + part('day');
}

const siteHeader = document.querySelector('.site-header');
if (siteHeader) {
  const updateHeader = () => siteHeader.classList.toggle('scrolled', window.scrollY > 16);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}
