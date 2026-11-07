const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector<HTMLElement>('.site-header')!;
const toTop = document.querySelector<HTMLButtonElement>('.to-top')!;
const parallaxEls = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];

/* Scroll state: shrinking header, back-to-top, parallax */
let ticking = false;
function frame() {
  ticking = false;
  const y = window.scrollY;
  header.classList.toggle('is-small', y > 40);
  toTop.classList.toggle('show', y > 800);
  if (!reduce) {
    for (const el of parallaxEls) {
      const r = el.parentElement!.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) continue;
      // 2D translate on purpose: a 3D transform layer left the hero photo unpainted in some Chromium builds.
      el.style.transform = `translate(0, ${(y * 0.12).toFixed(1)}px) scale(1.12)`;
    }
  }
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
frame();
toTop.addEventListener('click', () => {
  scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  (document.querySelector('.brand') as HTMLElement)?.focus({ preventScroll: true });
});

/* Mobile menu with focus trap */
const toggle = header.querySelector<HTMLButtonElement>('.menu-toggle')!;
const nav = header.querySelector<HTMLElement>('#site-nav')!;
const mq = matchMedia('(max-width: 1020px)');
function setMenu(open: boolean, returnFocus = true) {
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  syncInert();
  if (open) setTimeout(() => (nav.querySelector('a') as HTMLElement)?.focus(), 50);
  else if (returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false, false)));
mq.addEventListener('change', () => setMenu(false, false));
// Hidden panel must not be reachable by keyboard on small screens
function syncInert() { if (mq.matches) nav.toggleAttribute('inert', !nav.classList.contains('open')); else nav.removeAttribute('inert'); }
new MutationObserver(syncInert).observe(nav, { attributes: true, attributeFilter: ['class'] });
mq.addEventListener('change', syncInert);
syncInert();
header.addEventListener('keydown', (e) => {
  if (toggle.getAttribute('aria-expanded') !== 'true') return;
  if (e.key === 'Escape') { e.preventDefault(); setMenu(false); return; }
  if (e.key !== 'Tab') return;
  const items = [...header.querySelectorAll<HTMLElement>('a[href], button')].filter((el) => el.offsetParent !== null || el === toggle);
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* Scroll reveal */
const reveals = document.querySelectorAll<HTMLElement>('.reveal');
if (reduce || !('IntersectionObserver' in window)) reveals.forEach((el) => el.classList.add('in'));
else {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el) => io.observe(el));
}

/* Counters */
const fmt = (n: number, d: number) => new Intl.NumberFormat('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);
function run(el: HTMLElement) {
  const target = parseFloat(el.dataset.count || '0');
  const d = parseInt(el.dataset.decimals || '0', 10);
  const suffix = el.dataset.suffix || '';
  const show = (v: number) => { el.textContent = fmt(v, d) + suffix; };
  if (reduce) return show(target);
  const t0 = performance.now(), dur = 1600;
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / dur);
    show(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const counters = document.querySelectorAll<HTMLElement>('[data-count]');
if ('IntersectionObserver' in window) {
  const cio = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { run(e.target as HTMLElement); cio.unobserve(e.target); }
  }, { threshold: 0.4 });
  counters.forEach((c) => cio.observe(c));
} else counters.forEach(run);
