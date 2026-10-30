<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import type { ComponentProps } from "svelte";

  import DocumentPage from "../../lib/views/DocumentPage.svelte";
  import ViewFrame from "./ViewFrame.svelte";

  type PageProps = ComponentProps<typeof DocumentPage>;

  const longPage: PageProps["page"] = {
    title: "Getting started",
    icon: "command",
    breadcrumb: ["Docs", "API"],
    properties: [
      { label: "Status", value: "Published", icon: "success" },
      { label: "Owner", value: "Ada Lovelace", icon: "info" },
      { label: "Updated", value: "Oct 30, 2026", icon: "calendar" },
    ],
    blocks: [
      {
        type: "callout",
        tone: "info",
        title: "Before you start",
        text: "Deploys are paused while the migration runs. The runbook below covers the rollback.",
      },
      { type: "heading", text: "Rollout plan" },
      {
        type: "checklist",
        items: [
          { label: "Draft the runbook", done: true },
          { label: "Publish the API", done: false },
          { label: "Notify the workspace", done: false },
        ],
      },
      {
        type: "toggle",
        title: "Release notes",
        text: "The first release ships the token pipeline, the component set and the view stories.",
        open: true,
      },
      {
        type: "code",
        language: "bash",
        code: "npm install @t128n/ui\nnpm test -- src/lib/views",
      },
    ],
  };

  const { Story } = defineMeta({
    title: "Views/Page",
    component: DocumentPage,
    parameters: {
      docs: {
        description: {
          component:
            "A document page puts a header first, then one reading column capped at --width-reading and centred in the page inset. The title uses the display role with the page icon beside it; properties are PropertyRows at --row-h-sm. Blocks follow the reading rhythm with --space-4 gaps: a callout for context inside the document, a heading, a checklist whose done state pairs a glyph with text, a disclosure toggle and a code block on the sunken surface. The header keeps one primary action and context first, and every property value tints on hover because it is editable.",
        },
      },
    },
    argTypes: {
      page: {
        control: "object",
        description:
          "Page data: title, optional icon and breadcrumb, properties and blocks (callout, heading, checklist, toggle, code).",
      },
    },
  });
</script>

<Story name="Default" args={{ page: longPage }}>
  {#snippet template(args: any)}
    <ViewFrame active="overview">
      <DocumentPage page={args.page} />
    </ViewFrame>
  {/snippet}
</Story>
