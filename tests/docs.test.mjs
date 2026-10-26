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
  assert.ok(/^## \[?0\.1\.0\]?/m.test(changelog), 'CHANGELOG does not start at 0.1.0');
});
