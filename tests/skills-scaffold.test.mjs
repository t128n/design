import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { test } from 'bun:test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('test_skill_dirs_exist', () => {
  assert.equal(existsSync(path.join(root, 'skills/t128n-ui')), true, 'skills/t128n-ui is missing');
  assert.equal(
    existsSync(path.join(root, 'skills/t128n-ui-review')),
    true,
    'skills/t128n-ui-review is missing',
  );
  assert.equal(existsSync(path.join(root, 'skills/t128n-ui/.gitkeep')), true, 'build skill .gitkeep is missing');
  assert.equal(
    existsSync(path.join(root, 'skills/t128n-ui-review/.gitkeep')),
    true,
    'review skill .gitkeep is missing',
  );
});
