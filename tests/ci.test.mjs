import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

const source = readFileSync(
  new URL('../.github/workflows/design.yml', import.meta.url),
  'utf8',
);

test('workflow gates the repo', () => {
  const workflow = parse(source);

  // Triggers: push and pull_request (an empty trigger value parses as null).
  const triggers = workflow.on;
  assert.ok(triggers && typeof triggers === 'object', 'workflow needs on triggers');
  assert.ok(Object.hasOwn(triggers, 'push'), 'workflow must run on push');
  assert.ok(
    Object.hasOwn(triggers, 'pull_request'),
    'workflow must run on pull_request',
  );

  // Read-only token: no write scope anywhere in the workflow.
  assert.equal(workflow.permissions.contents, 'read');
  assert.ok(
    !/write/.test(JSON.stringify(workflow.permissions)),
    'workflow must not grant write permission',
  );

  const jobs = Object.values(workflow.jobs);
  const steps = jobs.flatMap((job) => job.steps ?? []);
  const uses = steps.map((step) => step.uses).filter(Boolean);
  const runs = steps.map((step) => step.run).filter(Boolean);

  assert.ok(uses.includes('actions/checkout@v4'), 'missing checkout@v4');

  const setup = steps.find((step) => step.uses === 'actions/setup-node@v4');
  assert.ok(setup, 'missing setup-node@v4');
  assert.equal(String(setup.with?.['node-version']), '24');
  assert.equal(setup.with?.cache, 'npm');

  for (const command of ['npm ci', 'npm test', 'npm run check']) {
    assert.ok(runs.includes(command), `missing run step: ${command}`);
  }

  // No publish or deploy side effects.
  assert.ok(!/publish|deploy/.test(source), 'workflow must not publish or deploy');
});
