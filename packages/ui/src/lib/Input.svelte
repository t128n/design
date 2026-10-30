<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  type Props = HTMLInputAttributes & {
    label: string;
    error?: string;
  };

  let { label, error, ...restProps }: Props = $props();
</script>

<label class="field">
  <span class="label">{label}</span>
  <input {...restProps} class="input" aria-invalid={error ? 'true' : undefined} />
  {#if error}
    <span class="error" role="alert">{error}</span>
  {/if}
</label>

<style>
  .field {
    display: grid;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .label {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  .input {
    min-height: var(--control-height);
    padding: 0 var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font: inherit;
    line-height: var(--line-height-body);
  }

  .input:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .input[aria-invalid='true'] {
    border-color: var(--color-danger);
  }

  .input[aria-invalid='true']:focus-visible {
    outline-color: var(--color-danger);
  }

  .error {
    color: var(--color-danger);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }
</style>
