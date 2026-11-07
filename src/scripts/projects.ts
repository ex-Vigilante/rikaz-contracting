// @ts-nocheck
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const grid = document.querySelector('[data-grid]');
const cards = [...grid.querySelectorAll('[data-card]')];
const result = document.querySelector('[data-result]');
const empty = document.querySelector('[data-empty]');
const resetBtn = document.querySelector('[data-reset]');
const state = { cat: 'all', city: 'all', status: 'all' };
import { plural } from '../lib/plural';
const isAr = document.documentElement.lang === 'ar';

function matches(c) {
  return (state.cat === 'all' || c.dataset.cat === state.cat) &&
    (state.city === 'all' || c.dataset.city === state.city) &&
    (state.status === 'all' || c.dataset.status === state.status);
}
function apply(animate) {
  const before = new Map();
  if (animate && !reduce) cards.forEach((c) => { if (!c.hidden) before.set(c, c.getBoundingClientRect()); });
  let n = 0;
  cards.forEach((c) => { const show = matches(c); c.hidden = !show; if (show) n++; });
  if (animate && !reduce) {
    cards.forEach((c) => {
      if (c.hidden) return;
      const prev = before.get(c);
      const now = c.getBoundingClientRect();
      if (prev) {
        const dx = prev.left - now.left, dy = prev.top - now.top;
        if (dx || dy) c.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.2,.7,.2,1)' });
      } else {
        c.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'ease-out' });
      }
    });
  }
  result.textContent = plural(document.documentElement.lang, n, JSON.parse(result.dataset.plural));
  empty.hidden = n !== 0;
  resetBtn.hidden = Object.values(state).every((v) => v === 'all');
}
document.querySelectorAll('[data-filter]').forEach((group) => {
  const key = group.dataset.filter;
  group.querySelectorAll('button').forEach((btn) => btn.addEventListener('click', () => {
    state[key] = btn.dataset.value;
    group.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    apply(true);
  }));
});
resetBtn.addEventListener('click', () => {
  state.cat = state.city = state.status = 'all';
  document.querySelectorAll('[data-filter]').forEach((g) => g.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.value === 'all'))));
  apply(true);
});
apply(false);

/* Lazy map */
const box = document.querySelector('[data-map]');
let started = false;
async function initMap() {
  if (started) return; started = true;
  try {
    const mod = await import('leaflet');
    await import('leaflet/dist/leaflet.css');
    const L = mod.default || mod;
    const pts = JSON.parse(box.dataset.points);
    box.querySelector('[data-loading]')?.remove();
    const map = L.map(box, { scrollWheelZoom: false, worldCopyJump: false }).setView([25.2, 44], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
    const bounds = [];
    pts.forEach((p) => {
      const icon = L.divIcon({ className: '', html: `<div class="pin"><span>${p.items.length}</span></div>`, iconSize: [34, 34], iconAnchor: [17, 34], popupAnchor: [0, -30] });
      const m = L.marker([p.lat, p.lng], { icon, title: p.name, alt: p.name, keyboard: true }).addTo(map);
      const pop = document.createElement('div');
      pop.className = 'map-pop';
      pop.dir = isAr ? 'rtl' : 'ltr';
      const h = document.createElement('h3'); h.textContent = p.name; pop.append(h);
      const ul = document.createElement('ul');
      p.items.forEach((it) => { const li = document.createElement('li'); const a = document.createElement('a'); a.href = it.url; a.textContent = it.title; li.append(a); ul.append(li); });
      pop.append(ul);
      m.bindPopup(pop);
      bounds.push([p.lat, p.lng]);
    });
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 7 });
    setTimeout(() => map.invalidateSize(), 200);
  } catch (e) {
    const l = box.querySelector('[data-loading]');
    if (l) l.textContent = isAr ? 'تعذّر تحميل الخريطة. المدن مدرجة أدناه.' : 'The map could not load. Cities are listed below.';
  }
}
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); initMap(); } }, { rootMargin: '300px' });
  io.observe(box);
} else initMap();
