import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [svelte()],
  test: {
    environment: 'jsdom',
    include: ['packages/ui/tests/**/*.test.ts'],
    passWithNoTests: true,
    coverage: {
      provider: 'v8'
    }
  }
});
