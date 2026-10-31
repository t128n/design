<script lang="ts">
  import type { Component } from 'svelte';
  import {
    Calendar,
    CheckmarkFilled,
    CircleDash,
    ErrorFilled,
    Filter,
    FolderOpen,
    InProgress,
    Tag as TagIcon,
    Time,
    UserMultiple,
  } from 'carbon-icons-svelte';
  import Avatar from './Avatar.svelte';
  import Badge from './Badge.svelte';
  import Button from './Button.svelte';
  import DataTable from './DataTable.svelte';
  import Header from './Header.svelte';
  import Icon from './Icon.svelte';
  import IconButton from './IconButton.svelte';
  import PropertyList from './PropertyList.svelte';
  import SearchField from './SearchField.svelte';
  import SegmentedControl from './SegmentedControl.svelte';
  import Tag from './Tag.svelte';
  import Toolbar from './Toolbar.svelte';

  type StatusTone = 'success' | 'info' | 'danger' | 'neutral';

  const statusMeta: Record<string, { icon: Component<any>; tone: StatusTone; label: string }> = {
    done: { icon: CheckmarkFilled, tone: 'success', label: 'Done' },
    'in-progress': { icon: InProgress, tone: 'info', label: 'In progress' },
    review: { icon: InProgress, tone: 'info', label: 'In review' },
    blocked: { icon: ErrorFilled, tone: 'danger', label: 'Blocked' },
    todo: { icon: CircleDash, tone: 'neutral', label: 'Todo' },
  };

  function statusIcon(status: string): Component<any> {
    return statusMeta[status]?.icon ?? CircleDash;
  }

  function statusTone(status: string): StatusTone {
    return statusMeta[status]?.tone ?? 'neutral';
  }

  function statusLabel(status: string): string {
    return statusMeta[status]?.label ?? status;
  }

  type TagTone = 'neutral' | 'blue' | 'green' | 'yellow' | 'red' | 'violet';

  function priorityTone(priority: string): TagTone {
    if (priority === 'Urgent') return 'violet';
    if (priority === 'High') return 'blue';
    return 'neutral';
  }

  const views = [
    { value: 'table', label: 'Table' },
    { value: 'board', label: 'Board' },
  ];

  const issueColumns: {
    key: string;
    label: string;
    align?: 'left' | 'right';
    width?: string;
  }[] = [
    { key: 'title', label: 'Issue', width: '42%' },
    { key: 'status', label: 'Status', width: 'calc(var(--size-5) * 3)' },
    { key: 'priority', label: 'Priority', width: 'calc(var(--size-5) * 3)' },
    { key: 'assignee', label: 'Assignee', width: 'calc(var(--size-5) * 4)' },
    { key: 'updated', label: 'Updated', align: 'right', width: 'calc(var(--size-5) * 2)' },
  ];

  const issues: Record<string, unknown>[] = [
    {
      id: 'ENG-412',
      title: 'Keyboard trap in command palette',
      status: 'in-progress',
      priority: 'Urgent',
      assignee: 'Maya Chen',
      initials: 'MC',
      updated: '2h ago',
    },
    {
      id: 'ENG-408',
      title: 'Sticky header jumps on scroll',
      status: 'review',
      priority: 'High',
      assignee: 'Jonas Weber',
      initials: 'JW',
      updated: '4h ago',
    },
    {
      id: 'DES-231',
      title: 'Density tokens for compact tables',
      status: 'in-progress',
      priority: 'Medium',
      assignee: 'Priya Nair',
      initials: 'PN',
      updated: '6h ago',
    },
    {
      id: 'ENG-401',
      title: 'Focus ring clipped in overflow rows',
      status: 'blocked',
      priority: 'High',
      assignee: 'Sam Okafor',
      initials: 'SO',
      updated: '1d ago',
    },
    {
      id: 'ENG-397',
      title: 'Optimistic rename rolls back twice',
      status: 'in-progress',
      priority: 'Medium',
      assignee: 'Maya Chen',
      initials: 'MC',
      updated: '1d ago',
    },
    {
      id: 'DES-224',
      title: 'Tag contrast in dark mode',
      status: 'done',
      priority: 'Low',
      assignee: 'Lena Fischer',
      initials: 'LF',
      updated: '2d ago',
    },
    {
      id: 'ENG-390',
      title: 'Calendar week starts on Monday',
      status: 'todo',
      priority: 'Medium',
      assignee: 'Jonas Weber',
      initials: 'JW',
      updated: '2d ago',
    },
    {
      id: 'ENG-385',
      title: 'Empty state copy audit',
      status: 'review',
      priority: 'Low',
      assignee: 'Priya Nair',
      initials: 'PN',
      updated: '3d ago',
    },
    {
      id: 'DES-218',
      title: 'Board card hover tint',
      status: 'done',
      priority: 'Low',
      assignee: 'Sam Okafor',
      initials: 'SO',
      updated: '3d ago',
    },
    {
      id: 'ENG-379',
      title: 'Search results keep stale query',
      status: 'todo',
      priority: 'High',
      assignee: 'Maya Chen',
      initials: 'MC',
      updated: '4d ago',
    },
    {
      id: 'ENG-372',
      title: 'Row selection clears on sort',
      status: 'in-progress',
      priority: 'Urgent',
      assignee: 'Lena Fischer',
      initials: 'LF',
      updated: '5d ago',
    },
    {
      id: 'DES-210',
      title: 'Property rows at compact density',
      status: 'todo',
      priority: 'Medium',
      assignee: 'Priya Nair',
      initials: 'PN',
      updated: '6d ago',
    },
  ];

  const inboxGroups = [
    {
      label: 'In progress',
      status: 'in-progress',
      rows: [
        {
          id: 'DES-231',
          title: 'Density tokens for compact tables',
          status: 'in-progress',
          labels: 'Design system, Tokens',
          initials: 'PN',
          name: 'Priya Nair',
          date: '2h',
        },
        {
          id: 'ENG-397',
          title: 'Optimistic rename rolls back twice',
          status: 'in-progress',
          labels: 'Data layer',
          initials: 'MC',
          name: 'Maya Chen',
          date: '5h',
        },
        {
          id: 'ENG-372',
          title: 'Row selection clears on sort',
          status: 'in-progress',
          labels: 'Table, Keyboard',
          initials: 'LF',
          name: 'Lena Fischer',
          date: '1d',
        },
      ],
    },
    {
      label: 'Todo',
      status: 'todo',
      rows: [
        {
          id: 'ENG-390',
          title: 'Calendar week starts on Monday',
          status: 'todo',
          labels: 'Calendar',
          initials: 'JW',
          name: 'Jonas Weber',
          date: '1d',
        },
        {
          id: 'ENG-379',
          title: 'Search results keep stale query',
          status: 'todo',
          labels: 'Search, Cache',
          initials: 'MC',
          name: 'Maya Chen',
          date: '2d',
        },
        {
          id: 'DES-210',
          title: 'Property rows at compact density',
          status: 'todo',
          labels: 'Properties, Density',
          initials: 'PN',
          name: 'Priya Nair',
          date: '3d',
        },
      ],
    },
  ];

  const propertyItems = [
    { label: 'Status', icon: InProgress, value: 'In progress' },
    { label: 'Assignee', icon: UserMultiple, value: 'Maya Chen' },
    { label: 'Labels', icon: TagIcon, value: 'Design system, Table' },
    { label: 'Target', icon: Calendar, value: 'November 14, 2026' },
    { label: 'Created', icon: Time, value: 'October 12, 2026' },
  ];

  const boardColumns = [
    {
      label: 'Todo',
      status: 'todo',
      cards: [
        {
          id: 'DES-241',
          title: 'Audit empty state copy',
          tag: 'Documentation',
          tone: 'neutral' as TagTone,
          initials: 'LF',
          name: 'Lena Fischer',
        },
        {
          id: 'ENG-403',
          title: 'Define calendar overflow',
          tag: 'Calendar',
          tone: 'green' as TagTone,
          initials: 'SO',
          name: 'Sam Okafor',
        },
      ],
    },
    {
      label: 'In progress',
      status: 'in-progress',
      cards: [
        {
          id: 'DES-231',
          title: 'Density tokens for compact tables',
          tag: 'Tokens',
          tone: 'blue' as TagTone,
          initials: 'PN',
          name: 'Priya Nair',
        },
        {
          id: 'ENG-412',
          title: 'Keyboard trap in command palette',
          tag: 'Accessibility',
          tone: 'violet' as TagTone,
          initials: 'MC',
          name: 'Maya Chen',
        },
        {
          id: 'DES-218',
          title: 'Board card hover tint',
          tag: 'Board',
          tone: 'yellow' as TagTone,
          initials: 'JW',
          name: 'Jonas Weber',
        },
      ],
    },
    {
      label: 'Done',
      status: 'done',
      cards: [
        {
          id: 'DES-224',
          title: 'Tag contrast in dark mode',
          tag: 'Color',
          tone: 'red' as TagTone,
          initials: 'LF',
          name: 'Lena Fischer',
        },
        {
          id: 'ENG-361',
          title: 'Keyboard row navigation',
          tag: 'Table',
          tone: 'green' as TagTone,
          initials: 'SO',
          name: 'Sam Okafor',
        },
      ],
    },
  ];

  const noop = () => {};
