<script lang="ts">
  import { DatePicker } from 'bits-ui';
  import type { DateValue } from '@internationalized/date';
  import CalendarIcon from '~icons/carbon/calendar';
  import ChevronLeft from '~icons/carbon/chevron-left';
  import ChevronRight from '~icons/carbon/chevron-right';
  import Button from './Button.svelte';
  import Text from './Text.svelte';

  type Props = {
    value?: DateValue;
    onValueChange?: (value: DateValue | undefined) => void;
    placeholder?: DateValue;
    onPlaceholderChange?: (value: DateValue) => void;
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
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    closeOnDateSelect?: boolean;
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
    open = $bindable(false),
    onOpenChange,
    closeOnDateSelect = true
  }: Props = $props();

  const id = $props.id();
  const errorId = `${id}-error`;
  const descId = `${id}-desc`;
</script>

<div class="date-picker">
  <DatePicker.Root
    bind:open
    {onOpenChange}
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
    {closeOnDateSelect}
  >
    <DatePicker.Label class="date-picker-label">{label}</DatePicker.Label>
    {#if description}
      <Text as="p" variant="body-sm" tone="secondary" id={descId}>{description}</Text>
    {/if}
    <div class="date-picker-field">
      <DatePicker.Input class="date-picker-input" aria-invalid={error ? 'true' : undefined} aria-describedby={[description ? descId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined}>
        {#snippet children({ segments })}
          {#each segments as { part, value: segValue }}
            <DatePicker.Segment {part} class="date-picker-segment">
              {segValue}
            </DatePicker.Segment>
          {/each}
        {/snippet}
      </DatePicker.Input>
      <DatePicker.Trigger>
        {#snippet child({ props })}
          <Button {...props} variant="secondary" aria-label="Open calendar" disabled={disabled}>
            <CalendarIcon class="icon" />
          </Button>
        {/snippet}
      </DatePicker.Trigger>
    </div>
    <DatePicker.Portal>
      <DatePicker.Content class="date-picker-content" sideOffset={4}>
        <div class="date-picker-panel">
          <DatePicker.Calendar>
            {#snippet children({ months, weekdays })}
              <div class="calendar-header">
                <DatePicker.PrevButton class="calendar-nav">
                  <ChevronLeft class="icon" />
                </DatePicker.PrevButton>
                <DatePicker.Heading class="calendar-heading" />
                <DatePicker.NextButton class="calendar-nav">
                  <ChevronRight class="icon" />
                </DatePicker.NextButton>
              </div>
              <div class="calendar-months">
                {#each months as month}
                  <DatePicker.Grid class="calendar-grid">
                    <DatePicker.GridHead>
                      <DatePicker.GridRow class="calendar-grid-row">
                        {#each weekdays as weekday}
                          <DatePicker.HeadCell class="calendar-head-cell">{weekday}</DatePicker.HeadCell>
                        {/each}
                      </DatePicker.GridRow>
                    </DatePicker.GridHead>
                    <DatePicker.GridBody>
                      {#each month.weeks as week}
                        <DatePicker.GridRow class="calendar-grid-row">
                          {#each week as date}
                            <DatePicker.Cell {date} month={month.value} class="calendar-cell">
                              <DatePicker.Day class="calendar-day" />
                            </DatePicker.Cell>
                          {/each}
                        </DatePicker.GridRow>
                      {/each}
                    </DatePicker.GridBody>
                  </DatePicker.Grid>
                {/each}
              </div>
            {/snippet}
          </DatePicker.Calendar>
        </div>
      </DatePicker.Content>
    </DatePicker.Portal>
  </DatePicker.Root>
  {#if error}
    <span id={errorId} class="date-picker-error" role="alert">{error}</span>
  {/if}
</div>

<style>
  .date-picker {
    display: grid;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .date-picker :global(.date-picker-label) {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  .date-picker-field {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }

  .date-picker :global(.date-picker-input) {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    gap: 2px;
    min-height: var(--control-height);
    padding: 0 var(--space-md);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-variant-numeric: tabular-nums;
  }

  .date-picker :global(.date-picker-input[data-invalid]) {
    border-color: var(--color-danger);
  }

  .date-picker :global(.date-picker-input:focus-within) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .date-picker :global(.date-picker-input[data-invalid]:focus-within) {
    outline-color: var(--color-danger);
  }

  .date-picker :global(.date-picker-segment) {
    padding: 2px var(--space-xs);
    border-radius: var(--radius-sm);
    outline: none;
  }

  .date-picker :global(.date-picker-segment:focus-visible) {
    background: var(--color-accent);
    color: var(--color-on-accent);
  }

  .date-picker :global(.date-picker-segment[data-placeholder]) {
    color: var(--color-text-muted);
  }

  .date-picker :global(.icon) {
    width: var(--icon-size-sm);
    height: var(--icon-size-sm);
  }

  .date-picker :global(.date-picker-content) {
    z-index: 50;
  }

  .date-picker-panel {
    padding: var(--space-md);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    box-shadow: var(--shadow-overlay);
  }

  .date-picker-panel :global(.calendar-header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
  }

  .date-picker-panel :global(.calendar-nav) {
    display: grid;
    place-items: center;
    width: var(--control-height-sm);
    height: var(--control-height-sm);
    border: var(--border-width) solid transparent;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
  }

  .date-picker-panel :global(.calendar-nav:hover) {
    background: var(--color-surface-subtle);
    color: var(--color-text-primary);
  }

  .date-picker-panel :global(.calendar-nav:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .date-picker-panel :global(.calendar-heading) {
    flex: 1;
    text-align: center;
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
  }

  .date-picker-panel .calendar-months {
    display: flex;
    gap: var(--space-lg);
  }

  .date-picker-panel :global(.calendar-grid) {
    border-collapse: separate;
    border-spacing: 0;
  }

  .date-picker-panel :global(.calendar-grid-row) {
    display: grid;
    grid-template-columns: repeat(7, var(--calendar-cell-size));
  }

  .date-picker-panel :global(.calendar-head-cell) {
    display: grid;
    place-items: center;
    height: var(--calendar-cell-size);
    color: var(--color-text-muted);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-medium);
  }

  .date-picker-panel :global(.calendar-cell) {
    position: relative;
    padding: 0;
  }

  .date-picker-panel :global(.calendar-day) {
    display: grid;
    place-items: center;
    width: var(--calendar-cell-size);
    height: var(--calendar-cell-size);
    border: var(--border-width) solid transparent;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-text-primary);
    cursor: pointer;
    font-variant-numeric: tabular-nums;
  }

  .date-picker-panel :global(.calendar-day:hover:not([data-disabled]):not([data-selected])) {
    background: var(--color-surface-subtle);
  }

  .date-picker-panel :global(.calendar-day:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .date-picker-panel :global(.calendar-day[data-today]:not([data-selected])) {
    color: var(--color-accent);
  }

  .date-picker-panel :global(.calendar-day[data-selected]) {
    background: var(--color-accent);
    color: var(--color-on-accent);
  }

  .date-picker-panel :global(.calendar-day[data-outside-month]) {
    color: var(--color-text-muted);
  }

  .date-picker-panel :global(.calendar-day[data-disabled]) {
    color: var(--color-disabled-text);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .date-picker-panel :global(.calendar-day[data-unavailable]) {
    text-decoration: line-through;
  }

  .date-picker-error {
    color: var(--color-danger);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  @media (prefers-reduced-motion: reduce) {
    .date-picker-panel :global(.calendar-nav) {
      transition: none;
    }
  }
</style>
