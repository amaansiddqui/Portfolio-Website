// Scroll reveal helper (IntersectionObserver)
// Adds `is-visible` to elements as they enter the viewport.

(function () {
  if (typeof window === 'undefined') return;

  document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.reveal-item, .reveal');
    if (!items.length || !('IntersectionObserver' in window)) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReduced && prefersReduced.matches) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { root: null, threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    items.forEach((el) => {
      // ensure starting state
      el.classList.add('reveal-start');
      io.observe(el);
    });
  });
})();

