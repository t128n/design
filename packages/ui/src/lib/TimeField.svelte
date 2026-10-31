<script lang="ts">
  import { TimeField } from 'bits-ui';
  import type { Time } from '@internationalized/date';

  type Props = {
    value?: any;
    onValueChange?: (value: any) => void;
    placeholder?: any;
    onPlaceholderChange?: (value: any) => void;
    label: string;
    description?: string;
    error?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    locale?: string;
    hourCycle?: 12 | 24;
    granularity?: 'hour' | 'minute' | 'second';
    hideTimeZone?: boolean;
    name?: string;
  };

  let {
    value = $bindable<Time>(),
    onValueChange,
    placeholder = $bindable<Time>(),
    onPlaceholderChange,
    label,
    description,
    error,
    disabled = false,
    readonly = false,
    required = false,
    locale,
    hourCycle,
    granularity = 'minute',
    hideTimeZone = false,
    name
  }: Props = $props();

  const id = $props.id();
  const errorId = `${id}-error`;
  const descId = `${id}-desc`;
</script>

<div class="time-field">
  <TimeField.Root
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
    <TimeField.Label class="time-field-label">{label}</TimeField.Label>
    {#if description}
      <p class="time-field-description" id={descId}>{description}</p>
    {/if}
    <TimeField.Input
      class="time-field-input"
      {name}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={[description ? descId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined}
    >
      {#snippet children({ segments })}
        {#each segments as { part, value }, i}
          <TimeField.Segment {part} class="time-field-segment">
            {value}
          </TimeField.Segment>
        {/each}
      {/snippet}
    </TimeField.Input>
  </TimeField.Root>
  {#if error}
    <span id={errorId} class="time-field-error" role="alert">{error}</span>
  {/if}
</div>

<style>
  .time-field {
    display: grid;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .time-field :global(.time-field-label) {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  .time-field-description {
    margin: 0;
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .time-field :global(.time-field-input) {
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

  .time-field :global(.time-field-input[data-invalid]) {
    border-color: var(--color-danger);
  }

  .time-field :global(.time-field-input:focus-within) {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .time-field :global(.time-field-input[data-invalid]:focus-within) {
    outline-color: var(--color-danger);
  }

  .time-field :global(.time-field-input[data-disabled]) {
    border-color: var(--color-disabled-background);
    background: var(--color-disabled-background);
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .time-field :global(.time-field-segment) {
    padding: 2px 4px;
    border-radius: var(--radius-sm);
    outline: none;
  }

  .time-field :global(.time-field-segment:focus-visible) {
    background: var(--color-accent);
    color: var(--color-on-accent);
  }

  .time-field :global(.time-field-segment[data-placeholder]) {
    color: var(--color-text-muted);
  }

  .time-field-error {
    color: var(--color-danger);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }
</style>
