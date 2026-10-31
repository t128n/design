import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const rule = (source: string, selector: string) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return source.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`))?.[1] ?? '';
};

describe('Sidebar', () => {
  it('uses sentence-case section labels without uppercase or letter spacing', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');
    const label = rule(sidebar, '.section-label');

    expect(sidebar).not.toMatch(/text-transform/i);
    expect(label).not.toMatch(/text-transform/i);
    expect(label).not.toMatch(/letter-spacing/i);
    expect(label).toContain('color: var(--color-text-muted)');
    expect(label).toContain('font-size: var(--font-size-caption)');
  });

  it('keeps one active cue: an accent left bar plus primary text only', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');
    const active = rule(sidebar, '.item.active');
    const declarations = active
      .split(';')
      .map((declaration) => declaration.trim())
      .filter(Boolean);

    expect(declarations).toEqual([
      'border-left-color: var(--color-accent)',
      'color: var(--color-text-primary)'
    ]);
  });

  it('renders inactive items in secondary text at regular weight', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');
    const item = rule(sidebar, '.item');

    expect(item).toContain('color: var(--color-text-secondary)');
    expect(item).toContain('font-weight: var(--font-weight-regular)');
    expect(item).toContain('min-height: var(--control-height)');
  });

  it('renders nested children recursively with aria-current', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');

    expect(sidebar).toContain('aria-current={item.active');
    expect(sidebar).toContain('{#if item.children?.length}');
    expect(sidebar).toContain('{@render navItems(item.children)}');
    expect(rule(sidebar, 'li > ul')).toContain('padding-left: var(--space-lg)');
  });

  it('wires a mobile disclosure button to the nav id and toggles it', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');

    expect(sidebar).toContain('aria-expanded={open}');
    expect(sidebar).toContain('aria-controls={navId}');
    expect(sidebar).toContain('$props.id()');
    expect(sidebar).toContain('let open = $state(false)');
    expect(sidebar).toContain('onclick={() => (open = !open)}');
    expect(sidebar).toContain('id={navId}');
    expect(sidebar).toContain('class:open');
    expect(sidebar).toContain('@media (max-width: 800px)');
    expect(rule(sidebar, '.disclosure')).toContain('display: none');
  });

  it('draws the disclosure indicator and focus rings with tokens', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');
    const chevron = rule(sidebar, '.chevron');

    expect(chevron).toContain('width: var(--space-sm)');
    expect(chevron).toContain('height: var(--space-sm)');
    expect(chevron).toContain('border-right: var(--border-width-emphasis) solid currentColor');
    expect(chevron).toContain('border-bottom: var(--border-width-emphasis) solid currentColor');
    expect(rule(sidebar, '.disclosure:focus-visible')).toContain(
      'outline: var(--border-width-emphasis) solid var(--color-focus)'
    );
    expect(rule(sidebar, '.item:focus-visible')).toContain(
      'outline-offset: var(--border-width-emphasis)'
    );
  });

  it('wraps long labels and keeps badges from shrinking', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');
    const badge = rule(sidebar, '.badge');

    expect(sidebar).toContain('overflow-wrap: anywhere');
    expect(sidebar).toContain('min-width: 0');
    expect(badge).toContain('flex: none');
    expect(badge).toContain('color: var(--color-text-muted)');
    expect(sidebar).not.toContain('text-overflow: ellipsis');
  });

  it('covers the required stories including a flat list without group headings', async () => {
    const story = await readSource('../src/stories/Sidebar.stories.svelte');

    for (const name of ['Flat', 'Grouped', 'Nested', 'Selected', 'Focus']) {
      expect(story).toContain(`name="${name}"`);
    }

    const flat = story.slice(
      story.indexOf('const flatSections'),
      story.indexOf('const groupedSections')
    );

    expect(flat.length).toBeGreaterThan(0);
    expect(flat).not.toMatch(/^[ \t]{4,6}label:/m);
  });
});
