export const locales = ['ar', 'en'] as const;
export type Lang = (typeof locales)[number];
export type Bi<T = string> = { ar: T; en: T };

export const base: string = import.meta.env.BASE_URL.replace(/\/$/, '');
export const SITE = 'https://ex-vigilante.github.io';

/** Internal link that respects the GitHub Pages base path. */
export function href(lang: Lang, path = ''): string {
  return `${base}/${lang}/${path}`.replace(/([^:])\/{2,}/g, '$1/');
}
/** Asset in /public that respects the base path. */
export function asset(path: string): string {
  return `${base}/${path.replace(/^\//, '')}`;
}
export function other(lang: Lang): Lang {
  return lang === 'ar' ? 'en' : 'ar';
}
export function pick<T>(v: Bi<T>, lang: Lang): T {
  return v[lang];
}
export function tr(lang: Lang) {
  return (ar: string, en: string) => (lang === 'ar' ? ar : en);
}
export function dir(lang: Lang) {
  return lang === 'ar' ? 'rtl' : 'ltr';
}
/** Western digits for both languages keeps the engineering look consistent. */
export const nf = (n: number) => new Intl.NumberFormat('en-US').format(n);

export function staticLangPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

export const nav = [
  { key: '', ar: 'الرئيسية', en: 'Home' },
  { key: 'about/', ar: 'من نحن', en: 'About' },
  { key: 'services/', ar: 'خدماتنا', en: 'Services' },
  { key: 'projects/', ar: 'مشاريعنا', en: 'Projects' },
  { key: 'careers/', ar: 'الوظائف', en: 'Careers' },
  { key: 'contact/', ar: 'تواصل معنا', en: 'Contact' },
] as const;
