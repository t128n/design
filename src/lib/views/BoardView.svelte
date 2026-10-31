<script lang="ts">
  import {
    Add,
    Calendar,
    Dashboard,
    Filter,
    Folder,
    Notification,
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
  import SegmentedControl from '$lib/components/SegmentedControl.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import Toolbar from '$lib/components/Toolbar.svelte';

  type Tone = 'neutral' | 'blue' | 'green' | 'yellow' | 'red' | 'violet';

  interface BoardCard {
    id: string;
    title: string;
    tag: { label: string; tone: Tone };
    initials: string;
    owner: string;
  }

  interface BoardColumn {
    name: string;
    cards: BoardCard[];
  }

  let boardView = $state('board');

  const groups = [
    {
      label: 'Workspace',
      items: [
        { label: 'Overview', icon: Dashboard },
        { label: 'Inbox', icon: Notification, count: 4 },
        { label: 'My issues', icon: Task },
        { label: 'Board', icon: View, active: true },
        { label: 'Table', icon: Table },
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

  const columns: BoardColumn[] = [
    {
      name: 'Backlog',
      cards: [
        {
          id: 'T128-241',
          title: 'Define density tokens for compact mode',
          tag: { label: 'Design system', tone: 'blue' },
          initials: 'MK',
          owner: 'Marcus Kim',
        },
        {
          id: 'T128-238',
          title: 'Audit focus states across overlays',
          tag: { label: 'Accessibility', tone: 'violet' },
          initials: 'JS',
          owner: 'Jun Seo',
        },
        {
          id: 'T128-235',
          title: 'Document line mode behaviour',
          tag: { label: 'Docs', tone: 'neutral' },
          initials: 'AL',
          owner: 'Ada Lovelace',
        },
        {
          id: 'T128-229',
          title: 'Empty workspace illustration',
          tag: { label: 'Design', tone: 'green' },
          initials: 'RB',
          owner: 'Rina Bell',
        },
      ],
    },
    {
      name: 'Todo',
      cards: [
        {
          id: 'T128-256',
          title: 'Sidebar workspace switcher',
          tag: { label: 'Navigation', tone: 'blue' },
          initials: 'AL',
          owner: 'Ada Lovelace',
        },
        {
          id: 'T128-252',
          title: 'Keyboard path for board columns',
          tag: { label: 'Accessibility', tone: 'violet' },
          initials: 'MK',
          owner: 'Marcus Kim',
        },
        {
          id: 'T128-249',
          title: 'Tag palette contrast pass',
          tag: { label: 'Tokens', tone: 'yellow' },
          initials: 'JS',
          owner: 'Jun Seo',
        },
      ],
    },
    {
      name: 'In progress',
      cards: [
        {
          id: 'T128-263',
          title: 'Table density: 32 / 36 / 44',
          tag: { label: 'Data', tone: 'blue' },
          initials: 'JS',
          owner: 'Jun Seo',
        },
        {
          id: 'T128-260',
          title: 'Command palette grouping',
          tag: { label: 'Interaction', tone: 'violet' },
          initials: 'AL',
          owner: 'Ada Lovelace',
        },
        {
          id: 'T128-257',
          title: 'Banner component',
          tag: { label: 'Feedback', tone: 'green' },
          initials: 'RB',
          owner: 'Rina Bell',
        },
        {
          id: 'T128-255',
          title: 'Chart baseline rules',
          tag: { label: 'Data', tone: 'blue' },
          initials: 'MK',
          owner: 'Marcus Kim',
        },
      ],
    },
    {
      name: 'In review',
      cards: [
        {
          id: 'T128-268',
          title: 'Header anatomy audit',
          tag: { label: 'Layout', tone: 'blue' },
          initials: 'MK',
          owner: 'Marcus Kim',
        },
        {
          id: 'T128-266',
          title: 'Avatar size ladder',
          tag: { label: 'Data', tone: 'green' },
          initials: 'JS',
          owner: 'Jun Seo',
        },
        {
          id: 'T128-264',
          title: 'Progress and switch states',
          tag: { label: 'Controls', tone: 'yellow' },
          initials: 'AL',
          owner: 'Ada Lovelace',
        },
      ],
    },
    {
      name: 'Done',
      cards: [
        {
          id: 'T128-201',
          title: 'Token naming grammar',
          tag: { label: 'Tokens', tone: 'neutral' },
          initials: 'AL',
          owner: 'Ada Lovelace',
        },
        {
          id: 'T128-198',
          title: 'Primitive line mode',
          tag: { label: 'Tokens', tone: 'blue' },
          initials: 'MK',
          owner: 'Marcus Kim',
        },
        {
          id: 'T128-190',
          title: 'Base type roles',
          tag: { label: 'Type', tone: 'green' },
          initials: 'RB',
          owner: 'Rina Bell',
        },
      ],
    },
  ];
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
    <Header breadcrumb={['t128n', 'Design system', 'Board']}>
      {#snippet actions()}
        <IconButton icon={Filter} label="Filter issues" />
        <Button variant="primary">
          <Icon icon={Add} size={16} />
          New issue
        </Button>
      {/snippet}
    </Header>

    <Toolbar>
      {#snippet children()}
        <SegmentedControl
          bind:value={boardView}
          label="Board view"
          options={[
            { value: 'board', label: 'Board' },
            { value: 'table', label: 'Table' },
            { value: 'calendar', label: 'Calendar' },
          ]}
        />
      {/snippet}
      {#snippet actions()}
        <SearchField placeholder="Search issues" label="Search issues" shortcut="⌘K" />
      {/snippet}
    </Toolbar>

    <div class="board ds-board">
      {#each columns as column (column.name)}
        <section class="ds-board-column" aria-label={`${column.name}, ${column.cards.length} issues`}>
          <header class="ds-board-column-header">
            <span class="column-name">{column.name}</span>
            <span class="column-count">{column.cards.length}</span>
          </header>

          {#each column.cards as card (card.id)}
            <article class="ds-card issue-card">
              <h3 class="ds-card-title">{card.title}</h3>
              <div class="ds-card-meta">
                <span class="ds-mono card-id">{card.id}</span>
                <span class="card-tag"><Tag label={card.tag.label} tone={card.tag.tone} /></span>
                <span class="card-owner">
                  <Avatar initials={card.initials} size="sm" label={card.owner} />
                </span>
              </div>
            </article>
          {/each}
        </section>
      {/each}
    </div>
  </div>
</AppShell>

<style>
  .view {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
  }

  .ds-board.board {
    flex: 1;
    min-height: 0;
    overflow: auto;
    align-content: flex-start;
  }

  .column-name {
    color: var(--text-2);
  }

  .column-count {
    color: var(--text-3);
    font: var(--type-caption);
  }

  .issue-card {
    cursor: default;
  }

  .card-tag {
    display: flex;
    min-width: 0;
  }

  .card-owner {
    display: flex;
    margin-left: auto;
    flex: none;
  }
</style>
