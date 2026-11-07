// @ts-nocheck
import { t, validateScope, liveClear, bindFiles, formatBytes } from './forms';

const form = document.querySelector('[data-quote]');
const steps = [...form.querySelectorAll('[data-step]')];
const progress = [...document.querySelectorAll('[data-progress] li')];
const prev = form.querySelector('[data-prev]');
const next = form.querySelector('[data-next]');
const submit = form.querySelector('[data-submit]');
const notice = document.querySelector('[data-notice]');
const success = document.querySelector('[data-success]');
const review = form.querySelector('[data-review]');
const KEY = 'rikaz-quote-draft-v1';
let cur = 0;

liveClear(form);
bindFiles(form);

/* Draft in localStorage (never includes the file) */
const store = {
  get() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; } },
  set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} },
  clear() { try { localStorage.removeItem(KEY); } catch {} },
};
function collect() {
  const data = {};
  form.querySelectorAll('input, select, textarea').forEach((c) => {
    if (!c.name || c.type === 'file' || c.type === 'checkbox') return;
    if (c.type === 'radio') { if (c.checked) data[c.name] = c.value; return; }
    data[c.name] = c.value;
  });
  return data;
}
const save = () => store.set({ step: cur, data: collect() });

function labelOf(c) {
  if (c.type === 'radio') return c.dataset.text;
  if (c.tagName === 'SELECT') return c.selectedOptions[0]?.textContent || '';
  return c.value;
}
function buildReview() {
  review.textContent = '';
  const add = (dt, dd) => {
    if (!dd) return;
    const a = document.createElement('dt'); a.textContent = dt;
    const b = document.createElement('dd'); b.textContent = dd;
    review.append(a, b);
  };
  const checked = form.querySelector('input[name=type]:checked');
  add(t('نوع المشروع', 'Project type'), checked && checked.dataset.text);
  ['city', 'area', 'budget', 'timeline', 'details', 'name', 'company', 'phone', 'email'].forEach((id) => {
    const c = form.querySelector('#' + id);
    let v = labelOf(c);
    if (id === 'area' && v) v += ' ' + t('م²', 'm²');
    add(c.dataset.label, v);
  });
  const f = form.querySelector('#file').files[0];
  add(t('المرفق', 'Attachment'), f && `${f.name} · ${formatBytes(f.size)}`);
}

function go(n, focus = true) {
  cur = n;
  steps.forEach((s, i) => { s.hidden = i !== n; });
  progress.forEach((li, i) => {
    li.classList.toggle('done', i < n);
    if (i === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
  });
  prev.hidden = n === 0;
  next.hidden = n === steps.length - 1;
  submit.hidden = n !== steps.length - 1;
  if (n === steps.length - 1) buildReview();
  if (focus) {
    const h = steps[n].querySelector('.step-title');
    h.focus({ preventScroll: true });
    h.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  save();
}
function advance() {
  const bad = validateScope(steps[cur]);
  if (bad) { bad.focus(); return; }
  go(cur + 1);
}
next.addEventListener('click', advance);
prev.addEventListener('click', () => go(cur - 1));
form.addEventListener('input', save);
form.addEventListener('change', save);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (cur < steps.length - 1) return advance();
  const bad = validateScope(steps[cur]);
  if (bad) { bad.focus(); return; }
  const ref = 'RKZ-2026-' + String(100 + Math.floor(Math.random() * 900)).padStart(4, '0');
  success.querySelector('[data-ref]').textContent = ref;
  store.clear();
  form.hidden = true;
  document.querySelector('[data-progress]').hidden = true;
  notice.hidden = true;
  success.hidden = false;
  success.focus();
  success.scrollIntoView({ block: 'center' });
});

document.querySelector('[data-clear-draft]').addEventListener('click', () => {
  store.clear();
  form.reset();
  form.querySelectorAll('[aria-invalid]').forEach((c) => c.removeAttribute('aria-invalid'));
  form.querySelectorAll('.err').forEach((e) => { e.textContent = ''; });
  const fi = document.getElementById('file-info'); if (fi) fi.textContent = '';
  notice.hidden = true;
  go(0, false);
});

/* Restore */
const draft = store.get();
const okData = draft && typeof draft.data === 'object' && draft.data !== null && !Array.isArray(draft.data);
if (okData && Object.values(draft.data).some((v) => typeof v === 'string' && v)) {
  Object.entries(draft.data).forEach(([name, v]) => {
    if (typeof v !== 'string') return;
    form.querySelectorAll(`[name="${CSS.escape(name)}"]`).forEach((c) => {
      if (c.type === 'file' || c.type === 'checkbox') return;
      if (c.type === 'radio') c.checked = c.value === v;
      else if (c.tagName !== 'SELECT' || [...c.options].some((o) => o.value === v)) c.value = v;
    });
  });
  notice.hidden = false;
  const s = Number.isInteger(draft.step) ? draft.step : 0;
  go(Math.max(0, Math.min(s, steps.length - 2)), false);
} else go(0, false);
