<script lang="ts">
  import type { Component } from 'svelte';
  import {
    Calendar,
    Dashboard,
    Document,
    Grid,
    List,
    Notification,
    Settings,
    User,
    WarningAltFilled,
  } from 'carbon-icons-svelte';
  import AppShell from '$lib/components/AppShell.svelte';
  import Banner from '$lib/components/Banner.svelte';
  import Button from '$lib/components/Button.svelte';
  import Header from '$lib/components/Header.svelte';
  import Icon from '$lib/components/Icon.svelte';
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
        { label: 'Inbox', icon: Notification, count: 4 },
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
    <Header breadcrumb={['t128n', 'Design system', 'Issues']} />

    <div class="banner-wrap">
      <Banner title="Sync paused — changes are saved locally" status="danger">
        Edits are queued and will sync automatically when the connection returns.
      </Banner>
    </div>

    <div class="body">
      <div class="ds-empty state">
        <div class="ds-empty-icon">
          <Icon icon={WarningAltFilled} size={24} />
        </div>
        <p class="ds-empty-title">We couldn&apos;t load this view</p>
        <p class="ds-empty-copy">
          The server didn&apos;t respond, so issues and filters are unavailable right now.
        </p>
        <div class="actions">
          <Button variant="primary">Retry</Button>
          <Button variant="secondary">View status</Button>
        </div>
        <p class="ds-mono code">503 · request 8f2c1a</p>
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

  .banner-wrap {
    flex: none;
    padding: var(--space-3) var(--page-inset) 0;
  }

  .body {
    flex: 1;
    min-height: 0;
    display: grid;
    place-items: center;
    overflow: auto;
    padding: var(--page-inset);
  }

  .state .ds-empty-icon {
    color: var(--danger);
  }

  .actions {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .code {
    font: var(--type-mono);
    color: var(--text-3);
  }
</style>
