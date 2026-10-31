<script lang="ts">
  import type { Component } from 'svelte';
  import {
    Add,
    Calendar,
    CircleDash,
    CircleOutline,
    Filter,
    Folder,
    Grid,
    Idea,
    Email,
    OverflowMenuHorizontal,
    ProgressBarRound,
    Tag as TagIcon,
    User,
    UserMultiple,
    Flag,
  } from 'carbon-icons-svelte';
  import AppShell from '$lib/components/AppShell.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Header from '$lib/components/Header.svelte';
  import Toolbar from '$lib/components/Toolbar.svelte';
  import SegmentedControl from '$lib/components/SegmentedControl.svelte';
  import SearchField from '$lib/components/SearchField.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Avatar from '$lib/components/Avatar.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import Textarea from '$lib/components/Textarea.svelte';

  type StatusKey = 'in-progress' | 'todo' | 'backlog';

  interface Issue {
    id: string;
    title: string;
    labels: string[];
    initials: string;
    assignee: string;
    date: string;
    status: StatusKey;
    priority: 'High' | 'Medium' | 'Low';
    project: string;
    due: string;
    description: string;
  }

  interface Props {
    selectedId?: string;
  }

  let { selectedId = $bindable('DES-142') }: Props = $props();

  const navGroups = [
    {
      label: 'Work',
      items: [
        { label: 'Inbox', icon: Email },
        { label: 'My issues', icon: CircleOutline, active: true },
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

  const statusMeta: Record<
    StatusKey,
    { label: string; icon: Component<any>; tone: 'info' | 'neutral' }
  > = {
    'in-progress': { label: 'In progress', icon: ProgressBarRound, tone: 'info' },
    todo: { label: 'Todo', icon: CircleOutline, tone: 'neutral' },
    backlog: { label: 'Backlog', icon: CircleDash, tone: 'neutral' },
  };

  const allIssues: Issue[] = [
    {
      id: 'DES-142',
      title: 'Sync conflict resolution drops offline edits',
      labels: ['design-system', 'sync'],
      initials: 'AC',
      assignee: 'Avery Chen',
      date: 'Oct 24',
      status: 'in-progress',
      priority: 'High',
      project: 'Design system',
      due: 'Nov 4, 2026',
      description:
        'Two edits on the same record can collide when a client reconnects. The resolver keeps the server version and silently discards the queued offline change. The fix needs a deterministic merge and an inline conflict notice that lets the author recover the lost draft.',
    },
    {
      id: 'DES-137',
      title: 'Focus ring disappears in nested dialogs',
      labels: ['a11y'],
      initials: 'MR',
      assignee: 'Marcus Reed',
      date: 'Oct 23',
      status: 'in-progress',
      priority: 'High',
      project: 'Design system',
      due: 'Nov 1, 2026',
      description:
        "The dialog's focus trap clears the ring when focus moves between composite controls. Keyboard users lose their place after the first tab stop.",
    },
    {
      id: 'DES-129',
      title: 'Sidebar count alignment drifts at compact density',
      labels: ['layout'],
      initials: 'PN',
      assignee: 'Priya Nair',
      date: 'Oct 21',
      status: 'in-progress',
      priority: 'Medium',
      project: 'Design system',
      due: 'Oct 30, 2026',
      description:
        'At compact density the count sits a few pixels above the label baseline. The row should align to the center of the control height at every density.',
    },
    {
      id: 'DES-124',
      title: 'Document tint tokens in Foundations',
      labels: ['docs'],
      initials: 'SL',
      assignee: 'Sofia Lind',
      date: 'Oct 20',
      status: 'in-progress',
      priority: 'Low',
      project: 'Design system',
      due: 'Nov 8, 2026',
      description:
        'The tint knobs are undocumented. Add examples for weak, default and strong fills and note when each applies.',
    },
    {
      id: 'DES-118',
      title: 'Table row hover conflicts with selection',
      labels: ['table'],
      initials: 'JW',
      assignee: 'Jonas Weber',
      date: 'Oct 18',
      status: 'in-progress',
      priority: 'Medium',
      project: 'Design system',
      due: 'Nov 6, 2026',
      description:
        'Hovering a selected row overrides the selection tint. Selection should win; hover only applies to unselected rows.',
    },
    {
      id: 'DES-115',
      title: 'Add keyboard path to the filter toolbar',
      labels: ['a11y'],
      initials: 'AC',
      assignee: 'Avery Chen',
      date: 'Oct 24',
      status: 'todo',
      priority: 'Medium',
      project: 'Design system',
      due: 'Nov 5, 2026',
      description:
        'The filter controls are pointer-only. Add arrow-key traversal and a visible focus order from filters to search.',
    },
    {
      id: 'DES-108',
      title: 'Empty state copy across data views',
      labels: ['content'],
      initials: 'MR',
      assignee: 'Marcus Reed',
      date: 'Oct 22',
      status: 'todo',
      priority: 'Low',
      project: 'Design system',
      due: 'Nov 12, 2026',
      description:
        'Each view names what is missing in a different voice. Standardize the sentence shape and the next action.',
    },
    {
      id: 'DES-102',
      title: 'Dark theme audit for status glyphs',
      labels: ['theming'],
      initials: 'PN',
      assignee: 'Priya Nair',
      date: 'Oct 19',
      status: 'todo',
      priority: 'High',
      project: 'Design system',
      due: 'Oct 29, 2026',
      description:
        'Check every status glyph against panel and sunken surfaces in dark mode. Warning is the likely outlier.',
    },
    {
      id: 'DES-096',
      title: 'Replace hard-coded spacing in cards',
      labels: ['tokens'],
      initials: 'SL',
      assignee: 'Sofia Lind',
      date: 'Oct 17',
      status: 'todo',
      priority: 'Low',
      project: 'Design system',
      due: 'Nov 14, 2026',
      description:
        'Card padding still uses literal values in three components. Move them to space tokens so density changes apply.',
    },
    {
      id: 'DES-091',
      title: 'Tag contrast fails on sunken surfaces',
      labels: ['a11y'],
      initials: 'JW',
      assignee: 'Jonas Weber',
      date: 'Oct 15',
      status: 'todo',
      priority: 'High',
      project: 'Design system',
      due: 'Nov 2, 2026',
      description:
        'Tag text at the 75% mix loses contrast on sunken fills. Re-measure the violet and yellow pairs before the next release.',
    },
    {
      id: 'DES-088',
      title: 'Storybook controls for every primitive',
      labels: ['tooling'],
      initials: 'AC',
      assignee: 'Avery Chen',
      date: 'Oct 12',
      status: 'backlog',
      priority: 'Low',
      project: 'Design system',
      due: 'Q1 2027',
      description:
        "Some primitives expose props without controls. Generate the controls table from the component's prop types.",
    },
    {
      id: 'DES-083',
      title: 'Persist density choice per workspace',
      labels: ['settings'],
      initials: 'MR',
      assignee: 'Marcus Reed',
      date: 'Oct 10',
      status: 'backlog',
      priority: 'Medium',
      project: 'Design system',
      due: 'Q1 2027',
      description:
        'Density resets on reload. Store the container attribute with the workspace preference.',
    },
    {
      id: 'DES-079',
      title: 'Reduce motion in the command palette',
      labels: ['motion'],
      initials: 'PN',
      assignee: 'Priya Nair',
      date: 'Oct 8',
      status: 'backlog',
      priority: 'Low',
      project: 'Design system',
      due: 'Q1 2027',
      description:
        'The palette fades even when reduced motion is requested. Honor the media query before the first frame.',
    },
    {
      id: 'DES-072',
      title: 'Mobile breakpoint for settings nav',
      labels: ['responsive'],
      initials: 'SL',
      assignee: 'Sofia Lind',
      date: 'Oct 6',
      status: 'backlog',
      priority: 'Medium',
      project: 'Design system',
      due: 'Q2 2027',
      description:
        'Below 760px the section nav wraps above the content. It should collapse into a select.',
    },
    {
      id: 'DES-064',
      title: 'Print styles for the document view',
      labels: ['print'],
      initials: 'JW',
      assignee: 'Jonas Weber',
      date: 'Oct 2',
      status: 'backlog',
      priority: 'Low',
      project: 'Design system',
      due: 'Q2 2027',
      description:
        'The reading column prints with the sidebar and page chrome. Add a print sheet that keeps only the document.',
    },
  ];

  const groups = [
    { key: 'in-progress' as StatusKey, label: 'In progress', total: 12 },
    { key: 'todo' as StatusKey, label: 'Todo', total: 8 },
    { key: 'backlog' as StatusKey, label: 'Backlog', total: 24 },
  ].map((group) => ({
    ...group,
    issues: allIssues.filter((issue) => issue.status === group.key),
  }));

  const filterOptions = [
    { value: 'all', label: 'All', count: 44 },
    { value: 'active', label: 'Active', count: 20 },
    { value: 'backlog', label: 'Backlog', count: 24 },
  ];

  let filter = $state('all');
  let query = $state('');
  let comment = $state('');

  const selected = $derived(
    allIssues.find((issue) => issue.id === selectedId) ?? allIssues[0],
  );

  const visibleGroups = $derived.by(() => {
    const term = query.trim().toLowerCase();
    return groups
      .filter(
        (group) =>
          filter === 'all' ||
          (filter === 'active' ? group.key !== 'backlog' : group.key === 'backlog'),
      )
      .map((group) => ({
        ...group,
        issues: group.issues.filter(
          (issue) =>
            !term ||
            issue.title.toLowerCase().includes(term) ||
            issue.id.toLowerCase().includes(term),
        ),
      }))
      .filter((group) => group.issues.length > 0);
  });

  function toneFor(label: string): 'blue' | 'violet' | 'neutral' {
    if (label === 'design-system' || label === 'sync') return 'blue';
    if (label === 'a11y' || label === 'theming') return 'violet';
    return 'neutral';
  }
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
    <Header breadcrumb={['t128n', 'Design system', 'Issues']} id={selected.id}>
      {#snippet actions()}
        <IconButton icon={Filter} label="Filter issues" />
        <IconButton icon={OverflowMenuHorizontal} label="More issue actions" />
        <Button variant="primary">
          <Icon icon={Add} size={16} />
          New issue
        </Button>
      {/snippet}
    </Header>

    <Toolbar>
      {#snippet filters()}
        <div class="segmented">
          <SegmentedControl
            options={filterOptions}
            bind:value={filter}
            label="Issue filter"
          />
        </div>
      {/snippet}
      {#snippet actions()}
        <div class="search-wrap">
          <SearchField
            label="Search issues"
            placeholder="Search issues"
            shortcut="⌘K"
            bind:value={query}
          />
        </div>
      {/snippet}
    </Toolbar>

    <div class="ds-split">
      <div class="list-pane">
        <div class="ds-list">
          {#each visibleGroups as group (group.key)}
            <div class="ds-list-group">
              <span class="status" data-tone={statusMeta[group.key].tone}>
                <Icon icon={statusMeta[group.key].icon} size={16} />
              </span>
              <span>{group.label}</span>
              <span class="group-count">{group.total}</span>
            </div>
            {#each group.issues as issue (issue.id)}
              <button
                type="button"
                class="ds-list-row issue-row"
                data-selected={selectedId === issue.id}
                aria-current={selectedId === issue.id ? 'true' : undefined}
                onclick={() => (selectedId = issue.id)}
              >
                <span class="ds-mono">{issue.id}</span>
                <span class="status" data-tone={statusMeta[issue.status].tone}>
                  <Icon icon={statusMeta[issue.status].icon} size={16} />
                </span>
                <span class="ds-row-title">{issue.title}</span>
                <span class="row-label">{issue.labels[0]}</span>
                <span class="row-avatar"><Avatar initials={issue.initials} size="sm" label={issue.assignee} /></span>
                <span class="row-date">{issue.date}</span>
              </button>
            {/each}
          {/each}
          {#if visibleGroups.length === 0}
            <p class="list-empty">No issues match “{query}”.</p>
          {/if}
        </div>
      </div>

      <aside class="ds-detail" aria-label="Issue detail">
        <div class="detail-top">
          <span class="status" data-tone={statusMeta[selected.status].tone}>
            <Icon icon={statusMeta[selected.status].icon} size={16} />
          </span>
          <span class="detail-status">{statusMeta[selected.status].label}</span>
          <span class="ds-mono">{selected.id}</span>
        </div>

        <h2 class="detail-title">{selected.title}</h2>
        <p class="detail-description">{selected.description}</p>

        <div class="ds-properties">
          <div class="ds-property-row">
            <span class="ds-property-label">
              <Icon icon={ProgressBarRound} size={16} />
              Status
            </span>
            <span class="ds-property-value">
              <span class="status" data-tone={statusMeta[selected.status].tone}>
                <Icon icon={statusMeta[selected.status].icon} size={16} />
              </span>
              {statusMeta[selected.status].label}
            </span>
          </div>
          <div class="ds-property-row">
            <span class="ds-property-label">
              <Icon icon={Flag} size={16} />
              Priority
            </span>
            <span class="ds-property-value">{selected.priority}</span>
          </div>
          <div class="ds-property-row">
            <span class="ds-property-label">
              <Icon icon={User} size={16} />
              Assignee
            </span>
            <span class="ds-property-value">
              <Avatar initials={selected.initials} size="xs" label={selected.assignee} />
              {selected.assignee}
            </span>
          </div>
          <div class="ds-property-row">
            <span class="ds-property-label">
              <Icon icon={TagIcon} size={16} />
              Labels
            </span>
            <span class="ds-property-value">
              {#each selected.labels as label (label)}
                <Tag {label} tone={toneFor(label)} />
              {/each}
            </span>
          </div>
          <div class="ds-property-row">
            <span class="ds-property-label">
              <Icon icon={Folder} size={16} />
              Project
            </span>
            <span class="ds-property-value">{selected.project}</span>
          </div>
          <div class="ds-property-row">
            <span class="ds-property-label">
              <Icon icon={Calendar} size={16} />
              Due date
            </span>
            <span class="ds-property-value">{selected.due}</span>
          </div>
        </div>

        <div class="comment">
          <Textarea
            label="Comment"
            placeholder="Leave a comment…"
            rows={3}
            bind:value={comment}
          />
          <div class="comment-actions">
            <Button variant="primary" disabled={comment.trim().length === 0}>
              Comment
            </Button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</AppShell>

<style>
  .view {
    height: 100%;
    min-height: 0;
  }

  .search-wrap {
    width: calc(var(--width-label) * 2);
    max-width: 100%;
  }

  .segmented :global(.track) {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    height: var(--control-h);
    padding: calc(var(--space-1) / 2);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
  }

  .list-pane {
    min-height: 0;
    overflow: auto;
  }

  .issue-row {
    width: 100%;
    grid-template-columns:
      calc(var(--size-5) + var(--size-1)) var(--size-1) minmax(0, 1fr)
      var(--width-label) var(--size-3) calc(var(--space-6) * 2);
    border: 0;
    background: transparent;
    text-align: left;
    cursor: pointer;
  }

  .issue-row:hover {
    background: var(--state-hover);
  }

  .issue-row[data-selected='true'] {
    background: var(--state-selected);
  }

  .status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--text-3);
  }

  .status[data-tone='info'] {
    color: var(--info);
  }

  .group-count {
    font: var(--type-caption);
    color: var(--text-3);
  }

  .row-label {
    overflow: hidden;
    font: var(--type-caption);
    color: var(--text-3);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .row-date {
    font: var(--type-caption);
    color: var(--text-3);
    text-align: right;
    white-space: nowrap;
  }

  .list-empty {
    padding: var(--space-6) var(--space-4);
    font: var(--type-body);
    color: var(--text-3);
    text-align: center;
  }

  .detail-top {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .detail-status {
    font: var(--type-label);
    color: var(--text-2);
  }

  .detail-top .ds-mono {
    margin-left: auto;
  }

  .detail-title {
    font: var(--type-title);
    color: var(--text-1);
  }

  .detail-description {
    font: var(--type-prose);
    color: var(--text-1);
  }

  .comment {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin-top: auto;
    padding-top: var(--space-4);
    border-top: 1px solid var(--border);
  }

  .comment-actions {
    display: flex;
    justify-content: flex-end;
  }

  @container view (max-width: 900px) {
    .search-wrap {
      width: calc(var(--width-label) + var(--space-5));
    }
  }

  @container view (max-width: 760px) {
    .search-wrap {
      display: none;
    }

    .issue-row {
      grid-template-columns: calc(var(--size-5) + var(--size-1)) var(--size-1) minmax(0, 1fr);
    }

    .row-label,
    .row-avatar,
    .row-date {
      display: none;
    }
  }
</style>
