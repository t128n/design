import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'bun:test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('skill docs cover install', async () => {
  const readme = await readFile(path.join(root, 'skills/README.md'), 'utf8');

  for (const required of [
    '`t128n-ui`',
    '`t128n-ui-review`',
    'audit-css.mjs',
    '~/.agents/skills',
    '`DESIGN.md`',
    '`dist/tokens.css`',
    '`dist/layouts.css`',
    '`preview/`',
  ]) {
    assert.ok(
      readme.includes(required),
      `skills README does not mention ${required}`,
    );
  }

  for (const command of [
    'mkdir -p ~/.agents/skills',
    'ln -sfn "$(pwd)/skills/t128n-ui" ~/.agents/skills/t128n-ui',
    'ln -sfn "$(pwd)/skills/t128n-ui-review" ~/.agents/skills/t128n-ui-review',
    'bun skills/t128n-ui-review/scripts/audit-css.mjs path/to/app.css',
    'bun run build',
    'bun run check',
  ]) {
    assert.ok(
      readme.includes(command),
      `skills README does not show: ${command}`,
    );
  }
});
