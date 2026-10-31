<script lang="ts">
  import type { Component } from 'svelte';
  import {
    Calendar,
    Dashboard,
    Document,
    DocumentAdd,
    Grid,
    List,
    Notification,
    Settings,
    User,
  } from 'carbon-icons-svelte';
  import AppShell from '$lib/components/AppShell.svelte';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import Header from '$lib/components/Header.svelte';
  import Kbd from '$lib/components/Kbd.svelte';
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

  const groups: NavGroup[] = [
    {
      label: 'Workspace',
      items: [
        { label: 'Overview', icon: Dashboard },
        { label: 'Inbox', icon: Notification },
        { label: 'My issues', icon: User },
      ],
    },
    {
      label: 'Design system',
      items: [
        { label: 'Issues', icon: List, active: true },
        { label: 'Board', icon: Grid },
        { label: 'Calendar', icon: Calendar },
        { label: 'Pages', icon: Document },
        { label: 'Settings', icon: Settings },
      ],
    },
  ];

  const user = { name: 'Mara Chen', initials: 'MC' };
</script>

<AppShell>
  {#snippet sidebar()}
    <Sidebar workspace="t128n" {groups} {user} />
  {/snippet}

  <div class="page">
    <Header breadcrumb={['t128n', 'Design system']} />

    <div class="body">
      <div class="state">
        <EmptyState
          icon={DocumentAdd}
          title="No issues yet"
          description="This design system has no issues, so there is nothing to triage, assign or review."
          action={{ label: 'Create first issue', primary: true }}
        />
        <p class="ds-caption hint">
          Or press
          <Kbd>N</Kbd>
          to create an issue from anywhere.
        </p>
      </div>
    </div>
  </div>
</AppShell>

<style>
  .page {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  .body {
    flex: 1;
    min-height: 0;
    display: grid;
    place-items: center;
    overflow: auto;
    padding: var(--page-inset);
  }

  .state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
  }

  .hint {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-1);
    flex-wrap: wrap;
  }
</style>
