import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'bun:test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function readText(file) {
  return readFile(path.join(root, file), 'utf8');
}

test('preview is a Vite Svelte app on bits-ui primitives', async () => {
  const [app, css, index, config, svelteConfig] = await Promise.all([
    readText('preview/src/App.svelte'),
    readText('preview/src/app.css'),
    readText('preview/index.html'),
    readText('preview/vite.config.js'),
    readText('preview/svelte.config.js'),
  ]);

  // Svelte and Vite wiring.
  assert.match(index, /<div id="app"><\/div>/);
  assert.match(index, /src="\/src\/main\.js"/);
  assert.match(config, /svelte\(\)/);
  assert.match(config, /base:\s*'\.\/'/);
  assert.match(svelteConfig, /export default/);

  // The preview consumes the generated token stylesheet and the layouts.
  assert.match(css, /@import '\.\.\/\.\.\/dist\/tokens\.css'/);
  assert.match(css, /@import '\.\.\/\.\.\/layouts\.css'/);

  // The interactive controls come from bits-ui.
  assert.match(app, /from 'bits-ui'/);
  for (const primitive of [
    'Checkbox',
    'Dialog',
    'Label',
    'RadioGroup',
    'Select',
    'Switch',
    'Tooltip',
  ]) {
    assert.ok(app.includes(primitive), `preview does not use ${primitive}`);
  }

  // The icon is an Octicon, not a hand-drawn path.
  assert.match(app, /@primer\/octicons\/build\/svg\/copy-16\.svg\?raw/);
  assert.match(app, /\{@html copyIcon\}/);
  assert.doesNotMatch(app, /<path/);
});

test('preview keeps the required structure and avoids rejected treatments', async () => {
  const app = await readText('preview/src/App.svelte');
  const css = await readText('preview/src/app.css');
  const layouts = await readText('layouts.css');

  for (const fragment of [
    '<table',
    '<caption',
    '<th scope="col"',
    '<fieldset',
    '<legend',
    'for="service-name"',
    'aria-sort=',
    'aria-label="Recent deployments"',
    'Tooltip.Content',
    'aria-live="polite"',
    'Dialog.Title',
    'Dialog.Description',
    'Select.Trigger',
    'Checkbox.Root',
    'RadioGroup.Root',
    'Switch.Root',
    't128n-page',
    't128n-form-grid',
    't128n-stack',
  ]) {
    assert.ok(app.includes(fragment), `preview is missing ${fragment}`);
  }

  assert.doesNotMatch(app, /Rejected patterns/);

  // Every native/primitive input has a label or an accessible name.
  assert.match(app, /<Label\.Root for="include-archived">/);
  assert.match(app, /<Label\.Root for="auto-refresh">/);
  assert.match(app, /<Label\.Root for="theme-toggle">/);
  assert.match(app, /aria-labelledby="environment-label"/);
  assert.match(app, /aria-label="Deployment type"/);

  // Forbidden visual treatments.
  for (const source of [css, layouts]) {
    assert.doesNotMatch(source, /linear-gradient|radial-gradient|backdrop-filter|box-shadow/i);
    assert.doesNotMatch(source, /filter\s*:\s*blur|text-shadow/i);
  }
  assert.doesNotMatch(app, /✨/);

  // Sort is signalled by an underline and arrow, not color alone.
  assert.match(
    css,
    /th\[aria-sort='ascending'\] \.th-sort[\s\S]*?text-decoration: underline/,
  );
  assert.match(css, /\.badge \{[^}]*border: 1px solid currentColor/);
  assert.match(
    css,
    /tbody td \{[^}]*border-bottom: 1px solid var\(--color-border-control\)/,
  );
  assert.match(css, /\.th-sort \{[^}]*min-height: 32px/);
  assert.match(css, /\.row-button \{[^}]*height: 28px/);
  assert.match(css, /\.icon-button \{[^}]*width: 28px/);

  const radii = [...css.matchAll(/border-radius\s*:\s*([^;}]+)/gi)].map((match) =>
    match[1].trim(),
  );
  assert.ok(radii.length > 0, 'preview must set radius from tokens');
  for (const radius of radii) {
    assert.match(
      radius,
      /^var\(--radius-(none|sm|md)\)$/,
      `border-radius must stay within token radii (3px max): ${radius}`,
    );
  }
});
