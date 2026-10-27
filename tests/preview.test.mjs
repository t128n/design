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
  const [app, css, index, config, svelteConfig, theme] = await Promise.all([
    readText('preview/src/App.svelte'),
    readText('preview/src/app.css'),
    readText('preview/index.html'),
    readText('preview/vite.config.js'),
    readText('preview/svelte.config.js'),
    readText('preview/src/ThemeSwitch.svelte'),
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
  assert.match(theme, /<Label\.Root for="theme-toggle">/);
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
    't128n-grid--2',
    't128n-grid--3',
    't128n-form-grid',
    't128n-stack',
  ]) {
    assert.ok(app.includes(fragment), `preview is missing ${fragment}`);
  }

  assert.doesNotMatch(app, /Rejected patterns/);

  // Every native/primitive input has a label or an accessible name.
  assert.match(app, /<Label\.Root for="include-archived">/);
  assert.match(app, /<Label\.Root for="auto-refresh">/);
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
  assert.match(css, /\.th-sort \{[^}]*min-height: var\(--space-touch\)/);
  assert.match(css, /\.row-button \{[^}]*height: var\(--space-touch\)/);
  assert.match(css, /\.icon-button \{[^}]*width: var\(--space-touch\)/);
  assert.match(
    css,
    /@media \(min-width: 800px\)[\s\S]*?\.th-sort \{[^}]*min-height: 32px/,
  );
  assert.match(
    css,
    /@media \(min-width: 800px\)[\s\S]*?\.row-button \{[^}]*height: 28px/,
  );
  assert.match(
    css,
    /@media \(min-width: 800px\)[\s\S]*?\.icon-button \{[^}]*width: 28px/,
  );

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

test('preview is mobile-first and touch-sized', async () => {
  const css = await readText('preview/src/app.css');
  assert.doesNotMatch(css, /@media \(max-width/);
  assert.match(css, /@media \(min-width: 800px\)/);
  assert.match(css, /\n\.button \{[^}]*height: var\(--space-touch\)/);
  assert.match(css, /@media \(min-width: 800px\)[\s\S]*?\n  \.button \{[^}]*height: 28px/);
  assert.match(css, /\.table-wrap \{[^}]*--t128n-table-min: 52rem/);
  assert.match(css, /\.toolbar \{[^}]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.kv-row \{[^}]*grid-template-columns: 1fr/);
  assert.match(css, /\.dialog-content \{[^}]*bottom: 0/);
  assert.match(
    css,
    /\.dialog-content \{[^}]*max-height: calc\(100vh - var\(--space-2xl\)\);\n  max-height: calc\(100dvh - var\(--space-2xl\)\)/,
  );

  // The 44px header is the sort target height, not padding stacked on top of it.
  assert.match(
    css,
    /thead th \{[^}]*height: var\(--space-touch\)[^}]*padding: 0 var\(--space-md\)/,
  );
  assert.match(
    css,
    /@media \(min-width: 800px\)[\s\S]*?thead th \{[^}]*height: 32px[^}]*padding: 0 var\(--space-sm\)/,
  );

  // Every interactive control, including the switch track, is 44px at the base.
  assert.match(css, /\n\.switch \{[^}]*width: var\(--space-touch\)/);
  assert.match(css, /\n\.switch \{[^}]*height: var\(--space-touch\)/);
  assert.match(css, /@media \(min-width: 800px\)[\s\S]*?\n  \.switch \{[^}]*width: 40px/);
});
