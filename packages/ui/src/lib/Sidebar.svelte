<script lang="ts">
  import type { Snippet } from 'svelte';

  type Item = {
    label: string;
    href?: string;
    active?: boolean;
    badge?: string;
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
  };

  let {
    sections,
    header,
    footer,
    label = 'Sections'
  }: Props = $props();
</script>

<aside class="sidebar">
  {#if header}
    <div class="sidebar-header">{@render header()}</div>
  {/if}
  <nav class="nav" aria-label={label}>
    {#each sections as section}
      <div class="section">
        {#if section.label}
          <span class="section-label">{section.label}</span>
        {/if}
        <ul>
          {#each section.items as item}
            <li>
              <a
                href={item.href ?? '#'}
                class="item"
                class:active={item.active}
                aria-current={item.active ? 'page' : undefined}
              >
                <span>{item.label}</span>
                {#if item.badge}
                  <span class="badge">{item.badge}</span>
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </nav>
  {#if footer}
    <div class="sidebar-footer">{@render footer()}</div>
  {/if}
</aside>

<style>
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    width: 100%;
    min-height: 100%;
    padding: var(--space-md);
    border-right: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .sidebar-header,
  .sidebar-footer {
    padding: 0 var(--space-xs);
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
    letter-spacing: 0.04em;
    line-height: var(--line-height-caption);
    text-transform: uppercase;
  }

  ul {
    display: grid;
    gap: 2px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    min-height: 32px;
    padding: 0 var(--space-sm);
    border-left: 2px solid transparent;
    border-radius: var(--radius-sm);
    color: var(--color-text-secondary);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
    text-decoration: none;
  }

  .item:hover {
    background: var(--color-surface-subtle);
    color: var(--color-text-primary);
  }

  .item:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: -2px;
  }

  .item.active {
    border-left-color: var(--color-accent);
    background: var(--color-surface-subtle);
    color: var(--color-accent);
  }

  .badge {
    color: var(--color-text-muted);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-caption);
  }

  @media (max-width: 800px) {
    .sidebar {
      border-right: 0;
      border-bottom: 1px solid var(--color-border);
    }
  }
</style>