</script>

{#snippet issueCell(
  row: Record<string, unknown>,
  column: { key: string; label: string; align?: 'left' | 'right'; width?: string },
)}
  {#if column.key === 'title'}
    <span class="issue-cell">
      <span class="ds-mono">{String(row.id)}</span>
      <span class="issue-title ds-truncate">{String(row.title)}</span>
    </span>
  {:else if column.key === 'status'}
    <span class="status">
      <span class="status-glyph" data-tone={statusTone(String(row.status))}>
        <Icon icon={statusIcon(String(row.status))} size={16} />
      </span>
      <span>{statusLabel(String(row.status))}</span>
    </span>
  {:else if column.key === 'priority'}
    <Tag label={String(row.priority)} tone={priorityTone(String(row.priority))} />
  {:else if column.key === 'assignee'}
    <span class="assignee">
      <Avatar initials={String(row.initials)} size="sm" label={String(row.assignee)} />
      <span class="ds-truncate">{String(row.assignee)}</span>
    </span>
  {:else}
    <span class="ds-caption">{String(row[column.key] ?? '')}</span>
  {/if}
{/snippet}

<div class="ds-page showcase">
  <Header title="Data display">
    {#snippet actions()}
      <IconButton icon={Filter} label="Filter issues" />
      <Button variant="primary" label="New issue" />
    {/snippet}
  </Header>

  <Toolbar>
    {#snippet filters()}
      <SegmentedControl options={views} value="table" label="View" />
      <span class="ds-caption">12 open · updated just now</span>
    {/snippet}
    {#snippet actions()}
      <div class="toolbar-search">
        <SearchField placeholder="Search issues" shortcut="⌘K" />
      </div>
    {/snippet}
  </Toolbar>

  <div class="ds-page-body">
    <div class="showcase-body">
      <section class="block">
        <div class="section-head">
          <h2>Active issues</h2>
          <span class="ds-caption">12 of 148 open</span>
        </div>
        <DataTable
          columns={issueColumns}
          rows={issues}
          rowKey="id"
          selectable
          selectedKey="ENG-412"
          onrowclick={noop}
          newRowLabel="New issue"
          cell={issueCell}
        />
      </section>

      <section class="split">
        <div class="list-block">
          <div class="section-head">
            <h2>Inbox</h2>
            <span class="ds-caption">6 unread</span>
          </div>
          <div class="ds-list">
            {#each inboxGroups as group}
              <div class="ds-list-group">
                <span class="status-glyph" data-tone={statusTone(group.status)}>
                  <Icon icon={statusIcon(group.status)} size={16} />
                </span>
                <span>{group.label}</span>
                <span class="group-count">{group.rows.length}</span>
              </div>
              {#each group.rows as row (row.id)}
                <div
                  class="ds-list-row issue-row"
                  data-selected={row.id === 'ENG-372' ? 'true' : undefined}
                >
                  <span class="ds-mono">{row.id}</span>
                  <span class="status-glyph" data-tone={statusTone(row.status)}>
                    <Icon icon={statusIcon(row.status)} size={16} />
                  </span>
                  <span class="ds-row-title">{row.title}</span>
                  <span class="row-labels ds-truncate">{row.labels}</span>
                  <Avatar initials={row.initials} size="xs" label={row.name} />
                  <span class="row-date ds-caption">{row.date}</span>
                </div>
              {/each}
            {/each}
          </div>
        </div>

        <aside class="side">
          <div class="panel">
            <div class="panel-head"><h3>Properties</h3></div>
            <PropertyList items={propertyItems} editable />
          </div>
        </aside>
      </section>

      <section class="block">
        <div class="section-head">
          <h2>Board</h2>
          <span class="ds-caption">3 columns · 7 cards</span>
        </div>
        <div class="ds-board">
          {#each boardColumns as column}
            <div class="ds-board-column">
              <div class="ds-board-column-header">
                <span class="status-glyph" data-tone={statusTone(column.status)}>
                  <Icon icon={statusIcon(column.status)} size={16} />
                </span>
                <span>{column.label}</span>
                <span class="group-count">{column.cards.length}</span>
              </div>
              {#each column.cards as card (card.id)}
                <article class="ds-card">
                  <p class="ds-card-title">{card.title}</p>
                  <div class="ds-card-meta">
                    <span class="ds-mono">{card.id}</span>
                    <Tag label={card.tag} tone={card.tone} />
                    <span class="ds-grow"></span>
                    <Avatar initials={card.initials} size="xs" label={card.name} />
                  </div>
                </article>
              {/each}
            </div>
          {/each}
        </div>
      </section>

      <section class="bottom">
        <article class="gallery-card">
          <div class="gallery-cover" aria-hidden="true">
            <Icon icon={FolderOpen} size={32} />
          </div>
          <div class="gallery-copy">
            <p class="gallery-title">Foundations</p>
            <p class="gallery-caption">24 pages · Updated 2 days ago</p>
          </div>
        </article>

        <div class="panel chip-panel">
          <div class="panel-head"><h3>Labels &amp; status</h3></div>
          <p class="chip-label">Labels</p>
          <div class="chip-row">
            <Tag label="Design system" tone="blue" />
            <Tag label="Accessibility" tone="violet" />
            <Tag label="Table" tone="green" />
            <Tag label="Density" tone="yellow" />
            <Tag label="Docs" tone="neutral" />
          </div>
          <p class="chip-label">Status</p>
          <div class="chip-row">
            <Badge label="On track" status="success" />
            <Badge label="At risk" status="warning" />
            <Badge label="Blocked" status="danger" />
            <Badge label="In review" status="info" />
          </div>
          <p class="chip-label">People</p>
          <div class="chip-row people-row">
            <div class="avatar-stack">
              <Avatar initials="MC" size="sm" label="Maya Chen" />
              <Avatar initials="JW" size="sm" label="Jonas Weber" />
              <Avatar initials="PN" size="sm" label="Priya Nair" />
              <span class="avatar-more">+3</span>
            </div>
            <span class="ds-caption">6 collaborators</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>

<style>
  .showcase {
    min-height: 100%;
  }

  .showcase-body {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    padding: var(--space-4) 0 var(--space-6);
  }

  .block {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .section-head {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    padding: var(--space-2) var(--page-inset);
  }

  .section-head h2 {
    font: var(--type-heading);
    color: var(--text-1);
  }

  .split {
    display: grid;
    grid-template-columns: minmax(0, 1fr) var(--width-detail);
    gap: var(--space-6);
    align-items: start;
    padding: 0 var(--page-inset);
  }

  .list-block {
    min-width: 0;
  }

  .issue-row {
    grid-template-columns:
      calc(var(--size-5) + var(--size-3))
      var(--size-1)
      minmax(0, 1fr)
      minmax(0, calc(var(--width-label) * 1.5))
      var(--size-3)
      calc(var(--size-5) * 2);
  }

  .row-labels {
    font: var(--type-caption);
    color: var(--text-3);
  }

  .row-date {
    text-align: right;
  }

  .group-count {
    margin-left: auto;
    font: var(--type-caption);
    color: var(--text-3);
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--text-2);
    white-space: nowrap;
  }

  .status-glyph {
    display: inline-flex;
    align-items: center;
    flex: none;
    color: var(--text-3);
  }

  .status-glyph[data-tone='success'] {
    color: var(--success);
  }

  .status-glyph[data-tone='info'] {
    color: var(--info);
  }

  .status-glyph[data-tone='danger'] {
    color: var(--danger);
  }

  .issue-cell {
    display: grid;
    grid-template-columns: calc(var(--size-5) * 2) minmax(0, 1fr);
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
  }

  .issue-title {
    font: var(--type-body);
    color: var(--text-1);
  }

  .assignee {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
  }

  .side {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-width: 0;
  }

  .panel {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-2);
    background: var(--surface-panel);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }

  .panel-head {
    padding: var(--space-1) var(--space-2);
  }

  .panel-head h3 {
    font: var(--type-heading);
    color: var(--text-1);
  }

  .ds-board {
    min-height: 0;
  }

  .toolbar-search {
    width: calc(var(--size-5) * 5);
  }

  .bottom {
    display: grid;
    grid-template-columns: minmax(0, var(--width-detail)) minmax(0, 1fr);
    gap: var(--space-6);
    align-items: start;
    padding: 0 var(--page-inset);
  }

  .gallery-card {
    background: var(--surface-panel);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .gallery-cover {
    display: grid;
    place-items: center;
    height: calc(var(--size-5) * 3);
    background: var(--surface-sunken);
    border-bottom: 1px solid var(--border);
    color: var(--text-3);
  }

  .gallery-copy {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-3);
  }

  .gallery-title {
    font: var(--type-heading);
    color: var(--text-1);
  }

  .gallery-caption {
    font: var(--type-caption);
    color: var(--text-3);
  }

  .chip-panel {
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3) var(--space-3);
  }

  .chip-label {
    font: var(--type-label);
    color: var(--text-3);
  }

  .chip-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-1);
  }

  .people-row {
    gap: var(--space-2);
  }

  .avatar-stack {
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }

  .avatar-stack :global(.avatar) {
    border: var(--ring-width) solid var(--surface-panel);
  }

  .avatar-more {
    display: grid;
    place-items: center;
    width: var(--size-2);
    height: var(--size-2);
    border: var(--ring-width) solid var(--surface-panel);
    border-radius: var(--radius-full);
    background: var(--surface-subtle);
    color: var(--text-2);
    font: var(--type-caption);
  }

  @media (max-width: 1060px) {
    .split,
    .bottom {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @media (max-width: 760px) {
    .issue-row {
      grid-template-columns:
        calc(var(--size-5) + var(--size-1))
        var(--size-1)
        minmax(0, 1fr)
        var(--size-3);
    }

    .row-labels,
    .row-date {
      display: none;
    }

    .toolbar-search {
      width: calc(var(--size-5) * 4);
    }
  }
</style>
