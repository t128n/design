<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { mergeClasses } from './class';

  type Props = HTMLButtonAttributes & {
    variant?: 'primary' | 'secondary' | 'ghost' | 'link' | 'danger';
    disabled?: boolean;
    loading?: boolean;
    children?: Snippet;
  };

  let {
    variant = 'primary',
    disabled = false,
    loading = false,
    class: className,
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(
    mergeClasses('button', variant === 'primary' ? '' : variant, className)
  );
</script>

<button
  {...restProps}
  class={classes}
  disabled={disabled || loading}
  aria-busy={loading ? 'true' : undefined}
>
  {@render children?.()}
  {#if loading}
    <span class="loading" aria-hidden="true">Loading…</span>
  {/if}
</button>

<style>
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    gap: var(--space-sm);
    height: var(--control-height);
    min-height: var(--control-height);
    padding: 0 var(--space-md);
    border: var(--border-width) solid var(--color-accent);
    border-radius: var(--radius-md);
    background: var(--color-accent);
    color: var(--color-on-accent);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
    white-space: nowrap;
    cursor: pointer;
    transition:
      background-color var(--transition-duration),
      border-color var(--transition-duration),
      color var(--transition-duration);
  }

  .button:hover:not(:disabled) {
    background: var(--color-focus);
  }

  .button.danger {
    border-color: var(--color-danger);
    background: var(--color-danger);
    color: var(--color-on-accent);
  }

  .button.danger:hover:not(:disabled) {
    filter: brightness(0.9);
  }

  .button.secondary {
    border-color: var(--color-border);
    background: var(--color-surface);
    color: var(--color-text-primary);
  }

  .button.secondary:hover:not(:disabled) {
    background: var(--color-surface-subtle);
  }

  .button.ghost {
    border-color: transparent;
    background: transparent;
    color: var(--color-text-primary);
    min-height: var(--control-height);
    padding: 0 var(--space-md);
  }

  .button.ghost:hover:not(:disabled) {
    background: var(--color-surface-subtle);
  }

  .button.ghost:active:not(:disabled) {
    background: var(--color-surface-subtle);
  }

  .button.link {
    height: auto;
    border: 0;
    background: transparent;
    color: var(--color-accent);
    min-height: auto;
    padding: 0;
    text-decoration: none;
  }

  .button.link:hover:not(:disabled) {
    background: transparent;
    text-decoration: underline;
  }

  .button.link:active:not(:disabled) {
    background: transparent;
    color: var(--color-text-primary);
  }

  .button:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .button:disabled {
    border-color: var(--color-disabled-background);
    background: var(--color-disabled-background);
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .button.ghost:disabled,
  .button.link:disabled {
    border-color: transparent;
    background: transparent;
    color: var(--color-disabled-text);
  }

  .loading {
    font-size: var(--font-size-body-sm);
  }
</style>
