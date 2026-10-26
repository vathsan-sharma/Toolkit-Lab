import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.toolkitlab.xyz',
  // Emit name.html files, so every existing .html link keeps working.
  build: { format: 'file' },
  integrations: [sitemap()]
});
