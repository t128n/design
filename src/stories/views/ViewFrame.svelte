<script lang="ts">
  import type { Snippet } from "svelte";

  import Sidebar from "../../lib/components/nav/Sidebar.svelte";
  import AppShell from "../../lib/components/shell/AppShell.svelte";

  interface Props {
    active?: string;
    children?: Snippet;
  }

  let { active = "", children }: Props = $props();

  const groups = [
    {
      label: "Work",
      items: [
        { id: "inbox", label: "Inbox", icon: "inbox", href: "#" },
        { id: "issues", label: "Issues", icon: "issues", href: "#" },
        { id: "board", label: "Board", icon: "issues", href: "#" },
      ],
    },
    {
      label: "Workspace",
      items: [
        { id: "calendar", label: "Calendar", icon: "calendar", href: "#" },
        { id: "overview", label: "Overview", icon: "home", href: "#" },
        { id: "settings", label: "Settings", icon: "settings", href: "#" },
      ],
    },
  ];
</script>

{#snippet navigation()}
  <Sidebar {groups} {active} />
{/snippet}

<AppShell nav={navigation}>
  {@render children?.()}
</AppShell>
