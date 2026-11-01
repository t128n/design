<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import { TimeRangeField } from 'bits-ui';
  import Field from './Field.svelte';
  import VisuallyHidden from './VisuallyHidden.svelte';

  type TimeRangeValue = { start: any; end: any };

  type Props = {
    value?: TimeRangeValue;
    onValueChange?: (value: TimeRangeValue | undefined) => void;
    placeholder?: TimeRangeValue | any;
    onPlaceholderChange?: (value: any) => void;
    label: string;
    description?: string;
    error?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    id?: string;
    locale?: string;
    hourCycle?: 12 | 24;
    granularity?: 'hour' | 'minute' | 'second';
    hideTimeZone?: boolean;
  };

  let {
    value = $bindable<TimeRangeValue>(),
    onValueChange,
    placeholder = $bindable<any>(),
    onPlaceholderChange,
    label,
    description,
    error,
    disabled = false,
    readonly = false,
    required = false,
    id,
    locale,
    hourCycle,
    granularity = 'minute',
    hideTimeZone = false
  }: Props = $props();
</script>

<div class="time-range-field">
  <Field {description} {error} {disabled} {required} {id}>
    {#snippet children(state)}
      <TimeRangeField.Root
        bind:value
        {onValueChange}
        bind:placeholder
        {onPlaceholderChange}
        {disabled}
        {readonly}
        {required}
        {locale}
        {hourCycle}
        {granularity}
        {hideTimeZone}
      >
        <TimeRangeField.Label class="time-range-field-label" id={state.labelId}>
          {label}
          {#if state.required}
            <span class="field-required" aria-hidden="true">*</span>
            <VisuallyHidden>required</VisuallyHidden>
          {/if}
        </TimeRangeField.Label>
        <div class="time-range-field-inputs">
          <TimeRangeField.Input
            type="start"
            class="time-range-field-input"
            aria-invalid={state.invalid ? 'true' : undefined}
            data-invalid={state.invalid ? '' : undefined}
            aria-describedby={state.describedBy}
          >
            {#snippet children({ segments })}
              {#each segments as { part, value: segValue }}
                <TimeRangeField.Segment {part} class="time-range-field-segment">
                  {segValue}
                </TimeRangeField.Segment>
              {/each}
            {/snippet}
          </TimeRangeField.Input>
          <span class="time-range-separator" aria-hidden="true">–</span>
          <TimeRangeField.Input
            type="end"
            class="time-range-field-input"
            aria-invalid={state.invalid ? 'true' : undefined}
            data-invalid={state.invalid ? '' : undefined}
            aria-describedby={state.describedBy}
          >
            {#snippet children({ segments })}
              {#each segments as { part, value: segValue }}
                <TimeRangeField.Segment {part} class="time-range-field-segment">
                  {segValue}
                </TimeRangeField.Segment>
              {/each}
            {/snippet}
          </TimeRangeField.Input>
        </div>
      </TimeRangeField.Root>
    {/snippet}
  </Field>
</div>

<style>
  .time-range-field {
    display: grid;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .time-range-field :global(.time-range-field-label) {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  .time-range-field-inputs {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .time-range-field :global(.time-range-field-input) {
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

  .time-range-field :global(.time-range-field-input[data-invalid]),
  .time-range-field :global(.time-range-field-input[aria-invalid='true']) {
    border-color: var(--color-danger);
  }

  .time-range-field :global(.time-range-field-input:focus-within) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .time-range-field :global(.time-range-field-input[data-invalid]:focus-within),
  .time-range-field :global(.time-range-field-input[aria-invalid='true']:focus-within) {
    outline-color: var(--color-danger);
  }

  .time-range-separator {
    color: var(--color-text-secondary);
  }

  .time-range-field :global(.time-range-field-segment) {
    padding: 2px var(--space-xs);
    border-radius: var(--radius-sm);
    outline: none;
  }

  .time-range-field :global(.time-range-field-segment:focus-visible) {
    background: var(--color-accent);
    color: var(--color-on-accent);
  }

  .time-range-field :global(.time-range-field-segment[data-placeholder]) {
    color: var(--color-text-muted);
  }
</style>
