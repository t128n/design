<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import DatePicker from "../../lib/components/date-picker/DatePicker.svelte";

  const { Story } = defineMeta({
    title: "Components/DatePicker",
    component: DatePicker,
    parameters: {
      docs: {
        description: {
          component:
            "A trigger button names its field and the formatted date, then opens a --layer-popover surface holding the CalendarGrid. Choosing a day calls onChange and closes the popover. Today stays an --accent-soft inset ring and the selected day an --accent circle, so the two states never rely on colour alone; with no value the trigger shows the placeholder in text-3.",
        },
      },
    },
    argTypes: {
      value: {
        control: "date",
        description:
          "Selected date. When null the trigger shows the placeholder and the grid opens on the current month.",
      },
      onChange: {
        action: "changed",
        description: "Called with the chosen Date when a day is picked.",
      },
      label: {
        control: "text",
        description:
          "Field label included in the trigger's accessible name, for example 'Due date'.",
      },
      placeholder: {
        control: "text",
        description: "Text shown in the trigger while value is null.",
      },
    },
  });
</script>

<Story
  name="With value"
  args={{
    label: "Due date",
    value: new Date(2026, 9, 30),
    placeholder: "Select a date",
  }}
/>

<Story
  name="Empty"
  args={{
    label: "Due date",
    value: null,
    placeholder: "Select a date",
  }}
/>
