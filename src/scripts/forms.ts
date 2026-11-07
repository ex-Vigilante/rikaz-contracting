// @ts-nocheck
export const isAr = document.documentElement.lang === 'ar';
export const t = (ar, en) => (isAr ? ar : en);

const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';
export const latin = (s) => s.replace(/[٠-٩]/g, (d) => String(AR_DIGITS.indexOf(d))).replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
const PHONE = /^(05\d{8}|\+9665\d{8})$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Strip spaces/dashes and fold 00966 / 966 prefixes into +966. */
export function normPhone(raw) {
  let v = latin(raw).replace(/[\s\-().\u200E\u200F\u202A-\u202C]/g, '');
  if (v.startsWith('00966')) v = '+966' + v.slice(5);
  else if (v.startsWith('966')) v = '+' + v;
  return v;
}
const MAX_BYTES = 10 * 1024 * 1024;
const EXT = ['pdf', 'jpg', 'jpeg', 'png', 'dwg'];

export function formatBytes(n) {
  return n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export function setErr(ctl, msg, id) {
  const el = document.getElementById((id || ctl.id) + '-err');
  if (el) el.textContent = msg;
  if (ctl.matches?.('input, select, textarea')) {
    if (msg) ctl.setAttribute('aria-invalid', 'true');
    else ctl.removeAttribute('aria-invalid');
  }
}

/** Returns an error message, or '' if the control is valid. */
export function check(ctl) {
  const type = ctl.type;
  if (type === 'checkbox') return ctl.required && !ctl.checked ? t('يرجى الموافقة للمتابعة.', 'Please agree to continue.') : '';
  if (type === 'file') {
    const f = ctl.files && ctl.files[0];
    if (!f) return '';
    const ext = f.name.split('.').pop().toLowerCase();
    const allowed = (ctl.accept || '').split(',').map((x) => x.trim().replace('.', '')).filter(Boolean);
    if (!(allowed.length ? allowed : EXT).includes(ext)) return t('نوع الملف غير مدعوم.', 'This file type is not supported.');
    if (f.size > MAX_BYTES) return t('حجم الملف يتجاوز 10 ميجابايت.', 'The file is larger than 10 MB.');
    return '';
  }
  let v = ctl.value.trim();
  if (!v) return ctl.required ? (ctl.tagName === 'SELECT' ? t('يرجى الاختيار.', 'Please choose an option.') : t('هذا الحقل مطلوب.', 'This field is required.')) : '';
  const rule = ctl.dataset.rule;
  if (rule === 'phone') {
    v = normPhone(v);
    return PHONE.test(v) ? '' : t('أدخل رقم جوال سعودي صحيح، مثل 0501234567 أو \u200E+966501234567.', 'Enter a valid Saudi mobile number, like 0501234567 or +966501234567.');
  }
  if (rule === 'email') return EMAIL.test(v) ? '' : t('أدخل بريداً إلكترونياً صحيحاً.', 'Enter a valid email address.');
  if (rule === 'area') { const n = Number(latin(v).replace(/[,٫،]/g, '.')); return Number.isFinite(n) && n > 0 && n <= 5000000 ? '' : t('أدخل مساحة صحيحة أكبر من صفر.', 'Enter a valid area greater than zero.'); }
  if (rule === 'exp') { const n = Number(latin(v).replace(/[,٫،]/g, '.')); return Number.isFinite(n) && n >= 0 && n <= 50 ? '' : t('أدخل عدد سنوات بين 0 و50.', 'Enter a number of years between 0 and 50.'); }
  return '';
}

function checkGroup(group) {
  const radios = [...group.querySelectorAll('input[type=radio]')];
  return radios.some((r) => r.checked) ? '' : t('يرجى اختيار نوع المشروع.', 'Please choose a project type.');
}

/** Validate every control in scope, show errors, return the first invalid element. */
export function validateScope(scope) {
  let first = null;
  scope.querySelectorAll('[data-radio-group]').forEach((g) => {
    const m = checkGroup(g);
    const err = g.closest('.field').querySelector('.err');
    err.textContent = m;
    if (m && !first) first = g.querySelector('input');
  });
  scope.querySelectorAll('input:not([type=radio]), select, textarea').forEach((c) => {
    if (!c.id) return;
    const m = check(c);
    setErr(c, m);
    if (m && !first) first = c;
  });
  return first;
}

/** Re-validate a control as the user fixes it. */
export function liveClear(form) {
  const handler = (e) => {
    const c = e.target;
    if (!c.matches('input, select, textarea')) return;
    if (c.type === 'radio') { const g = c.closest('[data-radio-group]'); if (g) g.closest('.field').querySelector('.err').textContent = ''; return; }
    if (!c.id) return;
    const had = c.getAttribute('aria-invalid') === 'true';
    if (e.type === 'input' && !had) return;
    if (c.type !== 'file') setErr(c, e.type === 'blur' || had ? check(c) : '');
  };
  form.addEventListener('input', handler);
  form.addEventListener('change', handler);
  form.addEventListener('focusout', (e) => { if (e.target.value !== undefined && e.target.type !== 'file' && e.target.matches?.('input, select, textarea') && e.target.value.trim()) handler({ target: e.target, type: 'blur' }); });
}

/** Show name and size of the chosen file (client-side only). */
export function bindFiles(form) {
  form.querySelectorAll('input[type=file]').forEach((inp) => {
    const info = document.getElementById(inp.id + '-info');
    inp.addEventListener('change', () => {
      const m = check(inp);
      setErr(inp, m);
      const f = inp.files[0];
      if (m) { inp.value = ''; if (info) info.textContent = ''; return; }
      if (info) info.textContent = f ? `${f.name} · ${formatBytes(f.size)}` : '';
    });
  });
}
