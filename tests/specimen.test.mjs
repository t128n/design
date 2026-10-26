import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'bun:test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const roles = ['Neutral', 'Info', 'Progress', 'Success', 'Warning', 'Danger', 'Disabled'];

test('specimen is conformant', async () => {
  const html = await readFile(path.join(root, 'specimen.html'), 'utf8');

  // Links the generated token stylesheet and ships a data-theme toggle.
  assert.match(html, /<link\b[^>]*href="dist\/tokens\.css"/, 'specimen must link dist/tokens.css');
  assert.match(html, /data-theme/, 'specimen must use data-theme');
  assert.match(
    html,
    /document\.documentElement\.dataset\.theme/,
    'toggle must write document.documentElement.dataset.theme',
  );
  assert.match(html, /'light'/, 'toggle must offer light');
  assert.match(html, /'dark'/, 'toggle must offer dark');

  // Accessible structure required by the spec.
  for (const fragment of [
    '<table',
    '<caption',
    '<th scope="col"',
    '<fieldset',
    '<legend',
    'for="',
    '<dialog',
    'aria-label',
    '<dl',
    '<pre',
    'role="tooltip"',
    ':focus-visible',
  ]) {
    assert.ok(html.includes(fragment), `specimen is missing ${fragment}`);
  }

  // Alternating rows and a numeric column.
  assert.match(html, /nth-child\(even\)/, 'alternating rows need nth-child(even)');
  assert.match(html, /<td[^>]*class="numeric"/, 'table needs a numeric column');
  assert.match(html, />---</, 'missing values must render as ---');

  // Seven badges carry the role as text, never colour alone.
  const badgeTexts = [...html.matchAll(/<span class="badge[^"]*">([^<]+)<\/span>/g)].map((match) =>
    match[1].trim(),
  );
  for (const role of roles) {
    assert.ok(badgeTexts.includes(role), `missing ${role} badge text`);
  }

  // Every native control pairs an id with a label for it.
  const controls = [...html.matchAll(/<(input|select|textarea)\b[^>]*>/gi)].map((match) => match[0]);
  assert.ok(controls.length >= 4, 'fieldset must demonstrate input, select, checkbox and radio');
  for (const control of controls) {
    const id = control.match(/\bid="([^"]+)"/);
    assert.ok(id, `control lacks an id: ${control}`);
    assert.ok(html.includes(`for="${id[1]}"`), `control ${id[1]} lacks a visible label`);
    assert.doesNotMatch(control, /\btype="hidden"/, 'hidden inputs cannot be labelled');
  }

  // Forbidden visual treatments.
  assert.doesNotMatch(html, /linear-gradient|radial-gradient|backdrop-filter|box-shadow/i);
  assert.doesNotMatch(html, /filter\s*:\s*blur|text-shadow/i);
  assert.doesNotMatch(html, /✨|sparkle/i);

  const radii = [...html.matchAll(/border-radius\s*:\s*([^;}]+)/gi)].map((match) => match[1].trim());
  assert.ok(radii.length > 0, 'specimen must set radius from tokens');
  for (const radius of radii) {
    assert.match(
      radius,
      /^var\(--radius-(none|sm|md)\)$/,
      `border-radius must stay within token radii (3px max): ${radius}`,
    );
  }
});

test('specimen keyboard and overlay affordances are accessible', async () => {
  const html = await readFile(path.join(root, 'specimen.html'), 'utf8');

  // Skip link must move focus to a focusable target.
  assert.match(html, /<main id="main" tabindex="-1">/, 'skip-link target must accept focus');

  // The table scroll region is keyboard reachable and named for assistive tech.
  const tableWrap = html.match(/<div class="table-wrap"[^>]*>/)?.[0] ?? '';
  assert.match(tableWrap, /tabindex="0"/, 'table scroll region must be focusable');
  assert.match(tableWrap, /role="region"/, 'table scroll region needs a landmark role');
  assert.match(tableWrap, /aria-label="[^"]+"/, 'table scroll region needs an accessible name');

  // Every column header declares its scope.
  const headers = [...html.matchAll(/<th\b[^>]*>/g)].map((match) => match[0]);
  assert.ok(headers.length >= 4, 'table needs column headers');
  for (const header of headers) {
    assert.match(header, /scope="col"/, `header lacks scope: ${header}`);
  }

  // Tooltip can be dismissed with Escape without moving pointer or focus.
  assert.match(html, /\.tooltip-wrap\.is-dismissed \.tooltip/, 'tooltip needs a dismissed state');
  assert.match(html, /event\.key === 'Escape'/, 'tooltip must respond to Escape');
  assert.match(html, /classList\.add\('is-dismissed'\)/, 'Escape must dismiss the tooltip');

  // Theme toggle exposes state to assistive tech and paints it visibly.
  assert.match(html, /aria-pressed="false"/, 'toggle starts unpressed');
  assert.match(html, /setAttribute\('aria-pressed'/, 'toggle must update aria-pressed');
  assert.match(
    html,
    /\[data-theme-toggle\]\[aria-pressed="true"\]/,
    'toggle needs a visible pressed state',
  );

  // Dialog is labelled by its own heading and closes through its form.
  const dialog = html.match(/<dialog[^>]*>/)?.[0] ?? '';
  const labelledBy = dialog.match(/aria-labelledby="([^"]+)"/)?.[1];
  assert.ok(labelledBy, 'dialog must be labelled by its heading');
  assert.match(html, new RegExp(`id="${labelledBy}"`), 'dialog label target must exist');
  assert.match(html, /<form method="dialog"/, 'dialog actions must close the dialog');
});
