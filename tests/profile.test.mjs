import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const profile = readFileSync(
  new URL('../app-profile.template.md', import.meta.url),
  'utf8',
);

const ROLES = [
  'neutral',
  'info',
  'progress',
  'success',
  'warning',
  'danger',
  'disabled',
];

function section(title) {
  const marker = `## ${title}`;
  const start = profile.indexOf(marker);
  assert.ok(start >= 0, `missing section: ${title}`);
  const rest = profile.slice(start + marker.length);
  const end = rest.search(/^## /m);
  return end === -1 ? rest : rest.slice(0, end);
}

function tableHeader(title) {
  const line = section(title)
    .split('\n')
    .find((candidate) => candidate.trim().startsWith('|'));
  assert.ok(line, `${title} has no table`);
  return line
    .split('|')
    .slice(1, -1)
    .map((cell) => cell.trim().toLowerCase());
}

function tableRows(title) {
  return section(title)
    .split('\n')
    .filter((line) => line.trim().startsWith('|'))
    .slice(2)
    .map((line) =>
      line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim().replaceAll('`', '')),
    );
}

function assertColumns(title, columns) {
  const header = tableHeader(title);
  for (const column of columns) {
    assert.ok(header.includes(column), `${title} is missing the ${column} column`);
  }
}

test('profile covers adoption', () => {
  assert.match(profile, /One page per application/);

  assert.deepEqual(
    tableRows('Header').map((row) => row[0].toLowerCase()),
    [
      'application',
      'owner',
      'profile version',
      'review date',
      'design-system version',
      'stack',
    ],
  );
  assertColumns('Records', [
    'record',
    'stable identifier',
    'primary view',
    'key fields',
    'lifecycle owner',
  ]);
  assertColumns('Status vocabulary', [
    'local status',
    'semantic role',
    'meaning',
    'allowed next states',
    'actor',
    'audit entry',
  ]);
  assertColumns('Transitions', ['from', 'action', 'to', 'actor', 'audit entry']);
  assertColumns('Mobile table strategy', [
    'view',
    'strategy 1 / 2 / 3',
    'sticky identifier column',
    'notes',
  ]);
  assertColumns('Exceptions', [
    'rule',
    'reason',
    'scope',
    'owner',
    'review date',
  ]);

  const roles = tableRows('Status vocabulary').map((row) => row[1]);
  assert.deepEqual(
    [...roles].sort(),
    [...ROLES].sort(),
    'each semantic role must appear in exactly one status row',
  );

  for (const strategy of ['Strategy 1', 'Strategy 2', 'Strategy 3']) {
    assert.ok(profile.includes(strategy), `missing mobile ${strategy}`);
  }

  for (const item of [
    '`DESIGN.md` adopted',
    'All statuses mapped',
    'All mutations audited',
    'Keyboard and 200% zoom verified',
    'Exceptions documented',
  ]) {
    assert.ok(profile.includes(item), `missing checklist item: ${item}`);
  }
});
