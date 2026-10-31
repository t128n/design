<script lang="ts">
  import type { Component } from 'svelte';
  import {
    Archive,
    Chat,
    Checkmark,
    CheckmarkDouble,
    CheckmarkOutline,
    CircleOutline,
    Download,
    Email,
    Folder,
    Grid,
    Idea,
    Notification,
    OverflowMenuHorizontal,
    ProgressBarRound,
    User,
    UserMultiple,
    View,
  } from 'carbon-icons-svelte';
  import AppShell from '$lib/components/AppShell.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Header from '$lib/components/Header.svelte';
  import Tabs from '$lib/components/Tabs.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import Icon from '$lib/components/Icon.svelte';

  interface InboxItem {
    id: number;
    title: string;
    meta: string;
    time: string;
    unread: boolean;
    mention: boolean;
    icon: Component<any>;
  }

  const navGroups = [
    {
      label: 'Work',
      items: [
        { label: 'Inbox', icon: Email, active: true },
        { label: 'My issues', icon: CircleOutline },
        { label: 'Projects', icon: Folder },
      ],
    },
    {
      label: 'Workspace',
      items: [
        { label: 'Views', icon: Grid },
        { label: 'Initiatives', icon: Idea },
        { label: 'Team', icon: UserMultiple },
      ],
    },
  ];

  const tabItems = [
    { value: 'all', label: 'All', count: 8 },
    { value: 'unread', label: 'Unread', count: 5 },
    { value: 'mentions', label: 'Mentions', count: 3 },
  ];

  const notifications: InboxItem[] = [
    {
      id: 1,
      title: 'Avery Chen mentioned you in DES-142',
      meta: 'Sync conflict resolution drops offline edits',
      time: '2h',
      unread: true,
      mention: true,
      icon: Chat,
    },
    {
      id: 2,
      title: 'Priya Nair requested your review on DES-129',
      meta: 'Sidebar count alignment drifts at compact density',
      time: '4h',
      unread: true,
      mention: false,
      icon: View,
    },
    {
      id: 3,
      title: 'Marcus Reed approved your merge request',
      meta: 'Split view at --width-detail',
      time: 'Yesterday',
      unread: false,
      mention: false,
      icon: CheckmarkOutline,
    },
    {
      id: 4,
      title: 'Sofia Lind mentioned you in Design principles',
      meta: 'Foundations · Page',
      time: 'Yesterday',
      unread: true,
      mention: true,
      icon: Chat,
    },
    {
      id: 5,
      title: '8 issues moved to In progress',
      meta: 'Design system · Projects',
      time: 'Mon',
      unread: true,
      mention: false,
      icon: ProgressBarRound,
    },
    {
      id: 6,
      title: 'Weekly digest: 24 closed, 6 opened',
      meta: 't128n · Workspace',
      time: 'Mon',
      unread: false,
      mention: false,
      icon: Notification,
    },
    {
      id: 7,
      title: 'Jonas Weber assigned you DES-096',
      meta: 'Replace hard-coded spacing in cards',
      time: 'Sun',
      unread: true,
      mention: true,
      icon: User,
    },
    {
      id: 8,
      title: 'Your export is ready to download',
      meta: 'Design system · 44 issues',
      time: 'Sun',
      unread: false,
      mention: false,
      icon: Download,
    },
  ];

  let tab = $state('all');

  const visible = $derived(
    notifications.filter((item) =>
      tab === 'all' ? true : tab === 'unread' ? item.unread : item.mention,
    ),
  );
</script>

<AppShell>
  {#snippet sidebar()}
    <Sidebar
      workspace="t128n"
      groups={navGroups}
      user={{ name: 'Avery Chen', initials: 'AC' }}
    />
  {/snippet}

  <div class="ds-page view">
    <Header breadcrumb={['t128n', 'Inbox']}>
      {#snippet actions()}
        <IconButton icon={CheckmarkDouble} label="Mark all as read" />
        <IconButton icon={OverflowMenuHorizontal} label="Inbox actions" />
      {/snippet}
    </Header>

    <div class="inbox-tabs">
      <Tabs tabs={tabItems} bind:value={tab} label="Notification filters" />
    </div>

    <div class="inbox-scroll">
      <div class="ds-list">
        {#each visible as item (item.id)}
          <div class="ds-list-row notification" data-unread={item.unread}>
            <span class="dot" class:visible={item.unread} aria-hidden="true"></span>
            <span class="tile">
              <Icon icon={item.icon} size={16} />
            </span>
            <div class="copy">
              <p class="ds-row-title">{item.title}</p>
              <p class="meta">{item.meta}</p>
            </div>
            <div class="row-end">
              <span class="time">{item.time}</span>
              <div class="row-actions ds-row-actions">
                <IconButton
                  icon={Checkmark}
                  size="sm"
                  label={item.unread ? 'Mark as read' : 'Mark as unread'}
                />
                <IconButton icon={Archive} size="sm" label="Archive notification" />
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</AppShell>

<style>
  .view {
    height: 100%;
    min-height: 0;
  }

  .inbox-scroll {
    flex: 1;
    min-height: 0;
    overflow: auto;
  }

  .inbox-tabs :global(.list) {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    height: var(--row-h);
    padding: 0 var(--page-inset);
    border-bottom: 1px solid var(--border);
    flex: none;
  }

  .notification {
    grid-template-columns:
      var(--space-1) var(--size-4) minmax(0, 1fr)
      calc(var(--space-6) * 3);
    padding: var(--space-2);
  }

  .dot {
    width: var(--space-1);
    height: var(--space-1);
    border-radius: var(--radius-full);
    background: var(--info);
    visibility: hidden;
  }

  .dot.visible {
    visibility: visible;
  }

  .tile {
    display: grid;
    place-items: center;
    width: var(--size-4);
    height: var(--size-4);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
    color: var(--text-2);
  }

  .copy {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 0;
  }

  .meta {
    overflow: hidden;
    font: var(--type-caption);
    color: var(--text-3);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .row-end {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: var(--size-3);
  }

  .time {
    font: var(--type-caption);
    color: var(--text-3);
    white-space: nowrap;
  }

  .notification:hover .time,
  .notification:focus-within .time {
    opacity: 0;
  }

  .row-actions {
    position: absolute;
    inset-block: 0;
    right: 0;
    align-items: center;
  }
</style>
