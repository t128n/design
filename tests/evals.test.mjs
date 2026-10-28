import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'bun:test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function readText(file) {
  return readFile(path.join(root, file), 'utf8');
}

const MARKERS = [
  { marker: 'shadow', token: 'box-shadow' },
  { marker: 'card-grid-collapse', token: 'card' },
  { marker: 'color-only-status', token: 'color-only' },
  { marker: 'oversized-radius', token: 'border-radius: 8px' },
  { marker: 'hardcoded-color', token: '#7B45D8' },
  { marker: 'placeholder-only-label', token: 'placeholder=' },
  { marker: 'dead-sort', token: 'aria-sort' },
];

test('eval set is complete', async () => {
  const evals = JSON.parse(await readText('evals/evals.json'));

  assert.ok(Array.isArray(evals), 'evals.json must be an array of evals');
  assert.equal(evals.length, 5, 'the set must have five evals');
  assert.equal(new Set(evals.map((item) => item.id)).size, 5, 'ids must be unique');

  const builds = evals.filter((item) => item.kind === 'build');
  const reviews = evals.filter((item) => item.kind === 'review');
  assert.equal(builds.length, 3, 'three evals must be build prompts');
  assert.equal(reviews.length, 2, 'two evals must be review prompts');

  for (const item of evals) {
    for (const key of ['id', 'kind', 'prompt', 'expected_output']) {
      assert.equal(typeof item[key], 'string', `${item.id} is missing ${key}`);
      assert.ok(item[key].trim().length > 0, `${item.id} has an empty ${key}`);
    }

    assert.match(item.id, /^(build|review)-[a-z0-9-]+$/, `${item.id} is not namespaced`);
    assert.ok(item.id.startsWith(`${item.kind}-`), `${item.id} does not match its kind`);
    assert.match(item.prompt, /t128n/, `${item.id} does not name a t128n context`);
    assert.ok(item.prompt.length >= 160, `${item.id} prompt is too short to be realistic`);
    assert.ok(
      item.expected_output.length >= 120,
      `${item.id} expected output is too short to grade`,
    );
    assert.ok(
      item.expected_output.includes('\n- '),
      `${item.id} expected output must list checkable results`,
    );
  }

  const prompts = evals.map((item) => item.prompt.toLowerCase()).join('\n');
  for (const topic of ['deployment', 'record', 'form']) {
    assert.ok(prompts.includes(topic), `the build set is missing a ${topic} prompt`);
  }
  for (const topic of ['audit', 'conformance']) {
    assert.ok(prompts.includes(topic), `the review set is missing a ${topic} prompt`);
  }

  // Rebrand: build prompts name t128n's personal design system, never the product phrase.
  assert.ok(
    prompts.includes("t128n's personal design system"),
    'build prompts must name t128n\'s personal design system',
  );
  assert.ok(
    !prompts.includes('t128n design system'),
    'prompts must not use the product phrase "t128n design system"',
  );

  // Paths: every cited DESIGN.md path resolves inside the skill, never the root.
  const cited = evals
    .map((item) => `${item.prompt}\n${item.expected_output}`)
    .join('\n');
  assert.ok(
    cited.includes('skills/t128n-ui/references/DESIGN.md'),
    'evals must cite the skill DESIGN.md path',
  );
  assert.equal(
    cited.split('references/DESIGN.md').length - 1,
    cited.split('skills/t128n-ui/references/DESIGN.md').length - 1,
    'every references/DESIGN.md citation must be the skill-internal path',
  );
});

