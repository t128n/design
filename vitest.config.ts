import { svelte } from '@sveltejs/vite-plugin-svelte';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    conditions: ['browser']
  },
  plugins: [svelte(), Icons({ compiler: 'svelte' })],
  test: {
    environment: 'jsdom',
    include: ['packages/ui/tests/**/*.test.ts'],
    setupFiles: ['packages/ui/tests/setup.ts'],
    passWithNoTests: true,
    server: {
      deps: {
        inline: ['bits-ui', 'runed']
      }
    },
    coverage: {
      provider: 'v8'
    }
  }
});
