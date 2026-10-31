<script lang="ts">
  import { Dialog } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import ChevronRight from 'carbon-icons-svelte/lib/ChevronRight.svelte';
  import Close from 'carbon-icons-svelte/lib/Close.svelte';
  import Menu from 'carbon-icons-svelte/lib/Menu.svelte';

  type Item = {
    label: string;
    href?: string;
    active?: boolean;
    badge?: string;
    children?: Item[];
  };

  type Section = {
    label?: string;
    items: Item[];
  };

  type Props = {
    sections: Section[];
    header?: Snippet;
    footer?: Snippet;
    label?: string;
    toggleLabel?: string;
  };

  let {
    sections,
    header,
    footer,
    label = 'Sections',
    toggleLabel = 'Sections'
  }: Props = $props();

  const baseId = $props.id();
  let drawerOpen = $state(false);

  const itemKey = (sectionIndex: number, path: number[]) =>
    `${sectionIndex}:${path.join('.')}`;

  const itemId = (scope: string, sectionIndex: number, path: number[], suffix: string) =>
    `${baseId}-${scope}-${sectionIndex}-${path.join('-')}${suffix}`;

  function hasActiveDescendant(item: Item): boolean {
    return item.children?.some((child) => child.active || hasActiveDescendant(child)) ?? false;
  }

  function buildOpenState(): Record<string, boolean> {
    const state: Record<string, boolean> = {};

    const walk = (items: Item[], sectionIndex: number, prefix: number[]) => {
      items.forEach((item, index) => {
        const path = [...prefix, index];

        if (item.children?.length) {
          state[itemKey(sectionIndex, path)] = hasActiveDescendant(item);
          walk(item.children, sectionIndex, path);
        }
      });
    };

    sections.forEach((section, sectionIndex) => walk(section.items, sectionIndex, []));

    return state;
  }

  let expanded = $state<Record<string, boolean>>(buildOpenState());

  function isOpen(id: string, item: Item): boolean {
    return expanded[id] ?? hasActiveDescendant(item);
  }

  function toggleItem(id: string) {
    expanded = { ...expanded, [id]: !expanded[id] };
  }
</script>

