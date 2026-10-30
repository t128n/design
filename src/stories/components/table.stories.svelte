<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Table from "../../lib/components/table/Table.svelte";

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "status", label: "Status" },
    { key: "updated", label: "Updated", align: "end" },
  ];

  const rows = [
    { id: "T-104", title: "Fix login redirect loop", status: "Blocked", updated: "Oct 30" },
    { id: "T-105", title: "Add CSV export", status: "In progress", updated: "Oct 29" },
    { id: "T-106", title: "Audit focus rings", status: "Done", updated: "Oct 28" },
  ];

  const { Story } = defineMeta({
    title: "Components/Table",
    parameters: {
      docs: {
        description: {
          component:
            "A table is a register, not a card grid: the header row sits on the sunken surface at --row-h-sm in the label role and text-3, body rows are --row-h with one faint hairline between them, and the first and last cells take --page-inset so the register lines up with the page. Sorting is announced with aria-sort on the column header; selection is a checkbox per row plus a select-all in the header, and a selected row is a state fill with aria-selected, never a colour-only edge. The trailing New row stays in text-3 and is never selectable. At narrow widths the table scrolls horizontally instead of reflowing into cards.",
        },
      },
    },
    argTypes: {
      columns: {
        control: "object",
        description:
          "Column definitions: key, label, optional align (start or end) and width. The label is the header text.",
      },
      rows: {
        control: "object",
        description:
          "Row records keyed by column key. The id field is used for selection and aria-selected.",
      },
      sort: {
        control: "object",
        description:
          "Active sort as key plus direction (asc or desc), or null when unsorted.",
      },
      selected: {
        control: "object",
        description: "Ids of the selected rows. Pair with onSelect for a controlled table.",
      },
      onSort: {
        control: false,
        description:
          "Called with the next sort when a header is activated; cycles asc, desc, then null.",
      },
      onSelect: {
        control: false,
        description:
          "Called with the new id list when a row checkbox or the select-all checkbox toggles. Supplying it renders the selection column.",
      },
      newRow: {
        control: "text",
        description:
          "Label for the trailing New row in text-3. The New row is not selectable.",
      },
      caption: {
        control: "text",
        description:
          "Accessible table caption, exposed to assistive technology without adding a visible row.",
      },
      cell: {
        control: false,
        description:
          "Optional cell snippet receiving row, column, value and index; the default renders the value as text.",
      },
    },
  });
</script>

<Story
  name="Default"
  args={{
    columns,
    rows,
    sort: { key: "id", direction: "asc" },
    onSort: () => {},
  }}
>
  {#snippet template(args: any)}
    <Table {...args} />
  {/snippet}
</Story>

<Story
  name="Selectable"
  args={{
    columns,
    rows,
    selected: ["T-105"],
    onSelect: () => {},
  }}
>
  {#snippet template(args: any)}
    <Table {...args} />
  {/snippet}
</Story>

<Story
  name="With new row"
  args={{
    columns,
    rows,
    selected: [],
    onSelect: () => {},
    newRow: "New issue",
    caption: "Open issues",
  }}
>
  {#snippet template(args: any)}
    <Table {...args} />
  {/snippet}
</Story>
