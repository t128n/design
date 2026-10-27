import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { test } from 'bun:test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skillFile = 'skills/t128n-ui-review/SKILL.md';
const checklistFile = 'skills/t128n-ui-review/references/checklist.md';
const helperPath = 'skills/t128n-ui-review/scripts/audit-css.mjs';

async function readText(file) {
  return readFile(path.join(root, file), 'utf8');
}

function frontmatter(source) {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(source);
  assert.ok(match, 'SKILL.md has no parseable frontmatter');
  const fields = {};
  for (const line of match[1].split('\n')) {
    const field = /^([a-zA-Z-]+):\s*(.+)$/.exec(line);
    if (field) fields[field[1]] = field[2].trim();
  }
  return fields;
}

function checklistRows(checklist) {
  return checklist
    .split('\n')
    .filter((line) => /^\|\s*R\d+\s*\|/.test(line))
    .map((line) => line.split('|').map((cell) => cell.trim()).filter(Boolean));
}

test('review skill is actionable', async () => {
  assert.ok(existsSync(path.join(root, skillFile)), `${skillFile} is missing`);
  assert.ok(existsSync(path.join(root, checklistFile)), `${checklistFile} is missing`);

  const skill = await readText(skillFile);
  const checklist = await readText(checklistFile);
  const meta = frontmatter(skill);

  assert.equal(meta.name, 't128n-ui-review');
  const description = (meta.description ?? '').toLowerCase();
  assert.ok(description.includes('audit'), 'description does not mention audit');
  assert.ok(description.includes('conformance'), 'description does not mention conformance');

  for (const term of [
    'shadow',
    'card grid',
    'color alone',
    'radius',
    'placeholder',
    'dead sort',
    '200%',
  ]) {
    assert.ok(
      checklist.toLowerCase().includes(term),
      `checklist is missing "${term}"`,
    );
  }

  for (const [file, source] of [
    [skillFile, skill],
    [checklistFile, checklist],
  ]) {
    assert.doesNotMatch(source, /#[0-9a-fA-F]{3,8}\b/, `${file} contains a hex color`);
  }
});

test('workflow is fixed and ordered', async () => {
  const skill = await readText(skillFile);
  const steps = [...skill.matchAll(/^### Step (\d+) — /gm)].map((match) => Number(match[1]));

  assert.deepEqual(steps, [1, 2, 3, 4, 5, 6, 7, 8], 'workflow must run eight ordered steps');

  const helper = skill.indexOf(helperPath);
  const step2 = skill.indexOf('### Step 2 —');
  const step3 = skill.indexOf('### Step 3 —');
  assert.ok(helper > step2 && helper < step3, 'the helper runs by path inside step 2');

  assert.match(skill, /### Step 3 — Verify the helper findings by hand/);
  assert.match(skill, /### Step 8 — Report/);
});

test('every finding carries severity evidence and spec section', async () => {
  const skill = await readText(skillFile);

  assert.ok(
    skill.includes('| ID | Severity | Evidence | Rule | DESIGN.md | Fix |'),
    'the report table does not fix the finding columns',
  );
  assert.match(skill, /severity, evidence, and the governing `DESIGN\.md` section/);
  assert.match(skill, /`error`, `warning`, or `info`/);
  assert.match(skill, /file and line|file:line/);
});

test('checklist rows have pass conditions and spec pointers', async () => {
  const rows = checklistRows(await readText(checklistFile));

  assert.ok(rows.length >= 28, `expected at least 28 rules, found ${rows.length}`);
  for (const cells of rows) {
    assert.equal(cells.length, 4, `rule ${cells[0]} must have four columns`);
    const [, rule, pass, spec] = cells;
    assert.ok(rule.length > 3, `rule ${cells[0]} has no name`);
    assert.ok(pass.length > 20, `rule ${cells[0]} has no checkable pass condition`);
    assert.ok(spec.includes('DESIGN.md'), `rule ${cells[0]} has no DESIGN.md pointer`);
  }
});

test('checklist covers integrity tells status roles and themes', async () => {
  const checklist = (await readText(checklistFile)).toLowerCase();

  for (const tell of [
    'bento',
    'glass',
    'orphaned',
    'vestigial',
    'happy-path',
    'sparkle',
  ]) {
    assert.ok(checklist.includes(tell), `integrity tell "${tell}" is not covered`);
  }

  for (const role of [
    'neutral',
    'info',
    'progress',
    'success',
    'warning',
    'danger',
    'disabled',
  ]) {
    assert.ok(checklist.includes(role), `status role "${role}" is not covered`);
  }

  for (const theme of ['data-theme="dark"', 'prefers-color-scheme']) {
    assert.ok(checklist.includes(theme), `theme case "${theme}" is not covered`);
  }
});

test('checklist covers keyboard order and 200% zoom', async () => {
  const checklist = (await readText(checklistFile)).toLowerCase();

  for (const term of ['keyboard order', 'tab order', 'focus', '200%', 'zoom']) {
    assert.ok(checklist.includes(term), `"${term}" is not covered`);
  }
});

test('skill points at canonical artifacts instead of copying them', async () => {
  const skill = await readText(skillFile);
  const checklist = await readText(checklistFile);

  assert.ok(skill.split('\n').length < 500, 'SKILL.md must stay under 500 lines');

  for (const pointer of ['DESIGN.md', 'dist/tokens.css', 'dist/layouts.css', 'preview/']) {
    assert.ok(skill.includes(pointer), `SKILL.md does not cite ${pointer}`);
  }

  for (const [file, source] of [
    [skillFile, skill],
    [checklistFile, checklist],
  ]) {
    assert.doesNotMatch(source, /--(?:color|space|radius)-[a-z]/, `${file} defines tokens`);
    assert.doesNotMatch(source, /(?:box-shadow|border-radius)\s*:/, `${file} copies CSS`);
    assert.doesNotMatch(source, /\.t128n-[a-z-]+\s*\{/, `${file} copies a layout block`);
  }
});

test('audit helper is invoked by script path', async () => {
  const skill = await readText(skillFile);

  assert.ok(skill.includes(`bun ${helperPath}`), 'SKILL.md must invoke the helper by path');
  assert.match(skill, /exit status|exits `1`|exit 1/i);
});
