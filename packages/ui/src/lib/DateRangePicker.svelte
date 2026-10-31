<script lang="ts">
  import { DateRangePicker } from 'bits-ui';
  import type { DateValue } from '@internationalized/date';
  import CalendarIcon from '~icons/carbon/calendar';
  import ChevronLeft from '~icons/carbon/chevron-left';
  import ChevronRight from '~icons/carbon/chevron-right';
  import Button from './Button.svelte';

  type RangeValue = { start: DateValue | undefined; end: DateValue | undefined };

  type Props = {
    value?: RangeValue;
    onValueChange?: (value: RangeValue | undefined) => void;
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
    closeOnRangeSelect?: boolean;
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
    open = $bindable(false),
    onOpenChange,
    closeOnRangeSelect = true
  }: Props = $props();

  const id = $props.id();
  const errorId = `${id}-error`;
  const descId = `${id}-desc`;
</script>

<div class="date-range-picker">
  <DateRangePicker.Root
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
    {closeOnRangeSelect}
  >
    <DateRangePicker.Label class="date-range-picker-label">{label}</DateRangePicker.Label>
    {#if description}
      <p class="date-range-picker-description" id={descId}>{description}</p>
    {/if}
    <div class="date-range-picker-field">
      <div class="date-range-picker-inputs">
        <DateRangePicker.Input type="start" class="date-range-picker-input" aria-invalid={error ? 'true' : undefined}>
          {#snippet children({ segments })}
            {#each segments as { part, value: segValue }}
              <DateRangePicker.Segment {part} class="date-range-picker-segment">
                {segValue}
              </DateRangePicker.Segment>
            {/each}
          {/snippet}
        </DateRangePicker.Input>
        <span class="date-range-separator" aria-hidden="true">–</span>
        <DateRangePicker.Input type="end" class="date-range-picker-input" aria-invalid={error ? 'true' : undefined}>
          {#snippet children({ segments })}
            {#each segments as { part, value: segValue }}
              <DateRangePicker.Segment {part} class="date-range-picker-segment">
                {segValue}
              </DateRangePicker.Segment>
            {/each}
          {/snippet}
        </DateRangePicker.Input>
      </div>
      <DateRangePicker.Trigger>
        {#snippet child({ props })}
          <Button {...props} variant="secondary" aria-label="Open calendar" disabled={disabled}>
            <CalendarIcon class="icon" />
          </Button>
        {/snippet}
      </DateRangePicker.Trigger>
    </div>
    <DateRangePicker.Content class="date-range-picker-content" sideOffset={4}>
      <div class="date-range-picker-panel">
          <DateRangePicker.Calendar>
            {#snippet children({ months, weekdays })}
              <div class="calendar-header">
                <DateRangePicker.PrevButton class="calendar-nav">
                  <ChevronLeft class="icon" />
                </DateRangePicker.PrevButton>
                <DateRangePicker.Heading class="calendar-heading" />
                <DateRangePicker.NextButton class="calendar-nav">
                  <ChevronRight class="icon" />
                </DateRangePicker.NextButton>
              </div>
              <div class="calendar-months">
                {#each months as month}
                  <DateRangePicker.Grid class="calendar-grid">
                    <DateRangePicker.GridHead>
                      <DateRangePicker.GridRow class="calendar-grid-row">
                        {#each weekdays as weekday}
                          <DateRangePicker.HeadCell class="calendar-head-cell">{weekday}</DateRangePicker.HeadCell>
                        {/each}
                      </DateRangePicker.GridRow>
                    </DateRangePicker.GridHead>
                    <DateRangePicker.GridBody>
                      {#each month.weeks as week}
                        <DateRangePicker.GridRow class="calendar-grid-row">
                          {#each week as date}
                            <DateRangePicker.Cell {date} month={month.value} class="calendar-cell">
                              <DateRangePicker.Day class="calendar-day range-day" />
                            </DateRangePicker.Cell>
                          {/each}
                        </DateRangePicker.GridRow>
                      {/each}
                    </DateRangePicker.GridBody>
                  </DateRangePicker.Grid>
                {/each}
              </div>
            {/snippet}
          </DateRangePicker.Calendar>
        </div>
      </DateRangePicker.Content>
  </DateRangePicker.Root>
  {#if error}
    <span id={errorId} class="date-range-picker-error" role="alert">{error}</span>
  {/if}
</div>

<style>
  .date-range-picker {
    display: grid;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .date-range-picker :global(.date-range-picker-label) {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  .date-range-picker-description {
    margin: 0;
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .date-range-picker-field {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }

  .date-range-picker-inputs {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    gap: var(--space-sm);
  }

  .date-range-picker :global(.date-range-picker-input) {
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

  .date-range-picker :global(.date-range-picker-input[data-invalid]) {
    border-color: var(--color-danger);
  }

  .date-range-picker :global(.date-range-picker-input:focus-within) {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .date-range-picker :global(.date-range-picker-input[data-invalid]:focus-within) {
    outline-color: var(--color-danger);
  }

  .date-range-separator {
    color: var(--color-text-secondary);
  }

  .date-range-picker :global(.date-range-picker-segment) {
    padding: 2px 4px;
    border-radius: var(--radius-sm);
    outline: none;
  }

  .date-range-picker :global(.date-range-picker-segment:focus-visible) {
    background: var(--color-accent);
    color: var(--color-on-accent);
  }

  .date-range-picker :global(.date-range-picker-segment[data-placeholder]) {
    color: var(--color-text-muted);
  }

  .date-range-picker :global(.icon) {
    width: 16px;
    height: 16px;
  }

  .date-range-picker :global(.date-range-picker-content) {
    z-index: 50;
  }

  .date-range-picker-panel {
    padding: var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    box-shadow: var(--shadow-overlay);
  }

  .date-range-picker-panel :global(.calendar-header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
  }

  .date-range-picker-panel :global(.calendar-nav) {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border: 1px solid transparent;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
  }

  .date-range-picker-panel :global(.calendar-nav:hover) {
    background: var(--color-surface-subtle);
    color: var(--color-text-primary);
  }

  .date-range-picker-panel :global(.calendar-nav:focus-visible) {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .date-range-picker-panel :global(.calendar-heading) {
    flex: 1;
    text-align: center;
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
  }

  .date-range-picker-panel .calendar-months {
    display: flex;
    gap: var(--space-lg);
  }

  .date-range-picker-panel :global(.calendar-grid) {
    border-collapse: separate;
    border-spacing: 0;
  }

  .date-range-picker-panel :global(.calendar-grid-row) {
    display: grid;
    grid-template-columns: repeat(7, 2rem);
  }

  .date-range-picker-panel :global(.calendar-head-cell) {
    display: grid;
    place-items: center;
    height: 2rem;
    color: var(--color-text-muted);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-medium);
  }

  .date-range-picker-panel :global(.calendar-cell) {
    position: relative;
    padding: 0;
  }

  .date-range-picker-panel :global(.calendar-day) {
    display: grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    border: 1px solid transparent;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-text-primary);
    cursor: pointer;
    font-variant-numeric: tabular-nums;
  }

  .date-range-picker-panel :global(.calendar-day:hover:not([data-disabled]):not([data-selected]):not([data-selection-start]):not([data-selection-end])) {
    background: var(--color-surface-subtle);
  }

  .date-range-picker-panel :global(.calendar-day:focus-visible) {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .date-range-picker-panel :global(.calendar-day[data-today]:not([data-selected]):not([data-selection-start]):not([data-selection-end])) {
    color: var(--color-accent);
  }

  .date-range-picker-panel :global(.calendar-day[data-selected]),
  .date-range-picker-panel :global(.calendar-day[data-selection-start]),
  .date-range-picker-panel :global(.calendar-day[data-selection-end]) {
    background: var(--color-accent);
    color: var(--color-on-accent);
  }

  .date-range-picker-panel :global(.calendar-day[data-highlighted]) {
    background: color-mix(in srgb, var(--color-accent) 12%, transparent);
  }

  .date-range-picker-panel :global(.calendar-day[data-outside-month]) {
    color: var(--color-text-muted);
  }

  .date-range-picker-panel :global(.calendar-day[data-disabled]) {
    color: var(--color-disabled-text);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .date-range-picker-panel :global(.calendar-day[data-unavailable]) {
    text-decoration: line-through;
  }

  .date-range-picker-error {
    color: var(--color-danger);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  @media (prefers-reduced-motion: reduce) {
    .date-range-picker-panel :global(.calendar-nav) {
      transition: none;
    }
  }
</style>
