<script lang="ts">
  import type { Snippet } from 'svelte';

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

  const navId = $props.id();
  let open = $state(false);
</script>

<aside class="sidebar">
  {#if header}
    <div class="sidebar-header">{@render header()}</div>
  {/if}
  <button
    type="button"
    class="disclosure"
    aria-expanded={open}
    aria-controls={navId}
    onclick={() => (open = !open)}
  >
    <span>{toggleLabel}</span>
    <span class="chevron" aria-hidden="true"></span>
  </button>
  <nav id={navId} class="nav" class:open aria-label={label}>
    {#each sections as section}
      <div class="section">
        {#if section.label}
          <span class="section-label">{section.label}</span>
        {/if}
        {@render navItems(section.items)}
      </div>
    {/each}
  </nav>
  {#if footer}
    <div class="sidebar-footer">{@render footer()}</div>
  {/if}
</aside>

{#snippet navItems(items: Item[])}
  <ul>
    {#each items as item}
      <li>
        <a
          href={item.href ?? '#'}
          class="item"
          class:active={item.active}
          aria-current={item.active ? 'page' : undefined}
        >
          <span class="item-label">{item.label}</span>
          {#if item.badge}
            <span class="badge">{item.badge}</span>
          {/if}
        </a>
        {#if item.children?.length}
          {@render navItems(item.children)}
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
    border-right: var(--border-width) solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .sidebar-header,
  .sidebar-footer {
    padding: 0 var(--space-xs);
  }

  .disclosure {
    display: none;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    width: 100%;
    min-height: var(--control-height);
    padding: 0 var(--space-sm);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
    text-align: left;
    cursor: pointer;
  }

  .disclosure:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .chevron {
    flex: none;
    width: var(--space-sm);
    height: var(--space-sm);
    border-right: var(--border-width-emphasis) solid currentColor;
    border-bottom: var(--border-width-emphasis) solid currentColor;
    transform: rotate(45deg);
    transition: transform var(--transition-duration) ease-out;
  }

  .disclosure[aria-expanded='true'] .chevron {
    transform: rotate(225deg);
  }

  .nav {
    display: grid;
    gap: var(--space-lg);
  }

  .section {
    display: grid;
    gap: var(--space-xs);
  }

  .section-label {
    padding: 0 var(--space-xs);
    color: var(--color-text-muted);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-caption);
  }

  ul {
    display: grid;
    gap: var(--space-xs);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li > ul {
    padding-left: var(--space-lg);
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    min-height: var(--control-height);
    padding: 0 var(--space-sm);
    border-left: var(--border-width-emphasis) solid transparent;
    border-radius: var(--radius-sm);
    color: var(--color-text-secondary);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-label);
    text-decoration: none;
  }

  .item:hover {
    color: var(--color-text-primary);
  }

  .item:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .item.active {
    border-left-color: var(--color-accent);
    color: var(--color-text-primary);
  }

  .item-label {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .badge {
    flex: none;
    color: var(--color-text-muted);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-caption);
  }

  @media (max-width: 800px) {
    .sidebar {
      border-right: 0;
      border-bottom: var(--border-width) solid var(--color-border);
    }

    .disclosure {
      display: flex;
    }

    .nav {
      display: none;
    }

    .nav.open {
      display: grid;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .chevron {
      transition: none;
    }
  }
</style>
