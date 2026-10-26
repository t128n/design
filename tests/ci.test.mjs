import { test } from 'bun:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { YAML } from 'bun';

const source = readFileSync(
  new URL('../.github/workflows/design.yml', import.meta.url),
  'utf8',
);
const pagesSource = readFileSync(
  new URL('../.github/workflows/pages.yml', import.meta.url),
  'utf8',
);

function assertGatedWorkflow(workflow, text) {
  // Triggers: push and pull_request (an empty trigger value parses as null).
  const triggers = workflow.on;
  assert.ok(triggers && typeof triggers === 'object', 'workflow needs on triggers');
  for (const event of ['push', 'pull_request']) {
    assert.ok(
      Object.hasOwn(triggers, event),
      `workflow must run on ${event}`,
    );
    assert.notEqual(
      triggers[event],
      false,
      `workflow must not disable the ${event} trigger`,
    );
  }

  // Read-only token: no write scope on the workflow or on any job.
  assert.ok(workflow.permissions, 'workflow must declare permissions');
  assert.equal(workflow.permissions.contents, 'read');
  const permissionBlocks = [
    workflow.permissions,
    ...Object.values(workflow.jobs ?? {}).map((job) => job.permissions),
  ].filter(Boolean);
  for (const block of permissionBlocks) {
    assert.ok(
      !/write/.test(JSON.stringify(block)),
      `workflow must not grant write permission: ${JSON.stringify(block)}`,
    );
  }

  const jobs = Object.values(workflow.jobs ?? {});
  assert.ok(jobs.length > 0, 'workflow needs at least one job');
  const steps = jobs.flatMap((job) => job.steps ?? []);
  const uses = steps.map((step) => step.uses).filter(Boolean);
  const runs = steps.map((step) => step.run).filter(Boolean);

  assert.ok(uses.includes('actions/checkout@v4'), 'missing checkout@v4');

  const setup = steps.find((step) => step.uses === 'oven-sh/setup-bun@v2');
  assert.ok(setup, 'missing oven-sh/setup-bun@v2');
  assert.equal(String(setup.with?.['bun-version']), '1.4.3');

  // The frozen install must finish before the test and check steps consume it.
  const commands = ['bun install --frozen-lockfile', 'bun test', 'bun run check'];
  const positions = commands.map((command) => runs.indexOf(command));
  positions.forEach((position, index) => {
    assert.notEqual(position, -1, `missing run step: ${commands[index]}`);
  });
  assert.deepEqual(
    positions,
    [...positions].sort((a, b) => a - b),
    `run steps must be ordered: ${commands.join(', ')}`,
  );

  // No publish or deploy side effects.
  assert.ok(!/publish|deploy/i.test(text), 'workflow must not publish or deploy');
}

test('workflow gates the repo', () => {
  assertGatedWorkflow(YAML.parse(source), source);
});

test('job-level write permission is rejected', () => {
  const workflow = YAML.parse(source);
  workflow.jobs.verify.permissions = { contents: 'write' };

  assert.throws(
    () => assertGatedWorkflow(workflow, source),
    /must not grant write permission/,
  );
});

test('disabled triggers and out-of-order run steps are rejected', () => {
  const disabled = YAML.parse(source);
  disabled.on.push = false;
  assert.throws(
    () => assertGatedWorkflow(disabled, source),
    /must not disable the push trigger/,
  );

  const reordered = YAML.parse(source);
  const steps = reordered.jobs.verify.steps;
  const install = steps.findIndex(
    (step) => step.run === 'bun install --frozen-lockfile',
  );
  steps.push(...steps.splice(install, 1));
  assert.throws(
    () => assertGatedWorkflow(reordered, source),
    /run steps must be ordered/,
  );
});

test('pages workflow deploys the preview', () => {
  const workflow = YAML.parse(pagesSource);

  assert.ok(workflow.on.push, 'pages workflow must run on push');
  assert.ok(workflow.on.workflow_dispatch !== undefined, 'pages workflow needs manual dispatch');
  assert.equal(workflow.permissions.contents, 'read');
  assert.equal(workflow.permissions.pages, 'write');
  assert.equal(workflow.permissions['id-token'], 'write');

  const job = Object.values(workflow.jobs ?? {})[0];
  assert.equal(job.environment?.name, 'github-pages');
  const steps = job.steps ?? [];
  const uses = steps.map((step) => step.uses).filter(Boolean);
  const runs = steps.map((step) => step.run).filter(Boolean);

  for (const action of [
    'actions/checkout@v4',
    'oven-sh/setup-bun@v2',
    'actions/configure-pages@v5',
    'actions/upload-pages-artifact@v3',
    'actions/deploy-pages@v4',
  ]) {
    assert.ok(uses.includes(action), `missing ${action}`);
  }

  assert.ok(runs.includes('bun install --frozen-lockfile'));
  assert.ok(runs.includes('bun run check'));
  assert.ok(runs.includes('bun run preview:build'));

  const upload = steps.find((step) => step.uses === 'actions/upload-pages-artifact@v3');
  assert.equal(upload.with?.path, 'preview/dist');
});
