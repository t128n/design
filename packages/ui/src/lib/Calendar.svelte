<script lang="ts">
  import { Calendar } from 'bits-ui';
  import type { DateValue } from '@internationalized/date';
  import ChevronLeft from '~icons/carbon/chevron-left';
  import ChevronRight from '~icons/carbon/chevron-right';
  import Icon from './Icon.svelte';
  import VisuallyHidden from './VisuallyHidden.svelte';

  type Props = {
    type?: 'single' | 'multiple';
    value?: any;
    onValueChange?: (value: any) => void;
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
    type = 'single',
    value = $bindable<any>(),
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
    calendarLabel = 'Calendar',
    class: className = ''
  }: Props = $props();
</script>

<Calendar.Root
  {type}
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
      <Calendar.PrevButton class="calendar-nav">
        <Icon icon={ChevronLeft} />
        <VisuallyHidden>Previous month</VisuallyHidden>
      </Calendar.PrevButton>
      <Calendar.Heading class="calendar-heading" />
      <Calendar.NextButton class="calendar-nav">
        <Icon icon={ChevronRight} />
        <VisuallyHidden>Next month</VisuallyHidden>
      </Calendar.NextButton>
    </div>
    <div class="calendar-months">
      {#each months as month}
        <Calendar.Grid class="calendar-grid">
          <Calendar.GridHead>
            <Calendar.GridRow class="calendar-grid-row">
              {#each weekdays as weekday}
                <Calendar.HeadCell class="calendar-head-cell">{weekday}</Calendar.HeadCell>
              {/each}
            </Calendar.GridRow>
          </Calendar.GridHead>
          <Calendar.GridBody>
            {#each month.weeks as week}
              <Calendar.GridRow class="calendar-grid-row">
                {#each week as date}
                  <Calendar.Cell class="calendar-cell" {date} month={month.value}>
                    <Calendar.Day class="calendar-day" />
                  </Calendar.Cell>
                {/each}
              </Calendar.GridRow>
            {/each}
          </Calendar.GridBody>
        </Calendar.Grid>
      {/each}
    </div>
  {/snippet}
</Calendar.Root>

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

  :global(.calendar-day:hover:not([data-disabled]):not([data-selected])) {
    background: var(--color-surface-subtle);
  }

  :global(.calendar-day:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  :global(.calendar-day[data-today]:not([data-selected])) {
    color: var(--color-accent);
  }

  :global(.calendar-day[data-selected]) {
    background: var(--color-accent);
    color: var(--color-on-accent);
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
