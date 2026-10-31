<script lang="ts">
  import type { Component } from 'svelte';
  import {
    Calendar,
    ChartLine,
    Folder,
    Grid,
    Notification,
    Settings,
    Task,
    UserMultiple,
  } from 'carbon-icons-svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';

  interface NavItem {
    label: string;
    icon: Component<any>;
    active?: boolean;
    count?: number;
  }

  interface NavGroup {
    label?: string;
    items: NavItem[];
  }

  interface Props {
    workspace?: string;
    active?: string;
    userName?: string;
    userInitials?: string;
  }

  let {
    workspace = 't128n',
    active = 'Inbox',
    userName = 'Ada Lovelace',
    userInitials = 'AL',
  }: Props = $props();

  const groups = $derived<NavGroup[]>([
    {
      label: 'Workspace',
      items: [
        { label: 'Inbox', icon: Notification, active: active === 'Inbox', count: 12 },
        { label: 'My issues', icon: Task, active: active === 'My issues' },
        { label: 'Projects', icon: Folder, active: active === 'Projects' },
        { label: 'Views', icon: Grid, active: active === 'Views' },
      ],
    },
    {
      label: 'Team',
      items: [
        { label: 'Roadmap', icon: ChartLine, active: active === 'Roadmap' },
        { label: 'Calendar', icon: Calendar, active: active === 'Calendar' },
        { label: 'Members', icon: UserMultiple, active: active === 'Members' },
        { label: 'Settings', icon: Settings, active: active === 'Settings' },
      ],
    },
  ]);
</script>

<Sidebar
  {workspace}
  {groups}
  user={{ name: userName, initials: userInitials }}
  onsearch={() => {}}
  onselect={() => {}}
/>
