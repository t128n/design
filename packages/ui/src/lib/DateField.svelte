<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import { DateField } from 'bits-ui';
  import type { DateValue } from '@internationalized/date';
  import Field from './Field.svelte';
  import VisuallyHidden from './VisuallyHidden.svelte';

  type Props = {
    value?: DateValue;
    onValueChange?: (value: DateValue | undefined) => void;
    placeholder?: DateValue;
    onPlaceholderChange?: (value: DateValue | undefined) => void;
    label: string;
    description?: string;
    error?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    id?: string;
    locale?: string;
    granularity?: 'day' | 'hour' | 'minute' | 'second';
    minValue?: DateValue;
    maxValue?: DateValue;
    name?: string;
  };

  let {
    value = $bindable<DateValue>(),
    onValueChange,
    placeholder = $bindable<DateValue>(),
    onPlaceholderChange,
    label,
    description,
    error,
    disabled = false,
    readonly = false,
    required = false,
    id,
    locale,
    granularity,
    minValue,
    maxValue,
    name
  }: Props = $props();
</script>

<div class="date-field">
  <Field {description} {error} {disabled} {required} {id}>
    {#snippet children(state)}
      <DateField.Root
        bind:value
        {onValueChange}
        bind:placeholder
        {onPlaceholderChange}
        {disabled}
        {readonly}
        {required}
        {locale}
        {granularity}
        {minValue}
        {maxValue}
      >
        <DateField.Label class="date-field-label" id={state.labelId}>
          {label}
          {#if state.required}
            <span class="field-required" aria-hidden="true">*</span>
            <VisuallyHidden>required</VisuallyHidden>
          {/if}
        </DateField.Label>
        <DateField.Input
          class="date-field-input"
          {name}
          aria-invalid={state.invalid ? 'true' : undefined}
          data-invalid={state.invalid ? '' : undefined}
          aria-describedby={state.describedBy}
        >
          {#snippet children({ segments })}
            {#each segments as { part, value }, i}
              <DateField.Segment {part} class="date-field-segment">
                {value}
              </DateField.Segment>
            {/each}
          {/snippet}
        </DateField.Input>
      </DateField.Root>
    {/snippet}
  </Field>
</div>

<style>
  .date-field {
    display: grid;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .date-field :global(.date-field-label) {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  .date-field :global(.date-field-input) {
    display: flex;
    align-items: center;
    gap: 2px;
    min-height: var(--control-height);
    padding: 0 var(--space-md);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-variant-numeric: tabular-nums;
  }

  .date-field :global(.date-field-input[data-invalid]),
  .date-field :global(.date-field-input[aria-invalid='true']) {
    border-color: var(--color-danger);
  }

  .date-field :global(.date-field-input:focus-within) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .date-field :global(.date-field-input[data-invalid]:focus-within),
  .date-field :global(.date-field-input[aria-invalid='true']:focus-within) {
    outline-color: var(--color-danger);
  }

  .date-field :global(.date-field-input[data-disabled]) {
    border-color: var(--color-disabled-background);
    background: var(--color-disabled-background);
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .date-field :global(.date-field-segment) {
    padding: 2px var(--space-xs);
    border-radius: var(--radius-sm);
    outline: none;
  }

  .date-field :global(.date-field-segment:focus-visible) {
    background: var(--color-accent);
    color: var(--color-on-accent);
  }

  .date-field :global(.date-field-segment[data-placeholder]) {
    color: var(--color-text-muted);
  }
</style>
