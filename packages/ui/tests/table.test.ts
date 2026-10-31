import { readFile } from 'node:fs/promises';
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

  it('opts the bordered story into the surface container with realistic rows', async () => {
    const stories = await readSource('../src/stories/Table.stories.svelte');
    const borderedStory = storyBlock(stories, 'Bordered');

    expect(borderedStory).toContain('bordered');
    expect(borderedStory).toContain('<td>');
    expect(borderedStory).toContain('<Badge');
  });
});
