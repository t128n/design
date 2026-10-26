import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
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
    'Dark mode',
    'Adopting in an app',
    'Versioning',
    'Enforcement',
    'Contributing',
  ]) {
    assert.match(readme, new RegExp(`^## ${heading}$`, 'm'), `README is missing the ${heading} section`);
  }

  for (const command of [
    'npm ci',
    'npm test',
    'npm run check',
    'npm run build',
    'designmd lint DESIGN.md',
  ]) {
    assert.ok(readme.includes(command), `README does not document ${command}`);
  }

  for (const link of [
    '[DESIGN.md](DESIGN.md)',
    '[app-profile.template.md](app-profile.template.md)',
    '[specimen.html](specimen.html)',
    '[dist/tokens.css](dist/tokens.css)',
  ]) {
    assert.ok(readme.includes(link), `README does not link ${link}`);
  }

  assert.ok(readme.includes('Application Profile'), 'README does not mention the Application Profile');
  assert.ok(readme.includes('data-theme'), 'README does not explain data-theme');
  assert.match(readme, /prefers-color-scheme/, 'README does not explain the media-query fallback');
  assert.match(readme, /pin a commit/i, 'README does not say to pin a commit');
  assert.match(readme, /never fork/i, 'README does not say to never fork values');
  assert.match(readme, /no npm publish|not published/i, 'README does not record the no-publish scope');

  const changelog = await readText('CHANGELOG.md');
  assert.match(changelog, /^#\s*Changelog\s*$/m);
  assert.ok(/^## \[?0\.1\.0\]?/m.test(changelog), 'CHANGELOG does not start at 0.1.0');
});
