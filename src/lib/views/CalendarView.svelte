<script lang="ts">
  import Button from "../components/button/Button.svelte";
  import CalendarGrid from "../components/calendar/CalendarGrid.svelte";
  import type { CalendarEvent } from "../components/calendar/CalendarGrid.svelte";
  import Header from "../components/shell/Header.svelte";
  import Icon from "../icons/Icon.svelte";

  interface Props {
    events: CalendarEvent[];
    month: Date;
    onMonth?: (month: Date) => void;
  }

  let { events, month, onMonth }: Props = $props();

  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  });

  function shiftMonth(delta: number): void {
    onMonth?.(new Date(month.getFullYear(), month.getMonth() + delta, 1));
  }
</script>

{#snippet headerContext()}
  <span class="t128n-calendar-view__title">{monthLabel.format(month)}</span>
{/snippet}

{#snippet headerActions()}
  <div class="t128n-calendar-view__nav">
    <button
      type="button"
      class="t128n-calendar-view__nav-button"
      aria-label="Previous month"
      onclick={() => shiftMonth(-1)}
    >
      <Icon name="chevron-left" />
    </button>
    <button
      type="button"
      class="t128n-calendar-view__nav-button"
      aria-label="Next month"
      onclick={() => shiftMonth(1)}
    >
      <Icon name="chevron-right" />
    </button>
  </div>
  <Button variant="primary">New event</Button>
{/snippet}

<Header context={headerContext} actions={headerActions} />

<div class="t128n-page t128n-calendar-view">
  <CalendarGrid {month} {events} today={new Date()} />
</div>

<style>
  .t128n-calendar-view {
    color: var(--text-1);
  }

  .t128n-calendar-view__nav {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
  }

  .t128n-calendar-view__nav-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: var(--control-h);
    height: var(--control-h);
    padding: 0;
    border: var(--ring-offset) solid transparent;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-2);
    cursor: pointer;
  }

  .t128n-calendar-view__nav-button:hover {
    background: var(--state-hover);
    color: var(--text-1);
  }

  .t128n-calendar-view__nav-button:active {
    background: var(--state-pressed);
    color: var(--text-1);
  }

  .t128n-calendar-view__nav-button:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }
</style>
