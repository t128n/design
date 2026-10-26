import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const profile = readFileSync(
  new URL('../app-profile.template.md', import.meta.url),
  'utf8',
);

test('profile covers adoption', () => {
  for (const role of [
    'neutral',
    'info',
    'progress',
    'success',
    'warning',
    'danger',
    'disabled',
  ]) {
    assert.ok(profile.includes(role), `missing semantic role: ${role}`);
  }

  for (const strategy of ['Strategy 1', 'Strategy 2', 'Strategy 3']) {
    assert.ok(profile.includes(strategy), `missing mobile ${strategy}`);
  }

  for (const field of ['Rule', 'Reason', 'Scope', 'Owner', 'Review date']) {
    assert.ok(profile.includes(field), `missing exception field: ${field}`);
  }

  for (const item of ['design.md', '200%', 'keyboard', 'exceptions']) {
    assert.ok(
      profile.toLowerCase().includes(item),
      `missing checklist item: ${item}`,
    );
  }
});
