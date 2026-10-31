<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  type Props = HTMLButtonAttributes & {
    variant?: 'primary' | 'secondary' | 'ghost' | 'link';
    disabled?: boolean;
    loading?: boolean;
    children?: Snippet;
  };

  let {
    variant = 'primary',
    disabled = false,
    loading = false,
    children,
    ...restProps
  }: Props = $props();
</script>

<button
  {...restProps}
  class:secondary={variant === 'secondary'}
  class:ghost={variant === 'ghost'}
  class:link={variant === 'link'}
  class="button"
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
    gap: var(--space-sm);
    min-height: var(--control-height);
    padding: 0 var(--space-md);
    border: 1px solid var(--color-accent);
    border-radius: var(--radius-md);
    background: var(--color-accent);
    color: var(--color-on-accent);
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

  .button:hover:not(:disabled) {
    background: var(--color-focus);
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
    border: 0;
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
