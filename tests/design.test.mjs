import { test } from 'bun:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { YAML } from 'bun';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const designPath = path.join(root, 'DESIGN.md');
const run = promisify(execFile);

const SECTIONS = [
  'Overview',
  'Colors',
  'Typography',
  'Layout',
  'Elevation & Depth',
  'Shapes',
  'Iconography',
  'Components',
  "Do's and Don'ts",
];

async function readDesign() {
  return readFile(designPath, 'utf8');
}

function splitFrontMatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  assert.ok(match, 'DESIGN.md must begin with a YAML front matter block');
  return { yaml: match[1], body: markdown.slice(match[0].length) };
}

async function readTokens() {
  const { yaml } = splitFrontMatter(await readDesign());
  return YAML.parse(yaml);
}

function hasPath(tree, dotted) {
  let node = tree;
  for (const key of dotted.split('.')) {
    if (node === null || typeof node !== 'object' || !(key in node)) return false;
    node = node[key];
  }
  return node !== undefined;
}

test('lint is clean', async () => {
  const { stdout } = await run('bunx', ['--bun', 'designmd', 'lint', designPath], { cwd: root });
  const report = JSON.parse(stdout);

  assert.equal(report.summary.errors, 0);
  assert.equal(report.summary.warnings, 0);
  assert.equal(report.summary.infos, 1);
  assert.deepEqual(
    report.findings.map((finding) => finding.rule),
    ['token-summary'],
  );
});

