<script lang="ts">
  import { Select } from 'bits-ui';
  import { Checkmark, ChevronDown, ErrorFilled } from 'carbon-icons-svelte';
  import Icon from './Icon.svelte';

  interface Option {
    value: string;
    label: string;
    disabled?: boolean;
  }

  interface Props {
    label: string;
    options: Option[];
    value?: string;
    placeholder?: string;
    hint?: string;
    error?: string;
    disabled?: boolean;
    name?: string;
    id?: string;
    open?: boolean;
    onchange?: (value: string) => void;
  }

  let {
    label,
    options,
    value = $bindable(''),
    placeholder = 'Select an option',
    hint,
    error,
    disabled = false,
    name,
    id,
    open = $bindable(false),
    onchange,
  }: Props = $props();

  const uid = $props.id();
  const triggerId = $derived(id ?? `select-${uid}`);
  const describedBy = $derived(
    [hint ? `${triggerId}-hint` : '', error ? `${triggerId}-error` : ''].filter(Boolean).join(' ') ||
      undefined,
  );

  function handleValueChange(next: string) {
    value = next;
    onchange?.(next);
  }
</script>

<div class="field">
  <label for={triggerId}>{label}</label>
  <Select.Root
    type="single"
    {value}
    {disabled}
    {name}
    bind:open
    onValueChange={handleValueChange}
  >
    <Select.Trigger
      id={triggerId}
      class={error ? 'trigger invalid' : 'trigger'}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy}
    >
      <Select.Value {placeholder} />
      <span class="chevron" aria-hidden="true"><Icon icon={ChevronDown} size={16} /></span>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content class="select-menu" sideOffset={4}>
        <Select.Viewport class="viewport">
          {#each options as option}
            <Select.Item
              value={option.value}
              label={option.label}
              disabled={option.disabled}
              class="item"
            >
              {#snippet children({ selected })}
                <span class="check" aria-hidden="true">
                  {#if selected}<Icon icon={Checkmark} size={16} />{/if}
                </span>
                <span class="item-label">{option.label}</span>
              {/snippet}
            </Select.Item>
          {/each}
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
  {#if error}
    <p class="error" id="{triggerId}-error"><Icon icon={ErrorFilled} size={16} />{error}</p>
  {:else if hint}
    <p class="hint" id="{triggerId}-hint">{hint}</p>
  {/if}
</div>

<style>
  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    width: 100%;
    max-width: calc(var(--width-label) * 3);
    min-width: 0;
  }

  label {
    font: var(--type-label);
    color: var(--text-2);
  }

  :global(.trigger) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
    width: 100%;
    height: var(--control-h);
    padding: 0 var(--space-2) 0 var(--space-3);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-body);
    text-align: left;
  }

  :global(.trigger:hover:not(:disabled)) {
    border-color: var(--border-strong);
  }

  :global(.trigger:focus-visible) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: -1px;
  }

  :global(.trigger:disabled) {
    background: var(--surface-sunken);
    color: var(--text-2);
  }

  :global(.trigger[data-placeholder]) {
    color: var(--text-3);
  }

  :global(.trigger.invalid) {
    border-color: var(--danger);
  }

  .chevron {
    display: grid;
    place-items: center;
    color: var(--text-2);
    flex: none;
  }

  :global(.select-menu) {
    z-index: var(--layer-menu);
    min-width: var(--bits-select-anchor-width);
    padding: var(--space-1);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
    box-shadow: var(--shadow-overlay);
    transform-origin: var(--bits-select-content-transform-origin);
    transition: opacity var(--duration-fast) var(--ease-standard);
  }

  :global(.select-menu[data-starting-style]),
  :global(.select-menu[data-ending-style]) {
    opacity: 0;
  }

  :global(.viewport) {
    max-height: var(--bits-select-content-available-height);
    overflow-y: auto;
  }

  :global(.item) {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    height: var(--control-h);
    padding: 0 var(--space-2);
    border-radius: var(--radius-md);
    color: var(--text-1);
    font: var(--type-body);
    cursor: default;
    user-select: none;
  }

  :global(.item[data-highlighted]) {
    background: var(--state-hover);
  }

  :global(.item[data-selected]) {
    background: var(--state-selected);
    font: var(--type-action);
  }

  :global(.item[data-disabled]) {
    color: var(--text-2);
  }

  .check {
    display: grid;
    place-items: center;
    width: var(--icon);
    height: var(--icon);
    flex: none;
  }

  .item-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

  @media (prefers-reduced-motion: reduce) {
    :global(.select-menu) {
      transition: none;
    }
  }
</style>
