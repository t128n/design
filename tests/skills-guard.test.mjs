import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'bun:test';
import { YAML } from 'bun';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SKILLS = [
  { dir: 'skills/t128n-ui', name: 't128n-ui' },
  { dir: 'skills/t128n-ui-review', name: 't128n-ui-review' },
];
const CANONICAL = ['DESIGN.md', 'dist/tokens.css', 'dist/layouts.css'];

// A skill is a pointer. These patterns catch a fork of the design source, not
// ordinary rule language such as "no radius above 3px" or "text below 12px".
const HEX = /#[0-9a-f]{3,8}\b/i;
const TOKEN_DECLARATION = /(?:^|[;{])\s*--(?:color|space|radius)-[\w-]*\s*:/im;
const TOKEN_VALUE =
  /--(?:color|space|radius)-[\w-]*\s*:\s*(?:#[0-9a-f]{3,8}\b|\d+(?:\.\d+)?(?:px|rem|em|%)\b|(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color|var)\([^)\n]*\))/i;
const TOKEN_TABLE =
  /^\s*\|[^\n]*--(?:color|space|radius)-[\w-]*[^\n]*\|\s*[^|\n]*(?:#[0-9a-f]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em)\b|\b(?:rgba?|hsla?)\()/im;
const T128N_BLOCK = /(?:^|[{;])\s*\.t128n-[\w-]+[^\n{}]*\{/m;

const PATH_TOKEN = /^(?:[\w.-]+\/)+[\w.-]*$/;
const FILE_TOKEN = /^[\w.-]+\.(?:md|css|mjs|js|json|svelte|html)$/;
const LINE_SUFFIX = /:\d+(?:-\d+)?$/;

function pointerViolations(text) {
  const violations = [];
  if (HEX.test(text)) violations.push('hex colour');
  if (TOKEN_DECLARATION.test(text) || TOKEN_VALUE.test(text)) {
    violations.push('token declaration');
  }
  if (TOKEN_TABLE.test(text)) violations.push('token table');
  if (T128N_BLOCK.test(text)) violations.push('t128n CSS block');
  return violations;
}

function frontmatter(source, label) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source);
  assert.ok(match, `${label} has no YAML frontmatter`);
  return YAML.parse(match[1]);
}

function citedPaths(markdown) {
  const found = new Set();
  for (const match of markdown.matchAll(/`([^`\n]+)`/g)) {
    const cited = match[1].trim().replace(LINE_SUFFIX, '');
    if (PATH_TOKEN.test(cited) || FILE_TOKEN.test(cited)) found.add(cited);
  }
  return [...found];
}

function hash(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolute)));
    else if (entry.isFile()) files.push(absolute);
  }
  return files.sort();
}

async function skillFiles(onlyMarkdown = false) {
  const files = [];
  for (const skill of SKILLS) {
    const directory = path.join(root, skill.dir);
    assert.ok(existsSync(directory), `${skill.dir} is missing`);
    for (const absolute of await walk(directory)) {
      if (onlyMarkdown && !absolute.endsWith('.md')) continue;
      files.push({
        skill,
        absolute,
        file: path.relative(root, absolute),
        text: await readFile(absolute, 'utf8'),
      });
    }
  }
  return files;
}

test('skills are pointers', async () => {
  for (const skill of SKILLS) {
    const label = `${skill.dir}/SKILL.md`;
    const absolute = path.join(root, skill.dir, 'SKILL.md');
    assert.ok(existsSync(absolute), `${label} is missing`);
    const source = await readFile(absolute, 'utf8');
    const meta = frontmatter(source, label);

    assert.equal(meta.name, skill.name, `${label} must be named ${skill.name}`);
    assert.equal(typeof meta.description, 'string', `${label} needs a description`);
    assert.ok(meta.description.trim().length > 0, `${label} description is empty`);

    const lines = source.split('\n').length;
    assert.ok(lines < 500, `${label} is ${lines} lines, must stay under 500`);
  }

  for (const { file, text } of await skillFiles()) {
    assert.deepEqual(
      pointerViolations(text),
      [],
      `${file} must point at the design source, not copy it`,
    );
  }
});

test('canonical paths exist', async () => {
  for (const relative of CANONICAL) {
    assert.ok(existsSync(path.join(root, relative)), `${relative} is missing`);
  }
  assert.ok(
    !existsSync(path.join(root, 'layouts.css')),
    'root layouts.css must be deleted; dist/layouts.css is the artifact',
  );

  for (const { file, text } of await skillFiles(true)) {
    assert.doesNotMatch(
      text,
      /(?<![\w-])(?<!dist\/)layouts\.css\b/,
      `${file} cites root layouts.css; use dist/layouts.css`,
    );

    for (const cited of citedPaths(text)) {
      if (/^(?:DESIGN\.md|dist\/|preview\/|skills\/)/.test(cited)) {
        assert.ok(
          existsSync(path.join(root, cited)),
          `${file} cites missing canonical path ${cited}`,
        );
      }
      if (/(?:^|\/)layouts\.css$/.test(cited)) {
        assert.equal(
          cited,
          'dist/layouts.css',
          `${file} cites ${cited}; the only layout artifact is dist/layouts.css`,
        );
      }
    }
  }
});

test('no duplicated artifact', async () => {
  const artifact = path.join(root, 'dist/layouts.css');
  assert.ok(existsSync(artifact), 'dist/layouts.css is missing');

  const layouts = await readFile(artifact, 'utf8');
  const layoutsHash = hash(layouts);
  const body = layouts.replace(/^\/\*[\s\S]*?\*\/\s*/, '').trimEnd();
  assert.ok(body.length > 0, 'dist/layouts.css has no CSS body');

  for (const { file, text } of await skillFiles()) {
    assert.notEqual(
      hash(text),
      layoutsHash,
      `${file} is byte-identical to dist/layouts.css`,
    );
    assert.ok(
      !text.includes(body),
      `${file} embeds the generated layout body`,
    );
  }
});

test('cited references exist', async () => {
  let citations = 0;

  for (const { skill, file, text } of await skillFiles(true)) {
    const skillRoot = path.resolve(root, skill.dir);
    for (const cited of citedPaths(text)) {
      if (!/^(?:references|scripts)\//.test(cited)) continue;

      citations += 1;
      const absolute = path.resolve(skillRoot, cited);
      assert.ok(
        absolute.startsWith(`${skillRoot}${path.sep}`),
        `${file} cites ${cited} outside ${skill.dir}`,
      );
      assert.ok(
        existsSync(absolute),
        `${file} cites ${cited}, which is missing under ${skill.dir}`,
      );
    }
  }

  assert.ok(citations > 0, 'skills cite at least one reference or script');
});

test('rule thresholds are not token tables', () => {
  for (const text of [
    'No radius above 3px. Text below 12px fails.',
    'Keep focus visible at 200% zoom.',
    'Use a rule, tint, or spacing instead of a shadow.',
    'Never write `--color-primary:` as a local value.',
  ]) {
    assert.deepEqual(
      pointerViolations(text),
      [],
      `legitimate rule language must pass: ${text}`,
    );
  }

  assert.ok(
    pointerViolations('--color-primary: #2e63cc;').includes('token declaration'),
    'a copied token declaration must fail',
  );
  assert.ok(
    pointerViolations('Never copy --space-md: 8px.').includes(
      'token declaration',
    ),
    'an inline copied token value must fail',
  );
  assert.ok(
    pointerViolations('| `--space-md` | 8px |').includes('token table'),
    'a copied token table must fail',
  );
  assert.ok(
    pointerViolations('.t128n-page {\n  display: grid;\n}').includes(
      't128n CSS block',
    ),
    'a copied layout block must fail',
  );
});
