import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'bun:test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function readText(file) {
  return readFile(path.join(root, file), 'utf8');
}

test('docs describe the system', async () => {
  const readme = await readText('README.md');

  for (const heading of [
    'Purpose',
    'Repository layout',
    'Quick start',
    'Using the tokens',
    'Layouts',
    'Preview',
    'Dark mode',
    'Adopting in an app',
    'Versioning',
    'Enforcement',
    'Contributing',
  ]) {
    assert.match(readme, new RegExp(`^## ${heading}$`, 'm'), `README is missing the ${heading} section`);
  }

  for (const command of [
    'bun install',
    'bun test',
    'bun run check',
    'bun run build',
    'bun run lint',
    'bun run preview:dev',
    'bun run preview:build',
  ]) {
    assert.ok(readme.includes(command), `README does not document ${command}`);
  }

  for (const link of [
    '[DESIGN.md](DESIGN.md)',
    '[layouts.css](layouts.css)',
    '[preview/pages/](preview/pages/)',
    '[preview](preview/)',
    '[dist/tokens.css](dist/tokens.css)',
  ]) {
    assert.ok(readme.includes(link), `README does not link ${link}`);
  }

  for (const variable of [
    '--color-<name>',
    '--font-<type>',
    '--text-<type>-size',
    '--space-<name>',
    '--radius-<name>',
  ]) {
    assert.ok(readme.includes(variable), `README does not document ${variable}`);
  }

  assert.ok(readme.includes('data-theme'), 'README does not explain data-theme');
  assert.match(readme, /prefers-color-scheme/, 'README does not explain the media-query fallback');
  assert.match(readme, /pin a commit/i, 'README does not say to pin a commit');
  assert.ok(
    readme.includes('https://t128n.github.io/design/'),
    'README does not link the Pages preview',
  );

  const changelog = await readText('CHANGELOG.md');
  assert.match(changelog, /^#\s*Changelog\s*$/m);
  assert.ok(/^## \[?0\.1\.0\]?/m.test(changelog), 'CHANGELOG does not contain the 0.1.0 release');
});

test('docs describe mobile-first behavior', async () => {
  const readme = await readText('README.md');
  const layouts = readme.match(/^## Layouts\n([\s\S]*?)(?=^## )/m);
  assert.ok(layouts, 'README is missing the Layouts section');
  assert.match(layouts[1], /^### Mobile$/m, '### Mobile is not under ## Layouts');
  assert.doesNotMatch(readme, /^## Mobile$/m, 'README adds a ## Mobile heading');

  const mobile = layouts[1].slice(layouts[1].indexOf('### Mobile'));
  for (const text of ['mobile-first', '44px', '16px', '640px', '800px', '1024px', 'safe-area', 't128n-table-scroll', '--space-touch']) {
    assert.ok(mobile.includes(text), `README's Mobile section is missing ${text}`);
  }

  const ladder = mobile.match(/`min-width` values at `(\d+)px`, `(\d+)px`, and `(\d+)px`/);
  assert.ok(ladder, 'README does not state the min-width breakpoint ladder');
  const breakpoints = (css) => [...new Set([...css.matchAll(/@media \(min-width: (\d+)px\)/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
  const [layoutsCss, previewCss] = await Promise.all([
    readText('layouts.css'),
    readText('preview/src/app.css'),
  ]);
  const documented = ladder.slice(1).map(Number);
  assert.deepEqual(documented, breakpoints(layoutsCss), 'README breakpoints do not match layouts.css');
  for (const width of breakpoints(previewCss)) {
    assert.ok(documented.includes(width), `README does not document the preview ${width}px breakpoint`);
  }

  const changelog = await readText('CHANGELOG.md');
  const unreleased = changelog.indexOf('## [Unreleased]');
  const release = changelog.indexOf('## [0.1.0]');
  assert.ok(unreleased >= 0, 'CHANGELOG is missing ## [Unreleased]');
  assert.match(changelog, /^## \[Unreleased\]$/m, 'CHANGELOG is missing an Unreleased section');
  assert.ok(unreleased < release, '## [Unreleased] must precede ## [0.1.0]');
  const versions = [...changelog.matchAll(/^## \[([^\]]+)\]/gm)].map((m) => m[1]);
  assert.deepEqual(versions, ['Unreleased', '0.1.0'], 'CHANGELOG claims an unreleased version');
});
