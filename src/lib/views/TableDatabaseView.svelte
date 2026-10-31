<script lang="ts">
  import type { Component } from 'svelte';
  import {
    Add,
    ArrowDown,
    ArrowsVertical,
    ArrowUp,
    Calendar,
    Checkmark,
    ChevronDown,
    CircleDash,
    Dashboard,
    Filter,
    Folder,
    InProgress,
    Notification,
    OverflowMenuVertical,
    Settings,
    Table,
    Task,
    UserMultiple,
    View,
  } from 'carbon-icons-svelte';
  import AppShell from '$lib/components/AppShell.svelte';
  import Avatar from '$lib/components/Avatar.svelte';
  import Button from '$lib/components/Button.svelte';
  import Header from '$lib/components/Header.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import SearchField from '$lib/components/SearchField.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import Toolbar from '$lib/components/Toolbar.svelte';

  type Tone = 'neutral' | 'blue' | 'green' | 'yellow' | 'red' | 'violet';
  type IssueStatus = 'Backlog' | 'Todo' | 'In progress' | 'In review' | 'Done';
  type Priority = 'High' | 'Medium' | 'Low';

  interface Issue {
    id: string;
    title: string;
    status: IssueStatus;
    labels: { label: string; tone: Tone }[];
    assignee: { name: string; initials: string };
    date: string;
    datetime: string;
    priority: Priority;
    selected: boolean;
  }

  const groups = [
    {
      label: 'Workspace',
      items: [
        { label: 'Overview', icon: Dashboard },
        { label: 'Inbox', icon: Notification, count: 4 },
        { label: 'My issues', icon: Task },
        { label: 'Board', icon: View },
        { label: 'Table', icon: Table, active: true },
        { label: 'Calendar', icon: Calendar },
      ],
    },
    {
      label: 'Projects',
      items: [
        { label: 'Design system', icon: Folder },
        { label: 'Marketing site', icon: Folder },
        { label: 'Mobile app', icon: Folder },
      ],
    },
    {
      label: 'Settings',
      items: [
        { label: 'Members', icon: UserMultiple },
        { label: 'Settings', icon: Settings },
      ],
    },
  ];

  const statusGlyph: Record<IssueStatus, Component<any>> = {
    Backlog: CircleDash,
    Todo: CircleDash,
    'In progress': InProgress,
    'In review': InProgress,
    Done: Checkmark,
  };

  const priorityGlyph: Record<Priority, Component<any>> = {
    High: ArrowUp,
    Medium: ArrowsVertical,
    Low: ArrowDown,
  };

  let rows = $state<Issue[]>([
    {
      id: 'T128-241',
      title: 'Define density tokens for compact mode',
      status: 'In progress',
      labels: [
        { label: 'Design system', tone: 'blue' },
        { label: 'Tokens', tone: 'neutral' },
      ],
      assignee: { name: 'Marcus Kim', initials: 'MK' },
      date: 'Oct 24',
      datetime: '2026-10-24',
      priority: 'High',
      selected: true,
    },
    {
      id: 'T128-263',
      title: 'Table density: 32 / 36 / 44',
      status: 'In progress',
      labels: [
        { label: 'Data', tone: 'green' },
        { label: 'Tokens', tone: 'neutral' },
      ],
      assignee: { name: 'Jun Seo', initials: 'JS' },
      date: 'Oct 24',
      datetime: '2026-10-24',
      priority: 'High',
      selected: false,
    },
    {
      id: 'T128-268',
      title: 'Header anatomy audit',
      status: 'In review',
      labels: [{ label: 'Layout', tone: 'violet' }],
      assignee: { name: 'Ada Lovelace', initials: 'AL' },
      date: 'Oct 23',
      datetime: '2026-10-23',
      priority: 'Medium',
      selected: false,
    },
    {
      id: 'T128-256',
      title: 'Sidebar workspace switcher',
      status: 'Todo',
      labels: [{ label: 'Navigation', tone: 'blue' }],
      assignee: { name: 'Rina Bell', initials: 'RB' },
      date: 'Oct 23',
      datetime: '2026-10-23',
      priority: 'Medium',
      selected: false,
    },
    {
      id: 'T128-252',
      title: 'Keyboard path for board columns',
      status: 'Todo',
      labels: [{ label: 'Accessibility', tone: 'violet' }],
      assignee: { name: 'Marcus Kim', initials: 'MK' },
      date: 'Oct 22',
      datetime: '2026-10-22',
      priority: 'Low',
      selected: false,
    },
    {
      id: 'T128-249',
      title: 'Tag palette contrast pass',
      status: 'In progress',
      labels: [
        { label: 'Tokens', tone: 'neutral' },
        { label: 'Color', tone: 'yellow' },
      ],
      assignee: { name: 'Jun Seo', initials: 'JS' },
      date: 'Oct 22',
      datetime: '2026-10-22',
      priority: 'High',
      selected: false,
    },
    {
      id: 'T128-260',
      title: 'Command palette grouping',
      status: 'In review',
      labels: [{ label: 'Interaction', tone: 'violet' }],
      assignee: { name: 'Ada Lovelace', initials: 'AL' },
      date: 'Oct 21',
      datetime: '2026-10-21',
      priority: 'Medium',
      selected: false,
    },
    {
      id: 'T128-238',
      title: 'Audit focus states across overlays',
      status: 'Backlog',
      labels: [{ label: 'Accessibility', tone: 'violet' }],
      assignee: { name: 'Marcus Kim', initials: 'MK' },
      date: 'Oct 21',
      datetime: '2026-10-21',
      priority: 'Low',
      selected: false,
    },
    {
      id: 'T128-235',
      title: 'Document line mode behaviour',
      status: 'Backlog',
      labels: [{ label: 'Docs', tone: 'neutral' }],
      assignee: { name: 'Ada Lovelace', initials: 'AL' },
      date: 'Oct 20',
      datetime: '2026-10-20',
      priority: 'Low',
      selected: false,
    },
    {
      id: 'T128-257',
      title: 'Banner component',
      status: 'Done',
      labels: [{ label: 'Feedback', tone: 'green' }],
      assignee: { name: 'Rina Bell', initials: 'RB' },
      date: 'Oct 20',
      datetime: '2026-10-20',
      priority: 'Medium',
      selected: false,
    },
    {
      id: 'T128-266',
      title: 'Avatar size ladder',
      status: 'Done',
      labels: [{ label: 'Data', tone: 'green' }],
      assignee: { name: 'Jun Seo', initials: 'JS' },
      date: 'Oct 19',
      datetime: '2026-10-19',
      priority: 'Low',
      selected: false,
    },
    {
      id: 'T128-229',
      title: 'Empty workspace illustration',
      status: 'Todo',
      labels: [{ label: 'Design', tone: 'green' }],
      assignee: { name: 'Rina Bell', initials: 'RB' },
      date: 'Oct 19',
      datetime: '2026-10-19',
      priority: 'Low',
      selected: false,
    },
    {
      id: 'T128-255',
      title: 'Chart baseline rules',
      status: 'In review',
      labels: [{ label: 'Data', tone: 'green' }],
      assignee: { name: 'Marcus Kim', initials: 'MK' },
      date: 'Oct 18',
      datetime: '2026-10-18',
      priority: 'Medium',
      selected: false,
    },
    {
      id: 'T128-201',
      title: 'Token naming grammar',
      status: 'Done',
      labels: [{ label: 'Tokens', tone: 'neutral' }],
      assignee: { name: 'Ada Lovelace', initials: 'AL' },
      date: 'Oct 17',
      datetime: '2026-10-17',
      priority: 'Medium',
      selected: false,
    },
  ]);

  const allSelected = $derived(rows.every((row) => row.selected));
  const someSelected = $derived(rows.some((row) => row.selected));

  function toggleAll() {
    const next = !allSelected;
    for (const row of rows) row.selected = next;
  }
