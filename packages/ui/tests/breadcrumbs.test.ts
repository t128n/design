import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const section = (source: string, start: string, end: string) =>
  source.slice(source.indexOf(start), source.indexOf(end, source.indexOf(start) + start.length));

describe('Breadcrumbs', () => {
  it('renders a linked last crumb as a link without aria-current', async () => {
    const breadcrumbs = await readSource('../src/lib/Breadcrumbs.svelte');
    const link = section(breadcrumbs, '{#if item.href}', '{:else if');

    expect(link).toContain('<a href={item.href}>{item.label}</a>');
    expect(link).not.toContain('aria-current');
    expect(breadcrumbs).not.toContain('index < items.length - 1');
  });

  it('marks only an unlinked last crumb as the current page', async () => {
    const breadcrumbs = await readSource('../src/lib/Breadcrumbs.svelte');
    const current = section(
      breadcrumbs,
      '{:else if index === items.length - 1}',
      '{:else}'
    );
    const fallback = section(breadcrumbs, '{:else}', '{/if}');

    expect(current).toContain('<span aria-current="page">{item.label}</span>');
    expect(fallback).not.toContain('aria-current');
  });

  it('keeps the default trail marking the unlinked Orbit as current', async () => {
    const story = await readSource('../src/stories/Breadcrumbs.stories.svelte');

    expect(story).toContain("{ label: 'Workspace', href: '#' }");
    expect(story).toContain("{ label: 'Projects', href: '#' }");
    expect(story).toContain("{ label: 'Orbit' }");
  });
});
