<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'secondary' | 'primary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    ariaLabel?: string;
    title?: string;
    onclick?: (event: MouseEvent) => void;
    label?: string;
    children?: Snippet;
  }

  let {
    variant = 'secondary',
    size = 'md',
    type = 'button',
    disabled = false,
    ariaLabel,
    title,
    onclick,
    label,
    children,
  }: Props = $props();
</script>

<button
  {type}
  {disabled}
  class="button"
  class:primary={variant === 'primary'}
  class:ghost={variant === 'ghost'}
  class:danger={variant === 'danger'}
  class:sm={size === 'sm'}
  class:lg={size === 'lg'}
  aria-label={ariaLabel}
  {title}
  {onclick}
>
  {#if children}{@render children()}{:else}{label}{/if}
</button>

<style>
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-1);
    height: var(--control-h);
    padding: 0 var(--space-3);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-action);
    white-space: nowrap;
  }

  .button:hover:not(:disabled) {
    background: var(--surface-sunken);
  }

  .button:active:not(:disabled) {
    background: var(--state-pressed);
  }

  .button:disabled {
    background: var(--surface-sunken);
    color: var(--text-2);
    border-color: var(--border);
  }

  .primary {
    background: var(--accent);
    border-color: transparent;
    color: var(--text-on-accent);
  }

  .primary:hover:not(:disabled),
  .primary:active:not(:disabled) {
    background: color-mix(in srgb, var(--accent) 88%, var(--text-1));
  }

  .primary:disabled {
    background: var(--surface-sunken);
    color: var(--text-2);
  }

  .ghost {
    background: transparent;
    border-color: transparent;
    color: var(--text-2);
  }

  .ghost:hover:not(:disabled) {
    background: var(--state-hover);
    color: var(--text-1);
  }

  .ghost:active:not(:disabled) {
    background: var(--state-pressed);
  }

  .ghost:disabled {
    background: transparent;
    color: var(--text-2);
  }

  .danger {
    background: var(--danger);
    border-color: transparent;
    color: var(--text-on-danger);
  }

  .danger:hover:not(:disabled),
  .danger:active:not(:disabled) {
    background: color-mix(in srgb, var(--danger) 88%, var(--text-1));
  }

  .danger:disabled {
    background: var(--surface-sunken);
    color: var(--text-2);
  }

  .sm {
    height: calc(var(--control-h) - 4px);
    padding: 0 var(--space-2);
    font: var(--type-caption);
  }

  .lg {
    height: calc(var(--control-h) + 8px);
    padding: 0 var(--space-4);
    font: var(--type-heading);
  }
</style>