test('fixture is broken', async () => {
  const html = await readText('evals/fixtures/broken-page.html');

  assert.equal(
    (html.match(/t128n-eval:/g) ?? []).length,
    MARKERS.length,
    'the fixture must carry exactly seven marker comments',
  );
  assert.equal(
    new Set(MARKERS.map((item) => item.marker)).size,
    MARKERS.length,
    'the marker list must be unique',
  );

  for (const { marker, token } of MARKERS) {
    const comment = `t128n-eval: ${marker}`;
    const at = html.indexOf(comment);
    assert.ok(at >= 0, `the fixture is missing the ${marker} marker comment`);
    assert.ok(
      html.slice(Math.max(0, at - 400), at + 400).includes(token),
      `the fixture marker ${marker} is not next to ${token}`,
    );
  }

  const cardAt = html.indexOf('t128n-eval: card-grid-collapse');
  assert.match(
    html.slice(cardAt, cardAt + 400),
    /display:\s*grid[\s\S]*grid-template-columns/,
    'the card-grid marker must sit next to the collapsing grid rule',
  );
  const shadowLine = html
    .split('\n')
    .find((line) => line.includes('box-shadow'));
  assert.ok(shadowLine, 'the fixture must carry a shadow declaration');
  assert.doesNotMatch(
    shadowLine,
    /#[0-9a-f]{3,8}\b|rgba?\(/i,
    'the shadow must not add a second hard-coded color violation',
  );

  assert.match(html, /class="status-color-only" aria-hidden="true"/, 'the status dot must carry no text');
  assert.match(html, /<th aria-sort="ascending">/, 'the dead sort must expose an aria-sort state');
  assert.doesNotMatch(html, /addEventListener|onclick=/, 'the fixture controls must be dead');

  assert.match(html, /<!doctype html>/i, 'the fixture must be a standalone page');
  assert.match(html, /<style>/, 'the fixture must carry its own CSS');
  assert.doesNotMatch(html, /<script[^>]+src=/, 'the fixture must not depend on external scripts');
});

test('readme documents runs', async () => {
  const readme = await readText('evals/README.md');

  assert.match(readme, /with[- ]skill/i, 'README must explain the with-skill run');
  assert.match(readme, /baseline|without the skill/i, 'README must explain the baseline run');
  assert.match(readme, /workspace/i, 'README must say where outputs go');
  assert.match(readme, /t128n-ui\b/, 'README must name the skill');
  assert.doesNotMatch(readme, /t128n-ui-review/, 'README must not name a separate review skill');
  assert.match(readme, /evals\.json/, 'README must point at the eval set');
  assert.match(readme, /evals\/fixtures\/broken-page\.html/, 'README must point at the fixture');
  assert.match(readme, /skills\/t128n-ui\/references\/DESIGN\.md/, 'README must point at the skill DESIGN.md');
  assert.match(readme, /skills\/t128n-ui\/assets\//, 'README must point at the skill assets');
});

test('readme documents markers and review grading', async () => {
  const readme = await readText('evals/README.md');

  assert.match(readme, /\/\* t128n-eval: name \*\//, 'README must document the CSS marker form');
  assert.match(readme, /<!-- t128n-eval: name -->/, 'README must document the markup marker form');
  assert.match(readme, /t128n-eval: <name>/, 'README must document the matched marker substring');

  assert.match(readme, /necessary but not\s+sufficient/, 'README must say the count alone does not pass');
  assert.match(
    readme,
    /without a `skills\/t128n-ui\/references\/DESIGN\.md` rule/,
    'README must fail a report that lists findings without a skills/t128n-ui/references/DESIGN.md rule',
  );

  const evals = JSON.parse(await readText('evals/evals.json'));
  const review = evals.find((item) => item.id === 'review-broken-page-conformance');

  assert.ok(review, 'the broken-page review eval must exist');
  assert.match(review.expected_output, /Primary: each finding cites/, 'the review eval must lead with rule citation');
  assert.match(review.expected_output, /skills\/t128n-ui\/references\/DESIGN\.md rule/, 'the review eval must require a skills/t128n-ui/references/DESIGN.md rule per finding');
  assert.match(review.expected_output, /smallest fix/, 'the review eval must require the smallest fix');
  assert.match(
    review.expected_output,
    /necessary but not\s+sufficient/,
    'the review eval must say the count alone does not pass',
  );
});
