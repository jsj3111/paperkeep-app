// Progressive enhancement only — with JavaScript off every section is already visible.
// 1. The sticky bar shows its hairline only once content scrolls under it.
// 2. Blocks below the first screen ease in once (opacity + transform only), unless reduced motion is asked for.
(() => {
  const nav = document.querySelector('.nav');
  const edge = () => nav && nav.classList.toggle('at-top', scrollY < 4);
  edge();
  addEventListener('scroll', edge, { passive: true });

  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.remove('pending'); io.unobserve(e.target); }
    }
  }, { rootMargin: '0px 0px -8% 0px' });
  for (const el of document.querySelectorAll('.reveal')) {
    // Only what the reader hasn't seen yet waits; nothing already on screen disappears.
    if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('pending'); io.observe(el); }
  }
})();
