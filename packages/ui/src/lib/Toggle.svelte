<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import { Toggle } from 'bits-ui';
  import type { Snippet } from 'svelte';

  type Props = {
    pressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    disabled?: boolean;
    children?: Snippet;
    ariaLabel?: string;
    class?: string;
  };

  let {
    pressed = $bindable(false),
    onPressedChange,
    disabled = false,
    children,
    ariaLabel,
    class: className = ''
  }: Props = $props();
</script>

<Toggle.Root
  bind:pressed
  {onPressedChange}
  {disabled}
  aria-label={ariaLabel}
  class={`t128n-toggle ${className}`}
>
  {@render children?.()}
</Toggle.Root>

<style>
  :global(.t128n-toggle) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    height: var(--control-height);
    min-height: var(--control-height);
    padding: 0 var(--space-md);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
    cursor: pointer;
    transition:
      background-color var(--transition-duration),
      border-color var(--transition-duration),
      color var(--transition-duration);
  }

  :global(.t128n-toggle):hover:not(:disabled) {
    background: var(--color-surface-subtle);
  }

  :global(.t128n-toggle):focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  :global(.t128n-toggle[data-state='on']) {
    border-color: var(--color-border);
    background: var(--color-surface-subtle);
    color: var(--color-accent);
  }

  :global(.t128n-toggle[data-state='on']):hover:not(:disabled) {
    background: var(--color-navigation-selected);
  }

  :global(.t128n-toggle):disabled {
    border-color: var(--color-disabled-background);
    background: var(--color-disabled-background);
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  :global(.t128n-toggle[data-state='on']):disabled {
    border-color: var(--color-disabled-background);
    background: var(--color-disabled-background);
    color: var(--color-disabled-text);
  }
</style>
