import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
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
