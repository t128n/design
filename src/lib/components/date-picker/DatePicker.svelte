<script lang="ts">
  import CalendarGrid from "../calendar/CalendarGrid.svelte";
  import Icon from "../../icons/Icon.svelte";
  import Popover from "../overlay/Popover.svelte";

  interface Props {
    value?: Date | null;
    onChange?: (date: Date) => void;
    label: string;
    placeholder?: string;
  }

  let {
    value = null,
    onChange,
    label,
    placeholder = "Select a date",
  }: Props = $props();

  const display = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const today = new Date();

  function monthOf(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  let month = $derived(monthOf(value ?? today));
  let root: HTMLDivElement | undefined = $state();

  function closePopover(): void {
    const trigger = root?.querySelector<HTMLElement>(
      ".t128n-popover__trigger",
    );
    trigger?.focus();
    trigger?.click();
  }

  function selectDay(date: Date): void {
    onChange?.(date);
    closePopover();
  }
</script>

<div class="t128n-date-picker" bind:this={root}>
  {#snippet trigger()}
    <span class="t128n-date-picker__label">{label}</span>
    <span
      class="t128n-date-picker__value"
      class:t128n-date-picker__value--empty={!value}
    >
      {value ? display.format(value) : placeholder}
    </span>
    <Icon name="calendar" />
  {/snippet}

  {#snippet calendar()}
    <div class="t128n-date-picker__calendar">
      <CalendarGrid
        {month}
        selected={value}
        {today}
        onSelect={selectDay}
      />
    </div>
  {/snippet}

  <Popover {trigger} children={calendar} />
</div>

<style>
  .t128n-date-picker {
    display: inline-flex;
  }

  .t128n-date-picker__label {
    color: var(--text-2);
    font: var(--type-label);
  }

  .t128n-date-picker__value {
    color: var(--text-1);
    font: var(--type-action);
  }

  .t128n-date-picker__value--empty {
    color: var(--text-3);
  }

  .t128n-date-picker__calendar {
    width: var(--width-dialog);
  }
</style>
