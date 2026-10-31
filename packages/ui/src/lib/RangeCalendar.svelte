<script lang="ts">
  import { RangeCalendar } from 'bits-ui';
  import type { DateValue } from '@internationalized/date';
  import ChevronLeft from '~icons/carbon/chevron-left';
  import ChevronRight from '~icons/carbon/chevron-right';

  type RangeValue = { start: DateValue | undefined; end: DateValue | undefined };

  type Props = {
    value?: RangeValue;
    onValueChange?: (value: RangeValue | undefined) => void;
    placeholder?: DateValue;
    onPlaceholderChange?: (value: DateValue) => void;
    locale?: string;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    minValue?: DateValue;
    maxValue?: DateValue;
    disabled?: boolean;
    readonly?: boolean;
    numberOfMonths?: number;
    pagedNavigation?: boolean;
    fixedWeeks?: boolean;
    disableDaysOutsideMonth?: boolean;
    isDateDisabled?: (date: DateValue) => boolean;
    isDateUnavailable?: (date: DateValue) => boolean;
    calendarLabel?: string;
    class?: string;
  };

  let {
    value = $bindable<RangeValue>(),
    onValueChange,
    placeholder = $bindable<DateValue>(),
    onPlaceholderChange,
    locale,
    weekStartsOn,
    minValue,
    maxValue,
    disabled = false,
    readonly = false,
    numberOfMonths = 1,
    pagedNavigation = false,
    fixedWeeks = false,
    disableDaysOutsideMonth = true,
    isDateDisabled,
    isDateUnavailable,
    calendarLabel = 'Range calendar',
    class: className = ''
  }: Props = $props();
</script>

<RangeCalendar.Root
  bind:value
  {onValueChange}
  bind:placeholder
  {onPlaceholderChange}
  {locale}
  {weekStartsOn}
  {minValue}
  {maxValue}
  {disabled}
  {readonly}
  {numberOfMonths}
  {pagedNavigation}
  {fixedWeeks}
  {disableDaysOutsideMonth}
  {isDateDisabled}
  {isDateUnavailable}
  {calendarLabel}
  class="calendar-root {className}"
>
  {#snippet children({ months, weekdays })}
    <div class="calendar-header">
      <RangeCalendar.PrevButton class="calendar-nav">
        <ChevronLeft class="icon" />
      </RangeCalendar.PrevButton>
      <RangeCalendar.Heading class="calendar-heading" />
      <RangeCalendar.NextButton class="calendar-nav">
        <ChevronRight class="icon" />
      </RangeCalendar.NextButton>
    </div>
    <div class="calendar-months">
      {#each months as month}
        <RangeCalendar.Grid class="calendar-grid">
          <RangeCalendar.GridHead>
            <RangeCalendar.GridRow class="calendar-grid-row">
              {#each weekdays as weekday}
                <RangeCalendar.HeadCell class="calendar-head-cell">{weekday}</RangeCalendar.HeadCell>
              {/each}
            </RangeCalendar.GridRow>
          </RangeCalendar.GridHead>
          <RangeCalendar.GridBody>
            {#each month.weeks as week}
              <RangeCalendar.GridRow class="calendar-grid-row">
                {#each week as date}
                  <RangeCalendar.Cell class="calendar-cell" {date} month={month.value}>
                    <RangeCalendar.Day class="calendar-day range-day" />
                  </RangeCalendar.Cell>
                {/each}
              </RangeCalendar.GridRow>
            {/each}
          </RangeCalendar.GridBody>
        </RangeCalendar.Grid>
      {/each}
    </div>
  {/snippet}
</RangeCalendar.Root>

<style>
  :global(.calendar-root) {
    display: inline-flex;
    flex-direction: column;
    gap: var(--space-md);
    padding: var(--space-md);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-body-sm);
  }

  :global(.calendar-header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
  }

  :global(.calendar-nav) {
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

  :global(.calendar-nav:hover) {
    background: var(--color-surface-subtle);
    color: var(--color-text-primary);
  }

  :global(.calendar-nav:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  :global(.calendar-nav:disabled) {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  :global(.calendar-nav .icon) {
    width: var(--icon-size-sm);
    height: var(--icon-size-sm);
  }

  :global(.calendar-heading) {
    flex: 1;
    text-align: center;
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
  }

  .calendar-months {
    display: flex;
    gap: var(--space-lg);
  }

  :global(.calendar-grid) {
    border-collapse: separate;
    border-spacing: 0;
  }

  :global(.calendar-grid-row) {
    display: grid;
    grid-template-columns: repeat(7, var(--calendar-cell-size));
  }

  :global(.calendar-head-cell) {
    display: grid;
    place-items: center;
    height: var(--calendar-cell-size);
    color: var(--color-text-muted);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-medium);
  }

  :global(.calendar-cell) {
    position: relative;
    padding: 0;
  }

  :global(.calendar-day) {
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

  :global(.calendar-day:hover:not([data-disabled]):not([data-selected]):not([data-selection-start]):not([data-selection-end])) {
    background: var(--color-surface-subtle);
  }

  :global(.calendar-day:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  :global(.calendar-day[data-today]:not([data-selected]):not([data-selection-start]):not([data-selection-end])) {
    color: var(--color-accent);
  }

  :global(.calendar-day[data-selected]),
  :global(.calendar-day[data-selection-start]),
  :global(.calendar-day[data-selection-end]) {
    background: var(--color-accent);
    color: var(--color-on-accent);
  }

  :global(.calendar-day[data-highlighted]) {
    background: color-mix(in srgb, var(--color-accent) 12%, transparent);
  }

  :global(.calendar-day[data-outside-month]) {
    color: var(--color-text-muted);
  }

  :global(.calendar-day[data-disabled]) {
    color: var(--color-disabled-text);
    cursor: not-allowed;
    opacity: 0.6;
  }

  :global(.calendar-day[data-unavailable]) {
    text-decoration: line-through;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.calendar-nav) {
      transition: none;
    }
  }
</style>
