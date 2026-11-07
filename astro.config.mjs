import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ex-vigilante.github.io',
  base: '/rikaz-contracting',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/rikaz-contracting\/?$/.test(page),
      i18n: { defaultLocale: 'ar', locales: { ar: 'ar-SA', en: 'en-US' } },
    }),
  ],
});
