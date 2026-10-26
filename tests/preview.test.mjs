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

  // The preview consumes the generated token stylesheet.
  assert.match(css, /@import '\.\.\/\.\.\/dist\/tokens\.css'/);

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
});

test('preview keeps the required structure and avoids rejected treatments', async () => {
  const app = await readText('preview/src/App.svelte');
  const css = await readText('preview/src/app.css');

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
  ]) {
    assert.ok(app.includes(fragment), `preview is missing ${fragment}`);
  }

  // Every native/primitive input has a label or an accessible name.
  assert.match(app, /<Label\.Root for="include-archived">/);
  assert.match(app, /<Label\.Root for="auto-refresh">/);
  assert.match(app, /<Label\.Root for="theme-toggle">/);
  assert.match(app, /aria-labelledby="environment-label"/);
  assert.match(app, /aria-label="Deployment type"/);

  // Forbidden visual treatments.
  assert.doesNotMatch(css, /linear-gradient|radial-gradient|backdrop-filter|box-shadow/i);
  assert.doesNotMatch(css, /filter\s*:\s*blur|text-shadow/i);
  assert.doesNotMatch(app, /✨/);

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
