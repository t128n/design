<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Alert, AppShell, Badge, Button, PageHeader, Sidebar, Table } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Views/Dashboard',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } }
  });

  const sections = [
    {
      label: 'Workspace',
      items: [
        { label: 'Overview', active: true },
        { label: 'Projects', badge: '12' },
        { label: 'Activity' },
        { label: 'Reports' }
      ]
    },
    {
      label: 'Account',
      items: [{ label: 'Preferences' }, { label: 'Members' }]
    }
  ];

  const columns = [
    { label: 'Project' },
    { label: 'Owner' },
    { label: 'Updated', align: 'right' as const },
    { label: 'Status' }
  ];
</script>

{#snippet sidebarHeader()}
  <div class="brand">
    <span class="brand-name">Stellar</span>
    <span class="brand-workspace">Orbit team</span>
  </div>
{/snippet}

{#snippet sidebar()}
  <Sidebar
    {sections}
    header={sidebarHeader}
    label="Workspace"
    toggleLabel="Workspace"
  />
{/snippet}

{#snippet headerActions()}
  <Button variant="secondary">Export</Button>
  <Button>New project</Button>
{/snippet}

<Story name="Dashboard">
  <div class="dashboard">
    <AppShell {sidebar}>
      <PageHeader
        title="Overview"
        description="What changed, what needs attention, and who owns the next step."
        actions={headerActions}
      />
      <div class="stack">
        <Alert tone="warning" title="Two projects need an owner">
          Assign an owner to Beacon and Cinder before the review on Friday.
        </Alert>
        <div class="metrics">
          <div class="metric">
            <span class="metric-label">Active projects</span>
            <strong class="metric-value">12</strong>
            <Badge tone="success">+2 this week</Badge>
          </div>
          <div class="metric">
            <span class="metric-label">Needs review</span>
            <strong class="metric-value">3</strong>
            <Badge tone="warning">Due Friday</Badge>
          </div>
          <div class="metric">
            <span class="metric-label">Archived this quarter</span>
            <strong class="metric-value">28</strong>
            <Badge tone="neutral">No action needed</Badge>
          </div>
        </div>
        <section class="recent" aria-labelledby="recent-heading">
          <div class="section-heading">
            <div class="section-copy">
              <h2 id="recent-heading">Recent projects</h2>
              <p>Ownership, status, and the latest update for each project.</p>
            </div>
            <div class="section-actions">
              <Button variant="secondary">View all</Button>
            </div>
          </div>
          <Table {columns}>
            <tr>
              <td>Orbit</td>
              <td>Mara Chen</td>
              <td class="u-right">2 minutes ago · 10:42</td>
              <td><Badge tone="success">Healthy</Badge></td>
            </tr>
            <tr>
              <td>Atlas</td>
              <td>Devon Ruiz</td>
              <td class="u-right">18 minutes ago · 10:26</td>
              <td><Badge tone="progress">In progress</Badge></td>
            </tr>
            <tr>
              <td>Beacon</td>
              <td>No owner</td>
              <td class="u-right">Yesterday · 16:10</td>
              <td><Badge tone="warning">Needs owner</Badge></td>
            </tr>
            <tr>
              <td>Cinder</td>
              <td>Priya Shah</td>
              <td class="u-right">2 days ago · 09:05</td>
              <td><Badge tone="disabled">Archived</Badge></td>
            </tr>
          </Table>
        </section>
      </div>
    </AppShell>
  </div>
</Story>

<style>
  .dashboard {
    background: var(--color-workspace);
  }

  .brand {
    display: grid;
    gap: 2px;
  }

  .brand-name {
    color: var(--color-text-primary);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-label);
  }

  .brand-workspace {
    color: var(--color-text-muted);
    font-size: var(--font-size-caption);
    line-height: var(--line-height-caption);
  }

  .stack {
    display: grid;
    gap: var(--space-2xl);
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: var(--space-xl);
  }

  .metric {
    display: grid;
    justify-items: start;
    gap: var(--space-xs);
  }

  .metric-label {
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .metric-value {
    color: var(--color-text-primary);
    font-size: var(--font-size-heading);
    font-weight: var(--font-weight-semibold);
    font-variant-numeric: tabular-nums;
    line-height: var(--line-height-heading);
  }

  .recent {
    display: grid;
    gap: var(--space-sm);
  }

  .section-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-lg);
  }

  .section-copy {
    display: grid;
    gap: var(--space-xs);
    min-width: 0;
  }

  .recent h2 {
    margin: 0;
    font-size: var(--font-size-subheading);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-subheading);
  }

  .recent p {
    max-width: var(--layout-reading-width);
    margin: 0;
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .section-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
  }

  @media (max-width: 640px) {
    .section-heading {
      flex-direction: column;
    }
  }
</style>
