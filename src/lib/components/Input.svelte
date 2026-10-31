<script lang="ts">
  import { ErrorFilled } from 'carbon-icons-svelte';
  import Icon from './Icon.svelte';

  interface Props {
    label: string;
    value?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'search';
    placeholder?: string;
    hint?: string;
    error?: string;
    disabled?: boolean;
    name?: string;
    autocomplete?: import('svelte/elements').HTMLInputAttributes['autocomplete'];
    id?: string;
  }

  let {
    label,
    value = $bindable(''),
    type = 'text',
    placeholder,
    hint,
    error,
    disabled = false,
    name,
    autocomplete,
    id,
  }: Props = $props();

  const uid = $props.id();
  const inputId = $derived(id ?? `input-${uid}`);
  const describedBy = $derived(
    [hint ? `${inputId}-hint` : '', error ? `${inputId}-error` : ''].filter(Boolean).join(' ') ||
      undefined,
  );
</script>

<div class="field">
  <label for={inputId}>{label}</label>
  <input
    id={inputId}
    bind:value
    {type}
    {name}
    {placeholder}
    {disabled}
    {autocomplete}
    class:invalid={Boolean(error)}
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={describedBy}
  />
  {#if error}
    <p class="error" id="{inputId}-error">
      <Icon icon={ErrorFilled} size={16} />
      {error}
    </p>
  {:else if hint}
    <p class="hint" id="{inputId}-hint">{hint}</p>
  {/if}
</div>

<style>
  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 0;
  }

  label {
    font: var(--type-label);
    color: var(--text-2);
  }

  input {
    width: 100%;
    height: var(--control-h);
    padding: 0 var(--space-3);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-body);
  }

  input:hover:not(:disabled) {
    border-color: var(--border-strong);
  }

  input:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: -1px;
  }

  input:disabled {
    background: var(--surface-sunken);
    color: var(--text-2);
    cursor: default;
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
