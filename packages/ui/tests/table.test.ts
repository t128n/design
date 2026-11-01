// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import Table from '../src/lib/Table.svelte';
import TableFixture from './fixtures/TableFixture.svelte';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const cssBlock = (source: string, selector: string) => {
  const start = source.indexOf(`${selector} {`);
  expect(start).toBeGreaterThanOrEqual(0);
  const end = source.indexOf('}', start);

  return source.slice(start, end);
};

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

const tableColumns = [
  { label: 'Project' },
  { label: 'Owner' },
  { label: 'Updated', align: 'right' as const, numeric: true },
  { label: 'Status' }
];

describe('Table', () => {
  it('defaults to a borderless wrapper that stays scrollable', async () => {
    const table = await readSource('../src/lib/Table.svelte');
    const borderless = cssBlock(table, '.table-wrap');

    expect(table).toContain('bordered = false');
    expect(borderless).toContain('width: 100%');
    expect(borderless).toContain('overflow-x: auto');
    expect(borderless).not.toContain('border: var(--border-width)');
    expect(borderless).not.toContain('border-radius');
    expect(borderless).not.toContain('background:');
  });

  it('restores border, radius, and surface when bordered', async () => {
    const table = await readSource('../src/lib/Table.svelte');
    const bordered = cssBlock(table, '.table-wrap.bordered');

    expect(table).toContain('class:bordered');
    expect(bordered).toContain('border: var(--border-width) solid var(--color-border)');
    expect(bordered).toContain('border-radius: var(--radius-md)');
    expect(bordered).toContain('background: var(--color-surface)');
  });

  it('keeps row separators while removing the last row border', async () => {
    const table = await readSource('../src/lib/Table.svelte');

    expect(table).toContain('border-bottom: var(--border-width) solid var(--color-border)');
    expect(table).toContain('tbody tr:last-child td');
    expect(table).toContain('border-bottom: 0');
  });

  it('preserves caption, alignment, numeric figures, and hover', async () => {
    const table = await readSource('../src/lib/Table.svelte');

    expect(table).toContain('<caption>{caption}</caption>');
    expect(table).toContain('border-collapse: collapse');
    expect(table).toContain('.table th.right');
    expect(table).toContain('font-variant-numeric: tabular-nums');
    expect(table).toContain('tbody tr:hover');
    expect(table).toContain('background: var(--color-surface-subtle)');
  });

  it('renders data only, never a section title or heading', async () => {
    const table = await readSource('../src/lib/Table.svelte');

    expect(table).not.toMatch(/<(h1|h2|h3|h4|h5|h6)\b/);
    expect(table).not.toMatch(/\btitle\s*[=:]/);
    expect(table).not.toMatch(/\bheading\s*[=:]/);
  });

  it('keeps column headers subordinate at the 14px label scale', async () => {
    const table = await readSource('../src/lib/Table.svelte');
    const header = cssBlock(table, '.table th');

    expect(header).toContain('color: var(--color-text-secondary)');
    expect(header).toContain('font-size: var(--font-size-label)');
    expect(header).toContain('font-weight: var(--font-weight-medium)');
    expect(header).toContain('line-height: var(--line-height-label)');
  });

  it('aligns the first and last cells with the section edges', async () => {
    const table = await readSource('../src/lib/Table.svelte');

    expect(table).toContain('th:first-child');
    expect(table).toContain('td:first-child');
    expect(table).toContain('padding-left: 0');
    expect(table).toContain('th:last-child');
    expect(table).toContain('td:last-child');
    expect(table).toContain('padding-right: 0');
  });

  it('supports a dense row layout without changing the standard default', async () => {
    const table = await readSource('../src/lib/Table.svelte');

    expect(table).toContain("density = 'standard'");
    expect(table).toContain("density?: 'standard' | 'dense'");
    expect(table).toContain('class:dense');
    expect(table).toContain('.table-wrap.dense');
    expect(table).toContain('padding-block: var(--space-xs)');
  });

  it('uses tokens, never raw hex colours', async () => {
    const table = await readSource('../src/lib/Table.svelte');

    expect(table).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});

describe('Table data layer', () => {
  it('renders TableRow and TableCell and merges consumer classes', () => {
    const { container } = render(TableFixture);
    const rows = container.querySelectorAll('tbody tr');

    expect(rows[0]).toHaveClass('consumer-row');
    expect(rows[0]?.querySelectorAll('td')[0]).toHaveClass('consumer-cell');
  });

  it('applies column align and numeric metadata to body cells', () => {
    const { container } = render(TableFixture);
    const firstRow = container.querySelectorAll('tbody tr')[0];
    const cells = firstRow?.querySelectorAll('td') ?? [];

    expect(cells[0]).not.toHaveClass('right');
    expect(cells[2]).toHaveClass('right');
    expect(cells[2]).toHaveClass('numeric');
    expect(cells[3]).not.toHaveClass('numeric');
  });

  it('lets an explicit cell prop override the column metadata', () => {
    const { container } = render(TableFixture);
    const thirdRow = container.querySelectorAll('tbody tr')[2];
    const cell = thirdRow?.querySelectorAll('td')[2];

    expect(cell).not.toHaveClass('right');
    expect(cell).not.toHaveClass('numeric');
  });

  it('advances the column index by colspan', () => {
    const { container } = render(TableFixture);
    const secondRow = container.querySelectorAll('tbody tr')[1];
    const cells = secondRow?.querySelectorAll('td') ?? [];

    expect(cells[0]).toHaveAttribute('colspan', '2');
    expect(cells[0]).not.toHaveClass('right');
    expect(cells[1]).toHaveClass('right');
    expect(cells[1]).toHaveClass('numeric');
  });
});

describe('Table naming and empty state', () => {
  it('uses a real caption to name the table and its scroll region', () => {
    const { container } = render(Table, { columns: tableColumns, caption: 'Projects' });
    const wrapper = container.querySelector('.table-wrap');
    const table = screen.getByRole('table', { name: 'Projects' });

    expect(table).toBeInTheDocument();
    expect(wrapper).toHaveAttribute('role', 'region');
    expect(wrapper).toHaveAttribute('aria-label', 'Projects');
    expect(wrapper).toHaveAttribute('tabindex', '0');
  });

  it('names the scroll region with labelledBy when no caption exists', () => {
    const { container } = render(Table, {
      columns: tableColumns,
      labelledBy: 'projects-heading'
    });
    const wrapper = container.querySelector('.table-wrap');

    expect(wrapper).toHaveAttribute('role', 'region');
    expect(wrapper).toHaveAttribute('aria-labelledby', 'projects-heading');
    expect(wrapper).not.toHaveAttribute('aria-label');
  });

  it('never invents a generic Table name for the scroll region', async () => {
    const { container } = render(Table, { columns: tableColumns });
    const wrapper = container.querySelector('.table-wrap');
    const source = await readSource('../src/lib/Table.svelte');

    expect(wrapper).not.toHaveAttribute('role');
    expect(wrapper).not.toHaveAttribute('aria-label');
    expect(wrapper).not.toHaveAttribute('aria-labelledby');
    expect(source).not.toContain("caption ?? 'Table'");
  });

  it('renders one full-width row with the empty snippet when isEmpty', () => {
    const empty = createRawSnippet(() => ({
      render: () => '<p>No projects yet</p>'
    }));
    const { container } = render(Table, {
      columns: tableColumns,
      isEmpty: true,
      empty
    });
    const cells = container.querySelectorAll('tbody td');

    expect(cells).toHaveLength(1);
    expect(cells[0]).toHaveAttribute('colspan', String(tableColumns.length));
    expect(screen.getByText('No projects yet')).toBeInTheDocument();
  });
});

describe('Table stories', () => {
  it('keeps the default story and adds bordered, numeric, and empty comparisons', async () => {
    const stories = await readSource('../src/stories/Table.stories.svelte');

    for (const name of ['Default', 'Bordered', 'Numeric', 'Empty']) {
      expect(stories).toContain(`name="${name}"`);
    }
  });

  it('shows the default table borderless on a white workspace surface', async () => {
    const stories = await readSource('../src/stories/Table.stories.svelte');
    const defaultStory = storyBlock(stories, 'Default');

    expect(defaultStory).toContain('<Table');
    expect(defaultStory).not.toContain('bordered');
    expect(stories).toContain('background: var(--color-workspace)');
  });

  it('places the section title, description, and action outside the table', async () => {
    const stories = await readSource('../src/stories/Table.stories.svelte');
    const defaultStory = storyBlock(stories, 'Default');

    expect(defaultStory).toContain('<Section');
    expect(defaultStory).toContain('id="active-projects-heading"');
    expect(defaultStory).toContain('title="Active projects"');
    expect(defaultStory).toContain('description="Ownership and status for work in flight."');
    expect(defaultStory).toContain('actions={viewAll}');
    expect(defaultStory).toContain('labelledBy={false}');
    expect(defaultStory).toContain('labelledBy="active-projects-heading"');
    expect(defaultStory.indexOf('<Section')).toBeLessThan(defaultStory.indexOf('<Table'));
    expect(defaultStory).not.toContain('caption=');
    expect(stories).not.toContain('caption=');
    expect(stories).not.toMatch(/<section[^>]*aria-labelledby/);
  });

  it('delegates the subheading scale and compact gap to Section', async () => {
    const stories = await readSource('../src/stories/Table.stories.svelte');
    const section = await readSource('../src/lib/Section.svelte');

    expect(stories).not.toMatch(/\.section(?![\w-])\s*\{/);
    expect(section).toContain('<Text variant="subheading"');
    expect(section).toContain("gap = 'sm'");
    expect(section).toContain('as={headingTag(level)}');
  });

  it('opts the bordered story into the surface container with realistic rows', async () => {
    const stories = await readSource('../src/stories/Table.stories.svelte');
    const borderedStory = storyBlock(stories, 'Bordered');

    expect(borderedStory).toMatch(/<Table[^>]*\bbordered\b/);
    expect(borderedStory).toContain('<TableRow>');
    expect(borderedStory).toContain('<TableCell>');
    expect(borderedStory).toContain('<Badge');
    expect(borderedStory).toContain('title="Archived projects"');
    expect(borderedStory).not.toContain('caption=');
  });

  it('demonstrates dense rows, numeric figures, narrow overflow, long content, and badges', async () => {
    const stories = await readSource('../src/stories/Table.stories.svelte');

    for (const name of ['Default', 'Bordered', 'Dense', 'Numeric', 'Empty', 'Narrow screen']) {
      expect(stories).toContain(`name="${name}"`);
    }

    expect(storyBlock(stories, 'Dense')).toContain('density="dense"');
    expect(storyBlock(stories, 'Default')).not.toContain('density=');
    expect(storyBlock(stories, 'Narrow screen')).toContain("viewport: { value: 'narrow375' }");
    expect(storyBlock(stories, 'Narrow screen')).toContain('Deployment pipeline for the Orbit');
    expect(storyBlock(stories, 'Narrow screen')).toContain('<Badge');
    expect(storyBlock(stories, 'Numeric')).toContain('columns={numericColumns}');
    expect(stories).toContain(
      "{ label: 'Requests', align: 'right' as const, numeric: true }"
    );
  });

  it('renders the empty state with exactly one action inside a full-width row', async () => {
    const stories = await readSource('../src/stories/Table.stories.svelte');
    const emptyStory = storyBlock(stories, 'Empty');
    const action = snippetBlock(stories, 'createProject');

    expect(emptyStory).toMatch(/<Table[^>]*\bisEmpty\b/);
    expect(emptyStory).toContain('empty={projectsEmpty}');
    expect(emptyStory).toContain('labelledBy="empty-projects-heading"');
    expect(stories).toContain('<EmptyState');
    expect(stories).toContain('action={createProject}');
    expect(action.match(/<Button\b/g) ?? []).toHaveLength(1);
  });

  it('migrates every table story to TableRow and TableCell without u-right', async () => {
    for (const file of ['Table', 'Dashboard', 'PageHeader', 'AppShell']) {
      const stories = await readSource(`../src/stories/${file}.stories.svelte`);

      expect(stories, file).not.toContain('u-right');
      expect(stories, file).toContain('<TableRow>');
      expect(stories, file).toContain('<TableCell>');
    }
  });

  it('keeps a single borderless table region named by its section heading in composed views', async () => {
    const dashboard = await readSource('../src/stories/Dashboard.stories.svelte');
    const pageHeader = await readSource('../src/stories/PageHeader.stories.svelte');
    const appShell = await readSource('../src/stories/AppShell.stories.svelte');

    expect(dashboard).toContain('labelledBy="recent-heading"');
    expect(pageHeader).toContain('labelledBy="projects-heading"');
    expect(appShell).toContain('labelledBy="projects-heading"');
  });
});

describe('Table composition contract', () => {
  it('documents section and table responsibilities in the design language page', async () => {
    const design = await readFile(resolve(process.cwd(), 'packages/ui/docs/design-language.mdx'), 'utf8');

    expect(design).toContain('### Sections and tables');
    expect(design).toContain('A section owns its heading');
    expect(design).toContain('The table owns column headers, rows, and cells');
    expect(design).toContain('A table never renders a section title');
    expect(design).toContain('Use the **subheading** scale (18px / 600) for section titles');
    expect(design).toContain('Do not wrap an ordinary data table in a full-width bordered card');
    expect(design).toContain('`TableRow` and `TableCell`');
    expect(design).toContain('`labelledBy`');
    expect(design).toContain('`isEmpty`');
  });
});
