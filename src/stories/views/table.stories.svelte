<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import type { ComponentProps } from "svelte";

  import DatabaseTable from "../../lib/views/DatabaseTable.svelte";
  import ViewFrame from "./ViewFrame.svelte";

  type DatabaseProps = ComponentProps<typeof DatabaseTable>;

  const columns: DatabaseProps["columns"] = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "assignee", label: "Assignee" },
    { key: "status", label: "Status" },
    { key: "updated", label: "Updated", align: "end" },
  ];

  const titles = [
    "Fix login redirect loop",
    "Add CSV export",
    "Audit focus rings",
    "Document the token pipeline",
    "Retry failed sync jobs",
    "Split the settings view",
  ];

  const rows: DatabaseProps["rows"] = Array.from({ length: 12 }, (_, index) => ({
    id: `ISS-${1000 + index}`,
    title: titles[index % titles.length],
    assignee: index % 2 === 0 ? "Ada Lovelace" : "Grace Hopper",
    status: index % 3 === 0 ? "Blocked" : "In progress",
    updated: `Oct ${30 - index}`,
  }));

  const { Story } = defineMeta({
    title: "Views/Table database",
    component: DatabaseTable,
    parameters: {
      docs: {
        description: {
          component:
            "The table database is one register, not a card grid: a header with context first and actions last, a toolbar carrying the view tabs, the table itself and a footer count. The view tabs switch representations of the same data and stay keyboard navigable with arrow keys. The table keeps its column headers at --row-h-sm on the sunken surface and scrolls horizontally rather than reflowing. Exactly one primary action appears in the view, and the footer reports the full result count so the register never hides its size.",
        },
      },
    },
    argTypes: {
      rows: {
        control: "object",
        description:
          "Row records keyed by column key. The id field drives selection and aria-selected.",
      },
      columns: {
        control: "object",
        description:
          "Column definitions: key, label, optional align (start or end) and width.",
      },
      view: {
        control: "select",
        options: ["all", "board", "gallery"],
        description:
          "Active view of the same data. The tab set mirrors this value.",
      },
      onView: {
        control: false,
        description: "Called with the view id when a tab is activated.",
      },
    },
  });
</script>

<Story
  name="Default"
  args={{
    rows,
    columns,
    view: "all",
    onView: () => {},
  }}
>
  {#snippet template(args: any)}
    <ViewFrame active="issues">
      <DatabaseTable
        rows={args.rows}
        columns={args.columns}
        view={args.view}
        onView={args.onView}
      />
    </ViewFrame>
  {/snippet}
</Story>
