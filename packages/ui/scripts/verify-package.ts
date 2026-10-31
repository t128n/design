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

for (const dependency of ['bits-ui', 'carbon-icons-svelte']) {
  check(
    new RegExp(`from ["']${dependency}`).test(js),
    `dist/index.js does not import "${dependency}" as an external dependency`
  );
}

for (const dependency of ['bits-ui', 'runed', '@internationalized/date', 'carbon-icons-svelte']) {
  check(
    typeof packageJson.dependencies?.[dependency] === 'string',
    `package.json must declare "${dependency}" as a runtime dependency`
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
