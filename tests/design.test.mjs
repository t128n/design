import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import YAML from 'yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const designPath = path.join(root, 'DESIGN.md');
const designmd = path.join(root, 'node_modules', '.bin', 'designmd');
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
  const { stdout } = await run(designmd, ['lint', designPath], { cwd: root });
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

  assert.equal(base.length, 28);
  assert.equal(dark.length, 28);
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

  assert.equal(base.length, 34);
  assert.equal(dark.length, 34);
  for (const name of dark) {
    const light = name.replace(/-dark(?=-|$)/, '');
    assert.ok(names.includes(light), `${name} has no light counterpart`);
  }
});

test('sections ordered', async () => {
  const { body } = splitFrontMatter(await readDesign());
  const unfenced = body.replace(/```[\s\S]*?```/g, '');
  const headings = [...unfenced.matchAll(/^##[ \t]+(.+?)[ \t]*$/gm)].map((match) => match[1]);

  assert.deepEqual(headings, SECTIONS);
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
  assert.equal(Object.keys(tokens.colors).length, 56);
  assert.equal(Object.keys(tokens.typography).length, 9);
  assert.equal(Object.keys(tokens.spacing).length, 8);
  assert.equal(Object.keys(tokens.rounded).length, 3);
  assert.equal(Object.keys(tokens.components).length, 68);
});

test('normative palette values', async () => {
  const { colors } = await readTokens();

  assert.equal(colors.primary, '#2E63CC');
  assert.equal(colors['border-control'], '#8A8F9C');
  assert.equal(colors['on-surface-muted'], '#5F6473');
  assert.equal(colors['state-disabled-fg'], '#565B66');
  assert.equal(colors.error, '#C62839');
  assert.equal(colors['dark-primary'], '#548AF7');
});
