<script lang="ts">
  import { DateField } from 'bits-ui';
  import type { DateValue } from '@internationalized/date';
  import Text from './Text.svelte';

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

<div class="date-field">
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
    <DateField.Label class="date-field-label">{label}</DateField.Label>
    {#if description}
      <Text as="p" variant="body-sm" tone="secondary" id={descId}>{description}</Text>
    {/if}
    <DateField.Input
      class="date-field-input"
      {name}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={[description ? descId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined}
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
  {#if error}
    <span id={errorId} class="date-field-error" role="alert">{error}</span>
  {/if}
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
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-variant-numeric: tabular-nums;
  }

  .date-field :global(.date-field-input[data-invalid]) {
    border-color: var(--color-danger);
  }

  .date-field :global(.date-field-input:focus-within) {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .date-field :global(.date-field-input[data-invalid]:focus-within) {
    outline-color: var(--color-danger);
  }

  .date-field :global(.date-field-input[data-disabled]) {
    border-color: var(--color-disabled-background);
    background: var(--color-disabled-background);
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .date-field :global(.date-field-segment) {
    padding: 2px 4px;
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

  .date-field-error {
    color: var(--color-danger);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }
</style>

<script module>
  let descriptionId = 'date-field-desc';
</script>
