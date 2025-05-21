import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

import favicons from 'astro-favicons';

export default defineConfig({
  integrations: [icon(), sitemap(), favicons()],
  vite: {
    build: {
      assetsInlineLimit: 0
    }
  }
});