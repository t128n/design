// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Add the SPDX header to tracked files that are missing it.
 *
 * `reuse annotate` covers every commentable file type except MDX, whose only
 * valid comment is a JSX comment, and the Dockerfile, whose `# syntax`
 * directive must stay on line 1. This script fills those two gaps and lets
 * `reuse annotate` handle everything else.
 *
 *   bun run license:fix
 *
 * The License fix workflow runs the same command on a schedule.
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const holder = 't128n Torben Haack';
const license = 'MPL-2.0';
const year = String(new Date().getFullYear());
const notice = [
  'This Source Code Form is subject to the terms of the Mozilla Public',
  'License, v. 2.0. If a copy of the MPL was not distributed with this',
  'file, You can obtain one at https://mozilla.org/MPL/2.0/.'
];

const lint = spawnSync('reuse', ['lint', '--json'], { cwd: root, encoding: 'utf8' });
if (lint.error) {
  console.error(
    'reuse is not installed. Install it with `pipx install reuse` or `brew install reuse`.'
  );
  process.exit(1);
}

const report = (() => {
  try {
    return JSON.parse(lint.stdout) as {
      non_compliant: {
        missing_copyright_info?: string[];
        missing_licensing_info?: string[];
      };
    };
  } catch {
    console.error(lint.stdout || lint.stderr);
    process.exit(1);
  }
})();
const missing = [
  ...new Set([
    ...(report.non_compliant.missing_copyright_info ?? []),
    ...(report.non_compliant.missing_licensing_info ?? [])
  ])
].sort();

if (missing.length === 0) {
  if (lint.status !== 0) {
    console.error('reuse lint failed for a reason other than missing headers:');
    console.error(lint.stdout || lint.stderr);
    process.exit(1);
  }
  console.log('All tracked files declare their copyright and license.');
  process.exit(0);
}

const mdx = missing.filter((file) => file.endsWith('.mdx'));
const dockerfiles = missing.filter((file) => file.endsWith('Dockerfile'));
const rest = missing.filter((file) => !mdx.includes(file) && !dockerfiles.includes(file));

if (rest.length > 0) {
  const result = spawnSync(
    'reuse',
    [
      'annotate',
      '--copyright',
      holder,
      '--license',
      license,
      '--year',
      year,
      '--template',
      'mpl',
      '--skip-unrecognised',
      ...rest
    ],
    { cwd: root, stdio: 'inherit' }
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
}

const jsxHeader = `{/*\nSPDX-FileCopyrightText: ${year} ${holder}\n\nSPDX-License-Identifier: ${license}\n\n${notice.join('\n')}\n*/}\n\n`;
for (const file of mdx) {
  const path = join(root, file);
  const source = readFileSync(path, 'utf8');
  if (source.includes('SPDX-License-Identifier')) continue;
  writeFileSync(path, jsxHeader + source);
}

const hashHeader = `# SPDX-FileCopyrightText: ${year} ${holder}\n#\n# SPDX-License-Identifier: ${license}\n#\n${notice.map((line) => `# ${line}`).join('\n')}\n\n`;
for (const file of dockerfiles) {
  const path = join(root, file);
  const source = readFileSync(path, 'utf8');
  if (source.includes('SPDX-License-Identifier')) continue;
  if (source.startsWith('# syntax=')) {
    const newline = source.indexOf('\n');
    const head = source.slice(0, newline + 1);
    const body = source.slice(newline + 1).replace(/^\n/, '');
    writeFileSync(path, `${head}\n${hashHeader}${body}`);
  } else {
    writeFileSync(path, hashHeader + source);
  }
}

console.log(`Added headers to ${missing.length} file(s).`);
