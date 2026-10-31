import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const rule = (source: string, selector: string) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return source.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`))?.[1] ?? '';
};

describe('Sidebar', () => {
  it('test_row_geometry: rows are 36px with 8px inline padding and grouped spacing', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');
    const row = rule(sidebar, '.item-row');
    const items = rule(sidebar, '.items');
    const sectionLabel = rule(sidebar, '.section-label');

    expect(row).toContain('min-height: var(--control-height)');
    expect(row).toContain('padding: 0 var(--space-sm)');
    expect(row).toContain('padding-inline-start: calc(');
    expect(row).toContain('border-radius: var(--radius-md)');
    expect(items).toContain('gap: 0');
    expect(rule(sidebar, '.nav')).toContain('gap: var(--space-xl)');
    expect(sectionLabel).toContain('color: var(--color-text-muted)');
    expect(sectionLabel).toContain('font-size: var(--font-size-caption)');
    expect(sectionLabel).toContain('font-weight: var(--font-weight-medium)');
    expect(sidebar).not.toMatch(/text-transform/i);
    expect(sidebar).not.toMatch(/letter-spacing/i);
  });

  it('test_active_background: active rows use a subtle surface with primary medium text only', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');
    const active = rule(sidebar, '.item-row.active');
    const activeLink = rule(sidebar, '.item-row.active .item-link');

    expect(active).toContain('background: var(--color-surface-subtle)');
    expect(activeLink).toContain('color: var(--color-text-primary)');
    expect(activeLink).toContain('font-weight: var(--font-weight-medium)');
    expect(sidebar).not.toContain('border-left');
    expect(sidebar).not.toContain('border-left: var(--border-width-emphasis)');
    expect(sidebar).not.toContain('var(--color-accent)');
  });

  it('test_nested_disclosure: children get a separate Carbon chevron button with ARIA state', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');

    expect(sidebar).toContain(
      "import ChevronRight from 'carbon-icons-svelte/lib/ChevronRight.svelte'"
    );
    expect(sidebar).toContain('<ChevronRight size={16} />');
    expect(sidebar).toContain('aria-expanded={isOpen(id, item)}');
    expect(sidebar).toContain('aria-controls={childrenId}');
    expect(sidebar).toContain(
      'aria-label={`${isOpen(id, item) ? \'Collapse\' : \'Expand\'} ${item.label}`}'
    );
    expect(sidebar).toContain('class="item-link"');
    expect(sidebar).toContain('class="expander"');
    expect(sidebar).toContain('{#if hasChildren}');
    expect(rule(sidebar, ".expander[aria-expanded='true'] .chevron")).toContain(
      'rotate(90deg)'
    );
  });

  it('test_active_ancestry: ancestors of an active descendant start open', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');

    expect(sidebar).toContain('function hasActiveDescendant');
    expect(sidebar).toContain('child.active || hasActiveDescendant(child)');
    expect(sidebar).toContain('state[itemKey(sectionIndex, path)] = hasActiveDescendant(item)');
    expect(sidebar).toContain(
      'let expanded = $state<Record<string, boolean>>(buildOpenState());'
    );
  });

  it('test_long_labels: labels ellipsize and carry the full title while badges stay fixed', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');
    const label = rule(sidebar, '.item-label');
    const badge = rule(sidebar, '.badge');

    expect(label).toContain('min-width: 0');
    expect(label).toContain('overflow: hidden');
    expect(label).toContain('text-overflow: ellipsis');
    expect(label).toContain('white-space: nowrap');
    expect(sidebar).toContain('title={item.label}');
    expect(badge).toContain('flex: none');
    expect(badge).toContain('margin-left: auto');
    expect(badge).toContain('color: var(--color-text-muted)');
    expect(badge).toContain('font-variant-numeric: tabular-nums');
  });

  it('test_mutation_states: hover, active, and focus differ without layout shifts', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');
    const hover = rule(sidebar, '.item-row:hover');
    const hoverLink = rule(sidebar, '.item-row:hover .item-link');

    expect(hover).toContain('background: var(--color-surface-subtle)');
    expect(hover).not.toContain('font-weight');
    expect(hoverLink).toContain('color: var(--color-text-primary)');
    expect(hoverLink).not.toContain('font-weight');
    expect(rule(sidebar, '.item-link:focus-visible')).toContain(
      'outline: var(--border-width-emphasis) solid var(--color-focus)'
    );
    expect(rule(sidebar, '.expander:focus-visible')).toContain(
      'outline: var(--border-width-emphasis) solid var(--color-focus)'
    );
    expect(rule(sidebar, '.drawer-trigger:focus-visible')).toContain(
      'outline: var(--border-width-emphasis) solid var(--color-focus)'
    );
  });

  it('test_drawer: Bits UI Dialog supplies the narrow drawer and unique ids', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');

    expect(sidebar).toContain("import { Dialog } from 'bits-ui'");
    expect(sidebar).toContain("import Menu from 'carbon-icons-svelte/lib/Menu.svelte'");
    expect(sidebar).toContain("import Close from 'carbon-icons-svelte/lib/Close.svelte'");
    expect(sidebar).toContain('<Dialog.Root bind:open={drawerOpen}>');
    expect(sidebar).toContain('<Dialog.Overlay>');
    expect(sidebar).toContain('class="drawer-overlay"');
    expect(sidebar).toContain('class="drawer-content"');
    expect(sidebar).toContain('<Dialog.Title class="drawer-title">Navigation</Dialog.Title>');
    expect(sidebar).toContain(
      '<Dialog.Description class="drawer-description">{label}</Dialog.Description>'
    );
    expect(sidebar).toContain('class="drawer-close"');
    expect(sidebar).toContain('<Menu size={20} />');
    expect(sidebar).toContain('<Close size={20} />');
    expect(sidebar).toContain('{toggleLabel}');
    expect(sidebar).toContain('class="drawer-nav"');
    expect(sidebar).toContain("'desktop'");
    expect(sidebar).toContain("'drawer'");
    expect(sidebar).toContain('${baseId}-${scope}');
    expect(rule(sidebar, '.drawer-trigger')).toContain('display: none');
    expect(sidebar).toContain('@media (max-width: 800px)');

    const mobile = sidebar.slice(sidebar.indexOf('@media (max-width: 800px)'));

    expect(mobile).toContain('.drawer-trigger');
    expect(mobile).toContain('display: inline-flex');
    expect(mobile).toContain('.desktop-nav');
    expect(mobile).toContain('display: none');
  });

  it('test_scroll: the desktop sidebar is sticky with independent vertical overflow', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');

    expect(sidebar).toContain('@media (min-width: 801px)');

    const desktop = sidebar.slice(sidebar.indexOf('@media (min-width: 801px)'));

    expect(desktop).toContain('position: sticky');
    expect(desktop).toContain('top: 0');
    expect(desktop).toContain('max-height: 100vh');
    expect(desktop).toContain('overflow-y: auto');
    expect(sidebar).not.toContain('border-right');
    expect(sidebar).not.toContain('border-bottom');
  });

  it('test_stories: keeps Flat, Grouped, Nested, Selected, and Focus with an active nested child', async () => {
    const story = await readSource('../src/stories/Sidebar.stories.svelte');

    for (const name of ['Flat', 'Grouped', 'Nested', 'Selected', 'Focus']) {
      expect(story).toContain(`name="${name}"`);
    }

    const nested = story.slice(
      story.indexOf('const nestedSections'),
      story.indexOf('const selectedSections')
    );

    expect(nested).toContain("href: '/projects'");
    expect(nested).toContain('children: [');
    expect(nested).toMatch(/active: true/);
  });
});
