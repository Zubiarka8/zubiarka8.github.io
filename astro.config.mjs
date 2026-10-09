import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://zubiarka8.github.io',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), sitemap({
    filter: (page) => page !== 'https://zubiarka8.github.io/',
    i18n: { defaultLocale: 'es', locales: { es: 'es', en: 'en' } },
  })],
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: true },
  },
  vite: { plugins: [tailwindcss()] },
});
