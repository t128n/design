import { spawnSync } from 'node:child_process';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const root = join(import.meta.dir, '..');
const dist = join(root, 'dist');
const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));

// Budget for the bundled ES entry after runtime dependencies are externalized.
// Keep roughly 20% headroom over the current build so small additions do not
// need a budget bump while accidental dependency inlining fails loudly.
const BUNDLE_BUDGET_BYTES = 300_000;

// Font files are emitted as assets instead of base64, so the stylesheet should
// stay close to its 100 kB of tokens, font-face rules, and component styles.
const CSS_BUDGET_BYTES = 200_000;

const failures: string[] = [];
const notes: string[] = [];

const check = (condition: boolean, message: string) => {
  if (!condition) failures.push(message);
};

const exists = async (path: string) => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

const css = await readFile(join(dist, 'index.css'), 'utf8');
const js = await readFile(join(dist, 'index.js'), 'utf8');
const declarations = await readFile(join(dist, 'index.d.ts'), 'utf8').catch(() => '');
const sourceIndex = await readFile(join(root, 'src/index.ts'), 'utf8');

for (const entry of ['index.js', 'index.css', 'index.d.ts']) {
  check(await exists(join(dist, entry)), `missing declared entrypoint dist/${entry}`);
}

for (const marker of [
  '--color-canvas',
  '@font-face',
  'IBM Plex Sans',
  ':focus-visible',
  'prefers-reduced-motion'
]) {
  check(css.includes(marker), `dist/index.css is missing marker "${marker}"`);
}

const componentExports = [
  ...sourceIndex.matchAll(/export \{ default as (\w+) \} from '\.\/lib\/([\w]+)\.svelte'/g)
].map((match) => ({ name: match[1], file: match[2] }));

check(componentExports.length > 0, 'src/index.ts exposes no component exports');

for (const { name, file } of componentExports) {
  check(
    declarations.includes(`export { default as ${name} } from './lib/${file}.svelte'`),
    `dist/index.d.ts does not re-export ${name}`
  );
  check(
    await exists(join(dist, 'lib', `${file}.svelte.d.ts`)),
    `missing declaration dist/lib/${file}.svelte.d.ts`
  );
}

for (const typeName of ['TextVariant', 'TextTone', 'Space', 'LayoutTag']) {
  check(declarations.includes(typeName), `dist/index.d.ts does not export type ${typeName}`);
}

check(
  packageJson.exports?.['.']?.types === './dist/index.d.ts',
  'package.json "." types export must point at dist/index.d.ts'
);
check(
  packageJson.exports?.['./styles'] === './dist/index.css',
  'package.json "./styles" export must point at dist/index.css'
);
check(
  packageJson.exports?.['./package.json'] === './package.json',
  'package.json must export "./package.json"'
);

const jsSize = Buffer.byteLength(js);
const cssSize = Buffer.byteLength(css);
notes.push(`dist/index.js ${jsSize.toLocaleString('en-US')} bytes`);
notes.push(`dist/index.css ${cssSize.toLocaleString('en-US')} bytes`);

check(
  jsSize <= BUNDLE_BUDGET_BYTES,
  `dist/index.js is ${jsSize} bytes, over the ${BUNDLE_BUDGET_BYTES} byte budget`
);
check(
  cssSize <= CSS_BUDGET_BYTES,
  `dist/index.css is ${cssSize} bytes, over the ${CSS_BUDGET_BYTES} byte budget`
);

// Fonts must stay external files referenced relatively; base64 would bloat CSS.
check(!css.includes('data:font'), 'dist/index.css inlined font data URLs');
check(
  /url\(\.\/assets\/[^)]+\.woff2\)/.test(css),
  'dist/index.css does not reference emitted woff2 assets relatively'
);

const fontAssets = (await readdir(join(dist, 'assets')).catch(() => [])) as string[];
const sansFonts = fontAssets.filter(
  (file) => file.startsWith('ibm-plex-sans-') && file.endsWith('.woff2')
);
const monoFonts = fontAssets.filter(
  (file) => file.startsWith('ibm-plex-mono-') && file.endsWith('.woff2')
);

check(sansFonts.length > 0, 'dist/assets has no IBM Plex Sans woff2 files');
check(monoFonts.length > 0, 'dist/assets has no IBM Plex Mono woff2 files');
notes.push(`dist/assets ${fontAssets.length} files (${sansFonts.length} sans woff2, ${monoFonts.length} mono woff2)`);

check(
  /from\s*["']bits-ui/.test(js),
  'dist/index.js does not import "bits-ui" as an external dependency'
);

for (const dependency of ['bits-ui', 'runed', '@internationalized/date']) {
  check(
    typeof packageJson.dependencies?.[dependency] === 'string',
    `package.json must declare "${dependency}" as a runtime dependency`
  );
}

// `carbon-icons-svelte` is being migrated to unplugin-icons. Until the last
// legacy import is removed, any remaining import must stay external and declared;
// once it disappears from the bundle and package.json, verification still passes.
if (/from\s*["']carbon-icons-svelte/.test(js)) {
  check(
    typeof packageJson.dependencies?.['carbon-icons-svelte'] === 'string',
    'dist/index.js imports "carbon-icons-svelte" but package.json does not declare it'
  );
}

const pack = spawnSync(process.execPath, ['pm', 'pack', '--dry-run'], {
  cwd: root,
  encoding: 'utf8'
});

const packOutput = `${pack.stdout ?? ''}${pack.stderr ?? ''}`;

check(pack.status === 0, '`bun pm pack --dry-run` failed');
for (const entry of ['dist/index.js', 'dist/index.css', 'dist/index.d.ts', 'README.md']) {
  check(packOutput.includes(entry), `tarball is missing ${entry}`);
}
check(packOutput.includes('dist/assets/ibm-plex-sans-'), 'tarball is missing IBM Plex Sans font assets');
check(packOutput.includes('dist/assets/ibm-plex-mono-'), 'tarball is missing IBM Plex Mono font assets');
check(packOutput.includes('.woff2'), 'tarball is missing woff2 font files');
check(!packOutput.includes('dist/src/'), 'tarball unexpectedly contains package sources');
check(!packOutput.includes('tests/'), 'tarball unexpectedly contains tests');

const libDeclarations = await readdir(join(dist, 'lib'));
check(libDeclarations.length > 0, 'dist/lib has no declaration files');

for (const note of notes) console.log(`  ${note}`);

if (failures.length > 0) {
  console.error('\npackage verification failed:');
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(
  `package verification passed: ${componentExports.length} components, stylesheet markers, declarations, pack contents`
);
