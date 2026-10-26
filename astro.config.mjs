import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://toolkitlab.xyz',
  // Emit name.html files, so every existing .html link keeps working.
  build: { format: 'file' }
});
