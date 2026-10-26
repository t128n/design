import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'bun:test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('standard layouts are token-driven CSS grids', async () => {
  const css = await readFile(path.join(root, 'layouts.css'), 'utf8');

  for (const className of [
    '.t128n-page',
    '.t128n-app-shell',
    '.t128n-register',
    '.t128n-split',
    '.t128n-record',
    '.t128n-form-grid',
    '.t128n-stack',
    '.t128n-cluster',
  ]) {
    assert.ok(css.includes(className), `layouts.css is missing ${className}`);
  }

  for (const fragment of [
    'grid-template-columns: 220px minmax(0, 1fr)',
    'grid-template-areas:',
    "'header'",
    'repeat(auto-fit, minmax(220px, 1fr))',
    '@media (max-width: 800px)',
    'var(--space-md)',
    'var(--color-border)',
  ]) {
    assert.ok(css.includes(fragment), `layouts.css is missing ${fragment}`);
  }

  assert.match(css, /t128n-app-shell__nav/);
  assert.match(css, /t128n-record__meta/);
  assert.match(css, /t128n-form-grid__wide/);
});
