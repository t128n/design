<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import { Toolbar } from 'bits-ui';
  import type { Snippet } from 'svelte';

  type ToolbarItem = {
    type?: 'button' | 'link';
    label: string;
    disabled?: boolean;
    href?: string;
    onClick?: () => void;
  };

  type Props = {
    orientation?: 'horizontal' | 'vertical';
    loop?: boolean;
    items?: ToolbarItem[];
    children?: Snippet;
    ariaLabel?: string;
  };

  let {
    orientation = 'horizontal',
    loop = true,
    items = [],
    children,
    ariaLabel = 'Toolbar'
  }: Props = $props();
</script>

<Toolbar.Root class="t128n-toolbar" {orientation} {loop} aria-label={ariaLabel}>
  {#if children}
    {@render children()}
  {:else}
    {#each items as item}
      {#if item.type === 'link' || item.href}
        <Toolbar.Link
          class="toolbar-item"
          href={item.href}
          aria-disabled={item.disabled ? 'true' : undefined}
          tabindex={item.disabled ? -1 : undefined}
          onclick={(event) => {
            if (item.disabled) event.preventDefault();
          }}
        >
          {item.label}
        </Toolbar.Link>
      {:else}
        <Toolbar.Button
          class="toolbar-item"
          disabled={item.disabled}
          onclick={item.onClick}
        >
          {item.label}
        </Toolbar.Button>
      {/if}
    {/each}
  {/if}
</Toolbar.Root>

<style>
  :global(.t128n-toolbar) {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-xs);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  :global(.t128n-toolbar[data-orientation='vertical']) {
    flex-direction: column;
    align-items: stretch;
  }

  :global(.toolbar-item) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--control-height-sm);
    padding: 0 var(--space-sm);
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-text-primary);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    outline: none;
  }

  :global(.toolbar-item:hover:not([data-disabled])) {
    background: var(--color-surface-subtle);
  }

  :global(.toolbar-item:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  :global(.toolbar-item[data-disabled]) {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }
</style>
