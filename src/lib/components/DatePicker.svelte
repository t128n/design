<script lang="ts">
  import { Calendar, Popover } from 'bits-ui';
  import { getLocalTimeZone, parseDate, type DateValue } from '@internationalized/date';
  import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    ErrorFilled,
  } from 'carbon-icons-svelte';
  import Icon from './Icon.svelte';

  interface Props {
    label: string;
    value?: DateValue | string;
    placeholder?: string;
    hint?: string;
    error?: string;
    disabled?: boolean;
    id?: string;
    open?: boolean;
    onchange?: (value: DateValue) => void;
  }

  let {
    label,
    value = $bindable(),
    placeholder = 'Select a date',
    hint,
    error,
    disabled = false,
    id,
    open = $bindable(false),
    onchange,
  }: Props = $props();

  const uid = $props.id();
  const fieldId = $derived(id ?? `date-picker-${uid}`);
  const describedBy = $derived(
    [hint ? `${fieldId}-hint` : '', error ? `${fieldId}-error` : ''].filter(Boolean).join(' ') ||
      undefined,
  );

  const displayValue = $derived(
    value
      ? new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(
          typeof value === 'string'
            ? parseDate(value).toDate(getLocalTimeZone())
            : value.toDate(getLocalTimeZone()),
        )
      : undefined,
  );

  const calendarValue = $derived(
    typeof value === 'string' ? (value ? parseDate(value) : undefined) : value,
  );

  function handleValueChange(next: DateValue | undefined) {
    if (!next) return;
    value = next;
    open = false;
    onchange?.(next);
  }
</script>

<div class="field">
  <label for={fieldId}>{label}</label>
  <Popover.Root bind:open>
    <Popover.Trigger
      id={fieldId}
      class={error ? 'field-button invalid' : 'field-button'}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy}
      {disabled}
    >
      <span class="value" class:placeholder={!displayValue}>
        {displayValue ?? placeholder}
      </span>
      <span class="glyph" aria-hidden="true"><Icon icon={CalendarIcon} size={16} /></span>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content class="date-popover" sideOffset={4} align="start">
        <Calendar.Root
          type="single"
          value={calendarValue}
          weekdayFormat="narrow"
          fixedWeeks
          onValueChange={handleValueChange}
        >
          {#snippet children({ months, weekdays })}
            <Calendar.Header class="calendar-header">
              <Calendar.PrevButton class="nav" aria-label="Previous month">
                <Icon icon={ChevronLeft} size={16} />
              </Calendar.PrevButton>
              <Calendar.Heading class="calendar-heading" />
              <Calendar.NextButton class="nav" aria-label="Next month">
                <Icon icon={ChevronRight} size={16} />
              </Calendar.NextButton>
            </Calendar.Header>
            {#each months as month}
              <Calendar.Grid class="grid">
                <Calendar.GridHead>
                  <Calendar.GridRow>
                    {#each weekdays as weekday}
                      <Calendar.HeadCell class="head-cell">{weekday}</Calendar.HeadCell>
                    {/each}
                  </Calendar.GridRow>
                </Calendar.GridHead>
                <Calendar.GridBody>
                  {#each month.weeks as week}
                    <Calendar.GridRow>
                      {#each week as day}
                        <Calendar.Cell date={day} month={month.value} class="cell">
                          <Calendar.Day class="day" />
                        </Calendar.Cell>
                      {/each}
                    </Calendar.GridRow>
                  {/each}
                </Calendar.GridBody>
              </Calendar.Grid>
            {/each}
          {/snippet}
        </Calendar.Root>
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
  {#if error}
    <p class="error" id="{fieldId}-error"><Icon icon={ErrorFilled} size={16} />{error}</p>
  {:else if hint}
    <p class="hint" id="{fieldId}-hint">{hint}</p>
  {/if}
</div>

<style>
  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    width: 100%;
    max-width: calc(var(--width-label) * 3);
    min-width: 0;
  }

  label {
    font: var(--type-label);
    color: var(--text-2);
  }

  :global(.field-button) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
    width: 100%;
    height: var(--control-h);
    padding: 0 var(--space-2) 0 var(--space-3);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-body);
    text-align: left;
  }

  :global(.field-button:hover:not(:disabled)) {
    border-color: var(--border-strong);
  }

  :global(.field-button:focus-visible) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: -1px;
  }

  :global(.field-button:disabled) {
    background: var(--surface-sunken);
    color: var(--text-2);
  }

  :global(.field-button.invalid) {
    border-color: var(--danger);
  }

  .value {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .placeholder {
    color: var(--text-3);
  }

  .glyph {
    display: grid;
    place-items: center;
    color: var(--text-2);
    flex: none;
  }

  :global(.date-popover) {
    z-index: var(--layer-popover);
    min-width: calc(var(--size-5) * 7);
    padding: var(--space-2);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
    box-shadow: var(--shadow-overlay);
    transform-origin: var(--bits-popover-content-transform-origin);
    transition: opacity var(--duration-fast) var(--ease-standard);
  }

  :global(.date-popover[data-starting-style]),
  :global(.date-popover[data-ending-style]) {
    opacity: 0;
  }

  :global(.calendar-header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
    height: var(--row-h-sm);
    padding: 0 var(--space-1);
    margin-bottom: var(--space-1);
  }

  :global(.calendar-heading) {
    font: var(--type-action);
    color: var(--text-1);
    text-align: center;
    flex: 1;
  }

  :global(.nav) {
    display: grid;
    place-items: center;
    width: var(--size-3);
    height: var(--size-3);
    padding: 0;
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-2);
    flex: none;
  }

  :global(.nav:hover) {
    background: var(--state-hover);
    color: var(--text-1);
  }

  :global(.nav:focus-visible) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  :global(.nav:disabled) {
    color: var(--text-2);
  }

  :global(.grid) {
    width: 100%;
    border-collapse: collapse;
  }

  :global(.head-cell) {
    height: var(--row-h-sm);
    font: var(--type-label);
    color: var(--text-3);
    text-align: center;
  }

  :global(.cell) {
    padding: calc(var(--space-1) / 2);
    text-align: center;
  }

  :global(.day) {
    display: grid;
    place-items: center;
    width: var(--size-4);
    height: var(--size-4);
    margin: 0 auto;
    border-radius: var(--radius-md);
    color: var(--text-1);
    font: var(--type-caption);
    cursor: default;
    user-select: none;
  }

  :global(.day:hover) {
    background: var(--state-hover);
  }

  :global(.day[data-today]:not([data-selected])) {
    box-shadow: inset 0 0 0 var(--ring-width) var(--accent-soft);
  }

  :global(.day[data-selected]) {
    background: var(--accent);
    color: var(--text-on-accent);
    font: var(--type-action);
  }

  :global(.day[data-outside-month]) {
    color: var(--text-3);
  }

  :global(.day[data-disabled]) {
    color: var(--text-2);
  }

  :global(.day[data-focused]) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .hint,
  .error {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    font: var(--type-caption);
  }

  .hint {
    color: var(--text-3);
  }

  .error {
    color: var(--danger);
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.date-popover) {
      transition: none;
    }
  }
</style>
