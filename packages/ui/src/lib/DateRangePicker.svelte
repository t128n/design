<script lang="ts">
  import { DateRangePicker } from 'bits-ui';
  import type { DateValue } from '@internationalized/date';
  import CalendarIcon from '~icons/carbon/calendar';
  import ChevronLeft from '~icons/carbon/chevron-left';
  import ChevronRight from '~icons/carbon/chevron-right';
  import Button from './Button.svelte';
  import Field from './Field.svelte';
  import Icon from './Icon.svelte';
  import VisuallyHidden from './VisuallyHidden.svelte';

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
    id?: string;
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
    id,
    locale,
    granularity,
    minValue,
    maxValue,
    open = $bindable(false),
    onOpenChange,
    closeOnRangeSelect = true
  }: Props = $props();
</script>

<div class="date-range-picker">
  <Field {description} {error} {disabled} {required} {id}>
    {#snippet children(state)}
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
        <DateRangePicker.Label class="date-range-picker-label" id={state.labelId}>
          {label}
          {#if state.required}
            <span class="field-required" aria-hidden="true">*</span>
            <VisuallyHidden>required</VisuallyHidden>
          {/if}
        </DateRangePicker.Label>
        <div class="date-range-picker-field">
          <div class="date-range-picker-inputs">
            <DateRangePicker.Input
              type="start"
              class="date-range-picker-input"
              aria-invalid={state.invalid ? 'true' : undefined}
              data-invalid={state.invalid ? '' : undefined}
              aria-describedby={state.describedBy}
            >
              {#snippet children({ segments })}
                {#each segments as { part, value: segValue }}
                  <DateRangePicker.Segment {part} class="date-range-picker-segment">
                    {segValue}
                  </DateRangePicker.Segment>
                {/each}
              {/snippet}
            </DateRangePicker.Input>
            <span class="date-range-separator" aria-hidden="true">–</span>
            <DateRangePicker.Input
              type="end"
              class="date-range-picker-input"
              aria-invalid={state.invalid ? 'true' : undefined}
              data-invalid={state.invalid ? '' : undefined}
              aria-describedby={state.describedBy}
            >
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
              <Button {...props} variant="secondary" disabled={disabled}>
                <Icon icon={CalendarIcon} />
                <VisuallyHidden>Open calendar</VisuallyHidden>
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
                    <Icon icon={ChevronLeft} />
                    <VisuallyHidden>Previous month</VisuallyHidden>
                  </DateRangePicker.PrevButton>
                  <DateRangePicker.Heading class="calendar-heading" />
                  <DateRangePicker.NextButton class="calendar-nav">
                    <Icon icon={ChevronRight} />
                    <VisuallyHidden>Next month</VisuallyHidden>
                  </DateRangePicker.NextButton>
                </div>
                <div class="calendar-months">
                  {#each months as month}
                    <DateRangePicker.Grid class="calendar-grid">
                      <DateRangePicker.GridHead>
                        <DateRangePicker.GridRow class="calendar-grid-row">
                          {#each weekdays as weekday}
                            <DateRangePicker.HeadCell class="calendar-head-cell"
                              >{weekday}</DateRangePicker.HeadCell
                            >
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
    {/snippet}
  </Field>
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
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-variant-numeric: tabular-nums;
  }

  .date-range-picker :global(.date-range-picker-input[data-invalid]),
  .date-range-picker :global(.date-range-picker-input[aria-invalid='true']) {
    border-color: var(--color-danger);
  }

  .date-range-picker :global(.date-range-picker-input:focus-within) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .date-range-picker :global(.date-range-picker-input[data-invalid]:focus-within),
  .date-range-picker :global(.date-range-picker-input[aria-invalid='true']:focus-within) {
    outline-color: var(--color-danger);
  }

  .date-range-separator {
    color: var(--color-text-secondary);
  }

  .date-range-picker :global(.date-range-picker-segment) {
    padding: 2px var(--space-xs);
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

  .date-range-picker :global(.date-range-picker-content) {
    z-index: 50;
  }

  .date-range-picker-panel {
    padding: var(--space-md);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    box-shadow: var(--shadow-overlay);
  }

  .date-range-picker-panel .calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
  }

  .date-range-picker-panel :global(.calendar-nav) {
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

  .date-range-picker-panel :global(.calendar-nav:hover) {
    background: var(--color-surface-subtle);
    color: var(--color-text-primary);
  }

  .date-range-picker-panel :global(.calendar-nav:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
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
    grid-template-columns: repeat(7, var(--calendar-cell-size));
  }

  .date-range-picker-panel :global(.calendar-head-cell) {
    display: grid;
    place-items: center;
    height: var(--calendar-cell-size);
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
    width: var(--calendar-cell-size);
    height: var(--calendar-cell-size);
    border: var(--border-width) solid transparent;
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
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
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

  @media (prefers-reduced-motion: reduce) {
    .date-range-picker-panel :global(.calendar-nav) {
      transition: none;
    }
  }
</style>
