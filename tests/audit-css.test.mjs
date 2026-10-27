import { test } from 'bun:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { auditCss } from '../skills/t128n-ui-review/scripts/audit-css.mjs';

const AUDIT_SCRIPT = fileURLToPath(
  new URL('../skills/t128n-ui-review/scripts/audit-css.mjs', import.meta.url),
);

const BANNED = `.card {
  box-shadow: 0 1px 2px currentColor;
  background-image: linear-gradient(transparent, currentColor);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  font-size: 10px;
  color: #123456;
}
`;

test('flags banned patterns', () => {
  const findings = auditCss(BANNED);

  assert.deepEqual(
    findings.map(({ rule, line }) => ({ rule, line })),
    [
      { rule: 'no-shadow', line: 2 },
      { rule: 'no-gradient', line: 3 },
      { rule: 'no-blur', line: 4 },
      { rule: 'no-large-radius', line: 5 },
      { rule: 'no-small-type', line: 6 },
      { rule: 'no-hardcoded-color', line: 7 },
    ],
  );
  for (const finding of findings) {
    assert.deepEqual(Object.keys(finding).sort(), ['line', 'message', 'rule', 'severity']);
    assert.equal(finding.severity, 'error');
    assert.ok(finding.message.length > 0, `${finding.rule} needs a message`);
  }
});

test('allows boundaries', () => {
  assert.deepEqual(auditCss('.x { border-radius: 3px; font-size: 12px; }'), []);
});

test('compares radius and type numerically', () => {
  const findings = auditCss(
    '.a { border-radius: 3.5px; }\n.b { font-size: 11.9px; }\n.c { border-top-left-radius: 8px; }',
  );

  assert.deepEqual(
    findings.map(({ rule, line }) => ({ rule, line })),
    [
      { rule: 'no-large-radius', line: 1 },
      { rule: 'no-small-type', line: 2 },
      { rule: 'no-large-radius', line: 3 },
    ],
  );
});

test('ignores comments without shifting lines', () => {
  const source = [
    '/* box-shadow: 0 1px 2px #000;',
    '   border-radius: 8px; */',
    '.x {',
    '  /* font-size: 10px; */',
    '  color: var(--color-text);',
    '}',
  ].join('\n');
  assert.deepEqual(auditCss(source), []);

  const shifted = '/*\n  box-shadow: 0 0 4px #000;\n*/\n.x { font-size: 10px; }';
  assert.deepEqual(
    auditCss(shifted).map(({ rule, line }) => ({ rule, line })),
    [{ rule: 'no-small-type', line: 4 }],
  );
});

test('reads declarations, not selectors or references', () => {
  assert.deepEqual(auditCss('#abc { color: var(--color-text); }'), []);
  assert.deepEqual(auditCss('.x { mask: url(#icon); content: "#123456"; }'), []);
});

test('ignores empty shadows and flags filters', () => {
  assert.deepEqual(auditCss('.x { box-shadow: none; text-shadow: none; }'), []);
  assert.deepEqual(
    auditCss('.x { filter: drop-shadow(0 1px 2px currentColor); }').map(({ rule, line }) => ({
      rule,
      line,
    })),
    [{ rule: 'no-shadow', line: 1 }],
  );
});

test('cli exits', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'audit-css-error-'));
  try {
    const file = join(directory, 'error.css');
    await writeFile(file, '.x { box-shadow: 0 1px 2px #000; }\n');

    const result = spawnSync(process.execPath, [AUDIT_SCRIPT, file], { encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const findings = JSON.parse(result.stdout);
    assert.ok(Array.isArray(findings));
    assert.deepEqual(
      findings.map(({ rule }) => rule),
      ['no-shadow', 'no-hardcoded-color'],
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('cli exits clean', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'audit-css-clean-'));
  try {
    const file = join(directory, 'clean.css');
    await writeFile(file, '.x { border-radius: 3px; font-size: 12px; }\n');

    const result = spawnSync(process.execPath, [AUDIT_SCRIPT, file], { encoding: 'utf8' });
    assert.equal(result.status, 0);
    assert.deepEqual(JSON.parse(result.stdout), []);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
