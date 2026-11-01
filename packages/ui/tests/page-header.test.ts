// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const storyBlock = (stories: string, name: string) => {
  const start = stories.indexOf(`<Story name="${name}"`);
  expect(start).toBeGreaterThanOrEqual(0);
  const rest = stories.slice(start + 1);
  const next = rest.indexOf('<Story name="');

  return next === -1 ? rest : rest.slice(0, next);
};

const snippetBlock = (stories: string, name: string) => {
  const start = stories.indexOf(`{#snippet ${name}()}`);
  expect(start).toBeGreaterThanOrEqual(0);
  const end = stories.indexOf('{/snippet}', start);

  return stories.slice(start, end);
};

describe('PageHeader', () => {
  it('renders breadcrumbs only when they are supplied', async () => {
    const header = await readSource('../src/lib/PageHeader.svelte');

    expect(header).toContain('breadcrumbs?.length');
    expect(header).toContain('<Breadcrumbs items={breadcrumbs} />');
  });

  it('aligns actions with the top of the heading block', async () => {
    const header = await readSource('../src/lib/PageHeader.svelte');

    expect(header).toContain('align-items: flex-start');
    expect(header).not.toContain('align-items: flex-end');
  });

  it('wraps long titles inside a shrinking column', async () => {
    const header = await readSource('../src/lib/PageHeader.svelte');

    expect(header).toContain('overflow-wrap: anywhere');
    expect(header).toContain('min-width: 0');
  });

  it('limits the description to the reading measure', async () => {
    const header = await readSource('../src/lib/PageHeader.svelte');

    expect(header).toContain('max-width: var(--layout-reading-width)');
  });

  it('renders without a card, border, or shadow container', async () => {
    const header = await readSource('../src/lib/PageHeader.svelte');

    expect(header).not.toContain('<Card');
    expect(header).not.toContain('border: var(--border-width)');
    expect(header).not.toContain('box-shadow');
  });

  it('uses the spacing scale for the bottom margin', async () => {
    const header = await readSource('../src/lib/PageHeader.svelte');

    expect(header).toMatch(/margin-bottom: var\(--space-/);
  });

  it('maps the semantic heading level to the native heading', async () => {
    const header = await readSource('../src/lib/PageHeader.svelte');

    expect(header).toContain('level?: HeadingLevel');
    expect(header).toContain('level = 1');
    expect(header).toContain('<Text variant="heading" as={headingTag(level)}>');
    expect(header).not.toMatch(/<Text[^>]*as="h1"/);
  });

  it('stacks the actions below the copy at narrow widths', async () => {
    const header = await readSource('../src/lib/PageHeader.svelte');
    const mobile = header.slice(header.indexOf('@media (max-width: 640px)'));

    expect(mobile).toContain('flex-direction: column');
  });

  it('covers every required story case', async () => {
    const stories = await readSource('../src/stories/PageHeader.stories.svelte');

    for (const name of [
      'Title only',
      'With description',
      'Breadcrumbs and actions',
      'Long title',
      'Projects page'
    ]) {
      expect(stories).toContain(`name="${name}"`);
    }
  });

  it('gives the Projects page real table rows and contextual actions', async () => {
    const stories = await readSource('../src/stories/PageHeader.stories.svelte');
    const projects = storyBlock(stories, 'Projects page');
    const header = snippetBlock(stories, 'projectsHeader');
    const actions = snippetBlock(stories, 'projectsActions');

    expect(projects).toContain('<Page header={projectsHeader}>');
    expect(projects).toContain('<Table');
    expect(projects).toContain('<TableRow>');
    expect(projects).toContain('<TableCell>Orbit</TableCell>');
    expect(projects).toContain('labelledBy="projects-heading"');
    expect(header).toContain('actions={projectsActions}');
    expect(projects).not.toMatch(/label: 'Projects'/);
    expect(actions).toContain('New project');
    expect(actions).toContain('Export');
    expect(actions).toContain('variant="secondary"');
  });

  it('titles the Projects table in a surrounding section', async () => {
    const stories = await readSource('../src/stories/PageHeader.stories.svelte');
    const projects = storyBlock(stories, 'Projects page');

    expect(projects).toContain(
      '<Section id="projects-heading" title="All projects" labelledBy={false}>'
    );
    expect(projects).toContain('labelledBy="projects-heading"');
    expect(projects).not.toMatch(/<Table[^>]*\bcaption=/);
    expect(stories).not.toMatch(/\.projects(?![\w-])\s*\{/);
    expect(stories).not.toContain('font-size: var(--font-size-subheading)');
  });

  it('keeps detail-page breadcrumbs contextual rather than repeating the title', async () => {
    const stories = await readSource('../src/stories/PageHeader.stories.svelte');
    const detail = snippetBlock(stories, 'detailHeader');

    expect(detail).toContain('breadcrumbs={[');
    expect(detail).toContain('title="Orbit"');
    expect(detail).not.toMatch(/label: 'Orbit'/);
  });
});
