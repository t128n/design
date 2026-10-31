<script lang="ts">
  import { DateRangeField } from 'bits-ui';
  import type { DateValue } from '@internationalized/date';

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
    locale,
    granularity,
    minValue,
    maxValue,
    name
  }: Props = $props();

  const id = $props.id();
  const errorId = `${id}-error`;
  const descId = `${id}-desc`;
</script>

<div class="date-range-field">
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
    <DateRangeField.Label class="date-range-field-label">{label}</DateRangeField.Label>
    {#if description}
      <p class="date-range-field-description" id={descId}>{description}</p>
    {/if}
    <div class="date-range-field-inputs">
      <DateRangeField.Input type="start" class="date-range-field-input" {name} aria-invalid={error ? 'true' : undefined}>
        {#snippet children({ segments })}
          {#each segments as { part, value: segValue }}
            <DateRangeField.Segment {part} class="date-range-field-segment">
              {segValue}
            </DateRangeField.Segment>
          {/each}
        {/snippet}
      </DateRangeField.Input>
      <span class="date-range-separator" aria-hidden="true">–</span>
      <DateRangeField.Input type="end" class="date-range-field-input" {name} aria-invalid={error ? 'true' : undefined}>
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
  {#if error}
    <span id={errorId} class="date-range-field-error" role="alert">{error}</span>
  {/if}
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

  .date-range-field-description {
    margin: 0;
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
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
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-variant-numeric: tabular-nums;
  }

  .date-range-field :global(.date-range-field-input[data-invalid]) {
    border-color: var(--color-danger);
  }

  .date-range-field :global(.date-range-field-input:focus-within) {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .date-range-field :global(.date-range-field-input[data-invalid]:focus-within) {
    outline-color: var(--color-danger);
  }

  .date-range-separator {
    color: var(--color-text-secondary);
  }

  .date-range-field :global(.date-range-field-segment) {
    padding: 2px 4px;
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

  .date-range-field-error {
    color: var(--color-danger);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }
</style>
