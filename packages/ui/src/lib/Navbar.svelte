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
</script>

<header class="navbar">
  <a class="brand" href="/">{brand}</a>
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
    min-height: calc(var(--control-height) + var(--space-sm) * 2);
    padding: 0 var(--space-xl);
    border-bottom: var(--border-width) solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .brand {
    flex: none;
    color: var(--color-text-primary);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
    text-decoration: none;
    white-space: nowrap;
  }

  .brand:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .links {
    display: flex;
    flex: 1 1 auto;
    align-self: stretch;
    align-items: stretch;
    gap: var(--space-xs);
    min-width: 0;
    overflow-x: auto;
    overscroll-behavior-x: contain;
  }

  .link {
    display: inline-flex;
    align-items: center;
    padding: 0 var(--space-sm);
    border-bottom: var(--border-width-emphasis) solid transparent;
    color: var(--color-text-secondary);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-label);
    text-decoration: none;
    white-space: nowrap;
    transition:
      border-color var(--transition-duration) ease-out,
      color var(--transition-duration) ease-out;
  }

  .link:hover {
    color: var(--color-text-primary);
  }

  .link:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: calc(-1 * var(--border-width-emphasis));
  }

  .link.active {
    border-bottom-color: var(--color-accent);
    color: var(--color-text-primary);
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
      padding: var(--space-sm) var(--space-lg);
    }

    .links {
      order: 3;
      flex-basis: 100%;
      align-self: auto;
      padding-bottom: var(--space-xs);
    }

    .link {
      padding: var(--space-sm);
    }
  }
</style>
