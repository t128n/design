<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Combobox from "../../lib/components/search/Combobox.svelte";
  import SearchField from "../../lib/components/search/SearchField.svelte";

  const { Story } = defineMeta<any, any>({
    title: "Components/Search",
    component: SearchField,
    tags: ["autodocs"],
    parameters: {
      docs: {
        description: {
          component:
            "Search is a text control with a leading glyph and, when the app owns a shortcut, a trailing kbd hint. The combobox adds a listbox: typing filters the options, the selected option carries a check and aria-selected, and a create action appears last after a separator only when onCreate is passed. Arrow keys move the active option, Enter chooses it and Escape closes the listbox without discarding the typed value. Both controls use --control-h, --border-control, --radius-md and the shared five states, and the listbox borrows the overlay recipe at --layer-menu.",
        },
      },
    },
  });

  const items = [
    { value: "bug", label: "Bug" },
    { value: "design", label: "Design" },
    { value: "docs", label: "Documentation" },
    { value: "infra", label: "Infrastructure" },
  ];
</script>

<Story
  name="Search field"
  args={{
    value: "",
    placeholder: "Search issues",
    hint: "/",
  }}
  argTypes={{
    value: { control: "text", description: "Current search text." },
    placeholder: {
      control: "text",
      description: "Placeholder in --text-3; also names the searchbox.",
    },
    hint: {
      control: "text",
      description: "Shortcut text rendered in the trailing kbd.",
    },
    onInput: {
      control: false,
      description: "Called with the typed value on every keystroke.",
    },
  }}
>
  {#snippet template(args)}
    <div class="t128n-search-story__stack">
      <SearchField
        value={args.value}
        placeholder={args.placeholder}
        hint={args.hint}
        onInput={() => {}}
      />
    </div>
  {/snippet}
</Story>

<Story
  name="Combobox"
  args={{
    items,
    value: "bug",
    placeholder: "Assign label",
    create: true,
  }}
  argTypes={{
    items: {
      control: "object",
      description: "Options with value and label.",
    },
    value: {
      control: "text",
      description: "Selected option value; its label fills the input.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder in --text-3; also names the combobox.",
    },
    onChange: {
      control: false,
      description: "Called with the chosen option value.",
    },
    onCreate: {
      control: false,
      description: "Called with the typed text; enables the create row.",
    },
    create: {
      control: "boolean",
      description: "Story-only: pass an onCreate handler to show the create row.",
    },
  }}
>
  {#snippet template(args)}
    <div class="t128n-search-story__stack">
      <Combobox
        items={args.items}
        value={args.value}
        placeholder={args.placeholder}
        onChange={() => {}}
        onCreate={args.create ? () => {} : undefined}
      />
    </div>
  {/snippet}
</Story>

<style>
  .t128n-search-story__stack {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    width: var(--width-detail);
    padding: var(--space-5);
  }
</style>
