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
    '.t128n-grid',
    '.t128n-grid--1',
    '.t128n-grid--2',
    '.t128n-grid--3',
    '.t128n-grid__full',
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
    '--t128n-columns: 1',
    '--t128n-gap: var(--space-md)',
    'repeat(var(--t128n-columns), minmax(0, 1fr))',
    'grid-column: 1 / -1',
    'grid-template-columns: 220px minmax(0, 1fr)',
    'grid-template-areas:',
    "'header'",
    'repeat(auto-fit, minmax(220px, 1fr))',
    '@media (max-width: 1024px)',
    '@media (max-width: 800px)',
    '@media (max-width: 640px)',
    'var(--space-md)',
    'var(--color-border)',
  ]) {
    assert.ok(css.includes(fragment), `layouts.css is missing ${fragment}`);
  }

  assert.match(css, /t128n-app-shell__nav/);
  assert.match(css, /t128n-record__meta/);
  assert.match(css, /t128n-form-grid__wide/);
  assert.match(
    css,
    /@media \(max-width: 1024px\) \{\s*\.t128n-grid--3 \{\s*--t128n-columns: 2;/,
  );
  assert.match(
    css,
    /@media \(max-width: 800px\) \{[\s\S]*?\.t128n-grid--2 \{\s*--t128n-columns: 1;/,
  );
  assert.match(
    css,
    /@media \(max-width: 640px\) \{\s*\.t128n-grid--3 \{\s*--t128n-columns: 1;/,
  );
});
