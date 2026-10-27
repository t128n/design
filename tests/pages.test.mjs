import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { test } from 'bun:test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { indexPage, layouts } from '../preview/src/pages/layouts.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function readText(file) {
  return readFile(path.join(root, file), 'utf8');
}

test('layout pages cover every standard grid and template', async () => {
  assert.equal(layouts.length, 11);
  assert.equal(new Set(layouts.map((layout) => layout.slug)).size, 11);
  assert.equal(indexPage.id, 'index');

  const page = await readText('preview/src/pages/Page.svelte');
  for (const grid of [
    't128n-grid--1',
    't128n-grid--2',
    't128n-grid--3',
    't128n-app-shell',
    't128n-split',
    't128n-record',
    't128n-register',
    't128n-form-grid',
    't128n-stack',
  ]) {
    assert.ok(page.includes(grid), `Page.svelte is missing ${grid}`);
  }

  const shell = await readText('preview/src/pages/PageShell.svelte');
  assert.match(shell, /aria-current=/);
  assert.match(shell, /ThemeSwitch/);
  assert.match(shell, /t128n-page/);

  const css = await readText('preview/src/pages/pages.css');
  assert.match(css, /\.sketch-region/);
  assert.match(css, /\.layout-nav/);
  assert.match(css, /\.layout-card/);

  const config = await readText('preview/vite.config.js');
  assert.match(config, /pages\/index\.html/);
  assert.match(config, /layouts\.map/);
});

test('every layout page has a real Vite entry', async () => {
  const indexHtml = await readText('preview/pages/index.html');
  assert.match(indexHtml, /data-page="index"/);

  for (const layout of layouts) {
    const file = `preview/pages/${layout.slug}/index.html`;
    assert.ok(existsSync(path.join(root, file)), `${file} is missing`);
    const html = await readText(file);
    assert.match(html, new RegExp(`data-page="${layout.id}"`));
    assert.match(html, /src="\/src\/pages\/main\.js"/);
  }
});

test('preview pages are mobile-native', async () => {
  const app = await readText('preview/src/App.svelte');
  const css = await readText('preview/src/pages/pages.css');
  assert.match(app, /t128n-table-scroll t128n-table-scroll--pin-first/);
  assert.doesNotMatch(css, /@media \(max-width/);
  assert.match(css, /\.layout-nav \{[\s\S]*?flex-wrap: nowrap/);
  assert.match(css, /\.layout-nav a \{[\s\S]*?min-height: var\(--space-touch\)/);
  assert.match(css, /@media \(min-width: 800px\)[\s\S]*?\.layout-nav \{[\s\S]*?flex-wrap: wrap/);
  for (const file of ['preview/index.html', 'preview/pages/index.html', ...layouts.map((layout) => `preview/pages/${layout.slug}/index.html`)]) {
    const html = await readText(file);
    assert.match(html, /name="viewport" content="[^"]*viewport-fit=cover/);
    assert.match(html, /name="color-scheme" content="light dark"/);
    assert.doesNotMatch(html, /style="color-scheme/, `${file} must not override the theme color-scheme inline`);
  }
});
