<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import { Combobox } from 'bits-ui';
  import ChevronDownIcon from '~icons/carbon/chevron-down';
  import CheckIcon from '~icons/carbon/checkmark';
  import { mergeClasses } from './class';
  import Field from './Field.svelte';
  import Icon from './Icon.svelte';
  import VisuallyHidden from './VisuallyHidden.svelte';

  type Item = {
    value: string;
    label: string;
    disabled?: boolean;
  };

  type Props = {
    items: Item[];
    value?: string;
    onValueChange?: (value: string) => void;
    inputValue?: string;
    label: string;
    description?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    id?: string;
    name?: string;
    class?: string;
  };

  let {
    items,
    value = $bindable<string | undefined>(undefined),
    onValueChange,
    inputValue = $bindable<string>(''),
    label,
    description,
    placeholder = 'Search...',
    error,
    disabled = false,
    required = false,
    id,
    name,
    class: className = ''
  }: Props = $props();

  const classes = $derived(mergeClasses('combobox-field', className));

  const filteredItems = $derived(
    items.filter((item) => item.label.toLowerCase().includes(inputValue.trim().toLowerCase()))
  );
</script>

<div class={classes}>
  <Field {label} {description} {error} {disabled} {required} {id}>
    {#snippet children(state)}
      <Combobox.Root
        type="single"
        bind:value
        {items}
        {disabled}
        {required}
        {name}
        {onValueChange}
      >
        <div class="combobox-input-group" class:invalid={state.invalid}>
          <Combobox.Input
            id={state.id}
            class="combobox-input"
            {placeholder}
            oninput={(event) => {
              inputValue = event.currentTarget.value;
            }}
            aria-labelledby={state.labelId}
            aria-required={state.required ? 'true' : undefined}
            aria-invalid={state.invalid ? 'true' : undefined}
            aria-describedby={state.describedBy}
          />
          <Combobox.Trigger class="combobox-trigger">
            <Icon icon={ChevronDownIcon} class="chevron" />
            <VisuallyHidden>Open options</VisuallyHidden>
          </Combobox.Trigger>
        </div>
        <Combobox.Portal>
          <Combobox.Content class="combobox-content" sideOffset={4}>
            <div class="panel">
              <Combobox.Viewport class="t128n-combobox-viewport">
                {#each filteredItems as item}
                  <Combobox.Item
                    value={item.value}
                    label={item.label}
                    disabled={item.disabled}
                    class="combobox-item"
                  >
                    {#snippet children({ selected })}
                      <span class="check" aria-hidden="true">
                        {#if selected}<Icon icon={CheckIcon} class="check-icon" />{/if}
                      </span>
                      <span>{item.label}</span>
                    {/snippet}
                  </Combobox.Item>
                {/each}
                {#if filteredItems.length === 0}
                  <div class="empty">No results</div>
                {/if}
              </Combobox.Viewport>
            </div>
          </Combobox.Content>
        </Combobox.Portal>
      </Combobox.Root>
    {/snippet}
  </Field>
</div>

<style>
  .combobox-field {
    display: grid;
    min-width: 14rem;
    max-width: 100%;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .combobox-input-group {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: var(--control-height);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    overflow: hidden;
  }

  .combobox-field :global(.combobox-input) {
    flex: 1 1 auto;
    height: var(--control-height);
    padding: 0 var(--space-md);
    border: 0;
    background: transparent;
    color: var(--color-text-primary);
    font: inherit;
    line-height: var(--line-height-body);
  }

  .combobox-field :global(.combobox-input)::placeholder {
    color: var(--color-text-muted);
  }

  .combobox-field :global(.combobox-input):focus-visible {
    outline: none;
  }

  .combobox-input-group:focus-within {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .combobox-input-group.invalid {
    border-color: var(--color-danger);
  }

  .combobox-input-group.invalid:focus-within {
    outline-color: var(--color-danger);
  }

  .combobox-field :global(.combobox-trigger) {
    display: grid;
    place-items: center;
    width: var(--control-height);
    height: var(--control-height);
    border: 0;
    background: transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
  }

  .combobox-field :global(.combobox-trigger):focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: calc(-1 * var(--border-width-emphasis));
    border-radius: var(--radius-sm);
  }

  .combobox-field :global(.chevron) {
    color: var(--color-text-secondary);
  }

  :global(.combobox-content) {
    z-index: 50;
  }

  .panel {
    width: max-content;
    min-width: 14rem;
    max-width: min(28rem, calc(100vw - 2rem));
    padding: var(--space-xs);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    box-shadow: var(--shadow-overlay);
  }

  .panel :global(.t128n-combobox-viewport) {
    max-height: 18rem;
    overflow-y: auto;
  }

  .panel :global(.combobox-item) {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-height: var(--control-height-sm);
    padding: 0 var(--space-sm);
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
    font-size: var(--font-size-label);
    line-height: var(--line-height-label);
    cursor: pointer;
    outline: none;
  }

  .panel :global(.combobox-item[data-highlighted]) {
    background: var(--color-surface-subtle);
  }

  .panel :global(.combobox-item[data-disabled]) {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .check {
    display: grid;
    flex: none;
    place-items: center;
    width: var(--icon-size-sm);
    height: var(--icon-size-sm);
    color: var(--color-accent);
  }

  .panel .empty {
    padding: var(--space-xs) var(--space-sm);
    color: var(--color-text-muted);
    font-size: var(--font-size-body-sm);
  }

  @media (prefers-reduced-motion: reduce) {
    .combobox-field :global(*) {
      transition: none;
      animation: none;
    }
  }
</style>
