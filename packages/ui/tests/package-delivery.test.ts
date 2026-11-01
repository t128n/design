// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const uiRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const storiesRoot = join(uiRoot, 'src/stories');

const read = (path: string) => readFile(path, 'utf8');

const storyFiles = async (): Promise<string[]> => {
  const entries = await readdir(storiesRoot, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.stories.svelte'))
    .map((entry) => join(storiesRoot, entry.name));
};

describe('package delivery', () => {
  it('test_story_imports: stories consume components through the public entry', async () => {
    const offenders: string[] = [];

    for (const path of await storyFiles()) {
      const source = await read(path);

      if (/from '\.\.\/lib\//.test(source)) {
        offenders.push(path.slice(uiRoot.length + 1));
      }
    }

    expect(offenders).toEqual([]);

    for (const name of [
      'Popover',
      'AlertDialog',
      'DropdownMenu',
      'NavigationMenu',
      'ContextMenu',
      'Menubar'
    ]) {
      const source = await read(join(storiesRoot, `${name}.stories.svelte`));

      expect(source, name).toContain(`from '../index.js'`);
    }
  });

  it('test_public_entry: imports the complete stylesheet into the bundled build', async () => {
    const index = await read(join(uiRoot, 'src/index.ts'));

    expect(index).toContain("import './styles/index.css'");
  });

  it('test_package_metadata: declares a public, side-effect-aware package', async () => {
    const pkg = JSON.parse(await read(join(uiRoot, 'package.json')));

    expect(pkg.private).toBe(false);
    expect(pkg.license).toBe('MIT');
    expect(pkg.publishConfig).toEqual({ access: 'public' });
    expect(pkg.sideEffects).toEqual(['**/*.css']);
    expect(pkg.files).toEqual(['dist', 'CHANGELOG.md', 'AGENTS.md', 'docs/design-language.mdx', 'docs/components.mdx']);
    expect(pkg.repository).toEqual({
      type: 'git',
      url: 'git+https://github.com/t128n/design.git',
      directory: 'packages/ui'
    });
    expect(pkg.engines.bun).toBeDefined();
    expect(pkg.engines.node).toBeDefined();
    expect(pkg.exports['.']).toEqual({
      types: './dist/index.d.ts',
      svelte: './dist/index.js',
      default: './dist/index.js'
    });
    expect(pkg.exports['./styles']).toBe('./dist/index.css');
    expect(pkg.exports['./package.json']).toBe('./package.json');
    expect(pkg.dependencies).toMatchObject({
      '@internationalized/date': expect.any(String),
      'bits-ui': expect.any(String),
      'carbon-icons-svelte': expect.any(String),
      runed: expect.any(String)
    });
  });

  it('test_consumer_fixture: imports the public entry and stylesheet', async () => {
    const main = await read(join(uiRoot, 'fixtures/consumer/src/main.ts'));

    expect(main).toContain("from '@t128n/ui'");
    expect(main).toContain("import '@t128n/ui/styles'");
  });

  it('test_release_config: versions with Changesets and publishes with OIDC', async () => {
    const repoRoot = dirname(dirname(uiRoot));
    const config = JSON.parse(await read(join(repoRoot, '.changeset/config.json')));
    const workflow = await read(join(repoRoot, '.github/workflows/publish.yml'));

    expect(config.baseBranch).toBe('main');
    expect(config.access).toBe('public');
    expect(config.changelog).toBeDefined();
    expect(config.privatePackages).toBeUndefined();

    expect(workflow).toContain('changesets/action/select-mode@v2');
    expect(workflow).toContain('changesets/action/version@v2');
    expect(workflow).toContain('changesets/action/pack@v2');
    expect(workflow).toContain('changesets/action/publish@v2');
    expect(workflow).toContain('id-token: write');

    // Trusted publishing must not fall back to a stored npm token.
    expect(workflow).not.toContain('NODE_AUTH_TOKEN');
    expect(workflow).not.toContain('NPM_TOKEN');
    expect(workflow).not.toContain('registry-url');
  });
});
