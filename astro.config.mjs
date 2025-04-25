import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  integrations: [icon()],
  vite: {
    build: {
      assetsInlineLimit: 0
    }
  }
});