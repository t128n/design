import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

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

describe('Table stories', () => {
  it('keeps the default story and adds a bordered comparison', async () => {
    const stories = await readSource('../src/stories/Table.stories.svelte');

    expect(stories).toContain('name="Default"');
    expect(stories).toContain('name="Bordered"');
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

    expect(defaultStory).toContain('<section');
    expect(defaultStory).toContain('aria-labelledby="active-projects-heading"');
    expect(defaultStory).toContain(
      '<Text variant="subheading" as="h2" id="active-projects-heading">Active projects</Text>'
    );
    expect(defaultStory).toContain('<Text variant="body-sm" tone="secondary">');
    expect(defaultStory).toContain('<Button variant="secondary">View all</Button>');
    expect(defaultStory).not.toContain('caption=');
    expect(stories).not.toContain('caption=');
  });

  it('uses the subheading scale for section titles and a compact gap to the headers', async () => {
    const stories = await readSource('../src/stories/Table.stories.svelte');
    const section = cssBlock(stories, '.section');

    expect(section).toContain('gap: var(--space-sm)');
    expect(stories).toContain('<Text variant="subheading" as="h2"');
    expect(stories).toContain('<Text variant="body-sm" tone="secondary">');
  });

  it('opts the bordered story into the surface container with realistic rows', async () => {
    const stories = await readSource('../src/stories/Table.stories.svelte');
    const borderedStory = storyBlock(stories, 'Bordered');

    expect(borderedStory).toMatch(/<Table[^>]*\bbordered\b/);
    expect(borderedStory).toContain('<td>');
    expect(borderedStory).toContain('<Badge');
    expect(borderedStory).toContain('as="h2"');
    expect(borderedStory).not.toContain('caption=');
  });

  it('demonstrates dense rows, narrow overflow, long content, and status badges', async () => {
    const stories = await readSource('../src/stories/Table.stories.svelte');

    for (const name of ['Default', 'Bordered', 'Dense', 'Narrow screen']) {
      expect(stories).toContain(`name="${name}"`);
    }

    expect(storyBlock(stories, 'Dense')).toContain('density="dense"');
    expect(storyBlock(stories, 'Default')).not.toContain('density=');
    expect(storyBlock(stories, 'Narrow screen')).toContain("viewport: { value: 'narrow375' }");
    expect(storyBlock(stories, 'Narrow screen')).toContain('Deployment pipeline for the Orbit');
    expect(storyBlock(stories, 'Narrow screen')).toContain('<Badge');
  });
});

describe('Table composition contract', () => {
  it('documents section and table responsibilities in DESIGN.md', async () => {
    const design = await readFile(resolve(process.cwd(), 'DESIGN.md'), 'utf8');

    expect(design).toContain('### Sections and tables');
    expect(design).toContain('A section owns its heading');
    expect(design).toContain('The table owns column headers, rows, and cells');
    expect(design).toContain('A table never renders a section title');
    expect(design).toContain('Use the **subheading** scale (18px / 600) for section titles');
    expect(design).toContain('Do not wrap an ordinary data table in a full-width bordered card');
  });
});
