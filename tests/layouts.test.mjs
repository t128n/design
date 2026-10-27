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
    '.t128n-table-scroll',
    '.t128n-table-scroll--pin-first',
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
    '@media (min-width: 1024px)',
    '@media (min-width: 800px)',
    '@media (min-width: 640px)',
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
    /@media \(min-width: 1024px\) \{\s*\.t128n-grid--3 \{\s*--t128n-columns: 3;/,
  );
  assert.match(
    css,
    /@media \(min-width: 800px\) \{[\s\S]*?\.t128n-grid--2 \{\s*--t128n-columns: 2;/,
  );
  assert.match(
    css,
    /@media \(min-width: 640px\) \{[\s\S]*?\.t128n-grid--3 \{\s*--t128n-columns: 2;/,
  );
});

test('layouts are mobile-first', async () => {
  const css = await readFile(path.join(root, 'layouts.css'), 'utf8');
  assert.doesNotMatch(css, /@media \(max-width/);
  assert.match(css, /@media \(min-width: 640px\)[\s\S]*?\.t128n-grid--3 \{\s*--t128n-columns: 2;/);
  assert.match(css, /@media \(min-width: 800px\)[\s\S]*?\.t128n-grid--2 \{\s*--t128n-columns: 2;/);
  assert.match(css, /@media \(min-width: 1024px\)[\s\S]*?\.t128n-grid--3 \{\s*--t128n-columns: 3;/);
  assert.match(css, /\.t128n-table-scroll[^}]*overflow-x: auto/);
  assert.match(css, /\.t128n-table-scroll--pin-first[\s\S]*?position: sticky/);
});

test('page gutters are mobile-first with safe areas', async () => {
  const css = await readFile(path.join(root, 'layouts.css'), 'utf8');

  assert.match(
    css,
    /\.t128n-page \{[\s\S]*?max-width: calc\(1120px \+ 2 \* var\(--space-3xl\)\)/,
  );
  assert.match(
    css,
    /\.t128n-page \{[\s\S]*?padding-inline: max\(var\(--space-xl\), env\(safe-area-inset-left\)\) max\(var\(--space-xl\), env\(safe-area-inset-right\)\);/,
  );
  assert.match(
    css,
    /@media \(min-width: 800px\)[\s\S]*?\.t128n-page \{[\s\S]*?padding-inline: max\(var\(--space-3xl\), env\(safe-area-inset-left\)\) max\(var\(--space-3xl\), env\(safe-area-inset-right\)\);/,
  );
  assert.doesNotMatch(
    css,
    /\.t128n-page \{[\s\S]*?padding-inline: var\(--space-(?:xl|3xl)\);/,
    'page gutters must keep safe-area insets at every breakpoint',
  );
});

test('page skeletons stack at the phone base', async () => {
  const css = await readFile(path.join(root, 'layouts.css'), 'utf8');

  assert.match(
    css,
    /\.t128n-app-shell \{[\s\S]*?grid-template-columns: minmax\(0, 1fr\);[\s\S]*?grid-template-areas:\s*'header'\s*'main'\s*'nav';/,
  );
  assert.match(css, /min-height: 100vh;\s*min-height: 100dvh;/);
  assert.match(css, /\.t128n-split \{[\s\S]*?grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(
    css,
    /\.t128n-record \{[\s\S]*?grid-template-areas:\s*'meta'\s*'body';/,
  );
  assert.match(
    css,
    /\.t128n-form-grid \{[\s\S]*?grid-template-columns: minmax\(0, 1fr\);/,
  );
  assert.match(
    css,
    /@media \(min-width: 800px\)[\s\S]*?repeat\(auto-fit, minmax\(220px, 1fr\)\)/,
  );
  assert.match(
    css,
    /@media \(min-width: 800px\)[\s\S]*?\.t128n-app-shell \{[\s\S]*?grid-template-areas:\s*'header header'\s*'nav main';/,
  );
});

test('tables scroll horizontally with a readable pinned first column', async () => {
  const css = await readFile(path.join(root, 'layouts.css'), 'utf8');

  assert.match(
    css,
    /\.t128n-table-scroll \{[\s\S]*?--t128n-table-min: 44rem;/,
  );
  assert.match(css, /\.t128n-table-scroll \{[\s\S]*?overscroll-behavior-x: contain;/);
  assert.match(
    css,
    /\.t128n-table-scroll--pin-first > table > \* > tr > :first-child \{[\s\S]*?position: sticky;[\s\S]*?background: var\(--color-surface\);/,
  );
  assert.match(
    css,
    /@media \(min-width: 800px\)[\s\S]*?\.t128n-table-scroll--pin-first[\s\S]*?position: static;/,
  );
  assert.doesNotMatch(css, /box-shadow|linear-gradient|radial-gradient|backdrop-filter/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b/i);
});
