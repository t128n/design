import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { test } from 'bun:test';
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
  assert.equal(pkg.engines.bun, '>=1.4.0');
  assert.deepEqual(Object.keys(pkg.scripts).sort(), [
    'build',
    'check',
    'lint',
    'preview:build',
    'preview:dev',
    'preview:serve',
    'test',
  ]);
  assert.equal(pkg.scripts.test, 'bun test');
  assert.equal(pkg.scripts.lint, 'bunx --bun designmd lint DESIGN.md');
  assert.match(pkg.scripts.build, /bun scripts\/build\.mjs/);
  assert.equal(pkg.scripts.check, 'bun run build && git diff --exit-code -- dist');
  assert.match(pkg.scripts['preview:build'], /vite build/);
  assert.equal(pkg.devDependencies['@google/design.md'], '0.4.0');
  assert.equal(pkg.devDependencies['@primer/octicons'], '^19.42.0');
  assert.ok(!('yaml' in pkg.devDependencies), 'yaml is not a dependency');
  assert.ok(existsSync(path.join(root, 'bun.lock')), 'bun.lock is missing');
  assert.ok(!existsSync(path.join(root, 'package-lock.json')), 'package-lock.json should be gone');
  assert.ok(existsSync(path.join(root, 'preview/index.html')), 'preview index is missing');
  assert.ok(existsSync(path.join(root, 'preview/src/App.svelte')), 'preview app is missing');
  assert.ok(existsSync(path.join(root, 'preview/pages/index.html')), 'layout pages are missing');
  assert.ok(existsSync(path.join(root, 'preview/src/pages/layouts.js')), 'layout registry is missing');
  const layoutsArtifact = path.join(root, 'dist/layouts.css');
  assert.ok(existsSync(layoutsArtifact), 'layout artifact is missing');
  assert.ok(
    !existsSync(path.join(root, path.basename(layoutsArtifact))),
    'the root layout source is still present',
  );

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
    assert.equal(cmd.test, 'bun test');
    assert.match(cmd.test_file, /^bun test \{files\}$/);
    assert.match(cmd.setup, /^bun install/);
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
