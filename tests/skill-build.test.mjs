import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { test } from 'bun:test';
import { YAML } from 'bun';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SKILL = 'SKILL.md';
const REFERENCES = [
  'references/layouts.md',
  'references/records.md',
  'references/forms-and-dialogs.md',
];
const ALL_FILES = [SKILL, ...REFERENCES];
const ROLES = [
  'neutral',
  'info',
  'progress',
  'success',
  'warning',
  'danger',
  'disabled',
];

async function readSkillFile(file) {
  const absolute = path.join(root, file);
  assert.ok(existsSync(absolute), `${file} exists`);
  return readFile(absolute, 'utf8');
}

function frontMatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match, 'SKILL.md opens with YAML front matter');
  return YAML.parse(match[1]);
}

test('skill is scoped', async () => {
  const skill = await readSkillFile(SKILL);
  const meta = frontMatter(skill);

  assert.equal(meta.name, 't128n-ui');
  assert.equal(typeof meta.description, 'string');

  const description = meta.description.toLowerCase();
  for (const term of [
    'building',
    'admin console',
    'record',
    'dashboard',
    'table',
    'audit',
    'conformance',
    'accessibility',
  ]) {
    assert.ok(
      description.includes(term),
      `description must trigger on "${term}"`,
    );
  }

  for (const file of REFERENCES) {
    assert.ok(
      existsSync(path.join(root, file)),
      `${file} exists at the skill root`,
    );
    assert.ok(skill.includes(file), `SKILL.md cites ${file}`);
  }

  const texts = await Promise.all(ALL_FILES.map(readSkillFile));
  for (const [index, text] of texts.entries()) {
    assert.doesNotMatch(
      text,
      /#[0-9a-f]{3,8}\b/i,
      `${ALL_FILES[index]} carries no hex colour`,
    );
    assert.ok(
      !text.toLowerCase().includes('box-shadow:'),
      `${ALL_FILES[index]} carries no shadow declaration`,
    );
  }
});

test('build skill stays under the line budget', async () => {
  const skill = await readSkillFile(SKILL);
  const lines = skill.split('\n').length;
  assert.ok(lines < 500, `SKILL.md is ${lines} lines, must stay under 500`);
  assert.ok(lines > 40, 'SKILL.md is a procedure, not a stub');
});

test('build references cite the new canonical paths', async () => {
  for (const file of REFERENCES) {
    const text = await readSkillFile(file);
    assert.match(
      text,
      /references\/DESIGN\.md/,
      `${file} cites references/DESIGN.md`,
    );
    assert.match(
      text,
      /assets\/(tokens|layouts)\.css/,
      `${file} cites a generated asset`,
    );
  }
});

test('review routing names references/review.md', async () => {
  const skill = await readSkillFile(SKILL);
  assert.match(
    skill,
    /references\/review\.md/,
    'SKILL.md routes to the review workflow',
  );
  assert.match(
    skill,
    /references\/checklist\.md/,
    'SKILL.md cites the review checklist',
  );
  assert.match(
    skill,
    /scripts\/audit-css\.mjs/,
    'SKILL.md names the audit helper',
  );
});

test('no pointer escapes', async () => {
  for (const file of ALL_FILES) {
    const text = await readSkillFile(file);
    assert.doesNotMatch(
      text,
      /\.\.\//,
      `${file} cites no path outside the skill`,
    );
    assert.doesNotMatch(text, /dist\//, `${file} cites no dist/ path`);
    assert.ok(
      !text.includes('`DESIGN.md`'),
      `${file} cites DESIGN.md only as references/DESIGN.md`,
    );
  }
});

function assertRuleExplained(rule, heading, file) {
  assert.match(
    rule,
    /\*\*Because\*\*\s+\S/,
    `${file} rule "${heading}" states its reason`,
  );
  assert.match(
    rule,
    /\*\*Verify\*\*\s+\S/,
    `${file} rule "${heading}" states its verification`,
  );
}

test('every rule carries a reason and a check', async () => {
  for (const file of ALL_FILES) {
    const text = await readSkillFile(file);
    const rules = text.split(/^### /m).slice(1);
    assert.ok(rules.length > 0, `${file} states numbered rules`);
    for (const rule of rules) {
      assertRuleExplained(rule, rule.split('\n')[0], file);
    }
  }
});

test('a rule passes when its reason and check wrap onto the next line', () => {
  const rule = [
    'Keep the record header on one line',
    '',
    '**Because**',
    'prose wraps to the next line.',
    '',
    '**Verify**',
    'the header still renders on one line.',
  ].join('\n');

  assertRuleExplained(rule, 'wrapped prose', 'fixture.md');
});

test('status is text plus one of seven roles', async () => {
  const skill = await readSkillFile(SKILL);
  const records = await readSkillFile('references/records.md');

  for (const text of [skill, records]) {
    assert.match(text, /seven roles/i);
  }

  const list = records.match(/seven roles[^\n]*/i)?.[0] ?? '';
  for (const role of ROLES) {
    assert.ok(list.includes(`\`${role}\``), `records lists the ${role} role`);
  }

  assert.match(records, /text label/i);
  assert.match(records, /colou?r\s+alone/i);
});

test('layout choice names the selector', async () => {
  const layouts = await readSkillFile('references/layouts.md');
  const selectors = [
    't128n-page',
    't128n-app-shell',
    't128n-register',
    't128n-split',
    't128n-record',
    't128n-form-grid',
    't128n-stack',
    't128n-cluster',
    't128n-grid--2',
    't128n-grid--3',
  ];
  for (const selector of selectors) {
    assert.ok(
      layouts.includes(`.${selector}`),
      `layouts.md names the ${selector} selector`,
    );
  }

  const rows = layouts
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|') && !/^\|\s*:?-/.test(line));
  assert.ok(rows.length > 1, 'layouts.md has a decision table');

  for (const row of rows.slice(1)) {
    const cells = row.split('|').map((cell) => cell.trim());
    assert.match(
      cells[2] ?? '',
      /\.t128n-[a-z-]+/,
      `decision row names a selector: ${row}`,
    );
  }
});

test('skill files are pointers, not copies', async () => {
  for (const file of ALL_FILES) {
    const text = await readSkillFile(file);
    assert.doesNotMatch(
      text,
      /--(color|space|radius|text|font)-/,
      `${file} declares no token variables`,
    );
    assert.doesNotMatch(
      text,
      /^\.t128n-[\w-]+\s*\{/m,
      `${file} contains no t128n CSS block`,
    );
  }
});
