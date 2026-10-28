import assert from 'node:assert/strict';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { copyFile, mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'bun:test';
import { YAML } from 'bun';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKILL_ROOT = path.join(root, 'skills', 't128n-ui');
const BUN = process.execPath;

// A skill is a pointer. These patterns catch a fork of the design source, not
// ordinary rule language such as "no radius above 3px" or "text below 12px".
const HEX = /#[0-9a-f]{3,8}\b/i;
const TOKEN_DECLARATION = /(?:^|[;{])\s*--(?:color|space|radius)-[\w-]*\s*:/im;
const TOKEN_VALUE =
  /--(?:color|space|radius)-[\w-]*\s*:\s*(?:#[0-9a-f]{3,8}\b|\d+(?:\.\d+)?(?:px|rem|em|%)\b|(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color|var)\([^)\n]*\))/i;
const TOKEN_TABLE =
  /^\s*\|[^\n]*--(?:color|space|radius)-[\w-]*[^\n]*\|\s*[^|\n]*(?:#[0-9a-f]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em)\b|\b(?:rgba?|hsla?)\()/im;
const T128N_BLOCK = /\.t128n-[\w-]+[^\n{}]*\{/;

// A citation is a relative path (contains a slash) or a bare file with a known
// extension. A `file:line` evidence reference such as `records-table.svelte:41`
// is not a skill citation, so it is not collected.
const PATH_TOKEN = /^(?:[\w.-]+\/)+[\w.-]*$/;
const FILE_TOKEN = /^[\w.-]+\.(?:md|css|mjs|js|json|svelte|html)$/;

const NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ALLOWED_FIELDS = ['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools'];

const REQUIRED_COMPONENTS = [
  'SKILL.md',
  'references/DESIGN.md',
  'references/layouts.md',
  'references/records.md',
  'references/forms-and-dialogs.md',
  'references/review.md',
  'references/checklist.md',
  'assets/tokens.css',
  'assets/layouts.css',
  'scripts/build.mjs',
  'scripts/audit-css.mjs',
];

const COPY_EXCLUDED = new Set(['node_modules', '.superlite', 'dist']);

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

// SKILL.md plus every reference except DESIGN.md (the token source itself).
async function instructionFiles() {
  const refs = await readdir(path.join(SKILL_ROOT, 'references'));
  const markdown = refs
    .filter((name) => name.endsWith('.md') && name !== 'DESIGN.md')
    .map((name) => `references/${name}`);
  return ['SKILL.md', ...markdown].sort();
}

function citedPaths(markdown) {
  const found = new Set();
  for (const match of markdown.matchAll(/`([^`\n]+)`/g)) {
    const cited = match[1].trim();
    if (PATH_TOKEN.test(cited) || FILE_TOKEN.test(cited)) found.add(cited);
  }
  return [...found];
}

function externalViolation(cited) {
  if (cited.startsWith('../')) return `${cited} escapes the skill root`;
  if (/^(?:\.\/)?(?:preview|evals|dist)\//.test(cited)) {
    return `${cited} names a root maintainer path`;
  }
  if (/^(?:\.\/)?DESIGN\.md$/.test(cited)) {
    return `${cited} cites root DESIGN.md; use references/DESIGN.md`;
  }
  if (/^(?:\.\/)?(?:tokens|layouts)\.css$/.test(cited)) {
    return `${cited} cites a root asset path; use assets/`;
  }
  return null;
}

// A root skill "tree" is gone when it has no files: an empty leftover directory
// is not tracked by git and is not a skill tree.
function treeIsGone(rel) {
  const target = path.join(root, rel);
  if (!existsSync(target)) return true;
  try {
    if (statSync(target).isDirectory()) return readdirSync(target).length === 0;
  } catch {
    /* fall through to treat as present */
  }
  return false;
}

async function copyTree(src, dest) {
  await mkdir(dest, { recursive: true });
  for (const entry of await readdir(src, { withFileTypes: true })) {
    if (COPY_EXCLUDED.has(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyTree(srcPath, destPath);
    } else if (entry.isFile()) {
      await copyFile(srcPath, destPath);
    }
  }
}

test('frontmatter is strict', async () => {
  const source = await readFile(path.join(SKILL_ROOT, 'SKILL.md'), 'utf8');
  const meta = frontmatter(source, 'SKILL.md');

  for (const key of Object.keys(meta)) {
    assert.ok(
      ALLOWED_FIELDS.includes(key),
      `SKILL.md has a field outside the Agent Skills set: ${key}`,
    );
  }

  assert.equal(typeof meta.name, 'string', 'SKILL.md needs a name');
  assert.equal(meta.name, 't128n-ui', 'name must be t128n-ui');
  assert.equal(meta.name, path.basename(SKILL_ROOT), 'name must equal the skill folder name');
  assert.match(meta.name, NAME_RE, 'name must be lowercase kebab-case');
  assert.ok(meta.name.length >= 1 && meta.name.length <= 64, 'name must be 1-64 chars');

  assert.equal(typeof meta.description, 'string', 'SKILL.md needs a description');
  assert.ok(
    meta.description.length >= 1 && meta.description.length <= 1024,
    'description must be 1-1024 chars',
  );
  const lower = meta.description.toLowerCase();
  assert.ok(lower.includes('personal design system'), 'description must name the personal design system');
  assert.ok(lower.includes('build'), 'description must cover building');
  assert.ok(lower.includes('audit'), 'description must cover auditing');
  assert.ok(lower.includes('conformance'), 'description must cover conformance');
  assert.ok(lower.includes('accessibility'), 'description must cover accessibility');

  if (meta.compatibility !== undefined) {
    assert.equal(typeof meta.compatibility, 'string', 'compatibility must be a string');
    assert.ok(
      meta.compatibility.length >= 1 && meta.compatibility.length <= 500,
      'compatibility must be 1-500 chars',
    );
  }

  if (meta.metadata !== undefined) {
    assert.ok(
      meta.metadata !== null && typeof meta.metadata === 'object' && !Array.isArray(meta.metadata),
      'metadata must be a mapping',
    );
    for (const [key, value] of Object.entries(meta.metadata)) {
      assert.equal(typeof key, 'string', 'metadata keys must be strings');
      assert.equal(typeof value, 'string', 'metadata values must be strings');
    }
  }

  const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
  assert.ok(body.trim().length > 0, 'SKILL.md has a body');
  assert.ok(source.split('\n').length < 500, 'SKILL.md must stay under 500 lines');
});

test('skill has no external citations', async () => {
  let citations = 0;
  for (const rel of await instructionFiles()) {
    const text = await readFile(path.join(SKILL_ROOT, rel), 'utf8');
    for (const cited of citedPaths(text)) {
      citations += 1;
      const violation = externalViolation(cited);
      assert.ok(violation === null, `${rel} has an external citation: ${violation}`);
      assert.ok(
        existsSync(path.join(SKILL_ROOT, cited)),
        `${rel} cites missing path ${cited}`,
      );
    }
  }
  assert.ok(citations > 0, 'expected at least one cited path');
});

test('required components exist', async () => {
  for (const rel of REQUIRED_COMPONENTS) {
    assert.ok(existsSync(path.join(SKILL_ROOT, rel)), `${rel} is missing`);
  }

  const skill = await readFile(path.join(SKILL_ROOT, 'SKILL.md'), 'utf8');
  assert.ok(skill.includes('`references/review.md`'), 'SKILL.md must cite references/review.md directly');
  assert.ok(skill.includes('`references/checklist.md`'), 'SKILL.md must cite references/checklist.md directly');
});

test('root skill trees are gone', () => {
  for (const rel of ['SKILL.md', 'references', 'assets', 'scripts', 'dist']) {
    assert.ok(treeIsGone(rel), `root ${rel} must be gone`);
  }
});

test('instruction files do not copy the spec', async () => {
  for (const rel of await instructionFiles()) {
    const text = await readFile(path.join(SKILL_ROOT, rel), 'utf8');
    assert.deepEqual(
      pointerViolations(text),
      [],
      `${rel} must point at references/DESIGN.md and assets/, not copy token values or CSS`,
    );
  }
});

test('copy guard rejects real copies, not rule language', () => {
  assert.ok(pointerViolations('#2e63cc').includes('hex colour'));
  assert.ok(pointerViolations('--color-primary: #2e63cc;').includes('token declaration'));
  assert.ok(pointerViolations('| `--space-md` | 8px |').includes('token table'));
  assert.ok(
    pointerViolations('.panel, .t128n-page { display: grid; }').includes('t128n CSS block'),
  );
  assert.deepEqual(
    pointerViolations('No radius above 3px. Text below 12px fails. Use rules, not shadows.'),
    [],
    'legitimate rule language must pass',
  );
});

test('copied skill rebuilds and audits', async () => {
  const tmp = await mkdtemp(path.join(tmpdir(), 't128n-skill-'));
  try {
    const skillDir = path.join(tmp, 't128n-ui');
    await copyTree(SKILL_ROOT, skillDir);

    // Force the copy to regenerate both artifacts from its own DESIGN.md.
    await rm(path.join(skillDir, 'assets'), { recursive: true, force: true });

    const build = Bun.spawnSync([BUN, 'scripts/build.mjs'], {
      cwd: skillDir,
      stdout: 'pipe',
      stderr: 'pipe',
    });
    assert.equal(build.exitCode, 0, `build failed: ${build.stderr.toString()}`);

    for (const artifact of ['tokens.css', 'layouts.css']) {
      const generated = await readFile(path.join(skillDir, 'assets', artifact), 'utf8');
      const committed = await readFile(path.join(SKILL_ROOT, 'assets', artifact), 'utf8');
      assert.equal(
        generated,
        committed,
        `copied skill regenerated assets/${artifact} differs from the committed artifact`,
      );
    }

    const shadow = path.join(skillDir, 'shadow.css');
    await writeFile(shadow, '.panel { box-shadow: 0 1px 2px rgba(0,0,0,.2); }\n', 'utf8');
    const audit = Bun.spawnSync([BUN, 'scripts/audit-css.mjs', shadow], {
      cwd: skillDir,
      stdout: 'pipe',
      stderr: 'pipe',
    });
    assert.equal(audit.exitCode, 1, 'audit helper must exit 1 when a shadow is present');
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
});
