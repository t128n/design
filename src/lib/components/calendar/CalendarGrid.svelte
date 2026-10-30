<script lang="ts">
  import { tick } from "svelte";
  import Tag from "../chips/Tag.svelte";
  import type { TagTone } from "../chips/Tag.svelte";

  export interface CalendarEvent {
    date: Date;
    label: string;
    tone?: TagTone;
  }

  interface Props {
    month: Date;
    selected?: Date | null;
    today: Date;
    onSelect?: (date: Date) => void;
    events?: CalendarEvent[];
  }

  let {
    month,
    selected = null,
    today,
    onSelect,
    events = [],
  }: Props = $props();

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const fullDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  });

  let gridEl: HTMLDivElement | undefined = $state();

  let first = $derived(
    new Date(month.getFullYear(), month.getMonth(), 1),
  );
  let daysInMonth = $derived(
    new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate(),
  );
  let startOffset = $derived(first.getDay());

  let weeks = $derived.by(() => {
    const cells: (Date | null)[] = [];
    for (let index = 0; index < 42; index += 1) {
      const day = index - startOffset + 1;
      cells.push(
        day >= 1 && day <= daysInMonth
          ? new Date(first.getFullYear(), first.getMonth(), day)
          : null,
      );
    }
    return Array.from({ length: 6 }, (_, week) =>
      cells.slice(week * 7, week * 7 + 7),
    );
  });

  function isSameDay(left: Date | null, right: Date | null): boolean {
    return Boolean(
      left &&
        right &&
        left.getFullYear() === right.getFullYear() &&
        left.getMonth() === right.getMonth() &&
        left.getDate() === right.getDate(),
    );
  }

  function sameMonth(left: Date, right: Date): boolean {
    return (
      left.getFullYear() === right.getFullYear() &&
      left.getMonth() === right.getMonth()
    );
  }

  function initialDay(): number {
    if (selected && sameMonth(selected, first)) return selected.getDate();
    if (sameMonth(today, first)) return today.getDate();
    return 1;
  }

  let focusedDay = $state<number | null>(null);
  let tabbableDay = $derived.by(() => {
    const day = focusedDay ?? initialDay();
    return day >= 1 && day <= daysInMonth ? day : initialDay();
  });

  function dayClass(date: Date): string {
    const classes = ["t128n-calendar__day"];
    if (isSameDay(date, today)) classes.push("t128n-calendar__day--today");
    if (isSameDay(date, selected)) {
      classes.push("t128n-calendar__day--selected");
    }
    return classes.join(" ");
  }

  function eventsFor(date: Date): CalendarEvent[] {
    return events.filter((event) => isSameDay(event.date, date));
  }

  function selectDay(date: Date): void {
    onSelect?.(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  }

  function selectCell(date: Date | null): void {
    if (date) selectDay(date);
  }

  async function handleKeydown(
    event: KeyboardEvent,
    date: Date,
  ): Promise<void> {
    const deltas: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    const delta = deltas[event.key];
    if (!delta) return;

    event.preventDefault();
    const target = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + delta,
    );
    if (!sameMonth(target, first)) return;

    focusedDay = target.getDate();
    await tick();
    gridEl
      ?.querySelector<HTMLButtonElement>(`[data-day="${target.getDate()}"]`)
      ?.focus();
  }
</script>

<div
  class="t128n-calendar"
  role="grid"
  aria-label={monthLabel.format(first)}
  bind:this={gridEl}
>
  <div class="t128n-calendar__weekdays" role="row">
    {#each weekdays as weekday (weekday)}
      <div class="t128n-calendar__weekday" role="columnheader">{weekday}</div>
    {/each}
  </div>

  {#each weeks as week, weekIndex (weekIndex)}
    <div class="t128n-calendar__week" role="row">
      {#each week as date, dayIndex (dayIndex)}
        <div
          class="t128n-calendar__cell"
          role="gridcell"
          aria-label={date ? fullDate.format(date) : undefined}
          aria-selected={date
            ? isSameDay(date, selected)
              ? "true"
              : "false"
            : undefined}
          tabindex="-1"
          onclick={() => selectCell(date)}
          onkeydown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              selectCell(date);
            }
          }}
        >
          {#if date}
            {@const dayEvents = eventsFor(date)}
            <button
              type="button"
              class={dayClass(date)}
              aria-label={fullDate.format(date)}
              aria-current={isSameDay(date, today) ? "date" : undefined}
              tabindex={tabbableDay === date.getDate() ? 0 : -1}
              data-day={date.getDate()}
              onclick={(event) => {
                event.stopPropagation();
                selectDay(date);
              }}
              onfocus={() => (focusedDay = date.getDate())}
              onkeydown={(event) => handleKeydown(event, date)}
            >
              <span class="t128n-calendar__number">{date.getDate()}</span>
            </button>

            {#if dayEvents.length}
              <span class="t128n-calendar__events">
                {#each dayEvents as event, eventIndex (eventIndex)}
                  <span class="t128n-calendar__event">
                    <Tag tone={event.tone ?? "neutral"}>{event.label}</Tag>
                  </span>
                {/each}
              </span>
            {/if}
          {/if}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .t128n-calendar {
    display: flex;
    flex-direction: column;
    width: 100%;
    color: var(--text-1);
    font: var(--type-body);
  }

  .t128n-calendar__weekdays {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    height: var(--row-h-sm);
    border-bottom: var(--ring-offset) solid var(--border);
    background: var(--surface-sunken);
  }

  .t128n-calendar__weekday {
    display: flex;
    align-items: center;
    padding: 0 var(--space-2);
    color: var(--text-3);
    font: var(--type-label);
  }

  .t128n-calendar__week {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }

  .t128n-calendar__cell {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-1);
    min-width: 0;
    min-height: var(--calendar-cell-h);
    padding: var(--space-1);
  }

  .t128n-calendar__cell + .t128n-calendar__cell {
    border-left: var(--ring-offset) solid var(--border);
  }

  .t128n-calendar__week + .t128n-calendar__week .t128n-calendar__cell {
    border-top: var(--ring-offset) solid var(--border);
  }

  .t128n-calendar__day {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: var(--size-3);
    height: var(--size-3);
    padding: 0;
    border: 0;
    border-radius: var(--radius-full);
    background: transparent;
    color: var(--text-1);
    font: var(--type-body);
    cursor: pointer;
  }

  .t128n-calendar__day:hover {
    background: var(--state-hover);
  }

  .t128n-calendar__day:active {
    background: var(--state-pressed);
  }

  .t128n-calendar__day:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .t128n-calendar__day--today {
    box-shadow: inset 0 0 0 var(--ring-width) var(--accent-soft);
  }

  .t128n-calendar__day--selected,
  .t128n-calendar__day--selected:hover,
  .t128n-calendar__day--selected:active {
    background: var(--accent);
    color: var(--text-on-accent);
  }

  .t128n-calendar__day--selected.t128n-calendar__day--today {
    box-shadow: none;
  }

  .t128n-calendar__events {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-1);
    max-width: 100%;
    min-width: 0;
  }

  .t128n-calendar__event {
    max-width: 100%;
    overflow: hidden;
  }
</style>