</script>

<AppShell>
  {#snippet sidebar()}
    <Sidebar
      {groups}
      user={{ name: 'Ada Lovelace', initials: 'AL' }}
      onselect={() => {}}
      onsearch={() => {}}
    />
  {/snippet}

  <div class="view">
    <Header breadcrumb={['t128n', 'Design system', 'Table']}>
      {#snippet actions()}
        <IconButton icon={OverflowMenuVertical} label="Database actions" />
        <Button variant="primary">
          <Icon icon={Add} size={16} />
          New issue
        </Button>
      {/snippet}
    </Header>

    <Toolbar>
      {#snippet children()}
        <div class="view-tabs" role="tablist" aria-label="Database views">
          <button type="button" role="tab" class="view-tab" aria-selected="true">Table</button>
          <button type="button" role="tab" class="view-tab" aria-selected="false">Board</button>
          <button type="button" role="tab" class="view-tab" aria-selected="false">Gallery</button>
        </div>
        <span class="toolbar-divider" aria-hidden="true"></span>
        <span class="filters">
          <IconButton icon={Filter} label="Filter issues" />
          <Button variant="ghost" size="sm">
            Status
            <Icon icon={ChevronDown} size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            Assignee
            <Icon icon={ChevronDown} size={16} />
          </Button>
        </span>
      {/snippet}
      {#snippet actions()}
        <span class="search-wrap">
          <SearchField placeholder="Search issues" label="Search issues" shortcut="⌘K" />
        </span>
      {/snippet}
    </Toolbar>

    <div class="table-wrap">
      <table class="ds-table">
        <thead>
          <tr>
            <th scope="col" class="select-cell">
              <button
                type="button"
                class="check"
                role="checkbox"
                aria-checked={allSelected ? 'true' : someSelected ? 'mixed' : 'false'}
                aria-label="Select all issues"
                onclick={toggleAll}
              >
                {#if allSelected}
                  <Icon icon={Checkmark} size={14} />
                {:else if someSelected}
                  <span class="dash" aria-hidden="true"></span>
                {/if}
              </button>
            </th>
            <th scope="col">ID</th>
            <th scope="col">Status</th>
            <th scope="col">Title</th>
            <th scope="col">Labels</th>
            <th scope="col">Assignee</th>
            <th scope="col" aria-sort="descending">
              <button type="button" class="sort">
                Date
                <Icon icon={ArrowDown} size={12} />
              </button>
            </th>
            <th scope="col">Priority</th>
          </tr>
        </thead>
        <tbody>
          {#each rows as row (row.id)}
            <tr data-selected={row.selected}>
              <td class="select-cell">
                <button
                  type="button"
                  class="check"
                  role="checkbox"
                  aria-checked={row.selected}
                  aria-label={`Select ${row.id}`}
                  onclick={() => (row.selected = !row.selected)}
                >
                  {#if row.selected}<Icon icon={Checkmark} size={14} />{/if}
                </button>
              </td>
              <td><span class="ds-mono">{row.id}</span></td>
              <td>
                <span class="status">
                  <span class="glyph" data-status={row.status}>
                    <Icon icon={statusGlyph[row.status]} size={16} />
                  </span>
                  <span class="status-label">{row.status}</span>
                </span>
              </td>
              <td class="title-cell"><span class="ds-truncate">{row.title}</span></td>
              <td>
                <span class="labels">
                  {#each row.labels as label (label.label)}
                    <Tag label={label.label} tone={label.tone} />
                  {/each}
                </span>
              </td>
              <td>
                <span class="assignee">
                  <Avatar
                    initials={row.assignee.initials}
                    size="sm"
                    label={row.assignee.name}
                  />
                  <span class="ds-truncate">{row.assignee.name}</span>
                </span>
              </td>
              <td><time class="date" datetime={row.datetime}>{row.date}</time></td>
              <td>
                <span class="priority">
                  <Icon icon={priorityGlyph[row.priority]} size={16} />
                  {row.priority}
                </span>
              </td>
            </tr>
          {/each}
          <tr class="ds-table-new">
            <td colspan="8">
              <button type="button" class="new-button">
                <Icon icon={Add} size={16} />
                New issue
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <footer class="table-footer">
      <span class="ds-caption">{rows.length} issues</span>
      <span class="ds-caption">Sorted by date</span>
    </footer>
  </div>
</AppShell>

<style>
  .view {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
  }

  .view-tabs {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    height: var(--row-h);
  }

  .view-tab {
    height: 100%;
    padding: 0;
    border: 0;
    border-bottom: var(--ring-width) solid transparent;
    background: transparent;
    color: var(--text-2);
    font: var(--type-body);
    white-space: nowrap;
  }

  .view-tab:hover {
    color: var(--text-1);
  }

  .view-tab[aria-selected='true'] {
    border-bottom-color: var(--accent);
    color: var(--text-1);
    font: var(--type-action);
  }

  .toolbar-divider {
    width: 1px;
    height: var(--size-2);
    background: var(--border);
    flex: none;
  }

  .table-wrap {
    flex: 1;
    min-height: 0;
    overflow: auto;
  }

  .select-cell {
    width: 1%;
    padding-right: 0;
  }

  .check {
    display: grid;
    place-items: center;
    width: var(--icon);
    height: var(--icon);
    padding: 0;
    border: 1px solid var(--border-control);
    border-radius: var(--radius-xs);
    background: var(--surface-panel);
    color: var(--text-on-accent);
  }

  .check:hover {
    border-color: var(--border-strong);
  }

  .dash {
    width: var(--space-2);
    height: var(--radius-xs);
    border-radius: var(--radius-full);
    background: var(--text-on-accent);
  }

  .check[aria-checked='true'],
  .check[aria-checked='mixed'] {
    border-color: var(--accent);
    background: var(--accent);
  }

  .status,
  .assignee,
  .priority,
  .labels {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    min-width: 0;
  }

  .labels {
    gap: var(--space-1);
    overflow: hidden;
  }

  .glyph {
    display: flex;
    color: var(--text-3);
  }

  .glyph[data-status='In progress'] {
    color: var(--info);
  }

  .glyph[data-status='In review'] {
    color: var(--warning);
  }

  .glyph[data-status='Done'] {
    color: var(--success);
  }

  .status-label {
    color: var(--text-2);
    white-space: nowrap;
  }

  .title-cell {
    width: 38%;
    max-width: 0;
  }

  .assignee {
    gap: var(--space-2);
  }

  .assignee span:last-child {
    color: var(--text-2);
  }

  .date {
    color: var(--text-3);
    font: var(--type-caption);
    white-space: nowrap;
  }

  .priority {
    color: var(--text-2);
    white-space: nowrap;
  }

  .sort {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
  }

  .sort:hover {
    color: var(--text-1);
  }

  .new-button {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    height: 100%;
    width: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--text-3);
    font: var(--type-body);
    text-align: left;
  }

  .new-button:hover {
    color: var(--text-1);
  }

  .table-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: none;
    height: var(--row-h-sm);
    padding: 0 var(--page-inset);
    border-top: 1px solid var(--border);
    background: var(--surface-panel);
  }

  @container view (max-width: 760px) {
    .filters,
    .search-wrap {
      display: none;
    }

    .table-wrap :global(.ds-table) {
      min-width: calc(var(--width-reading) + var(--width-label));
    }
  }
</style>