<aside class="sidebar">
  {#if header}
    <div class="sidebar-header">{@render header()}</div>
  {/if}

  <Dialog.Root bind:open={drawerOpen}>
    <Dialog.Trigger>
      {#snippet child({ props })}
        <button {...props} type="button" class="drawer-trigger">
          <span class="drawer-trigger-icon" aria-hidden="true">
            <Menu size={20} />
          </span>
          <span>{toggleLabel}</span>
        </button>
      {/snippet}
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay>
        {#snippet child({ props })}
          <div
            {...props}
            class="drawer-overlay"
            style:position="fixed"
            style:inset="0"
          ></div>
        {/snippet}
      </Dialog.Overlay>
      <Dialog.Content>
        {#snippet child({ props })}
          <div
            {...props}
            class="drawer-content"
            style:position="fixed"
            style:top="0"
            style:right="0"
            style:bottom="0"
          >
            <div class="drawer-panel">
              <div class="drawer-header">
                <Dialog.Title class="drawer-title">Navigation</Dialog.Title>
                <Dialog.Description class="drawer-description">{label}</Dialog.Description>
              </div>
              <Dialog.Close>
                {#snippet child({ props })}
                  <button
                    {...props}
                    type="button"
                    class="drawer-close"
                    aria-label="Close navigation"
                  >
                    <Close size={20} />
                  </button>
                {/snippet}
              </Dialog.Close>
              <nav class="drawer-nav" aria-label={label}>
                {#each sections as section, sectionIndex}
                  <div class="section">
                    {#if section.label}
                      <span class="section-label">{section.label}</span>
                    {/if}
                    {@render navItems(section.items, sectionIndex, 0, [], 'drawer')}
                  </div>
                {/each}
              </nav>
            </div>
          </div>
        {/snippet}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>

  <nav class="nav desktop-nav" aria-label={label}>
    {#each sections as section, sectionIndex}
      <div class="section">
        {#if section.label}
          <span class="section-label">{section.label}</span>
        {/if}
        {@render navItems(section.items, sectionIndex, 0, [], 'desktop')}
      </div>
    {/each}
  </nav>

  {#if footer}
    <div class="sidebar-footer">{@render footer()}</div>
  {/if}
</aside>

{#snippet navItems(
  items: Item[],
  sectionIndex: number,
  depth: number,
  prefix: number[],
  scope: string
)}
  <ul class="items">
    {#each items as item, index}
      {@const path = [...prefix, index]}
      {@const id = itemKey(sectionIndex, path)}
      {@const childrenId = itemId(scope, sectionIndex, path, '-children')}
      {@const hasChildren = Boolean(item.children?.length)}
      <li class="item">
        <div class="item-row" class:active={item.active} style="--depth: {depth}">
          <a
            href={item.href ?? '#'}
            class="item-link"
            aria-current={item.active ? 'page' : undefined}
            title={item.label}
          >
            <span class="item-label">{item.label}</span>
            {#if item.badge}
              <span class="badge">{item.badge}</span>
            {/if}
          </a>
          {#if hasChildren}
            <button
              type="button"
              class="expander"
              aria-expanded={isOpen(id, item)}
              aria-controls={childrenId}
              aria-label={`${isOpen(id, item) ? 'Collapse' : 'Expand'} ${item.label}`}
              onclick={() => toggleItem(id)}
            >
              <span class="chevron" aria-hidden="true">
                <ChevronRight size={16} />
              </span>
            </button>
          {/if}
        </div>
        {#if hasChildren}
          <div id={childrenId} class="children" hidden={!isOpen(id, item)}>
            {@render navItems(item.children ?? [], sectionIndex, depth + 1, path, scope)}
          </div>
        {/if}
      </li>
    {/each}
  </ul>
{/snippet}

<style>
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    width: 100%;
    min-height: 100%;
    padding: var(--space-md) var(--space-sm);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .sidebar-header,
  .sidebar-footer {
    padding: 0 var(--space-xs);
  }

  .drawer-trigger {
    display: none;
    align-items: center;
    gap: var(--space-sm);
    width: 100%;
    min-height: var(--control-height);
    padding: 0 var(--space-sm);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
    text-align: left;
    cursor: pointer;
  }

  .drawer-trigger:hover {
    background: var(--color-surface-subtle);
  }

  .drawer-trigger:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: calc(-1 * var(--border-width-emphasis));
  }

  .drawer-trigger-icon {
    display: inline-flex;
    flex: none;
  }

  .nav {
    display: grid;
    gap: var(--space-xl);
  }

  .drawer-nav {
    display: grid;
    flex: 1 1 auto;
    gap: var(--space-xl);
    min-height: 0;
    overflow-y: auto;
  }

  .section {
    display: grid;
    gap: var(--space-xs);
  }

  .section-label {
    padding: 0 var(--space-sm);
    color: var(--color-text-muted);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-caption);
  }

  .items {
    display: grid;
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .item {
    display: block;
  }

  .item-row {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    min-height: var(--control-height);
    padding: 0 var(--space-sm);
    padding-inline-start: calc(var(--space-sm) + var(--depth, 0) * var(--space-lg));
    border-radius: var(--radius-md);
  }

  .item-row:hover {
    background: var(--color-surface-subtle);
  }

  .item-row.active {
    background: var(--color-surface-subtle);
  }

  .item-link {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    gap: var(--space-sm);
    min-width: 0;
    min-height: var(--control-height);
    color: var(--color-text-secondary);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-label);
    text-decoration: none;
  }

  .item-row:hover .item-link {
    color: var(--color-text-primary);
  }

  .item-row.active .item-link {
    color: var(--color-text-primary);
    font-weight: var(--font-weight-medium);
  }

  .item-link:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: calc(-1 * var(--border-width-emphasis));
  }

  .item-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .badge {
    flex: none;
    margin-left: auto;
    color: var(--color-text-muted);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-caption);
    font-variant-numeric: tabular-nums;
  }

  .expander {
    display: grid;
    flex: none;
    place-items: center;
    width: var(--control-height);
    height: var(--control-height);
    padding: 0;
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
  }

  .expander:hover {
    background: var(--color-surface-subtle);
    color: var(--color-text-primary);
  }

  .expander:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: calc(-1 * var(--border-width-emphasis));
  }

  .chevron {
    display: inline-flex;
    flex: none;
    transition: transform var(--transition-duration) ease-out;
  }

  .expander[aria-expanded='true'] .chevron {
    transform: rotate(90deg);
  }

  .children[hidden] {
    display: none;
  }

  .drawer-overlay {
    z-index: 50;
    background: var(--color-scrim);
  }

  .drawer-content {
    z-index: 51;
    width: min(100vw, var(--layout-aside-width));
    border: 0;
    background: transparent;
  }

  .drawer-panel {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    height: 100%;
    padding: var(--space-lg);
    background: var(--color-surface);
    box-shadow: var(--shadow-overlay);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .drawer-header {
    display: grid;
    gap: var(--space-xs);
    padding-right: var(--space-2xl);
  }

  .drawer-panel :global(.drawer-title) {
    margin: 0;
    font-size: var(--font-size-subheading);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-subheading);
  }

  .drawer-panel :global(.drawer-description) {
    margin: 0;
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .drawer-close {
    position: absolute;
    top: var(--space-md);
    right: var(--space-md);
    display: grid;
    place-items: center;
    width: var(--control-height);
    height: var(--control-height);
    padding: 0;
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
  }

  .drawer-close:hover {
    background: var(--color-surface-subtle);
    color: var(--color-text-primary);
  }

  .drawer-close:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: calc(-1 * var(--border-width-emphasis));
  }

  @media (min-width: 801px) {
    .sidebar {
      position: sticky;
      top: 0;
      max-height: 100vh;
      overflow-y: auto;
    }
  }

  @media (max-width: 800px) {
    .drawer-trigger {
      display: inline-flex;
    }

    .desktop-nav {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .chevron {
      transition: none;
    }
  }
</style>
