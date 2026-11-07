export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };

/** Pick the right plural form for the language (Arabic has zero/one/two/few/many/other). */
export function plural(lang: string, n: number, forms: PluralForms): string {
  const rule = new Intl.PluralRules(lang).select(n);
  return (forms[rule] ?? forms.other).replace('{n}', String(n));
}

export const monthForms = {
  ar: { one: 'شهر واحد', two: 'شهران', few: '{n} أشهر', many: '{n} شهراً', other: '{n} شهر' } as PluralForms,
  en: { one: '{n} month', other: '{n} months' } as PluralForms,
};
