// @ts-check

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

export default defineConfig({
  site: env.DEV ? 'http://localhost:4321' : 'https://lp.memot.app',
  integrations: [
    sitemap(),
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
