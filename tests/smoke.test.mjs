import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function readText(file) {
  return readFile(path.join(root, file), 'utf8');
}

async function readJson(file) {
  return JSON.parse(await readText(file));
}

test('scripts and dependencies are wired', async () => {
  const pkg = await readJson('package.json');

  assert.equal(pkg.private, true);
  assert.equal(pkg.type, 'module');
  assert.equal(pkg.engines.node, '>=20');
  assert.deepEqual(Object.keys(pkg.scripts).sort(), ['build', 'check', 'lint', 'test']);
  assert.equal(pkg.scripts.test, 'node --test');
  assert.equal(pkg.scripts.lint, 'designmd lint DESIGN.md');
  assert.match(pkg.scripts.build, /scripts\/build\.mjs/);
  assert.equal(pkg.scripts.check, 'npm run build && git diff --exit-code -- dist');
  assert.equal(pkg.devDependencies['@google/design.md'], '0.4.0');
  assert.equal(pkg.devDependencies.yaml, '2.8.1');

  // .superlite/ is gitignored, so the runner config is validated where it exists
  // (local runs) and skipped on a clean checkout.
  let cmd = null;
  try {
    cmd = await readJson('.superlite/test-cmd.json');
  } catch (error) {
    assert.equal(error.code, 'ENOENT');
  }
  if (cmd) {
    for (const key of ['language', 'test', 'test_file', 'junit', 'setup']) {
      assert.ok(key in cmd, `test-cmd.json is missing ${key}`);
    }
    assert.equal(cmd.language, 'javascript');
    assert.equal(cmd.test, 'npm test');
    assert.match(cmd.test_file, /^npm test -- \{files\}/);
    assert.match(cmd.setup, /^npm (ci|install)$/);
  }
});

test('git tracks generated tokens', async () => {
  const ignored = (await readText('.gitignore'))
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));

  assert.ok(ignored.includes('node_modules/'));
  assert.ok(ignored.includes('.superlite/'));
  assert.ok(!ignored.some((line) => /^\/?dist\/?$/.test(line)));
});
