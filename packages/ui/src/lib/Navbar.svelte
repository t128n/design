<script lang="ts">
  import { Popover } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import MenuIcon from '~icons/carbon/menu';

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

  const id = $props.id();
  const menuId = `navbar-menu-${id}`;

  let compact = $state(false);
  let menuOpen = $state(false);
  let root = $state<HTMLElement>();
  let brandEl = $state<HTMLAnchorElement>();
  let actionsEl = $state<HTMLDivElement>();
  let measureLinks = $state<HTMLElement>();

  const currentLabel = $derived(links.find((link) => link.active)?.label ?? links[0]?.label ?? '');

  const check = () => {
    if (!root || !measureLinks || !root.clientWidth) return;

    const style = getComputedStyle(root);
    const gap = Number.parseFloat(style.columnGap) || 0;
    const padding = (Number.parseFloat(style.paddingLeft) || 0) + (Number.parseFloat(style.paddingRight) || 0);
    const brandWidth = brandEl?.getBoundingClientRect().width ?? 0;
    const linksWidth = measureLinks.scrollWidth;
    const actionsWidth = actionsEl?.getBoundingClientRect().width ?? 0;
    const parts = [brandWidth, linksWidth];
    if (actions) parts.push(actionsWidth);
    const needed =
      parts.reduce((total, part) => total + part, 0) + Math.max(parts.length - 1, 0) * gap + padding;

    compact = needed > root.clientWidth;
  };

  $effect(() => {
    if (!links.length || !root) {
      compact = false;
      return;
    }

    const observer = new ResizeObserver(check);
    observer.observe(root);
    window.addEventListener('resize', check);
    document.fonts?.ready.then(check);
    check();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', check);
    };
  });
</script>

<header class="navbar" class:compact bind:this={root}>
  <a class="brand" href="/" bind:this={brandEl}>{brand}</a>
  <div class="measure" aria-hidden="true">
    <div class="measure-links" bind:this={measureLinks}>
      {#each links as link}
        <span class="link" class:active={link.active}>{link.label}</span>
      {/each}
    </div>
  </div>
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
    <Popover.Root bind:open={menuOpen}>
      <Popover.Trigger>
        {#snippet child({ props })}
          <button
            {...props}
            type="button"
            class="menu-trigger"
            aria-label={`Navigation menu, ${currentLabel}`}
            aria-expanded={menuOpen}
            aria-controls={menuId}
          >
            <MenuIcon class="menu-icon" aria-hidden="true" />
            <span class="menu-label">Menu</span>
          </button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content class="navbar-menu" id={menuId}>
          <nav class="navbar-menu-nav" aria-label={label}>
            {#each links as link}
              <a
                href={link.href ?? '#'}
                class="navbar-menu-link"
                class:active={link.active}
                aria-current={link.active ? 'page' : undefined}
                onclick={() => (menuOpen = false)}
              >
                {link.label}
              </a>
            {/each}
          </nav>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  {/if}
  <div class="spacer" aria-hidden="true"></div>
  {#if actions}
    <div class="actions" bind:this={actionsEl}>{@render actions()}</div>
  {/if}
</header>

<style>
  .navbar {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-lg);
    min-height: calc(var(--control-height) + var(--space-sm) * 2);
    padding: 0 var(--space-xl);
    background: var(--color-workspace);
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
    flex: none;
    align-self: stretch;
    align-items: stretch;
    gap: var(--space-xs);
    min-width: 0;
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

  .measure {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    overflow: hidden;
    visibility: hidden;
    pointer-events: none;
  }

  .measure-links {
    display: flex;
    gap: var(--space-xs);
    white-space: nowrap;
  }

  .menu-trigger {
    display: none;
    flex: none;
    align-items: center;
    gap: var(--space-xs);
    min-height: var(--control-height);
    padding: 0 var(--space-sm);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-label);
    cursor: pointer;
  }

  .menu-trigger:hover {
    background: var(--color-surface-subtle);
  }

  .menu-trigger:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .menu-trigger :global(.menu-icon) {
    width: 16px;
    height: 16px;
  }

  .navbar.compact .links {
    display: none;
  }

  .navbar.compact .menu-trigger {
    display: inline-flex;
  }

  .spacer {
    flex: 1 1 auto;
    min-width: 0;
  }

  .actions {
    display: flex;
    flex: none;
    align-items: center;
    gap: var(--space-sm);
  }

  :global(.navbar-menu) {
    z-index: 50;
    min-width: 12rem;
    padding: var(--space-xs);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    box-shadow: var(--shadow-overlay);
    font-family: var(--font-family-sans);
  }

  :global(.navbar-menu-nav) {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  :global(.navbar-menu-link) {
    display: flex;
    align-items: center;
    min-height: var(--control-height);
    padding: 0 var(--space-sm);
    border-radius: var(--radius-sm);
    color: var(--color-text-secondary);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-label);
    text-decoration: none;
    white-space: nowrap;
  }

  :global(.navbar-menu-link:hover) {
    background: var(--color-surface-subtle);
    color: var(--color-text-primary);
  }

  :global(.navbar-menu-link.active) {
    background: var(--color-surface-subtle);
    color: var(--color-text-primary);
  }

  :global(.navbar-menu-link:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: calc(-1 * var(--border-width-emphasis));
  }
</style>
