import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

import svelte from '@astrojs/svelte';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare(),
  integrations: [tailwind(), svelte()],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});