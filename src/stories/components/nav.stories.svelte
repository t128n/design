<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  const { Story } = defineMeta({
    title: "Components/Navigation",
    parameters: {
      docs: {
        description: {
          component:
            "Navigation: a quiet sidebar on the app surface, breadcrumbs with 12px chevron separators, " +
            "tabs that switch content with an accent underline, and a segmented control that switches " +
            "views of the same data on a sunken track. Every item defines hover, pressed, focus-visible " +
            "and disabled states, and state is never colour-only.",
        },
      },
    },
    argTypes: {
      groups: {
        control: "object",
        description: "Sidebar groups: label plus items with id, label, icon and href.",
      },
      active: { control: "text", description: "Id of the active sidebar item." },
      items: {
        control: "object",
        description: "Breadcrumb segments, each with a label and optional href. The last is current.",
      },
      tabs: { control: "object", description: "Tab items with id and label." },
      value: { control: "text", description: "The selected id." },
      options: { control: "object", description: "Segmented control options with id and label." },
      onChange: { control: false, description: "Called with the newly selected id." },
    },
  });
</script>

<script lang="ts">
  import Breadcrumbs from "../../lib/components/nav/Breadcrumbs.svelte";
  import SegmentedControl from "../../lib/components/nav/SegmentedControl.svelte";
  import Sidebar from "../../lib/components/nav/Sidebar.svelte";
  import Tabs from "../../lib/components/nav/Tabs.svelte";

  const sidebarArgs = {
    active: "inbox",
    groups: [
      {
        label: "Work",
        items: [
          { id: "inbox", label: "Inbox", icon: "inbox", href: "#inbox" },
          { id: "issues", label: "Issues", icon: "issues", href: "#issues" },
          { id: "calendar", label: "Calendar", icon: "calendar", href: "#calendar" },
        ],
      },
      {
        label: "Workspace",
        items: [
          { id: "projects", label: "Projects", icon: "home", href: "#projects" },
          { id: "settings", label: "Settings", icon: "settings", href: "#settings" },
        ],
      },
    ],
  };

  const breadcrumbArgs = {
    items: [
      { label: "Projects", href: "#projects" },
      { label: "Atlas", href: "#atlas" },
      { label: "T-128", href: "#t-128" },
      { label: "Auth flow" },
    ],
  };

  const tabArgs = {
    tabs: [
      { id: "all", label: "All" },
      { id: "open", label: "Open" },
      { id: "closed", label: "Closed" },
    ],
    value: "all",
  };

  const segmentArgs = {
    options: [
      { id: "list", label: "List" },
      { id: "board", label: "Board" },
      { id: "table", label: "Table" },
    ],
    value: "list",
  };
</script>

{#snippet sidebar(args: any)}
  <Sidebar {...args} />
{/snippet}

{#snippet breadcrumbs(args: any)}
  <Breadcrumbs {...args} />
{/snippet}

{#snippet tabs(args: any)}
  <Tabs {...args} />
{/snippet}

{#snippet segmented(args: any)}
  <SegmentedControl {...args} />
{/snippet}

<Story name="Sidebar" args={sidebarArgs} template={sidebar} />
<Story name="Breadcrumbs" args={breadcrumbArgs} template={breadcrumbs} />
<Story name="Tabs" args={tabArgs} template={tabs} />
<Story name="Segmented control" args={segmentArgs} template={segmented} />
