<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Alert,
    AppShell,
    Badge,
    Button,
    Card,
    Navbar,
    PageHeader,
    Sidebar,
    Table
  } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Views/Dashboard',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' }
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

{#snippet sidebar()}
  <Sidebar {sections} />
{/snippet}

{#snippet navbar()}
  <Navbar
    links={[
      { label: 'Overview', active: true },
      { label: 'Projects' },
      { label: 'Activity' }
    ]}
    actions={navActions}
  />
{/snippet}

{#snippet navActions()}
  <Button variant="secondary">Help</Button>
{/snippet}

{#snippet headerActions()}
  <Button variant="secondary">Export</Button>
  <Button>New project</Button>
{/snippet}

<Story name="Dashboard">
  <AppShell {sidebar} {navbar}>
    <PageHeader
      title="Overview"
      description="What changed, what needs attention, and who owns the next step."
      breadcrumbs={[{ label: 'Workspace', href: '#' }, { label: 'Overview' }]}
      actions={headerActions}
    />
    <div class="stack">
      <Alert tone="warning" title="Two projects need an owner">
        Assign an owner before the next review on Friday.
      </Alert>
      <div class="stats">
        <Card title="Active projects">
          <div class="stat"><strong>12</strong><Badge tone="success">+2 this week</Badge></div>
        </Card>
        <Card title="Needs review">
          <div class="stat"><strong>3</strong><Badge tone="warning">Due Friday</Badge></div>
        </Card>
        <Card title="Archived">
          <div class="stat"><strong>28</strong><Badge tone="neutral">This quarter</Badge></div>
        </Card>
      </div>
      <Card title="Recent projects">
        <Table {columns}>
          <tr>
            <td>Orbit</td>
            <td>Mara Chen</td>
            <td class="u-right">2 minutes ago</td>
            <td><Badge tone="success">Healthy</Badge></td>
          </tr>
          <tr>
            <td>Atlas</td>
            <td>Devon Ruiz</td>
            <td class="u-right">18 minutes ago</td>
            <td><Badge tone="progress">In progress</Badge></td>
          </tr>
          <tr>
            <td>Beacon</td>
            <td>—</td>
            <td class="u-right">Yesterday</td>
            <td><Badge tone="warning">Needs owner</Badge></td>
          </tr>
          <tr>
            <td>Cinder</td>
            <td>Priya Shah</td>
            <td class="u-right">2 days ago</td>
            <td><Badge tone="disabled">Archived</Badge></td>
          </tr>
        </Table>
      </Card>
    </div>
  </AppShell>
</Story>

<style>
  .stack {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-md);
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--space-md);
  }

  .stat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
  }

  .stat strong {
    font-size: var(--font-size-display);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-display);
  }
</style>
