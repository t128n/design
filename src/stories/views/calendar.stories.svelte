<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import CalendarView from "../../lib/views/CalendarView.svelte";
  import ViewFrame from "./ViewFrame.svelte";

  const month = new Date(2026, 9, 1);

  const events = [
    { date: new Date(2026, 9, 6), label: "Design review", tone: "blue" as const },
    { date: new Date(2026, 9, 12), label: "Deploy", tone: "green" as const },
    { date: new Date(2026, 9, 12), label: "Incident", tone: "red" as const },
    { date: new Date(2026, 9, 21), label: "Planning", tone: "violet" as const },
    { date: new Date(2026, 9, 30), label: "Retro", tone: "neutral" as const },
  ];

  const { Story } = defineMeta<any, any>({
    title: "Views/Calendar",
    component: CalendarView,
    parameters: {
      docs: {
        description: {
          component:
            "The calendar view pairs the shared header with month navigation and one primary action. The grid is the committed CalendarGrid: seven weekday headers, six week rows, --calendar-cell-h cells and hairlines only between cells. Events render as soft tags with visible text, today is an --accent-soft inset ring and the selected day is an --accent circle.",
        },
      },
    },
    argTypes: {
      events: {
        control: "object",
        description:
          "Calendar events as { date, label, tone? } objects rendered as tag text inside their day.",
      },
      month: {
        control: "date",
        description: "Any date in the month to display.",
      },
      onMonth: {
        action: "month",
        description:
          "Called with the first day of the previous or next month when header navigation is used.",
      },
    },
  });
</script>

<Story name="October 2026" args={{ events, month }}>
  {#snippet template(args: any)}
    <ViewFrame active="calendar">
      <CalendarView {...args} />
    </ViewFrame>
  {/snippet}
</Story>

<Story name="Empty month" args={{ events: [], month }}>
  {#snippet template(args: any)}
    <ViewFrame active="calendar">
      <CalendarView {...args} />
    </ViewFrame>
  {/snippet}
</Story>
