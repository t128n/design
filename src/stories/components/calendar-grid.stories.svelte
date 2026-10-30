<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import CalendarGrid from "../../lib/components/calendar/CalendarGrid.svelte";

  const month = new Date(2026, 9, 1);
  const today = new Date(2026, 9, 30);

  const events = [
    { date: new Date(2026, 9, 6), label: "Design review", tone: "blue" as const },
    { date: new Date(2026, 9, 12), label: "Deploy", tone: "green" as const },
    { date: new Date(2026, 9, 12), label: "Incident", tone: "red" as const },
    { date: new Date(2026, 9, 21), label: "Planning", tone: "violet" as const },
    { date: new Date(2026, 9, 30), label: "Retro", tone: "neutral" as const },
  ];

  const { Story } = defineMeta({
    title: "Components/CalendarGrid",
    component: CalendarGrid,
    parameters: {
      docs: {
        description: {
          component:
            "A month grid with seven weekday headers and six week rows. Cells use --calendar-cell-h and hairlines only between cells. Today is an --accent-soft inset ring and the selected day is an --accent circle, so the two never rely on colour alone: every day button names its full date and today carries aria-current. Events render as soft tags with visible text, never bare colour.",
        },
      },
    },
    argTypes: {
      month: {
        control: "date",
        description: "Any date in the month to display; the grid always shows six weeks.",
      },
      selected: {
        control: "date",
        description: "Selected day, filled with the accent circle.",
      },
      today: {
        control: "date",
        description: "Today, outlined with an --accent-soft inset ring.",
      },
      onSelect: {
        action: "selected",
        description: "Called with the clicked day as a Date.",
      },
      events: {
        control: "object",
        description:
          "Events as { date, label, tone? } objects; each renders as a soft tag inside its day.",
      },
    },
  });
</script>

<Story
  name="Default"
  args={{ month, selected: null, today, events: [] }}
/>

<Story
  name="With events"
  args={{ month, selected: new Date(2026, 9, 12), today, events }}
/>

<Story
  name="No selection"
  args={{ month, selected: null, today, events }}
/>
