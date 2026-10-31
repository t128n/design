<script lang="ts">
  import { ErrorFilled } from 'carbon-icons-svelte';
  import Icon from './Icon.svelte';

  interface Props {
    label: string;
    value?: string;
    placeholder?: string;
    hint?: string;
    error?: string;
    disabled?: boolean;
    rows?: number;
    id?: string;
  }

  let {
    label,
    value = $bindable(''),
    placeholder,
    hint,
    error,
    disabled = false,
    rows = 4,
    id,
  }: Props = $props();

  const uid = $props.id();
  const inputId = $derived(id ?? `textarea-${uid}`);
</script>

<div class="field">
  <label for={inputId}>{label}</label>
  <textarea
    id={inputId}
    bind:value
    {rows}
    {placeholder}
    {disabled}
    class:invalid={Boolean(error)}
    aria-invalid={error ? 'true' : undefined}
  ></textarea>
  {#if error}
    <p class="error"><Icon icon={ErrorFilled} size={16} />{error}</p>
  {:else if hint}
    <p class="hint">{hint}</p>
  {/if}
</div>

<style>
  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  label {
    font: var(--type-label);
    color: var(--text-2);
  }

  textarea {
    width: 100%;
    min-height: var(--textarea-min-h);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-prose);
    resize: vertical;
  }

  textarea:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: -1px;
  }

  textarea:disabled {
    background: var(--surface-sunken);
    color: var(--text-2);
  }

  .invalid {
    border-color: var(--danger);
  }

  .hint,
  .error {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    font: var(--type-caption);
  }

  .hint {
    color: var(--text-3);
  }

  .error {
    color: var(--danger);
  }
</style>
