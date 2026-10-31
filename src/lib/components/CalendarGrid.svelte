<script lang="ts">
  import Tag from './Tag.svelte';

  type Tone = 'neutral' | 'blue' | 'green' | 'yellow' | 'red' | 'violet';

  interface CalendarEvent {
    day: number;
    label: string;
    tone?: Tone;
  }

  interface Props {
    month: number;
    year: number;
    today?: number;
    events?: CalendarEvent[];
  }

  let { month, year, today, events = [] }: Props = $props();

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weekdayLong = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const first = $derived(new Date(year, month - 1, 1));
  const offset = $derived((first.getDay() + 6) % 7);
  const monthName = $derived(
    new Intl.DateTimeFormat('en-US', { month: 'long' }).format(first),
  );

  const cells = $derived.by(() =>
    Array.from({ length: 42 }, (_, index) => {
      const date = new Date(year, month - 1, 1 - offset + index);
      return {
        date,
        day: date.getDate(),
        outside: date.getMonth() !== month - 1,
      };
    }),
  );

  function dayEvents(day: number, outside: boolean): CalendarEvent[] {
    if (outside) return [];
    return events.filter((event) => event.day === day);
  }

  function cellLabel(date: Date, outside: boolean, day: number): string {
    const formatted = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
    const count = dayEvents(day, outside).length;
    const suffix = count > 0 ? `, ${count} ${count === 1 ? 'event' : 'events'}` : '';
    return outside ? `${formatted}, outside ${monthName}${suffix}` : `${formatted}${suffix}`;
  }
</script>

<section class="calendar" aria-label={`${monthName} ${year}`}>
  <div class="calendar-title">
    <h2>{monthName} {year}</h2>
  </div>
  <div class="ds-calendar" role="grid" aria-label={`${monthName} ${year}`}>
    {#each weekdays as weekday, index}
      <div class="ds-calendar-head" role="columnheader" aria-label={weekdayLong[index]}>
        {weekday}
      </div>
    {/each}
    {#each cells as cell}
      {@const cellEvents = dayEvents(cell.day, cell.outside)}
      <div
        class="ds-calendar-cell"
        role="gridcell"
        data-outside={cell.outside ? 'true' : undefined}
        aria-label={cellLabel(cell.date, cell.outside, cell.day)}
        aria-current={today === cell.day && !cell.outside ? 'date' : undefined}
      >
        <span
          class="ds-calendar-date"
          data-today={today === cell.day && !cell.outside ? 'true' : undefined}
        >
          {cell.day}
        </span>
        {#if cellEvents.length > 0}
          <div class="cell-events">
            {#each cellEvents as event}
              <Tag label={event.label} tone={event.tone ?? 'neutral'} />
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</section>

<style>
  .calendar {
    background: var(--surface-panel);
    font-variant-numeric: tabular-nums;
  }

  .calendar-title {
    padding: var(--space-3) var(--page-inset) var(--space-2);
  }

  h2 {
    font: var(--type-heading);
    color: var(--text-1);
  }

  .cell-events {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-height: 0;
    overflow: hidden;
  }
</style>
