<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  type Props = HTMLButtonAttributes & {
    variant?: 'primary' | 'secondary';
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
    transition: background-color var(--transition-duration), border-color var(--transition-duration);
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

  .button:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .button:disabled {
    border-color: var(--color-disabled-background);
    background: var(--color-disabled-background);
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .loading {
    font-size: var(--font-size-body-sm);
  }
</style>
