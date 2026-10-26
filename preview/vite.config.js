import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { layouts } from './src/pages/layouts.js';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root,
  base: './',
  plugins: [svelte()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: [
        resolve(root, 'index.html'),
        resolve(root, 'pages/index.html'),
        ...layouts.map((layout) =>
          resolve(root, 'pages', layout.slug, 'index.html'),
        ),
      ],
    },
  },
});
