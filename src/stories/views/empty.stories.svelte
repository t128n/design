<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import EmptyWorkspace from "../../lib/views/EmptyWorkspace.svelte";

  const { Story } = defineMeta<any, any>({
    title: "Views/Empty workspace",
    component: EmptyWorkspace,
    tags: ["autodocs"],
    parameters: {
      docs: {
        description: {
          component:
            "An empty workspace says what is missing and offers exactly one next action. The header keeps the view in context; the centred empty state carries the heading, one plain sentence and one primary button, never a second accent action. Empty is a designed state, not an error: no banner, no toast.",
        },
      },
    },
  });
</script>

<Story
  name="Empty workspace"
  args={{
    title: "No projects yet",
    description: "Create a project to start tracking work.",
  }}
  argTypes={{
    title: {
      control: "text",
      description: "What is missing, rendered as the empty state heading.",
    },
    description: {
      control: "text",
      description: "One sentence naming the next step.",
    },
    onCreate: {
      control: false,
      description: "Called by the single primary action.",
    },
  }}
>
  {#snippet template(args)}
    <div class="t128n-views-story__viewport">
      <EmptyWorkspace
        title={args.title}
        description={args.description}
        onCreate={() => {}}
      />
    </div>
  {/snippet}
</Story>

<style>
  .t128n-views-story__viewport {
    height: calc(var(--size-5) * 9);
    overflow: auto;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface-app);
  }
</style>
