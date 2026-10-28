import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'bun:test';
import { YAML } from 'bun';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
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

const PATH_TOKEN = /^(?:[\w.-]+\/)+[\w.-]*$/;
const FILE_TOKEN = /^[\w.-]+\.(?:md|css|mjs|js|json|svelte|html)$/;
const LINE_SUFFIX = /:\d+(?:-\d+)?$/;

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
  'preview/pages',
  'evals/fixtures/broken-page.html',
];

const EXCLUDED_REL = new Set([
  '.git',
  'node_modules',
  'docs',
  'tests',
  '.superlite',
  'preview/dist',
]);

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

async function instructionFiles() {
  const refs = await readdir(path.join(root, 'references'));
  const markdown = refs
    .filter((name) => name.endsWith('.md') && name !== 'DESIGN.md')
    .map((name) => `references/${name}`);
  return ['SKILL.md', ...markdown].sort();
}

async function copyTree(src, dest, rel = '') {
  await mkdir(dest, { recursive: true });
  for (const entry of await readdir(src, { withFileTypes: true })) {
    const entryRel = rel ? `${rel}/${entry.name}` : entry.name;
    if (EXCLUDED_REL.has(entryRel)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyTree(srcPath, destPath, entryRel);
    } else if (entry.isFile()) {
      await copyFile(srcPath, destPath);
    }
  }
}

test('frontmatter matches Agent Skills spec', async () => {
  const source = await readFile(path.join(root, 'SKILL.md'), 'utf8');
  const meta = frontmatter(source, 'SKILL.md');

  for (const key of Object.keys(meta)) {
    assert.ok(
      ALLOWED_FIELDS.includes(key),
      `SKILL.md has a field outside the Agent Skills set: ${key}`,
    );
  }

  assert.equal(typeof meta.name, 'string', 'SKILL.md needs a name');
  assert.ok(meta.name.length >= 1 && meta.name.length <= 64, 'name must be 1-64 chars');
  assert.match(meta.name, NAME_RE, 'name must be lowercase kebab-case');
  assert.ok(!/^-|-$|--/.test(meta.name), 'name has no leading, trailing, or double hyphen');

  assert.equal(typeof meta.description, 'string', 'SKILL.md needs a description');
  assert.ok(
    meta.description.length >= 1 && meta.description.length <= 1024,
    'description must be 1-1024 chars',
  );

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

test('staged install name matches frontmatter', async () => {
  const tmp = await mkdtemp(path.join(tmpdir(), 't128n-name-'));
  try {
    const skillDir = path.join(tmp, 't128n-ui');
    await mkdir(skillDir);
    await copyFile(path.join(root, 'SKILL.md'), path.join(skillDir, 'SKILL.md'));
    const source = await readFile(path.join(skillDir, 'SKILL.md'), 'utf8');
    const meta = frontmatter(source, 'staged SKILL.md');
    assert.equal(path.basename(skillDir), meta.name, 'install folder basename must equal the name');
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
});

test('every citation resolves inside the skill', async () => {
  let citations = 0;
  for (const rel of await instructionFiles()) {
    const text = await readFile(path.join(root, rel), 'utf8');
    for (const cited of citedPaths(text)) {
      citations += 1;
      assert.ok(!cited.startsWith('../'), `${rel} cites ${cited}, which escapes the skill root`);
      assert.ok(!/^(dist|skills)\//.test(cited), `${rel} cites obsolete path ${cited}`);
      assert.ok(
        !/^(\.\/)?DESIGN\.md$/.test(cited),
        `${rel} cites root DESIGN.md; use references/DESIGN.md`,
      );
      assert.ok(existsSync(path.join(root, cited)), `${rel} cites missing path ${cited}`);
    }
  }
  assert.ok(citations > 0, 'expected at least one cited path');
});

test('required skill components exist', () => {
  for (const rel of REQUIRED_COMPONENTS) {
    assert.ok(existsSync(path.join(root, rel)), `${rel} is missing`);
  }
});

test('obsolete trees are gone', () => {
  for (const rel of ['skills', 'dist', 'DESIGN.md']) {
    assert.ok(!existsSync(path.join(root, rel)), `obsolete ${rel} must be gone`);
  }
});

test('instruction files do not copy the spec', async () => {
  for (const rel of await instructionFiles()) {
    const text = await readFile(path.join(root, rel), 'utf8');
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

test('install copy rebuilds assets', async () => {
  const tmp = await mkdtemp(path.join(tmpdir(), 't128n-install-'));
  try {
    const skillDir = path.join(tmp, 't128n-ui');
    await copyTree(root, skillDir);

    const build = Bun.spawnSync([BUN, 'scripts/build.mjs'], {
      cwd: skillDir,
      stdout: 'pipe',
      stderr: 'pipe',
    });
    assert.equal(build.exitCode, 0, `build failed: ${build.stderr.toString()}`);

    for (const artifact of ['tokens.css', 'layouts.css']) {
      const generated = await readFile(path.join(skillDir, 'assets', artifact), 'utf8');
      const committed = await readFile(path.join(root, 'assets', artifact), 'utf8');
      assert.equal(
        generated,
        committed,
        `installed copy regenerated assets/${artifact} differs from the committed artifact`,
      );
    }

    const shadow = path.join(tmp, 'shadow.css');
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
