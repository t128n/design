<script lang="ts">
  import { Combobox } from 'bits-ui';
  import { untrack } from 'svelte';
  import { Add, Checkmark, ChevronDown, ErrorFilled } from 'carbon-icons-svelte';
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
    createLabel?: string;
    onchange?: (value: string) => void;
    oncreate?: (query: string) => void;
  }

  let {
    label,
    options,
    value = $bindable(''),
    placeholder = 'Search or select',
    hint,
    error,
    disabled = false,
    name,
    id,
    open = $bindable(false),
    createLabel = 'Create new item',
    onchange,
    oncreate,
  }: Props = $props();

  const CREATE_VALUE = '__create__';
  const uid = $props.id();
  const inputId = $derived(id ?? `combobox-${uid}`);
  const describedBy = $derived(
    [hint ? `${inputId}-hint` : '', error ? `${inputId}-error` : ''].filter(Boolean).join(' ') ||
      undefined,
  );

  let query = $state('');
  let previousValue = $state(value);
  let inputText = $state(untrack(() => options.find((option) => option.value === value)?.label ?? ''));
  const createText = $derived(query.trim() ? `Create “${query.trim()}”` : createLabel);
  const visibleOptions = $derived.by(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return options;
    return options.filter((option) => option.label.toLowerCase().includes(needle));
  });

  function handleValueChange(next: string) {
    if (next === CREATE_VALUE) {
      const text = query.trim();
      if (text) {
        oncreate?.(text);
        value = text;
        previousValue = text;
        inputText = text;
      } else {
        value = previousValue;
        inputText = options.find((option) => option.value === previousValue)?.label ?? '';
      }
      query = '';
      open = false;
      return;
    }
    previousValue = next;
    value = next;
    inputText = options.find((option) => option.value === next)?.label ?? next;
    query = '';
    onchange?.(next);
  }
</script>

<div class="field">
  <label for={inputId}>{label}</label>
  <Combobox.Root
    type="single"
    {value}
    {disabled}
    {name}
    inputValue={inputText}
    bind:open
    onValueChange={handleValueChange}
  >
    <div class="control" class:invalid={Boolean(error)}>
      <Combobox.Input
        id={inputId}
        class="input"
        {placeholder}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        oninput={(event) => {
          query = (event.currentTarget as HTMLInputElement).value;
        }}
      />
      <Combobox.Trigger class="chevron" aria-label="Show options">
        <Icon icon={ChevronDown} size={16} />
      </Combobox.Trigger>
    </div>
    <Combobox.Portal>
      <Combobox.Content class="combobox-menu" sideOffset={4}>
        <Combobox.Viewport class="viewport">
          {#each visibleOptions as option}
            <Combobox.Item
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
            </Combobox.Item>
          {/each}
          <Combobox.Separator class="separator" />
          <Combobox.Item value={CREATE_VALUE} label={createText} class="item create">
            {#snippet children()}
              <span class="check" aria-hidden="true"><Icon icon={Add} size={16} /></span>
              <span class="item-label">{createText}</span>
            {/snippet}
          </Combobox.Item>
        </Combobox.Viewport>
      </Combobox.Content>
    </Combobox.Portal>
  </Combobox.Root>
  {#if error}
    <p class="error" id="{inputId}-error"><Icon icon={ErrorFilled} size={16} />{error}</p>
  {:else if hint}
    <p class="hint" id="{inputId}-hint">{hint}</p>
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

  .control {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    height: var(--control-h);
    padding: 0 var(--space-1) 0 var(--space-3);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
  }

  .control:hover {
    border-color: var(--border-strong);
  }

  .control:focus-within {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: -1px;
  }

  .control.invalid {
    border-color: var(--danger);
  }

  :global(.input) {
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--text-1);
    font: var(--type-body);
  }

  :global(.input)::placeholder {
    color: var(--text-3);
  }

  :global(.chevron) {
    display: grid;
    place-items: center;
    width: var(--control-h);
    height: var(--control-h);
    flex: none;
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-2);
  }

  :global(.chevron:hover) {
    background: var(--state-hover);
    color: var(--text-1);
  }

  :global(.chevron:focus-visible) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: -1px;
  }

  :global(.combobox-menu) {
    z-index: var(--layer-menu);
    min-width: var(--bits-combobox-anchor-width);
    padding: var(--space-1);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
    box-shadow: var(--shadow-overlay);
    transform-origin: var(--bits-combobox-content-transform-origin);
    transition: opacity var(--duration-fast) var(--ease-standard);
  }

  :global(.combobox-menu[data-starting-style]),
  :global(.combobox-menu[data-ending-style]) {
    opacity: 0;
  }

  :global(.viewport) {
    max-height: var(--bits-combobox-content-available-height);
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

  :global(.create) {
    color: var(--text-2);
  }

  :global(.separator) {
    height: 1px;
    margin: var(--space-1) 0;
    background: var(--border);
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
    :global(.combobox-menu) {
      transition: none;
    }
  }
</style>
