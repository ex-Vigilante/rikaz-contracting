// @ts-nocheck
/* Lightbox on native <dialog>: modal focus trap + Esc come from the platform */
const dlg = document.querySelector('[data-lightbox]');
const thumbs = [...document.querySelectorAll('[data-lb]')];
if (dlg && thumbs.length) {
  const img = dlg.querySelector('[data-lb-img]');
  const cap = dlg.querySelector('[data-lb-cap]');
  const count = dlg.querySelector('[data-lb-count]');
  const rtl = document.documentElement.dir === 'rtl';
  let i = 0;
  const show = (n) => {
    i = (n + thumbs.length) % thumbs.length;
    const b = thumbs[i];
    img.src = b.dataset.full;
    img.alt = b.dataset.alt;
    cap.textContent = b.dataset.alt;
    count.textContent = `${i + 1} / ${thumbs.length}`;
  };
  thumbs.forEach((b, n) => b.addEventListener('click', () => { show(n); dlg.showModal(); dlg.querySelector('[data-lb-close]').focus(); }));
  dlg.querySelector('[data-lb-close]').addEventListener('click', () => dlg.close());
  dlg.querySelector('[data-lb-prev]').addEventListener('click', () => show(i - 1));
  dlg.querySelector('[data-lb-next]').addEventListener('click', () => show(i + 1));
  dlg.addEventListener('keydown', (e) => {
    // Visual arrows follow reading direction: in RTL the right key goes to the previous image.
    if (e.key === 'ArrowRight') { e.preventDefault(); show(rtl ? i - 1 : i + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); show(rtl ? i + 1 : i - 1); }
  });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
}

/* Before / after slider */
document.querySelectorAll('[data-ba]').forEach((ba) => {
  const range = ba.querySelector('.ba-range');
  const set = () => {
    ba.style.setProperty('--pos', range.value + '%');
    range.setAttribute('aria-valuetext', range.value + '%');
  };
  range.addEventListener('input', set);
  set();
});
