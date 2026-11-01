// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  allowlists,
  importantViolations,
  inlineStyleViolations,
  libRoot,
  literalTypeViolations,
  pageSectionCssViolations,
  rawListViolations,
  rawProseViolations,
  rawPxViolations,
  rawStructureViolations,
  readSources,
  storiesRoot,
  storyGlobalViolations,
  viewportShellViolations
} from './audit-rules';

const readFileSource = (path: string) => readFile(path, 'utf8');

const uiRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const srcRoot = join(uiRoot, 'src');
const designPath = join(uiRoot, 'docs', 'design-language.mdx');

describe('framework audit', () => {
  it('test_no_raw_prose: stories and components use Text for paragraphs and headings', async () => {
    const sources = [...(await readSources(libRoot)), ...(await readSources(storiesRoot))];

    expect(rawProseViolations(sources)).toEqual([]);
  });

  it('test_no_raw_lists: stories use List for ordered and unordered items', async () => {
    const sources = await readSources(storiesRoot);

    expect(rawListViolations(sources)).toEqual([]);
  });

  it('test_literal_type: component and story styles use typography tokens', async () => {
    const sources = [...(await readSources(libRoot)), ...(await readSources(storiesRoot))];

    expect(literalTypeViolations(sources)).toEqual([]);
  });

  it('test_no_raw_structure: stories use Table, Section, and List instead of raw structure', async () => {
    const sources = await readSources(storiesRoot);

    expect(rawStructureViolations(sources)).toEqual([]);
  });

  it('test_no_inline_styles: prose and stories style through classes unless the value is dynamic', async () => {
    const sources = [...(await readSources(libRoot)), ...(await readSources(storiesRoot))];

    expect(inlineStyleViolations(sources)).toEqual([]);
  });

  it('test_story_raw_px: story CSS above the border scale uses rem or a token', async () => {
    const sources = await readSources(storiesRoot);

    expect(
      rawPxViolations(sources, {
        ruleId: 'framework.raw-px',
        includeInline: true
      })
    ).toEqual([]);
  });

  it('test_story_viewport_shell: stories keep normal document flow', async () => {
    const sources = await readSources(storiesRoot);

    expect(
      viewportShellViolations(sources, {
        ruleId: 'framework.viewport-shell',
        allowlist: allowlists.viewportShell
      })
    ).toEqual([]);
  });

  it('test_story_important: only the reduced-motion override may use !important', async () => {
    const sources = await readSources(srcRoot, ['.svelte', '.css']);

    expect(
      importantViolations(sources, {
        ruleId: 'framework.important',
        allowlist: allowlists.important
      })
    ).toEqual([]);
  });

  it('test_story_globals: story globals reuse the global-scoping allowlist', async () => {
    const sources = await readSources(storiesRoot);

    expect(storyGlobalViolations(sources)).toEqual([]);
  });

  it('test_page_section_css: stories do not recreate Page or Section geometry', async () => {
    const sources = await readSources(storiesRoot);

    expect(pageSectionCssViolations(sources)).toEqual([]);
  });

  it('test_content_components: content surfaces delegate type to Text', async () => {
    for (const component of ['PageHeader', 'Hero', 'Card', 'Alert', 'Footer', 'Breadcrumbs']) {
      const source = await readFileSource(join(libRoot, `${component}.svelte`));

      expect(source, component).toContain("from './Text.svelte'");
      expect(source, component).not.toMatch(/(font-size|font-weight|line-height|font-family):/);
    }
  });

  it('test_typography_contract: label is 14px/1.5 and the framework scale is documented', async () => {
    const tokens = await readFileSource(join(srcRoot, 'styles/tokens.css'));
    const design = await readFileSource(designPath);

    expect(tokens).toContain('--font-size-label: 0.875rem');
    expect(tokens).toContain('--line-height-label: 1.5');
    expect(design).toContain('## Framework usage');
    expect(design).toContain('Text variant="body"');
    expect(design).toContain('Text variant="heading"');
    expect(design).toContain('| R51 |');
  });

  it('test_foundations: the type specimen uses the exact brief copy and components', async () => {
    const foundations = await readFileSource(join(storiesRoot, 'Foundations.stories.svelte'));

    expect(foundations).toContain('Display — IBM Plex Sans, 32px');
    expect(foundations).toContain('Heading — IBM Plex Sans, 24px');
    expect(foundations).toContain('Subheading — IBM Plex Sans, 18px');
    expect(foundations).toContain('Body — 16px / 1.5 for readable application content.');
    expect(foundations).toContain('Label and small UI text — 14px / 1.5.');
    expect(foundations).toContain("<Code>const projectId = 'design-v0.1';</Code>");
  });

  it('test_primitive_stories: every framework primitive has a story and a real screen use', async () => {
    const primitives = ['Text', 'Code', 'List'];
    const layouts = ['Stack', 'Inline', 'Grid', 'Container'];

    for (const component of primitives) {
      const story = await readFileSource(join(storiesRoot, `${component}.stories.svelte`));

      expect(story, component).toContain(`title: 'Primitives/${component}'`);
    }

    for (const component of layouts) {
      const story = await readFileSource(join(storiesRoot, `${component}.stories.svelte`));

      expect(story, component).toContain(`title: 'Layouts/${component}'`);
    }

    for (const view of ['Dashboard', 'Settings', 'Landing']) {
      const story = await readFileSource(join(storiesRoot, `${view}.stories.svelte`));

      expect(story, view).toContain('Text');
    }
  });
});
