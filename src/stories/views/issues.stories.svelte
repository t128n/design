<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Issues from "../../lib/views/Issues.svelte";
  import { emptyIssues, manyIssues } from "../../lib/views/fixtures";

  const { Story } = defineMeta<any, any>({
    title: "Views/Issues",
    component: Issues,
    parameters: {
      docs: {
        description: {
          component:
            "Issues is the split view: one header with context on the left and actions on the right, a toolbar of filters, and a grouped list beside a detail pane fixed at --width-detail. Selection lives in the list; the detail pane follows it. Below 1060px the layout class hides the detail pane and the list fills the panel. Status is a glyph plus its accessible label, never colour alone, and the view carries exactly one primary action.",
        },
      },
    },
  });
</script>

<Story
  name="Many issues"
  args={{ issues: manyIssues, selectedId: "S-1" }}
  argTypes={{
    issues: {
      control: "object",
      description:
        "Issue fixtures grouped by their group label; each status is the ListStatus union.",
    },
    selectedId: {
      control: "text",
      description: "Id of the issue shown in the detail pane.",
    },
    onSelect: {
      control: false,
      description: "Called with the issue id when a row opens.",
    },
  }}
>
  {#snippet template(args: any)}
    <Issues {...args} />
  {/snippet}
</Story>

<Story
  name="Empty"
  args={{ issues: emptyIssues }}
  argTypes={{
    issues: {
      control: "object",
      description: "An empty set keeps the split skeleton with no rows.",
    },
    selectedId: {
      control: "text",
      description: "Id of the issue shown in the detail pane.",
    },
    onSelect: {
      control: false,
      description: "Called with the issue id when a row opens.",
    },
  }}
>
  {#snippet template(args: any)}
    <Issues {...args} />
  {/snippet}
</Story>
