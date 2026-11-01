<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import { NavigationMenu } from 'bits-ui';
  import type { Snippet } from 'svelte';

  type LinkItem = {
    href: string;
    label: string;
    active?: boolean;
  };

  type MenuItem = {
    trigger: string;
    links: LinkItem[];
    content?: Snippet;
  };

  type Props = {
    items: MenuItem[];
    ariaLabel?: string;
  };

  let { items, ariaLabel = 'Navigation' }: Props = $props();
</script>

<NavigationMenu.Root class="t128n-nav-root" aria-label={ariaLabel}>
  <NavigationMenu.List class="t128n-nav-list">
    {#each items as item}
      <NavigationMenu.Item>
        <NavigationMenu.Trigger class="t128n-nav-trigger">{item.trigger}</NavigationMenu.Trigger>
        <NavigationMenu.Content class="t128n-nav-content">
          <div class="t128n-nav-panel">
            {#if item.content}
              {@render item.content()}
            {:else}
              <ul class="t128n-nav-list-items">
                {#each item.links as link}
                  <li>
                    <NavigationMenu.Link
                      class="t128n-nav-link"
                      href={link.href}
                      aria-current={link.active ? 'page' : undefined}
                    >
                      {link.label}
                    </NavigationMenu.Link>
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    {/each}
  </NavigationMenu.List>
  <NavigationMenu.Viewport class="t128n-nav-viewport" />
</NavigationMenu.Root>

<style>
  :global(.t128n-nav-root) {
    position: relative;
  }

  :global(.t128n-nav-root .t128n-nav-list) {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-xs);
    list-style: none;
    margin: 0;
    font-family: var(--font-family-sans);
  }

  :global(.t128n-nav-root .t128n-nav-trigger) {
    padding: var(--space-xs) var(--space-sm);
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-text-primary);
    font: inherit;
    font-size: var(--font-size-label);
    line-height: var(--line-height-label);
    cursor: pointer;
  }

  :global(.t128n-nav-root .t128n-nav-trigger:hover) {
    background: var(--color-surface-subtle);
  }

  :global(.t128n-nav-root .t128n-nav-trigger[data-state='open']) {
    background: var(--color-navigation-selected);
  }

  :global(.t128n-nav-root .t128n-nav-trigger:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: calc(-1 * var(--border-width-emphasis));
  }

  :global(.t128n-nav-root .t128n-nav-viewport) {
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 50;
    width: var(--bits-navigation-menu-viewport-width, auto);
    height: var(--bits-navigation-menu-viewport-height, auto);
    margin-top: var(--space-xs);
    overflow: hidden;
  }

  .t128n-nav-panel {
    min-width: 16rem;
    padding: var(--space-sm);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    box-shadow: var(--shadow-overlay);
    color: var(--color-text-primary);
  }

  .t128n-nav-list-items {
    display: grid;
    gap: var(--space-xs);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  :global(.t128n-nav-root .t128n-nav-link) {
    display: block;
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
    text-decoration: none;
    font-size: var(--font-size-label);
    line-height: var(--line-height-label);
  }

  :global(.t128n-nav-root .t128n-nav-link:hover) {
    background: var(--color-surface-subtle);
  }

  :global(.t128n-nav-root .t128n-nav-link[aria-current='page']) {
    background: var(--color-navigation-selected);
  }

  :global(.t128n-nav-root .t128n-nav-link:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: calc(-1 * var(--border-width-emphasis));
  }
</style>
