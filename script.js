const header = document.querySelector('.site-header');
const reveals = document.querySelectorAll('.reveal');
const filterButtons = document.querySelectorAll('.filter-chip');
const menuCards = document.querySelectorAll('.menu-card');

const handleHeaderState = () => {
  if (window.scrollY > 32) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
};

handleHeaderState();
window.addEventListener('scroll', handleHeaderState, { passive: true });

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  }
);

reveals.forEach((item) => observer.observe(item));

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((chip) => chip.classList.remove('is-active'));
    button.classList.add('is-active');

    menuCards.forEach((card) => {
      const categories = card.dataset.category.split(' ');
      const shouldShow = filter === 'all' || categories.includes(filter);
      card.classList.toggle('is-hidden', !shouldShow);
    });
  });
});


const topLinks = document.querySelectorAll('a[href="#top"]');

topLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
