import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { build } from 'vite';

const root = join(import.meta.dir, '..');
const fixture = join(root, 'fixtures/consumer');

const failures: string[] = [];
const check = (condition: boolean, message: string) => {
  if (!condition) failures.push(message);
};

// 1. Strict TypeScript consumer: resolves `types` and re-exported Svelte components.
const tsc = spawnSync('bunx', ['tsc', '--project', join(fixture, 'tsconfig.json'), '--noEmit'], {
  cwd: root,
  stdio: 'inherit'
});

check(tsc.status === 0, 'strict TypeScript consumer fixture failed to compile');

const external = [
  /^svelte($|\/)/,
  /^bits-ui($|\/)/,
  /^runed($|\/)/,
  /^@internationalized\/date($|\/)/,
  /^carbon-icons-svelte($|\/)/
];

const buildEntry = async (entry: string, outDir: string) => {
  await build({
    root: fixture,
    configFile: false,
    base: './',
    logLevel: 'silent',
    build: {
      outDir,
      emptyOutDir: true,
      minify: false,
      assetsInlineLimit: 0,
      cssCodeSplit: false,
      modulePreload: false,
      rollupOptions: {
        input: join(fixture, entry),
        external,
        preserveEntrySignatures: 'strict',
        output: {
          format: 'es',
          entryFileNames: 'bundle.js',
          chunkFileNames: 'chunks/[name]-[hash].js',
          assetFileNames: (asset) =>
            asset.names?.some((name) => name.endsWith('.css'))
              ? 'bundle.css'
              : 'assets/[name]-[hash][extname]'
        }
      }
    }
  });

  const files = await readdir(outDir);
  const jsFile = files.find((file) => file === 'bundle.js');
  const cssFile = files.find((file) => file === 'bundle.css');

  if (!jsFile || !cssFile) {
    throw new Error(`consumer build ${entry} did not emit JS and CSS`);
  }

  return {
    js: await readFile(join(outDir, jsFile), 'utf8'),
    css: await readFile(join(outDir, cssFile), 'utf8'),
    fontAssets: await readdir(join(outDir, 'assets')).catch(() => [] as string[])
  };
};

const workspace = await mkdtemp(join(tmpdir(), 't128n-ui-consumer-'));

try {
  const buttonOnly = await buildEntry('src/button-only.ts', join(workspace, 'button-only'));
  const many = await buildEntry('src/many.ts', join(workspace, 'many'));

  const buttonSize = Buffer.byteLength(buttonOnly.js);
  const manySize = Buffer.byteLength(many.js);

  console.log(`  button-only bundle ${buttonSize.toLocaleString('en-US')} bytes`);
  console.log(`  eight-component bundle ${manySize.toLocaleString('en-US')} bytes`);
  console.log(`  consumer font assets ${buttonOnly.fontAssets.length} files`);

  // 2. Tree-shaking: importing one component must not pull in the rest of the library.
  check(
    buttonSize < manySize * 0.5,
    `tree-shaking failed: one component bundled ${buttonSize} bytes vs ${manySize} for eight`
  );
  check(
    !buttonOnly.js.includes('Close dialog'),
    'tree-shaking failed: Dialog code leaked into the Button-only bundle'
  );
  check(many.js.includes('Close dialog'), 'Dialog code missing from the eight-component bundle');

  // 3. The stylesheet import survives a consumer build with token and font markers.
  for (const marker of [
    '--color-canvas',
    '@font-face',
    'IBM Plex Sans',
    ':focus-visible',
    'prefers-reduced-motion'
  ]) {
    check(buttonOnly.css.includes(marker), `consumer CSS is missing marker "${marker}"`);
  }

  // 4. Fonts are copied as assets and referenced relatively instead of inlined.
  check(!buttonOnly.css.includes('data:font'), 'consumer CSS inlined font data URLs');
  check(
    /url\(\.\/assets\/[^)]+\.woff2\)/.test(buttonOnly.css),
    'consumer CSS does not reference emitted woff2 assets relatively'
  );
  check(
    buttonOnly.fontAssets.some(
      (file) => file.startsWith('ibm-plex-sans-') && file.endsWith('.woff2')
    ),
    'consumer build did not copy IBM Plex Sans woff2 assets'
  );
  check(
    buttonOnly.fontAssets.some(
      (file) => file.startsWith('ibm-plex-mono-') && file.endsWith('.woff2')
    ),
    'consumer build did not copy IBM Plex Mono woff2 assets'
  );
} finally {
  await rm(workspace, { recursive: true, force: true });
}

if (failures.length > 0) {
  console.error('\nconsumer verification failed:');
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(
  'consumer verification passed: strict TS entrypoints, tree-shaking, stylesheet tokens, font assets'
);
