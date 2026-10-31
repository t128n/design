/**
 * Renders the Storybook reference stories to PNG for the PR preview.
 *
 *   npm run screenshots
 *
 * Serves storybook-static on an ephemeral port, then captures every view in
 * both themes plus a small set of foundation/component specimens. Theme,
 * density and line mode arrive as Storybook globals, the same toolbar the
 * reviewer uses.
 */
import { createServer } from 'node:http';
import { readFile, mkdir, rm, writeFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('../storybook-static/', import.meta.url));
const out = fileURLToPath(new URL('../docs/screenshots/', import.meta.url));

const VIEWS = [
  ['Views/Issues', 'Issues', 'issues'],
  ['Views/Board', 'Board', 'board'],
  ['Views/Table database', 'Table Database', 'table-database'],
  ['Views/Page', 'Page', 'page'],
  ['Views/Settings', 'Settings', 'settings'],
  ['Views/Inbox', 'Inbox', 'inbox'],
  ['Views/Overview', 'Overview', 'overview'],
  ['Views/Calendar', 'Calendar', 'calendar'],
  ['Views/Empty workspace', 'EmptyWorkspace', 'empty-workspace'],
  ['Views/Error', 'Error', 'error'],
];

// Optional specimens: resolved against the Storybook index, skipped when the
// title of the day moves. Views are required.
const SPECIMENS = [
  ['Foundations/Tokens', 'Tokens', 'tokens'],
  ['Foundations/Typography', 'Roles', 'typography'],
  ['Foundations/Density', 'Modes', 'density'],
  ['Foundations/Layout', 'Ladders', 'layout'],
  ['Components/Button', 'States', 'button'],
  ['Components/Data display', 'Default', 'data-display'],
  ['Overlays/Workbench', 'Workbench', 'overlays'],
];

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
  '.ico': 'image/x-icon',
};

const externalUrl = process.env.STORYBOOK_URL?.replace(/\/$/, '') ?? null;

async function readIndex() {
  if (externalUrl) {
    const response = await fetch(`${externalUrl}/index.json`);
    const entries = (await response.json()).entries ?? {};
    return Array.isArray(entries) ? entries : Object.values(entries);
  }
  const raw = await readFile(join(root, 'index.json'), 'utf8');
  const entries = JSON.parse(raw).entries ?? {};
  return Array.isArray(entries) ? entries : Object.values(entries);
}

function storyUrl(base, id, theme, density = 'default', lines = 'faint') {
  const globals = `theme:${theme};density:${density};lines:${lines}`;
  return `${base}/iframe.html?id=${encodeURIComponent(id)}&viewMode=story&globals=${globals}`;
}

function findEntry(entries, title, name) {
  return entries.find(
    (entry) => entry.title === title && (name === null || entry.name === name),
  );
}

const server = externalUrl ? null : createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', 'http://localhost');
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const file = normalize(join(root, pathname));
    if (!file.startsWith(normalize(root))) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    const body = await readFile(file);
    res.writeHead(200, {
      'content-type': mime[extname(file)] ?? 'application/octet-stream',
      'cache-control': 'no-store',
    });
    res.end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
});

let base = externalUrl;
if (server) {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
}

await rm(out, { recursive: true, force: true });
for (const theme of ['light', 'dark']) {
  await mkdir(join(out, theme), { recursive: true });
}

const entries = await readIndex();
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  colorScheme: 'light',
});

// Headless Linux containers often have no UI font, so `system-ui` resolves to a
// serif face. Pin the preview to a real sans stack; on machines where DejaVu is
// absent the browser falls through to the same system stack the app uses.
const fontUI =
  process.env.SCREENSHOT_FONT_UI ??
  "'DejaVu Sans', system-ui, -apple-system, 'Segoe UI', sans-serif";
const fontCode =
  process.env.SCREENSHOT_FONT_CODE ??
  "'DejaVu Sans Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const captured = [];
const missing = [];

for (const theme of ['light', 'dark']) {
  for (const [title, name, file] of VIEWS) {
    const entry = findEntry(entries, title, name);
    if (!entry) {
      missing.push(`${title} :: ${name}`);
      continue;
    }
    await page.goto(storyUrl(base, entry.id, theme), { waitUntil: 'networkidle' });
    await page.waitForSelector('#storybook-root > *', { timeout: 20000 });
    await page.addStyleTag({
      content: `:root { --font-ui: ${fontUI}; --font-code: ${fontCode}; }`,
    });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.screenshot({ path: join(out, theme, `${file}.png`), fullPage: true });
    captured.push(`${theme}/${file}.png`);
    console.log(`captured ${theme}/${file}.png`);
  }
}

for (const [title, name, file] of SPECIMENS) {
  const entry = findEntry(entries, title, name);
  if (!entry) continue;
  for (const theme of ['light', 'dark']) {
    await page.goto(storyUrl(base, entry.id, theme), { waitUntil: 'networkidle' });
    await page.waitForSelector('#storybook-root > *', { timeout: 20000 });
    await page.addStyleTag({
      content: `:root { --font-ui: ${fontUI}; --font-code: ${fontCode}; }`,
    });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);
    await page.screenshot({ path: join(out, theme, `${file}.png`), fullPage: true });
    captured.push(`${theme}/${file}.png`);
    console.log(`captured ${theme}/${file}.png`);
  }
}

await browser.close();
if (server) server.close();

await writeFile(join(out, 'manifest.json'), JSON.stringify({ captured, missing }, null, 2));

if (missing.length) {
  console.error(`\nmissing stories (views are required):\n${missing.join('\n')}`);
  process.exitCode = 1;
}
console.log(`\n${captured.length} screenshots in docs/screenshots/`);
