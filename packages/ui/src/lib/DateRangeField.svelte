<script lang="ts">
  import { DateRangeField } from 'bits-ui';
  import type { DateValue } from '@internationalized/date';
  import Field from './Field.svelte';
  import VisuallyHidden from './VisuallyHidden.svelte';

  type RangeValue = { start: DateValue | undefined; end: DateValue | undefined };

  type Props = {
    value?: RangeValue;
    onValueChange?: (value: RangeValue | undefined) => void;
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
    value = $bindable<RangeValue>(),
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
    granularity,
    minValue,
    maxValue,
    name
  }: Props = $props();
</script>

<div class="date-range-field">
  <Field {description} {error} {disabled} {required} {id}>
    {#snippet children(state)}
      <DateRangeField.Root
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
        <DateRangeField.Label class="date-range-field-label" id={state.labelId}>
          {label}
          {#if state.required}
            <span class="field-required" aria-hidden="true">*</span>
            <VisuallyHidden>required</VisuallyHidden>
          {/if}
        </DateRangeField.Label>
        <div class="date-range-field-inputs">
          <DateRangeField.Input
            type="start"
            class="date-range-field-input"
            {name}
            aria-invalid={state.invalid ? 'true' : undefined}
            data-invalid={state.invalid ? '' : undefined}
            aria-describedby={state.describedBy}
          >
            {#snippet children({ segments })}
              {#each segments as { part, value: segValue }}
                <DateRangeField.Segment {part} class="date-range-field-segment">
                  {segValue}
                </DateRangeField.Segment>
              {/each}
            {/snippet}
          </DateRangeField.Input>
          <span class="date-range-separator" aria-hidden="true">–</span>
          <DateRangeField.Input
            type="end"
            class="date-range-field-input"
            {name}
            aria-invalid={state.invalid ? 'true' : undefined}
            data-invalid={state.invalid ? '' : undefined}
            aria-describedby={state.describedBy}
          >
            {#snippet children({ segments })}
              {#each segments as { part, value: segValue }}
                <DateRangeField.Segment {part} class="date-range-field-segment">
                  {segValue}
                </DateRangeField.Segment>
              {/each}
            {/snippet}
          </DateRangeField.Input>
        </div>
      </DateRangeField.Root>
    {/snippet}
  </Field>
</div>

<style>
  .date-range-field {
    display: grid;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .date-range-field :global(.date-range-field-label) {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  .date-range-field-inputs {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .date-range-field :global(.date-range-field-input) {
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

  .date-range-field :global(.date-range-field-input[data-invalid]),
  .date-range-field :global(.date-range-field-input[aria-invalid='true']) {
    border-color: var(--color-danger);
  }

  .date-range-field :global(.date-range-field-input:focus-within) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .date-range-field :global(.date-range-field-input[data-invalid]:focus-within),
  .date-range-field :global(.date-range-field-input[aria-invalid='true']:focus-within) {
    outline-color: var(--color-danger);
  }

  .date-range-separator {
    color: var(--color-text-secondary);
  }

  .date-range-field :global(.date-range-field-segment) {
    padding: 2px var(--space-xs);
    border-radius: var(--radius-sm);
    outline: none;
  }

  .date-range-field :global(.date-range-field-segment:focus-visible) {
    background: var(--color-accent);
    color: var(--color-on-accent);
  }

  .date-range-field :global(.date-range-field-segment[data-placeholder]) {
    color: var(--color-text-muted);
  }
</style>
