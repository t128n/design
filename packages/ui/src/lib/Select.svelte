<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import { Select } from 'bits-ui';
  import ChevronDownIcon from '~icons/carbon/chevron-down';
  import CheckIcon from '~icons/carbon/checkmark';
  import { mergeClasses } from './class';
  import Field from './Field.svelte';
  import Icon from './Icon.svelte';

  type Item = {
    value: string;
    label: string;
    disabled?: boolean;
  };

  type Props = {
    items: Item[];
    value?: string;
    onValueChange?: (value: string) => void;
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
    label,
    description,
    placeholder = 'Select an option',
    error,
    disabled = false,
    required = false,
    id,
    name,
    class: className = ''
  }: Props = $props();

  const classes = $derived(mergeClasses('select-field', className));
</script>

<div class={classes}>
  <Field {label} {description} {error} {disabled} {required} {id}>
    {#snippet children(state)}
      <Select.Root
        type="single"
        bind:value
        {items}
        {disabled}
        {required}
        {name}
        {onValueChange}
      >
        <Select.Trigger
          id={state.id}
          class="select-trigger"
          aria-labelledby={state.labelId}
          aria-required={state.required ? 'true' : undefined}
          aria-invalid={state.invalid ? 'true' : undefined}
          aria-describedby={state.describedBy}
        >
          <span class="select-value">
            {items.find((item) => item.value === value)?.label ?? placeholder}
          </span>
          <Icon icon={ChevronDownIcon} class="chevron" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content class="select-content" sideOffset={4}>
            <div class="panel">
              <Select.Viewport class="t128n-select-viewport">
                {#each items as item}
                  <Select.Item
                    value={item.value}
                    label={item.label}
                    disabled={item.disabled}
                    class="select-item"
                  >
                    {#snippet children({ selected })}
                      <span class="check" aria-hidden="true">
                        {#if selected}<Icon icon={CheckIcon} class="check-icon" />{/if}
                      </span>
                      <span>{item.label}</span>
                    {/snippet}
                  </Select.Item>
                {/each}
              </Select.Viewport>
            </div>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    {/snippet}
  </Field>
</div>

<style>
  .select-field {
    display: grid;
    min-width: 14rem;
    max-width: 100%;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .select-field :global(.select-trigger) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    width: 100%;
    min-height: var(--control-height);
    padding: 0 var(--space-md);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font: inherit;
    line-height: var(--line-height-body);
    text-align: left;
    cursor: pointer;
  }

  .select-field :global(.select-trigger[data-placeholder]) {
    color: var(--color-text-muted);
  }

  .select-field :global(.select-trigger[aria-invalid='true']) {
    border-color: var(--color-danger);
  }

  .select-field :global(.select-trigger:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .select-field :global(.select-trigger[aria-invalid='true']:focus-visible) {
    outline-color: var(--color-danger);
  }

  .select-field :global(.select-trigger:disabled) {
    border-color: var(--color-disabled-background);
    background: var(--color-disabled-background);
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .select-value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .select-field :global(.chevron) {
    flex: none;
    color: var(--color-text-secondary);
    transition: transform var(--transition-duration);
  }

  .select-field :global(.select-trigger[data-state='open'] .chevron) {
    transform: rotate(180deg);
  }

  :global(.select-content) {
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

  .panel :global(.t128n-select-viewport) {
    max-height: 18rem;
    overflow-y: auto;
  }

  .panel :global(.select-item) {
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

  .panel :global(.select-item[data-highlighted]) {
    background: var(--color-surface-subtle);
  }

  .panel :global(.select-item[data-disabled]) {
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

  @media (prefers-reduced-motion: reduce) {
    .select-field :global(.chevron) {
      transition: none;
    }
  }
</style>
