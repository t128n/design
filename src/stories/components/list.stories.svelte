<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import GroupHeader from "../../lib/components/list/GroupHeader.svelte";
  import ListRow from "../../lib/components/list/ListRow.svelte";
  import PropertyRow from "../../lib/components/list/PropertyRow.svelte";
  import Toggle from "../../lib/components/list/Toggle.svelte";

  const { Story } = defineMeta({
    title: "Components/List",
    parameters: {
      docs: {
        description: {
          component:
            "Rows carry a record in one line: the id is mono in text-3, the status is a glyph whose colour is repeated by an accessible label, and the title is the only dominant element. There are no dividers: whitespace and the state tints do the work. Secondary actions fade in on hover but stay in the tab order, so nothing is pointer-only. Property rows put a fixed label column beside an editable value; the value tints on hover only when it can be edited. A toggle is a borderless disclosure row whose chevron rotates.",
        },
      },
    },
  });
</script>

<Story
  name="ListRow"
  args={{
    id: "T-104",
    title: "Fix login redirect loop",
    status: "danger",
    labels: ["bug", "auth"],
    avatar: "Ada Lovelace",
    date: "Oct 30",
    selected: false,
    unread: true,
  }}
  argTypes={{
    id: {
      control: "text",
      description: "Record id, rendered in mono and text-3.",
    },
    title: {
      control: "text",
      description: "The only dominant element in the row.",
    },
    status: {
      control: "select",
      options: ["neutral", "success", "warning", "danger", "info"],
      description:
        "Status glyph and colour; the accessible label names the status.",
    },
    labels: {
      control: "object",
      description: "Label names rendered as text-3 text, never as status.",
    },
    avatar: {
      control: "text",
      description: "Name used to derive the avatar initials.",
    },
    date: {
      control: "text",
      description: "Timestamp or date, rendered as a caption.",
    },
    selected: {
      control: "boolean",
      description: "Selected rows use the selection tint and aria-selected.",
    },
    unread: {
      control: "boolean",
      description: "Unread rows carry a dot and an action-weight title.",
    },
    onOpen: {
      control: false,
      description: "Called with the record id on click, Enter or Space.",
    },
    actions: {
      control: false,
      description:
        "Secondary actions revealed on hover; always reachable by Tab.",
    },
  }}
>
  {#snippet template(args: any)}
    <ListRow {...args} />
  {/snippet}
</Story>

<Story
  name="GroupHeader"
  args={{ label: "In progress", count: 8, status: "info" }}
  argTypes={{
    label: {
      control: "text",
      description: "Group name, rendered in the label role.",
    },
    count: {
      control: "number",
      description: "Number of rows in the group, rendered as a caption.",
    },
    status: {
      control: "select",
      options: ["neutral", "success", "warning", "danger", "info"],
      description: "Optional status glyph shown before the label.",
    },
  }}
>
  {#snippet template(args: any)}
    <GroupHeader {...args} />
  {/snippet}
</Story>

<Story
  name="PropertyRow"
  args={{
    label: "Status",
    icon: "dot",
    editable: true,
    value: "In progress",
  }}
  argTypes={{
    label: {
      control: "text",
      description: "Property name in the fixed label column.",
    },
    icon: {
      control: "select",
      options: [
        "dot",
        "check",
        "alert",
        "info",
        "clock",
        "calendar",
        "trash",
      ],
      description: "Optional glyph before the property name.",
    },
    editable: {
      control: "boolean",
      description: "Editable values tint on hover; read-only values do not.",
    },
    children: {
      control: false,
      description: "The property value.",
    },
  }}
>
  {#snippet template(args: any)}
    <PropertyRow label={args.label} icon={args.icon} editable={args.editable}>
      {args.value}
    </PropertyRow>
  {/snippet}
</Story>

<Story
  name="Toggle"
  args={{ title: "Details", open: false, body: "Two children, one owner." }}
  argTypes={{
    title: {
      control: "text",
      description: "Disclosure title; the whole row is the trigger.",
    },
    open: {
      control: "boolean",
      description: "Initial disclosure state, mirrored by aria-expanded.",
    },
    children: {
      control: false,
      description: "Content revealed when the disclosure is open.",
    },
  }}
>
  {#snippet template(args: any)}
    <Toggle title={args.title} open={args.open}>
      {args.body}
    </Toggle>
  {/snippet}
</Story>
