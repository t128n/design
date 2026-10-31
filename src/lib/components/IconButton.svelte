<script lang="ts">
  import type { Component, Snippet } from 'svelte';

  interface Props {
    icon: Component<any>;
    label: string;
    variant?: 'ghost' | 'secondary';
    size?: 'sm' | 'md';
    disabled?: boolean;
    pressed?: boolean;
    onclick?: (event: MouseEvent) => void;
    children?: Snippet;
  }

  let {
    icon,
    label,
    variant = 'ghost',
    size = 'md',
    disabled = false,
    pressed,
    onclick,
    children,
  }: Props = $props();

  const Glyph = $derived(icon);
</script>

<button
  type="button"
  class="icon-button"
  class:secondary={variant === 'secondary'}
  class:sm={size === 'sm'}
  aria-label={label}
  title={label}
  aria-pressed={pressed}
  {disabled}
  {onclick}
>
  <Glyph size={16} />
  {#if children}{@render children()}{/if}
</button>

<style>
  .icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-1);
    width: var(--control-h);
    height: var(--control-h);
    padding: 0;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-2);
    flex: none;
  }

  .icon-button:hover:not(:disabled) {
    background: var(--state-hover);
    color: var(--text-1);
  }

  .icon-button:active:not(:disabled) {
    background: var(--state-pressed);
  }

  .icon-button[aria-pressed='true'] {
    background: var(--state-selected);
    color: var(--text-1);
  }

  .icon-button:disabled {
    color: var(--text-2);
    background: transparent;
  }

  .secondary {
    border-color: var(--border-control);
    background: var(--surface-panel);
    color: var(--text-1);
  }

  .secondary:hover:not(:disabled) {
    background: var(--surface-sunken);
  }

  .sm {
    width: calc(var(--control-h) - 4px);
    height: calc(var(--control-h) - 4px);
  }
</style>
