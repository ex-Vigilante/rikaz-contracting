// @ts-nocheck
import { validateScope, liveClear, bindFiles, setErr } from './forms';
import { plural } from '../lib/plural';

const items = [...document.querySelectorAll('[data-jobs] > li')];
const count = document.querySelector('[data-jcount]');
const empty = document.querySelector('[data-jempty]');
const state = { dept: 'all', city: 'all' };

function apply() {
  let n = 0;
  items.forEach((li) => {
    const ok = (state.dept === 'all' || li.dataset.dept === state.dept) && (state.city === 'all' || li.dataset.city === state.city);
    li.hidden = !ok;
    if (ok) n++;
  });
  count.textContent = plural(document.documentElement.lang, n, JSON.parse(count.dataset.plural));
  empty.hidden = n !== 0;
}
document.querySelectorAll('[data-jfilter]').forEach((g) => {
  const key = g.dataset.jfilter;
  g.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
    state[key] = b.dataset.value;
    g.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    apply();
  }));
});
apply();

const form = document.querySelector('[data-apply-form]');
const success = document.querySelector('[data-apply-success]');
liveClear(form);
bindFiles(form);

document.querySelectorAll('[data-apply]').forEach((b) => b.addEventListener('click', () => {
  const job = form.querySelector('#a-job');
  job.value = b.dataset.apply;
  setErr(job, '');
  document.getElementById('apply').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  setTimeout(() => form.querySelector('#a-name').focus({ preventScroll: true }), 350);
}));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const bad = validateScope(form);
  if (bad) { bad.focus(); return; }
  form.hidden = true;
  success.hidden = false;
  success.focus();
});
