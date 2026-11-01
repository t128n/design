<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import { ToggleGroup } from 'bits-ui';
  import type { Snippet } from 'svelte';

  type ToggleItem = {
    value: string;
    label: string;
    disabled?: boolean;
  };

  type Props = {
    type?: 'single' | 'multiple';
    items?: ToggleItem[];
    value?: string | string[];
    onValueChange?: (value: any) => void;
    disabled?: boolean;
    orientation?: 'horizontal' | 'vertical';
    children?: Snippet;
    class?: string;
  };

  let {
    type = 'single',
    items = [],
    value = $bindable(type === 'single' ? '' : []),
    onValueChange,
    disabled = false,
    orientation = 'horizontal',
    children,
    class: className = ''
  }: Props = $props();

  let singleValue = $state(typeof value === 'string' ? value : '');
  let multiValue = $state<string[]>(Array.isArray(value) ? value : []);

  $effect(() => {
    singleValue = typeof value === 'string' ? value : '';
    multiValue = Array.isArray(value) ? value : [];
  });

  const handleChange = (next: string | string[]) => {
    value = next;
    onValueChange?.(next);
  };
</script>

{#if type === 'single'}
  <ToggleGroup.Root
    type="single"
    bind:value={singleValue}
    onValueChange={handleChange}
    {disabled}
    {orientation}
    class={`toggle-group ${orientation === 'vertical' ? 'vertical' : 'horizontal'} ${className}`}
  >
    {#if items.length}
      {#each items as item}
        <ToggleGroup.Item value={item.value} disabled={item.disabled} class="toggle-group-item">
          {item.label}
        </ToggleGroup.Item>
      {/each}
    {:else}
      {@render children?.()}
    {/if}
  </ToggleGroup.Root>
{:else}
  <ToggleGroup.Root
    type="multiple"
    bind:value={multiValue}
    onValueChange={handleChange}
    {disabled}
    {orientation}
    class={`toggle-group ${orientation === 'vertical' ? 'vertical' : 'horizontal'} ${className}`}
  >
    {#if items.length}
      {#each items as item}
        <ToggleGroup.Item value={item.value} disabled={item.disabled} class="toggle-group-item">
          {item.label}
        </ToggleGroup.Item>
      {/each}
    {:else}
      {@render children?.()}
    {/if}
  </ToggleGroup.Root>
{/if}

<style>
  :global(.toggle-group) {
    display: inline-flex;
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    overflow: hidden;
  }

  :global(.toggle-group.horizontal) {
    flex-direction: row;
  }

  :global(.toggle-group.vertical) {
    flex-direction: column;
  }

  :global(.toggle-group .toggle-group-item) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    height: var(--control-height);
    min-height: var(--control-height);
    padding: 0 var(--space-md);
    border: 0;
    background: transparent;
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
    cursor: pointer;
    border-right: var(--border-width) solid var(--color-border);
    transition:
      background-color var(--transition-duration),
      color var(--transition-duration);
  }

  :global(.toggle-group.vertical .toggle-group-item) {
    border-right: 0;
    border-bottom: var(--border-width) solid var(--color-border);
    width: 100%;
    justify-content: flex-start;
  }

  :global(.toggle-group .toggle-group-item):last-child {
    border-right: 0;
  }

  :global(.toggle-group.vertical .toggle-group-item):last-child {
    border-bottom: 0;
  }

  :global(.toggle-group .toggle-group-item):hover:not(:disabled) {
    background: var(--color-surface-subtle);
  }

  :global(.toggle-group .toggle-group-item):focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: calc(-1 * var(--border-width-emphasis));
    z-index: 1;
  }

  :global(.toggle-group .toggle-group-item[data-state='on']) {
    background: var(--color-surface-subtle);
    color: var(--color-accent);
  }

  :global(.toggle-group .toggle-group-item[data-state='on']):hover:not(:disabled) {
    background: var(--color-navigation-selected);
  }

  :global(.toggle-group .toggle-group-item):disabled {
    color: var(--color-disabled-text);
    cursor: not-allowed;
    background: var(--color-disabled-background);
  }

  :global(.toggle-group .toggle-group-item[data-state='on']):disabled {
    background: var(--color-disabled-background);
    color: var(--color-disabled-text);
  }
</style>
