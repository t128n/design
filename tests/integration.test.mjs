import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { test } from 'bun:test';

import { readDesignTokens, renderTokensCss } from '../scripts/build.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const cssPath = new URL('../dist/tokens.css', import.meta.url);
// Snapshot the committed artifact before any test runs `bun run build`, so the
// provenance assertions below inspect what is in the tree, not what a rebuild wrote.
const committedCss = readFileSync(cssPath, 'utf8');
const DESIGN_PATH = 'DESIGN.md';
const BUILD_PATH = 'scripts/build.mjs';
const PREVIEW_INDEX = 'preview/index.html';
const PREVIEW_CONFIG = 'preview/vite.config.js';
const PREVIEW_APP = 'preview/src/App.svelte';
const PREVIEW_CSS = 'preview/src/app.css';
const README_PATH = 'README.md';
const WORKFLOW_PATH = '.github/workflows/design.yml';
const PAGES_WORKFLOW_PATH = '.github/workflows/pages.yml';
const CSS_PATH = 'dist/tokens.css';
const ARTIFACTS = [
  DESIGN_PATH,
  BUILD_PATH,
  PREVIEW_INDEX,
  PREVIEW_CONFIG,
  PREVIEW_APP,
  PREVIEW_CSS,
  README_PATH,
  WORKFLOW_PATH,
  PAGES_WORKFLOW_PATH,
  CSS_PATH,
];
const ROLES = [
  'neutral',
  'info',
  'progress',
  'success',
  'warning',
  'danger',
  'disabled',
];

function build() {
  execFileSync('bun', ['run', 'build'], {
    cwd: root,
    stdio: 'pipe',
    encoding: 'utf8',
  });
  return readFileSync(cssPath, 'utf8');
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function block(css, start, end) {
  const from = css.indexOf(start);
  assert.ok(from >= 0, `missing selector ${start}`);
  const to = css.indexOf(end, from + start.length);
  assert.ok(to >= 0, `unterminated selector ${start}`);
  return css.slice(from, to);
}

function colorCount(selectorBlock) {
  return [...selectorBlock.matchAll(/--color-[a-z0-9-]+\s*:/g)].length;
}

test('committed css is the renderer output', () => {
  const markdown = readFileSync(
    new URL(`../${DESIGN_PATH}`, import.meta.url),
    'utf8',
  );
  assert.equal(committedCss, renderTokensCss(readDesignTokens(markdown)));
});

test('every color pair maps in both dark selectors', () => {
  const tokens = readDesignTokens(
    readFileSync(new URL(`../${DESIGN_PATH}`, import.meta.url), 'utf8'),
  );
  const entries = Object.entries(tokens.colors);
  const bases = entries.filter(([name]) => !name.startsWith('dark-'));
  assert.equal(bases.length, 28);
  assert.equal(entries.length, 56);

  const rootBlock = block(committedCss, ':root {', '\n}');
  const darkBlock = block(committedCss, '[data-theme="dark"] {', '\n}');
  const mediaBlock = block(
    committedCss,
    '@media (prefers-color-scheme: dark) {',
    '\n}',
  );

  for (const [name, value] of bases) {
    const light = `--color-${name}: ${String(value).toLowerCase()};`;
    const dark = `--color-${name}: ${String(
      tokens.colors[`dark-${name}`],
    ).toLowerCase()};`;
    assert.ok(rootBlock.includes(light), `${light} missing from :root`);
    assert.ok(darkBlock.includes(dark), `${dark} missing from [data-theme="dark"]`);
    assert.ok(mediaBlock.includes(dark), `${dark} missing from the media block`);
  }
  assert.doesNotMatch(committedCss, /--color-dark-/);
});

test('repo is assembled', () => {
  const css = build();

  for (const artifact of ARTIFACTS) {
    assert.ok(existsSync(new URL(`../${artifact}`, import.meta.url)), artifact);
  }

  assert.match(css, /^\/\*[\s\S]*generated[\s\S]*DESIGN\.md[\s\S]*\*\//i);

  const rootBlock = block(css, ':root {', '\n}');
  assert.match(rootBlock, /color-scheme:\s*light;/);
  assert.ok(rootBlock.includes('--color-primary: #2e63cc;'));
  assert.ok(rootBlock.includes('--space-2xl: 24px;'));
  assert.ok(rootBlock.includes('--radius-md: 3px;'));
  assert.ok(rootBlock.includes("--text-numeric-md-font-feature: 'tnum' 1;"));
  assert.equal(colorCount(rootBlock), 28);

  const darkBlock = block(css, '[data-theme="dark"] {', '\n}');
  assert.match(darkBlock, /color-scheme:\s*dark;/);
  assert.ok(darkBlock.includes('--color-primary: #548af7;'));
  assert.equal(colorCount(darkBlock), 28);

  const mediaBlock = block(
    css,
    '@media (prefers-color-scheme: dark) {',
    '\n}',
  );
  assert.match(mediaBlock, /:root:not\(\[data-theme\]\)/);
  assert.match(mediaBlock, /color-scheme:\s*dark;/);
  assert.ok(mediaBlock.includes('--color-primary: #548af7;'));
  assert.equal(colorCount(mediaBlock), 28);

  // Raw dark variable names never leak; the 28 dark values are inlined.
  assert.doesNotMatch(css, /--color-dark-/);
  assert.equal([...css.matchAll(/--color-[a-z0-9-]+\s*:/g)].length, 28 * 3);

  const firstHash = sha256(css);
  const rebuilt = build();
  assert.equal(sha256(rebuilt), firstHash);

  execFileSync('bun', ['run', 'preview:build'], {
    cwd: root,
    stdio: 'pipe',
    encoding: 'utf8',
  });
  const previewHtml = readFileSync(
    new URL('../preview/dist/index.html', import.meta.url),
    'utf8',
  );
  assert.match(previewHtml, /\.\/assets\/[^"]+\.js/);
  assert.match(previewHtml, /\.\/assets\/[^"]+\.css/);
  assert.doesNotMatch(previewHtml, /src="\//);
});

test('docs and preview agree', () => {
  const app = readFileSync(
    new URL(`../${PREVIEW_APP}`, import.meta.url),
    'utf8',
  );
  const appCss = readFileSync(
    new URL(`../${PREVIEW_CSS}`, import.meta.url),
    'utf8',
  );
  const readme = readFileSync(
    new URL(`../${README_PATH}`, import.meta.url),
    'utf8',
  );
  const design = readFileSync(
    new URL(`../${DESIGN_PATH}`, import.meta.url),
    'utf8',
  );
  const workflow = readFileSync(
    new URL(`../${WORKFLOW_PATH}`, import.meta.url),
    'utf8',
  );
  const pagesWorkflow = readFileSync(
    new URL(`../${PAGES_WORKFLOW_PATH}`, import.meta.url),
    'utf8',
  );

  assert.match(app, /from 'bits-ui'/);
  assert.match(app, /<table/);
  assert.match(appCss, /@import '\.\.\/\.\.\/dist\/tokens\.css'/);
  assert.ok(readme.includes('--color-surface'));
  assert.ok(readme.includes('--color-primary'));
  assert.ok(readme.includes('bun run check'));
  assert.ok(readme.includes('bun run preview:build'));
  assert.ok(readme.includes('https://t128n.github.io/design/'));
  assert.ok(workflow.includes('bun run check'));
  assert.ok(pagesWorkflow.includes('bun run preview:build'));

  for (const role of ROLES) {
    assert.ok(design.includes(`state-${role}-fg`), role);
  }
});
