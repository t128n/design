<script lang="ts">
  import type { Snippet } from 'svelte';

  type NavLink = {
    label: string;
    href?: string;
    active?: boolean;
  };

  type Props = {
    brand?: string;
    links?: NavLink[];
    actions?: Snippet;
    label?: string;
  };

  let {
    brand = 'Stellar',
    links = [],
    actions,
    label = 'Primary'
  }: Props = $props();

  const mark = $derived(brand.slice(0, 1).toUpperCase());
</script>

<header class="navbar">
  <a class="brand" href="/">
    <span class="mark" aria-hidden="true">{mark}</span>
    <span>{brand}</span>
  </a>
  {#if links.length}
    <nav class="links" aria-label={label}>
      {#each links as link}
        <a
          href={link.href ?? '#'}
          class="link"
          class:active={link.active}
          aria-current={link.active ? 'page' : undefined}
        >
          {link.label}
        </a>
      {/each}
    </nav>
  {/if}
  {#if actions}
    <div class="actions">{@render actions()}</div>
  {/if}
</header>

<style>
  .navbar {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
    min-height: 52px;
    padding: 0 var(--space-lg);
    border-bottom: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .brand {
    display: inline-flex;
    flex: none;
    align-items: center;
    gap: var(--space-sm);
    color: inherit;
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-label);
    text-decoration: none;
    white-space: nowrap;
  }

  .brand:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .mark {
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    border-radius: var(--radius-sm);
    background: var(--color-accent);
    color: var(--color-on-accent);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-semibold);
  }

  .links {
    display: flex;
    flex: 1 1 auto;
    align-items: stretch;
    gap: var(--space-xs);
    min-width: 0;
    overflow-x: auto;
    align-self: stretch;
  }

  .link {
    display: inline-flex;
    align-items: center;
    padding: 0 var(--space-sm);
    border-bottom: 2px solid transparent;
    color: var(--color-text-secondary);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
    text-decoration: none;
    white-space: nowrap;
  }

  .link:hover {
    color: var(--color-text-primary);
  }

  .link:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: -2px;
  }

  .link.active {
    border-bottom-color: var(--color-accent);
    color: var(--color-accent);
  }

  .actions {
    display: flex;
    flex: none;
    align-items: center;
    gap: var(--space-sm);
    margin-left: auto;
  }

  @media (max-width: 640px) {
    .navbar {
      flex-wrap: wrap;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
    }

    .links {
      order: 3;
      flex-basis: 100%;
      align-self: auto;
      border-top: 1px solid var(--color-border);
    }

    .link {
      padding: var(--space-sm);
    }
  }
</style>