test('front matter is the only token block', async () => {
  const { body } = splitFrontMatter(await readDesign());

  assert.doesNotMatch(body, /^```ya?ml\b/m);
});

test('all refs resolve', async () => {
  const { body } = splitFrontMatter(await readDesign());
  const tokens = await readTokens();
  const prose = body.replace(/```[\s\S]*?```/g, '');
  const refs = [...prose.matchAll(/\{([a-z0-9.-]+)\}/gi)].map((match) => match[1]);

  assert.ok(refs.length > 0, 'prose should reference tokens');
  for (const ref of new Set(refs)) {
    assert.ok(hasPath(tokens, ref), `prose reference {${ref}} does not resolve`);
  }
});

test('dark parity', async () => {
  const { colors } = await readTokens();
  const names = Object.keys(colors);
  const base = names.filter((name) => !name.startsWith('dark-'));
  const dark = names.filter((name) => name.startsWith('dark-'));

  assert.equal(base.length, 30);
  assert.equal(dark.length, 30);
  for (const name of base) {
    assert.ok(names.includes(`dark-${name}`), `${name} has no dark- counterpart`);
  }
  for (const name of dark) {
    assert.ok(names.includes(name.slice('dark-'.length)), `${name} has no base counterpart`);
  }
});

test('dark components mirror the light set', async () => {
  const { components } = await readTokens();
  const names = Object.keys(components);
  const isDark = (name) => /-dark(?:-|$)/.test(name);
  const dark = names.filter(isDark);
  const base = names.filter((name) => !isDark(name));
  const lightOf = (name) => name.replace(/-dark(?=-|$)/, '');

  assert.equal(base.length, 36);
  assert.equal(dark.length, 36);
  for (const name of dark) {
    assert.ok(names.includes(lightOf(name)), `${name} has no light counterpart`);
  }
  for (const name of base) {
    assert.ok(
      dark.some((darkName) => lightOf(darkName) === name),
      `${name} has no -dark counterpart`,
    );
  }
});

test('sections ordered', async () => {
  const { body } = splitFrontMatter(await readDesign());
  const unfenced = body.replace(/```[\s\S]*?```/g, '');
  const headings = [...unfenced.matchAll(/^##[ \t]+(.+?)[ \t]*$/gm)].map((match) => match[1]);

  assert.deepEqual(headings, SECTIONS);
});

test('interface integrity rules are present', async () => {
  const { body } = splitFrontMatter(await readDesign());
  const lower = body.toLowerCase();

  for (const telltale of [
    'bento grid',
    'glass',
    'neon blur',
    'orphaned micro-elements',
    'vestigial interactivity',
    'happy-path-only data',
    'sparkle icons',
  ]) {
    assert.ok(lower.includes(telltale), `missing interface integrity rule: ${telltale}`);
  }

  for (const requirement of [
    'defined source',
    'drill-down',
    '40-character',
    'no clipping',
    'every control performs',
    'no sparkle or ai icon',
    'static text never looks interactive',
  ]) {
    assert.ok(lower.includes(requirement), `missing interface integrity requirement: ${requirement}`);
  }
});

test('token counts', async () => {
  const tokens = await readTokens();

  assert.deepEqual(Object.keys(tokens), [
    'version',
    'name',
    'description',
    'colors',
    'typography',
    'spacing',
    'rounded',
    'components',
  ]);
  assert.equal(tokens.version, 'alpha');
  assert.equal(Object.keys(tokens.colors).length, 60);
  assert.equal(Object.keys(tokens.typography).length, 9);
  assert.equal(Object.keys(tokens.spacing).length, 8);
  assert.equal(Object.keys(tokens.rounded).length, 3);
  assert.equal(Object.keys(tokens.components).length, 72);
});

test('layout and shape tokens', async () => {
  const { spacing, rounded } = await readTokens();

  assert.deepEqual(spacing, {
    xxs: '2px',
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    '3xl': '32px',
  });
  assert.deepEqual(rounded, { none: '0px', sm: '2px', md: '3px' });
});

test('secondary button typography', async () => {
  const { components } = await readTokens();

  for (const name of ['button-secondary', 'button-secondary-disabled']) {
    assert.equal(components[name].typography, '{typography.body-md}', name);
  }
  for (const name of ['button-secondary-hover', 'button-secondary-dark-hover']) {
    assert.equal(components[name].typography, '{typography.label-md}', name);
  }
});

test('readable table and control scale', async () => {
  const { components, typography } = await readTokens();

  assert.equal(typography['body-md'].fontSize, '14px');
  assert.equal(typography['label-md'].fontSize, '14px');
  assert.equal(typography['label-sm'].fontSize, '12px');
  assert.equal(typography['headline-md'].fontSize, '18px');

  assert.equal(components['table-header'].typography, '{typography.label-md}');
  assert.equal(components['table-header'].height, '32px');
  assert.equal(components['key-value-label'].typography, '{typography.body-md}');
  assert.equal(components['button-primary'].height, '28px');
  assert.equal(components['input-field'].height, '28px');
  assert.equal(components['icon-button'].size, '28px');
  assert.equal(components['toolbar'].height, '36px');
});

test('normative palette values', async () => {
  const { colors } = await readTokens();

  assert.equal(colors.primary, '#2E63CC');
  assert.equal(colors.accent, '#3574F0');
  assert.equal(colors.selection, '#DBEAFE');
  assert.equal(colors['border-control'], '#8A8F9C');
  assert.equal(colors['on-surface-muted'], '#5F6473');
  assert.equal(colors['state-disabled-fg'], '#4A5568');
  assert.equal(colors.error, '#C62839');
  assert.equal(colors['dark-primary'], '#548AF7');
  assert.equal(colors['dark-accent'], '#3574F0');
  assert.equal(colors['dark-selection'], '#2E436E');
  assert.equal(colors['dark-secondary'], '#C0C4CC');
  assert.equal(colors['dark-surface-tinted'], '#191A1C');
  assert.equal(colors['dark-surface-header'], '#26282D');
  assert.equal(colors['dark-on-surface'], '#D4D6DB');
  assert.equal(colors['dark-on-surface-muted'], '#B4B8C0');
  assert.equal(colors['dark-state-disabled-fg'], '#B4B8C0');
  assert.equal(colors['dark-border'], '#2B2D30');
});

function colorValue(tokens, ref) {
  const [group, name] = ref.replaceAll(/[{}]/g, '').split('.');
  assert.equal(group, 'colors', `unexpected color reference: ${ref}`);
  const value = tokens.colors[name];
  assert.match(value ?? '', /^#[0-9a-f]{6}$/i, `unknown color token: ${name}`);
  return value;
}

function luminance(hex) {
  const [r, g, b] = hex
    .slice(1)
    .match(/../g)
    .map((channel) => {
      const value = Number.parseInt(channel, 16) / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground, background) {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort(
    (a, b) => b - a,
  );
  return (lighter + 0.05) / (darker + 0.05);
}

test('contrast and text floor', async () => {
  const tokens = await readTokens();

  for (const [name, type] of Object.entries(tokens.typography)) {
    assert.ok(
      Number.parseFloat(type.fontSize) >= 12,
      `${name} is below the 12px text floor`,
    );
  }
  assert.equal(tokens.typography['body-md'].fontSize, '14px');

  for (const [name, component] of Object.entries(tokens.components)) {
    if (!component.backgroundColor || !component.textColor) continue;
    const ratio = contrast(
      colorValue(tokens, component.textColor),
      colorValue(tokens, component.backgroundColor),
    );
    assert.ok(ratio >= 4.5, `${name} text contrast is ${ratio.toFixed(2)}:1`);
  }

  for (const [foreground, background] of [
    ['border-control', 'surface'],
    ['border-control', 'surface-tinted'],
    ['dark-border-control', 'dark-surface'],
    ['dark-border-control', 'dark-surface-tinted'],
  ]) {
    const ratio = contrast(tokens.colors[foreground], tokens.colors[background]);
    assert.ok(
      ratio >= 3,
      `${foreground} on ${background} contrast is ${ratio.toFixed(2)}:1`,
    );
  }

  for (const foreground of [
    'dark-on-surface',
    'dark-on-surface-muted',
    'dark-secondary',
  ]) {
    for (const background of [
      'dark-surface',
      'dark-surface-tinted',
      'dark-surface-header',
      'dark-neutral',
    ]) {
      const ratio = contrast(
        tokens.colors[foreground],
        tokens.colors[background],
      );
      assert.ok(
        ratio >= 4.5,
        `${foreground} on ${background} contrast is ${ratio.toFixed(2)}:1`,
      );
    }
  }
});
