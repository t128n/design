// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

import { spawnSync } from 'node:child_process';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';

const root = join(import.meta.dir, '..');
const dist = join(root, 'dist');
const typesDir = join(root, '.svelte-package');

const run = (command: string, args: string[]) => {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit' });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

// Vite produces the single bundled ES entry and extracts one complete stylesheet.
// svelte-package only contributes type declarations; the components use `~icons`
// virtual imports that consumers cannot resolve from unbundled output.
run('bunx', ['vite', 'build']);

await rm(typesDir, { recursive: true, force: true });
run('bunx', ['svelte-package', '--input', 'src', '--output', '.svelte-package']);

const copyDeclarations = async (source: string, target: string): Promise<void> => {
  const entries = await readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    const from = join(source, entry.name);
    const to = join(target, entry.name);

    if (entry.isDirectory()) {
      // Stories are not part of the public entry; keep the package surface small.
      if (entry.name === 'stories') continue;
      await copyDeclarations(from, to);
      continue;
    }

    // `ambient.d.ts` only describes the `~icons` virtual modules for local
    // compilation; consumers must not resolve it from the published package.
    if (!entry.name.endsWith('.d.ts') || entry.name === 'ambient.d.ts') continue;

    const declaration = (await readFile(from, 'utf8')).replace(
      /\/\/# sourceMappingURL=.*\n?$/,
      ''
    );

    await mkdir(dirname(to), { recursive: true });
    await writeFile(to, declaration);
    process.stdout.write(`types ${relative(root, to)}\n`);
  }
};

await copyDeclarations(typesDir, dist);
await rm(typesDir, { recursive: true, force: true });
