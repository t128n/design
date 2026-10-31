<script lang="ts">
  import {
    ArrowDown,
    ArrowUp,
    Calendar,
    Dashboard,
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
  import SegmentedControl from '$lib/components/SegmentedControl.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';

  interface Stat {
    label: string;
    value: string;
    delta: string;
    direction: 'up' | 'down';
    trend: 'positive' | 'negative';
    note: string;
  }

  interface Activity {
    initials: string;
    who: string;
    verb: string;
    issue?: string;
    after: string;
    when: string;
  }

  interface Project {
    name: string;
    lead: { name: string; initials: string };
    issues: number;
    progress: number;
    target: string;
  }

  let range = $state('30d');

  const groups = [
    {
      label: 'Workspace',
      items: [
        { label: 'Overview', icon: Dashboard, active: true },
        { label: 'Inbox', icon: Notification, count: 4 },
        { label: 'My issues', icon: Task },
        { label: 'Board', icon: View },
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

  const stats: Stat[] = [
    {
      label: 'Open issues',
      value: '24',
      delta: '3 more',
      direction: 'up',
      trend: 'negative',
      note: 'vs 21',
    },
    {
      label: 'Completed',
      value: '142',
      delta: '18 more',
      direction: 'up',
      trend: 'positive',
      note: 'vs 124',
    },
    {
      label: 'Cycle time',
      value: '2.4d',
      delta: '0.3d faster',
      direction: 'down',
      trend: 'positive',
      note: 'vs 2.7d',
    },
    {
      label: 'Active projects',
      value: '6',
      delta: '1 more',
      direction: 'up',
      trend: 'positive',
      note: 'vs 5',
    },
  ];

  const chartValues = [6, 9, 7, 11, 8, 13, 10, 12, 9, 14, 11, 15, 13, 18];
  const chartMax = Math.max(...chartValues);
  const chartSlot = 100 / chartValues.length;
  const chartBarWidth = chartSlot * 0.64;

  const activityGroups: { label: string; items: Activity[] }[] = [
    {
      label: 'Today',
      items: [
        {
          initials: 'AL',
          who: 'Ada Lovelace',
          verb: 'moved',
          issue: 'T128-263',
          after: 'to In progress',
          when: '2h',
        },
        {
          initials: 'MK',
          who: 'Marcus Kim',
          verb: 'closed',
          issue: 'T128-241',
          after: 'as completed',
          when: '4h',
        },
        {
          initials: 'JS',
          who: 'Jun Seo',
          verb: 'opened',
          issue: 'T128-271',
          after: 'in Design system',
          when: '6h',
        },
      ],
    },
    {
      label: 'Yesterday',
      items: [
        {
          initials: 'RB',
          who: 'Rina Bell',
          verb: 'commented on',
          issue: 'T128-229',
          after: '',
          when: '1d',
        },
        {
          initials: 'AL',
          who: 'Ada Lovelace',
          verb: 'updated',
          after: 'the Tokens board',
          when: '1d',
        },
        {
          initials: 'MK',
          who: 'Marcus Kim',
          verb: 'created project',
          after: 'Mobile app',
          when: '1d',
        },
        {
          initials: 'JS',
          who: 'Jun Seo',
          verb: 'merged 3 issues into',
          issue: 'T128-190',
          after: '',
          when: '1d',
        },
      ],
    },
  ];

  const projects: Project[] = [
    {
      name: 'Design system',
      lead: { name: 'Ada Lovelace', initials: 'AL' },
      issues: 24,
      progress: 78,
      target: 'Nov 14',
    },
    {
      name: 'Marketing site',
      lead: { name: 'Rina Bell', initials: 'RB' },
      issues: 12,
      progress: 42,
      target: 'Nov 28',
    },
    {
      name: 'Mobile app',
      lead: { name: 'Marcus Kim', initials: 'MK' },
      issues: 18,
      progress: 63,
      target: 'Dec 5',
    },
    {
      name: 'Docs portal',
      lead: { name: 'Jun Seo', initials: 'JS' },
      issues: 7,
      progress: 91,
      target: 'Nov 7',
    },
    {
      name: 'Design tokens',
      lead: { name: 'Ada Lovelace', initials: 'AL' },
      issues: 31,
      progress: 34,
      target: 'Dec 19',
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
    <Header breadcrumb={['t128n', 'Design system', 'Overview']}>
      {#snippet actions()}
        <span class="range-header">
          <SegmentedControl
            bind:value={range}
            label="Date range"
            options={[
              { value: '7d', label: '7 days' },
              { value: '30d', label: '30 days' },
              { value: 'quarter', label: 'Quarter' },
            ]}
          />
        </span>
      {/snippet}
    </Header>

    <div class="overview">
      <div class="range-mobile">
        <SegmentedControl
          bind:value={range}
          label="Date range"
          options={[
            { value: '7d', label: '7 days' },
            { value: '30d', label: '30 days' },
            { value: 'quarter', label: 'Quarter' },
          ]}
        />
      </div>
      <section class="stats" aria-label="Summary">
        {#each stats as stat (stat.label)}
          <article class="stat">
            <p class="stat-label">{stat.label}</p>
            <p class="stat-value">{stat.value}</p>
            <p class="stat-delta" data-trend={stat.trend}>
              <span class="delta">
                <Icon icon={stat.direction === 'up' ? ArrowUp : ArrowDown} size={16} />
                {stat.delta}
              </span>
              <span class="stat-note">{stat.note}</span>
            </p>
          </article>
        {/each}
      </section>

      <div class="mid">
        <section class="panel chart-panel" aria-labelledby="chart-title">
          <header class="panel-head">
            <div class="panel-copy">
              <h2 id="chart-title" class="panel-title">Issues completed</h2>
              <p class="ds-caption">Last 30 days · 142 total</p>
            </div>
            <span class="ds-caption">Peak 18 · Oct 28</span>
          </header>
          <div class="chart-area">
            <svg
              class="chart"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              role="img"
              aria-label="Issues completed per day over the last 30 days, rising from 6 to a peak of 18"
            >
              {#each chartValues as value, index}
                <rect
                  class:bar-last={index === chartValues.length - 1}
                  class="bar"
                  x={index * chartSlot + (chartSlot - chartBarWidth) / 2}
                  y={100 - (value / chartMax) * 100}
                  width={chartBarWidth}
                  height={(value / chartMax) * 100}
                ></rect>
              {/each}
            </svg>
          </div>
          <div class="chart-axis">
            <span>Oct 1</span>
            <span>Oct 15</span>
            <span>Oct 28</span>
          </div>
        </section>

        <section class="panel activity-panel" aria-labelledby="activity-title">
          <header class="panel-head">
            <h2 id="activity-title" class="panel-title">Recent activity</h2>
            <Button variant="ghost" size="sm">View all</Button>
          </header>
          <div class="activity-body">
            {#each activityGroups as group (group.label)}
              <p class="activity-group">{group.label}</p>
              {#each group.items as item (item.who + item.verb + item.after)}
                <div class="activity-row">
                  <Avatar initials={item.initials} size="sm" label={item.who} />
                  <p class="activity-text">
                    <span class="who">{item.who}</span>
                    {item.verb}
                    {#if item.issue}<span class="ds-mono">{item.issue}</span>{/if}
                    {item.after}
                  </p>
                  <span class="activity-when">{item.when}</span>
                </div>
              {/each}
            {/each}
          </div>
        </section>
      </div>

      <section class="projects" aria-labelledby="projects-title">
        <header class="section-head">
          <h2 id="projects-title" class="panel-title">Projects</h2>
          <Button variant="ghost" size="sm">All projects</Button>
        </header>
        <table class="ds-table">
          <thead>
            <tr>
              <th scope="col">Project</th>
              <th scope="col">Lead</th>
              <th scope="col">Issues</th>
              <th scope="col" class="progress-cell">Progress</th>
              <th scope="col" class="target-cell">Target</th>
            </tr>
          </thead>
          <tbody>
            {#each projects as project (project.name)}
              <tr>
                <td class="project-name">{project.name}</td>
                <td>
                  <span class="lead">
                    <Avatar
                      initials={project.lead.initials}
                      size="sm"
                      label={project.lead.name}
                    />
                    <span class="ds-truncate">{project.lead.name}</span>
                  </span>
                </td>
                <td><span class="issue-count">{project.issues}</span></td>
                <td class="progress-cell">
                  <div class="progress">
                    <span class="progress-track" aria-hidden="true">
                      <span class="progress-fill" style:width={`${project.progress}%`}></span>
                    </span>
                    <span class="progress-value">{project.progress}%</span>
                  </div>
                </td>
                <td class="target-cell"><span class="target">{project.target}</span></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </section>
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

  .overview {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--space-5);
    min-height: 0;
    overflow: auto;
    padding: var(--space-5);
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--space-4);
    flex: none;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
  }

  .stat-label {
    font: var(--type-caption);
    color: var(--text-3);
  }

  .stat-value {
    font: var(--type-title);
    color: var(--text-1);
  }

  .stat-delta {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
    font: var(--type-caption);
  }

  .delta {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    white-space: nowrap;
  }

  .stat-delta[data-trend='positive'] .delta {
    color: var(--success);
  }

  .stat-delta[data-trend='negative'] .delta {
    color: var(--danger);
  }

  .stat-note {
    color: var(--text-3);
    white-space: nowrap;
  }

  .mid {
    display: grid;
    grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
    gap: var(--space-5);
    flex: 1;
    min-height: calc(var(--size-5) * 5);
  }

  .panel {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    min-height: 0;
    padding: var(--space-4);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
  }

  .panel-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-3);
    flex: none;
  }

  .panel-copy {
    display: flex;
    flex-direction: column;
    gap: 0;
    min-width: 0;
  }

  .panel-title {
    font: var(--type-heading);
    color: var(--text-1);
  }

  .chart-area {
    display: flex;
    flex: 1;
    min-height: calc(var(--size-5) * 3);
  }

  .chart {
    display: block;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid var(--border);
    overflow: visible;
  }

  .bar {
    fill: color-mix(in srgb, var(--accent) var(--tint-strong), var(--surface-panel));
  }

  .bar-last {
    fill: var(--accent);
  }

  .chart-axis {
    display: flex;
    justify-content: space-between;
    flex: none;
    font: var(--type-caption);
    color: var(--text-3);
  }

  .activity-panel {
    gap: var(--space-2);
  }

  .activity-body {
    flex: 1;
    min-height: 0;
    overflow: auto;
  }

  .activity-group {
    display: flex;
    align-items: center;
    height: var(--row-h-sm);
    padding: 0 var(--space-2);
    font: var(--type-label);
    color: var(--text-3);
  }

  .activity-row {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--row-h);
    padding: 0 var(--space-2);
    border-radius: var(--radius-md);
  }

  .activity-row:hover {
    background: var(--state-hover);
  }

  .activity-text {
    font: var(--type-body);
    color: var(--text-2);
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .who {
    font: var(--type-action);
    color: var(--text-1);
  }

  .activity-when {
    font: var(--type-caption);
    color: var(--text-3);
    white-space: nowrap;
  }

  .projects {
    display: flex;
    flex-direction: column;
    flex: none;
  }

  .section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    height: var(--row-h-sm);
  }

  .project-name {
    font: var(--type-action);
    color: var(--text-1);
  }

  .lead {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    max-width: calc(var(--width-label) * 1.25);
    color: var(--text-2);
  }

  .issue-count {
    color: var(--text-2);
  }

  .progress-cell {
    width: 30%;
  }

  .progress {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .progress-track {
    display: block;
    flex: 1;
    min-width: calc(var(--width-label) / 2);
    height: var(--space-1);
    border-radius: var(--radius-full);
    background: var(--surface-subtle);
    overflow: hidden;
  }

  .progress-fill {
    display: block;
    height: 100%;
    border-radius: var(--radius-full);
    background: var(--accent);
  }

  .progress-value {
    width: var(--size-4);
    font: var(--type-caption);
    color: var(--text-3);
    text-align: right;
    flex: none;
  }

  .target-cell {
    width: 1%;
    white-space: nowrap;
  }

  .target {
    font: var(--type-caption);
    color: var(--text-3);
  }
  .range-mobile {
    display: none;
  }

  @container view (max-width: 1060px) {
    .stats {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .mid {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @container view (max-width: 760px) {
    .overview {
      padding: var(--space-3);
      gap: var(--space-4);
    }

    .range-header {
      display: none;
    }

    .range-mobile {
      display: flex;
    }

    .projects th:nth-child(2),
    .projects td:nth-child(2),
    .projects th:nth-child(5),
    .projects td:nth-child(5) {
      display: none;
    }
  }
</style>
