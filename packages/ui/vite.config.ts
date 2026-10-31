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
  // Relative asset and stylesheet URLs keep the package portable when consumed
  // from node_modules or a local tarball.
  base: './',
  plugins: [svelte(), Icons({ compiler: 'svelte' })],
  build: {
    // Vite's `build.lib` mode always inlines assets, which would turn every
    // Fontsource woff/woff2 file into base64 inside index.css. Emit the same
    // single ES entry as a regular build instead so font assets become files.
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    modulePreload: false,
    rollupOptions: {
      input: 'src/index.ts',
      external,
      preserveEntrySignatures: 'strict',
      output: {
        format: 'es',
        entryFileNames: 'index.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: (asset) =>
          asset.names?.some((name) => name.endsWith('.css'))
            ? 'index.css'
            : 'assets/[name]-[hash][extname]'
      }
    }
  }
});
