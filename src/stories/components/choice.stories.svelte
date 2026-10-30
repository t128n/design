<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  const { Story } = defineMeta({
    title: "Components/Choice",
    parameters: {
      docs: {
        description: {
          component:
            "Choice controls use the token ladder: checkbox and radio are --icon square, the switch is " +
            "--size-4 by --size-2 and fully round, and the select reuses the control height. Accent marks " +
            "the on state; every control defines hover, pressed, focus-visible and disabled states, and " +
            "state is announced with aria-checked, aria-expanded and the checked state itself rather than " +
            "colour alone.",
        },
      },
    },
    argTypes: {
      items: {
        control: "object",
        description: "Select options, each with a value and a label.",
      },
      value: { control: "text", description: "The selected value." },
      placeholder: {
        control: "text",
        description: "Text shown before a value is chosen.",
      },
      checked: {
        control: "boolean",
        description: "Whether the control is on.",
      },
      indeterminate: {
        control: "boolean",
        description: "Marks a checkbox mixed; announced as aria-checked=mixed.",
      },
      disabled: {
        control: "boolean",
        description: "Removes the control from interaction while keeping it visible.",
      },
      label: { control: "text", description: "Visible text label for the control." },
      name: {
        control: "text",
        description: "Radio group name shared by the radios in one set.",
      },
    },
  });
</script>

<script lang="ts">
  import Checkbox from "../../lib/components/choice/Checkbox.svelte";
  import Radio from "../../lib/components/choice/Radio.svelte";
  import Select from "../../lib/components/choice/Select.svelte";
  import Switch from "../../lib/components/choice/Switch.svelte";

  const selectArgs = {
    items: [
      { value: "all", label: "All issues" },
      { value: "open", label: "Open" },
      { value: "closed", label: "Closed" },
    ],
    value: "all",
    placeholder: "Select a view",
    disabled: false,
  };

  const checkboxArgs = {
    checked: true,
    indeterminate: false,
    disabled: false,
    label: "Watch this issue",
  };

  const radioArgs = {
    value: "a",
    name: "plan",
    checked: true,
    label: "Alpha",
  };

  const switchArgs = {
    checked: true,
    disabled: false,
    label: "Sync automatically",
  };
</script>

{#snippet select(args: any)}
  <Select {...args} />
{/snippet}

{#snippet checkbox(args: any)}
  <Checkbox {...args} />
{/snippet}

{#snippet radio(args: any)}
  <Radio {...args} />
{/snippet}

{#snippet radioGroup(args: any)}
  <div class="t128n-cluster">
    <Radio {...args} value="a" label="Alpha" checked />
    <Radio {...args} value="b" label="Beta" checked={false} />
    <Radio {...args} value="c" label="Gamma" checked={false} />
  </div>
{/snippet}

{#snippet switchControl(args: any)}
  <Switch {...args} />
{/snippet}

<Story name="Select" args={selectArgs} template={select} />
<Story name="Checkbox" args={checkboxArgs} template={checkbox} />
<Story name="Radio" args={radioArgs} template={radio} />
<Story name="Radio group" args={radioArgs} template={radioGroup} />
<Story name="Switch" args={switchArgs} template={switchControl} />
