<script lang="ts">
  import type { Component } from 'svelte';
  import {
    Add,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Dashboard,
    Document,
    Filter,
    Grid,
    List,
    Notification,
    Settings,
    User,
  } from 'carbon-icons-svelte';
  import AppShell from '$lib/components/AppShell.svelte';
  import Button from '$lib/components/Button.svelte';
  import Header from '$lib/components/Header.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import SegmentedControl from '$lib/components/SegmentedControl.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import Toolbar from '$lib/components/Toolbar.svelte';

  interface NavItem {
    label: string;
    icon: Component<any>;
    active?: boolean;
    count?: number;
  }

  interface NavGroup {
    label?: string;
    items: NavItem[];
  }

  const groups: NavGroup[] = [
    {
      label: 'Workspace',
      items: [
        { label: 'Overview', icon: Dashboard },
        { label: 'Inbox', icon: Notification, count: 4 },
        { label: 'My issues', icon: User },
      ],
    },
    {
      label: 'Design system',
      items: [
        { label: 'Issues', icon: List },
        { label: 'Board', icon: Grid },
        { label: 'Calendar', icon: Calendar, active: true },
        { label: 'Pages', icon: Document },
        { label: 'Settings', icon: Settings },
      ],
    },
  ];

  const user = { name: 'Mara Chen', initials: 'MC' };

  type Tone = 'neutral' | 'blue' | 'green' | 'yellow' | 'red' | 'violet';

  interface CalendarEvent {
    label: string;
    tone: Tone;
  }

  const eventsByDay: Record<string, CalendarEvent[]> = {
    '2026-10-01': [{ label: 'Design review', tone: 'violet' }],
    '2026-10-02': [{ label: 'Figma handoff', tone: 'blue' }],
    '2026-10-05': [{ label: 'Sprint planning', tone: 'green' }],
    '2026-10-06': [{ label: 'A11y audit', tone: 'yellow' }],
    '2026-10-07': [{ label: 'Component QA', tone: 'blue' }],
    '2026-10-08': [{ label: 'Design review', tone: 'violet' }],
    '2026-10-09': [{ label: 'Docs pass', tone: 'neutral' }],
    '2026-10-12': [{ label: 'Prototype critique', tone: 'neutral' }],
    '2026-10-13': [{ label: 'Dark mode pass', tone: 'blue' }],
    '2026-10-14': [{ label: 'Token audit', tone: 'violet' }],
    '2026-10-15': [{ label: 'Design review', tone: 'violet' }],
    '2026-10-16': [{ label: 'Release cut', tone: 'green' }],
    '2026-10-19': [{ label: 'Sprint planning', tone: 'green' }],
    '2026-10-20': [{ label: 'Motion review', tone: 'yellow' }],
    '2026-10-21': [{ label: 'Component QA', tone: 'blue' }],
    '2026-10-22': [{ label: 'Design review', tone: 'violet' }],
    '2026-10-23': [{ label: 'Copy review', tone: 'neutral' }],
    '2026-10-26': [{ label: 'Sprint planning', tone: 'green' }],
    '2026-10-27': [{ label: 'Docs pass', tone: 'neutral' }],
    '2026-10-28': [
      { label: 'Design review', tone: 'violet' },
      { label: 'Figma handoff', tone: 'blue' },
      { label: '1:1 with Priya', tone: 'neutral' },
    ],
    '2026-10-29': [{ label: 'A11y audit', tone: 'yellow' }],
    '2026-10-30': [{ label: 'Release cut', tone: 'green' }],
  };

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const viewOptions = [
    { value: 'month', label: 'Month' },
    { value: 'week', label: 'Week' },
    { value: 'day', label: 'Day' },
  ];

  let viewMode = $state('month');

  const TODAY_ISO = '2026-10-28';
  let monthOffset = $state(0);

  const shownMonth = $derived(new Date(2026, 9 + monthOffset, 1));
  const monthLabel = $derived(
    shownMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
  );

  function isoDate(date: Date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
  }

  interface DayCell {
    key: string;
    date: number;
    label: string;
    outside: boolean;
    today: boolean;
    events: CalendarEvent[];
  }

  const days = $derived.by(() => {
    const first = new Date(shownMonth.getFullYear(), shownMonth.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(
      shownMonth.getFullYear(),
      shownMonth.getMonth() + 1,
      0,
    ).getDate();
    const total = Math.ceil((offset + daysInMonth) / 7) * 7;

    return Array.from({ length: total }, (_, index): DayCell => {
      const date = new Date(shownMonth.getFullYear(), shownMonth.getMonth(), 1 - offset + index);
      const key = isoDate(date);
      return {
        key,
        date: date.getDate(),
        label: date.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        outside: date.getMonth() !== shownMonth.getMonth(),
        today: key === TODAY_ISO,
        events: eventsByDay[key] ?? [],
      };
    });
  });

  const monthEventCount = $derived(
    days.filter((day) => !day.outside).reduce((count, day) => count + day.events.length, 0),
  );

  function shiftMonth(delta: number) {
    monthOffset += delta;
  }

  function goToday() {
    monthOffset = 0;
  }
</script>

<AppShell>
  {#snippet sidebar()}
    <Sidebar workspace="t128n" {groups} {user} />
  {/snippet}

  <div class="page">
    <Header>
      {#snippet leading()}
        <div class="month-nav">
          <IconButton icon={ChevronLeft} label="Previous month" onclick={() => shiftMonth(-1)} />
          <h1 class="month-title">{monthLabel}</h1>
          <IconButton icon={ChevronRight} label="Next month" onclick={() => shiftMonth(1)} />
        </div>
      {/snippet}

      {#snippet actions()}
        <Button variant="ghost" onclick={goToday}>Today</Button>
        <Button variant="primary">
          <Icon icon={Add} size={16} />
          New event
        </Button>
      {/snippet}
    </Header>

    <Toolbar>
      {#snippet filters()}
        <SegmentedControl options={viewOptions} bind:value={viewMode} label="Calendar range" />
        <Button variant="ghost">
          <Icon icon={Filter} size={16} />
          Filter
        </Button>
      {/snippet}

      {#snippet actions()}
        <span class="ds-caption count">{monthEventCount} events this month</span>
      {/snippet}
    </Toolbar>

    <div class="calendar-scroll">
      <div class="ds-calendar calendar-grid">
        {#each weekdays as weekday}
          <div class="ds-calendar-head">{weekday}</div>
        {/each}

        {#each days as day (day.key)}
          <div
            class="ds-calendar-cell"
            data-outside={day.outside ? 'true' : 'false'}
          >
            <span
              class="ds-calendar-date"
              data-today={day.today ? 'true' : 'false'}
              aria-label={day.label}
              aria-current={day.today ? 'date' : undefined}
            >
              {day.date}
            </span>
            {#each day.events as event (event.label)}
              <Tag label={event.label} tone={event.tone} />
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>
</AppShell>

<style>
  .page {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  .month-nav {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    margin-left: calc(var(--space-2) * -1);
  }

  .month-title {
    padding: 0 var(--space-2);
    color: var(--text-1);
    font: var(--type-heading);
    white-space: nowrap;
  }

  .calendar-scroll {
    flex: 1;
    min-height: 0;
    overflow: auto;
    background: var(--surface-panel);
  }

  .calendar-grid {
    min-height: 100%;
    border-top: 0;
    grid-template-rows: var(--row-h-sm);
    grid-auto-rows: minmax(var(--calendar-cell-h), 1fr);
  }

  .calendar-grid > * {
    min-width: 0;
  }

  .calendar-grid .ds-calendar-cell {
    overflow: hidden;
  }

  .calendar-grid .ds-calendar-cell[data-outside='true'] .ds-calendar-date {
    color: var(--text-3);
  }

  @container view (max-width: 760px) {
    .count {
      display: none;
    }

    .calendar-grid {
      min-width: calc(var(--size-5) * 16);
    }
  }
</style>
