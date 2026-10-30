<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Settings from "../../lib/views/Settings.svelte";
  import ViewFrame from "./ViewFrame.svelte";

  const { Story } = defineMeta<any, any>({
    title: "Views/Settings",
    component: Settings,
    tags: ["autodocs"],
    parameters: {
      docs: {
        description: {
          component:
            "Settings follows section 8: a header that obeys the one anatomy rule, a section nav on --surface-app, and rows of label plus description with the control on the right. The control column never moves and each row keeps its own state; nothing is arranged as a card grid. Immediate-effect preferences use the switch, form values use a labelled input, and the danger zone is framed in --danger at --tint-strong because it is irreversible. The header carries at most one primary action.",
        },
      },
    },
  });

  const sections = [
    {
      id: "general",
      label: "General",
      icon: "settings",
      rows: [
        {
          id: "workspace-name",
          label: "Workspace name",
          description: "Shown in the sidebar and on invitations.",
          control: { type: "text", value: "Atlas" },
        },
        {
          id: "public-workspace",
          label: "Public workspace",
          description: "Anyone with the link can view projects.",
          control: { type: "switch", value: false },
        },
      ],
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: "inbox",
      rows: [
        {
          id: "email-digest",
          label: "Email digest",
          description: "A daily summary sent at 09:00.",
          control: { type: "switch", value: true },
        },
        {
          id: "mention-alerts",
          label: "Mention alerts",
          description: "Notify me when someone mentions my name.",
          control: { type: "switch", value: true },
        },
      ],
    },
    {
      id: "danger",
      label: "Danger zone",
      icon: "alert",
      danger: true,
      rows: [
        {
          id: "delete-workspace",
          label: "Delete workspace",
          description:
            "Removes every project, issue and comment. This cannot be undone.",
          control: { type: "danger", actionLabel: "Delete workspace" },
        },
      ],
    },
  ];
</script>

<Story
  name="Settings"
  args={{ sections, active: "general", values: {} }}
  argTypes={{
    sections: {
      control: "object",
      description:
        "Sections shown in the nav and stacked in the content column; a section with danger: true is framed in the danger tint.",
    },
    active: {
      control: "text",
      description: "Section id marked aria-current in the section nav.",
    },
    values: {
      control: "object",
      description: "Initial values keyed by row id.",
    },
    onChange: {
      control: false,
      description: "Called with the row id and its next value.",
    },
  }}
>
  {#snippet template(args: any)}
    <ViewFrame active="settings">
      <Settings {...args} />
    </ViewFrame>
  {/snippet}
</Story>
