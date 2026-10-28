import { test } from 'bun:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const designPath = path.join(root, 'skills', 't128n-ui', 'references', 'DESIGN.md');

const SUBSECTIONS = [
  'Platform-first',
  'Controls and affordances',
  'Forms',
  'Records and tables',
  'Status and feedback',
  'Navigation and task flow',
  'Accessibility baseline',
  'Content',
  'Conformance checklist',
];

const CHECKS = [
  'Platform fit',
  'Form states',
  'Table states',
  'Error recovery',
  'Keyboard flow',
  'Status clarity',
  'Scope',
];

async function readBody() {
  const markdown = await readFile(designPath, 'utf8');
  const match = markdown.match(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/);
  assert.ok(match, 'DESIGN.md must begin with a YAML front matter block');
  return markdown.slice(match[0].length);
}

function section(body, name) {
  const marker = `## ${name}`;
  const start = body.indexOf(marker);
  assert.notEqual(start, -1, `missing section: ${name}`);
  const rest = body.slice(start + marker.length);
  const end = rest.search(/^## /m);
  return end === -1 ? rest : rest.slice(0, end);
}

function subsection(body, name) {
  const marker = `### ${name}`;
  const start = body.indexOf(marker);
  assert.notEqual(start, -1, `missing subsection: ${name}`);
  const rest = body.slice(start + marker.length);
  const end = rest.search(/^###? /m);
  return end === -1 ? rest : rest.slice(0, end);
}

test('interaction standards sit between components and the do and do not summary', async () => {
  const body = await readBody();
  const standards = body.indexOf('## Interaction Standards');

  assert.ok(standards > body.indexOf('## Components'), 'Interaction Standards must follow Components');
  assert.ok(standards < body.indexOf("## Do's and Don'ts"), 'Interaction Standards must precede Do\'s and Don\'ts');

  const headings = [...section(body, 'Interaction Standards').matchAll(/^###[ \t]+(.+?)[ \t]*$/gm)].map(
    (match) => match[1],
  );
  assert.deepEqual(headings, SUBSECTIONS);
});

test('platform-first prefers native elements before script', async () => {
  const text = subsection(await readBody(), 'Platform-first');

  for (const element of ['`button`', '`a href`', '`form`', '`input`', '`select`', '`table`', '`dialog`', '`details`', '`summary`']) {
    assert.ok(text.includes(element), `Platform-first must name the native element ${element}`);
  }

  for (const requirement of [
    'CSS owns presentation',
    'native HTML owns the behavior and state the platform can express',
    'the native capability that was rejected',
    'record a lasting exception in the Application Profile',
    'validation source of truth',
    'Each view answers one question',
    'Prefer deleting markup',
    'scripts disabled',
  ]) {
    assert.ok(text.includes(requirement), `Platform-first is missing: ${requirement}`);
  }
});

test('controls and forms require visible state and recoverable errors', async () => {
  const body = await readBody();
  const controls = subsection(body, 'Controls and affordances');
  const forms = subsection(body, 'Forms');

  for (const requirement of [
    'label, its current state, and the result',
    'accessible name',
    'One primary action per view',
    'Read-only fields stay focusable',
    'Never use disabled to mean',
  ]) {
    assert.ok(controls.includes(requirement), `Controls is missing: ${requirement}`);
  }

  for (const requirement of [
    'Labels are always visible',
    'placeholders may show an example but never replace the label',
    'Validate on submit with native constraint attributes',
    'every message derives from the constraint',
    'mirror each failure inline beside its field',
    'Inline mirroring, blur validation, and moving focus to the first invalid field are script exceptions',
    'what is wrong and how to fix it',
    'keep every value',
    'focus the first invalid field',
    'never clear input',
  ]) {
    assert.ok(forms.toLowerCase().includes(requirement.toLowerCase()), `Forms is missing: ${requirement}`);
  }
});

test('records and tables cover states, bulk selection, and long values', async () => {
  const text = subsection(await readBody(), 'Records and tables');

  for (const requirement of [
    'identifier column first and sticky',
    'aria-sort',
    'empty, loading, error, and no-results',
    'next action',
    'plain text row, never an animated gradient',
    'indeterminate state',
    'names the scope',
    'destructive ones confirm',
    'full value in the accessible name',
  ]) {
    assert.ok(text.includes(requirement), `Records and tables is missing: ${requirement}`);
  }
});

test('status and feedback lead with recovery and preserve work', async () => {
  const text = subsection(await readBody(), 'Status and feedback');

  for (const requirement of [
    'seven semantic roles',
    'Every status includes text',
    'A badge without a label is a defect',
    'what failed, what to do next, and what was preserved',
    'never only in a transient toast',
    'Transient messages confirm completed work',
    'Never report success before the server confirms it',
  ]) {
    assert.ok(text.includes(requirement), `Status and feedback is missing: ${requirement}`);
  }
});

test('navigation keeps position, disclosure, and multi-step tasks predictable', async () => {
  const text = subsection(await readBody(), 'Navigation and task flow');

  for (const requirement of [
    'filters, sort, and position intact',
    'dirty form confirms before discarding',
    'collapsed by default',
    'never hide required fields',
    'Step 2 of 4',
    'save and resume',
    'no dead end',
  ]) {
    assert.ok(text.includes(requirement), `Navigation and task flow is missing: ${requirement}`);
  }
});

test('accessibility baseline and content stay operational', async () => {
  const body = await readBody();
  const a11y = subsection(body, 'Accessibility baseline');
  const content = subsection(body, 'Content');

  for (const requirement of [
    'keyboard alone',
    'logical tab order',
    'visible focus indicator',
    '4.5:1',
    '3:1',
    '24px',
    '44px',
    '200%',
    'reduced-motion',
  ]) {
    assert.ok(a11y.includes(requirement), `Accessibility baseline is missing: ${requirement}`);
  }

  for (const requirement of [
    'Save changes',
    'Delete 3 records',
    'not "Submit"',
    'one term per concept',
    'sentence case',
    'what happened, what it affects, what to do next',
  ]) {
    assert.ok(content.includes(requirement), `Content is missing: ${requirement}`);
  }
});

test('conformance checklist names every blocking check', async () => {
  const text = subsection(await readBody(), 'Conformance checklist');
  const rows = text
    .split(/\r?\n/)
    .filter((line) => line.startsWith('| '))
    .slice(2)
    .map((line) => line.split('|').slice(1, -1).map((cell) => cell.trim()));

  assert.deepEqual(
    rows.map((cells) => cells[0]),
    CHECKS,
  );

  for (const cells of rows) {
    assert.equal(cells.length, 2, `checklist row needs a check and a pass condition: ${cells[0]}`);
    assert.ok(cells[1].length > 20, `checklist row has no pass condition: ${cells[0]}`);
  }
});

test('the two rule sets cross-link', async () => {
  const body = await readBody();
  const integrity = subsection(body, 'Interface Integrity');
  const standards = section(body, 'Interaction Standards');

  assert.ok(integrity.includes('Interaction Standards'), 'Interface Integrity must point at Interaction Standards');
  assert.ok(standards.includes('Interface Integrity'), 'Interaction Standards must point back at Interface Integrity');
});
