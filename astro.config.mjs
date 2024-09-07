import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

import svelte from '@astrojs/svelte';

export default defineConfig({
  output: 'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [tailwind(), svelte()],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});