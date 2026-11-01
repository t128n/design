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

  it('test_active_background: active rows use the navigation-selected surface with primary medium text only', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');
    const active = rule(sidebar, '.item-row.active');
    const activeLink = rule(sidebar, '.item-row.active .item-link');

    expect(active).toContain('background: var(--color-navigation-selected)');
    expect(activeLink).toContain('color: var(--color-text-primary)');
    expect(activeLink).toContain('font-weight: var(--font-weight-medium)');
    expect(sidebar).not.toContain('border-left');
    expect(sidebar).not.toContain('border-left: var(--border-width-emphasis)');
    expect(sidebar).not.toContain('var(--color-accent)');
  });

  it('test_default_white: the sidebar defaults to the white workspace surface', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');

    expect(sidebar).toContain("surface?: 'workspace' | 'navigation'");
    expect(sidebar).toContain("surface = 'workspace'");
    expect(rule(sidebar, '.sidebar')).toContain('background: var(--color-workspace)');
    expect(rule(sidebar, '.sidebar')).not.toContain('var(--color-navigation-surface)');
  });

  it('test_navigation_variant: surface="navigation" opts into the navigation surface', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');

    expect(sidebar).toContain('class:navigation');
    expect(rule(sidebar, '.sidebar.navigation')).toContain(
      'background: var(--color-navigation-surface)'
    );
  });

  it('test_structural_border: the sidebar owns exactly one right border with border tokens', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');
    const base = rule(sidebar, '.sidebar');

    expect(base).toContain('border-right: var(--border-width) solid var(--color-border)');
    expect(base).not.toContain('border-top');
    expect(base).not.toContain('border-bottom');
    expect(base).not.toContain('border-left');
  });

  it('test_mobile_border_reset: the narrow layout drops the desktop right border', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');
    const mobile = sidebar.slice(sidebar.indexOf('@media (max-width: 800px)'));

    expect(sidebar).toContain('border-right: 0');
    expect(rule(mobile, '.sidebar')).toContain('border-right: 0');
  });

  it('test_badge_contrast: active-row badges use secondary text while others stay muted', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');

    expect(rule(sidebar, '.badge')).toContain('color: var(--color-text-muted)');
    expect(rule(sidebar, '.item-row.active .badge')).toContain(
      'color: var(--color-text-secondary)'
    );
  });

  it('test_hover_active_precedence: hover uses subtle surface but an active row stays selected', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');
    const hover = rule(sidebar, '.item-row:hover');
    const active = rule(sidebar, '.item-row.active');

    expect(hover).toContain('background: var(--color-surface-subtle)');
    expect(active).toContain('background: var(--color-navigation-selected)');
    expect(sidebar.indexOf('.item-row.active')).toBeGreaterThan(
      sidebar.indexOf('.item-row:hover')
    );
  });

  it('test_mobile_surface: the trigger row is transparent and the drawer is navigation surface', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');

    expect(rule(sidebar, '.drawer-trigger')).toContain('background: transparent');
    expect(rule(sidebar, '.drawer-panel')).toContain(
      'background: var(--color-navigation-surface)'
    );
  });

  it('test_nested_disclosure: children get a separate Carbon chevron button with ARIA state', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');

    expect(sidebar).toContain(
      "import ChevronRightIcon from '~icons/carbon/chevron-right'"
    );
    expect(sidebar).toContain('<Icon icon={ChevronRightIcon} />');
    expect(sidebar).toContain('aria-expanded={isOpen(id, item)}');
    expect(sidebar).toContain('aria-controls={childrenId}');
    expect(sidebar).toContain('{isOpen(id, item) ? \'Collapse\' : \'Expand\'} {item.label}');
    expect(sidebar).toContain('<VisuallyHidden>');
    expect(sidebar).not.toContain('aria-label={`${isOpen(id, item) ? \'Collapse\' : \'Expand\'}');
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
    expect(sidebar).toContain("import MenuIcon from '~icons/carbon/menu'");
    expect(sidebar).toContain("import CloseIcon from '~icons/carbon/close'");
    expect(sidebar).toContain('<Dialog.Root bind:open={drawerOpen}>');
    expect(sidebar).toContain('<Dialog.Overlay>');
    expect(sidebar).toContain('class="drawer-overlay"');
    expect(sidebar).toContain('class="drawer-content"');
    expect(sidebar).toContain('<Dialog.Title class="drawer-title">Navigation</Dialog.Title>');
    expect(sidebar).toContain('class="drawer-description"');
    expect(sidebar).toContain('Primary navigation');
    expect(sidebar).not.toContain(
      '<Dialog.Description class="drawer-description">{label}</Dialog.Description>'
    );
    expect(sidebar).toContain('class="drawer-close"');
    expect(sidebar).toContain('<Icon icon={MenuIcon} size={20} />');
    expect(sidebar).toContain('<Icon icon={CloseIcon} size={20} />');
    expect(sidebar).toContain('<VisuallyHidden>Close navigation</VisuallyHidden>');
    expect(sidebar).toContain('{toggleLabel}');
    expect(sidebar).toContain("toggleLabel = 'Navigation'");
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

  it('test_drawer_anchor: the drawer is a left-anchored panel with compact, top-aligned rows', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');
    const drawerContent = rule(sidebar, '.drawer-content');

    expect(drawerContent).toContain('position: fixed');
    expect(drawerContent).toContain('left: 0');
    expect(drawerContent).toContain('top: 0');
    expect(drawerContent).toContain('bottom: 0');
    expect(drawerContent).not.toContain('right: 0');
    expect(rule(sidebar, '.drawer-nav')).toContain('align-content: start');
    expect(rule(sidebar, '.section')).toContain('align-content: start');
  });

  it('test_scroll: the desktop sidebar is sticky with independent vertical overflow', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');

    expect(sidebar).toContain('@media (min-width: 801px)');

    const desktop = sidebar.slice(sidebar.indexOf('@media (min-width: 801px)'));

    expect(desktop).toContain('position: sticky');
    expect(desktop).toContain('top: 0');
    expect(desktop).toContain('max-height: var(--panel-max-height)');
    expect(desktop).toContain('overflow-y: auto');
    expect(desktop).not.toContain('border-bottom');
  });

  it('test_stories: keeps Flat, Grouped, Nested, Selected, and Focus with a Navigation surface story', async () => {
    const story = await readSource('../src/stories/Sidebar.stories.svelte');

    for (const name of ['Flat', 'Grouped', 'Nested', 'Selected', 'Focus', 'Navigation surface']) {
      expect(story).toContain(`name="${name}"`);
    }

    expect(story).not.toContain('White surface');

    const navigation = story.slice(story.indexOf('name="Navigation surface"'));

    expect(navigation).toContain('surface="navigation"');
    expect(navigation).toContain('sections={groupedSections}');

    const nested = story.slice(
      story.indexOf('const nestedSections'),
      story.indexOf('const selectedSections')
    );

    expect(nested).toContain("href: '/projects'");
    expect(nested).toContain('children: [');
    expect(nested).toMatch(/active: true/);
  });
});
