<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Board from "../../lib/views/Board.svelte";
  import { emptyBoardColumns, manyBoardColumns } from "../../lib/views/fixtures";

  const { Story } = defineMeta<any, any>({
    title: "Views/Board",
    component: Board,
    parameters: {
      docs: {
        description: {
          component:
            "Board is the header, toolbar and a row of horizontally scrolling columns. Each column is a grouped list of cards at --space-4 spacing: a group header with its count, then cards whose title stays dominant and whose tags only add hue, never status meaning. The columns overflow sideways rather than reflowing into a card grid, so the reading order stays column by column. The header keeps context first, actions last and exactly one primary action.",
        },
      },
    },
  });
</script>

<Story
  name="Many cards"
  args={{ columns: manyBoardColumns }}
  argTypes={{
    columns: {
      control: "object",
      description:
        "Board columns, each with a title, status and cards of { title, id, tags, avatar, href }.",
    },
  }}
>
  {#snippet template(args: any)}
    <Board {...args} />
  {/snippet}
</Story>

<Story
  name="Empty columns"
  args={{ columns: emptyBoardColumns }}
  argTypes={{
    columns: {
      control: "object",
      description: "Empty columns keep the horizontal column structure.",
    },
  }}
>
  {#snippet template(args: any)}
    <Board {...args} />
  {/snippet}
</Story>
