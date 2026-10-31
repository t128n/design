import { svelte } from '@sveltejs/vite-plugin-svelte';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

// Runtime dependencies stay external so consumers install them (and dedupe their
// own copies) instead of receiving duplicates inside the library bundle. Icons from
// `unplugin-icons` are compiled to components at build time and stay bundled.
const external = [
  /^svelte($|\/)/,
  /^bits-ui($|\/)/,
  /^runed($|\/)/,
  /^@internationalized\/date($|\/)/,
  /^carbon-icons-svelte($|\/)/
];

export default defineConfig({
  plugins: [svelte(), Icons({ compiler: 'svelte' })],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external
    }
  }
});
