import { svelte } from '@sveltejs/vite-plugin-svelte';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [svelte(), Icons({ compiler: 'svelte' })],
  test: {
    environment: 'jsdom',
    include: ['packages/ui/tests/**/*.test.ts'],
    passWithNoTests: true,
    server: {
      deps: {
        inline: ['bits-ui']
      }
    },
    coverage: {
      provider: 'v8'
    }
  }
});
