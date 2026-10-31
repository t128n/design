<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    AppShell,
    Badge,
    Button,
    Navbar,
    PageHeader,
    Sidebar,
    Table
  } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/App shell',
    component: AppShell,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' }
  });

  const workspaceSections = [
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

  const topLinks = [
    { label: 'Overview', active: true },
    { label: 'Projects' },
    { label: 'Activity' },
    { label: 'Reports' }
  ];

  const projectColumns = [
    { label: 'Project' },
    { label: 'Owner' },
    { label: 'Updated', align: 'right' as const },
    { label: 'Status' }
  ];
</script>

{#snippet navbarUtilities()}
  <Button variant="secondary">Help</Button>
  <Button variant="secondary">Account</Button>
{/snippet}

{#snippet headerActions()}
  <Button variant="secondary">Export</Button>
  <Button>New project</Button>
{/snippet}

{#snippet projectTable()}
  <Table columns={projectColumns} caption="Active projects">
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
{/snippet}

{#snippet topNavbar()}
  <Navbar brand="Stellar" links={topLinks} actions={navbarUtilities} />
{/snippet}

{#snippet sidebarNav()}
  <Sidebar sections={workspaceSections} label="Workspace" />
{/snippet}

{#snippet combinedNavbar()}
  <Navbar brand="Stellar" actions={navbarUtilities} />
{/snippet}

{#snippet combinedSidebar()}
  <Sidebar sections={workspaceSections} label="Workspace" />
{/snippet}

{#snippet narrowNavbar()}
  <Navbar brand="Stellar" actions={navbarUtilities} />
{/snippet}

{#snippet narrowSidebar()}
  <Sidebar sections={workspaceSections} label="Workspace" />
{/snippet}

<Story name="Top navigation">
  <AppShell navbar={topNavbar}>
    <PageHeader
      title="Projects"
      description="Track ownership, status, and recent activity across the workspace."
      breadcrumbs={[{ label: 'Workspace', href: '#' }, { label: 'Projects' }]}
      actions={headerActions}
    />
    {@render projectTable()}
  </AppShell>
</Story>

<Story name="Sidebar navigation">
  <AppShell sidebar={sidebarNav}>
    <PageHeader
      title="Overview"
      description="What changed, what needs attention, and who owns the next step."
      actions={headerActions}
    />
    <section class="activity" aria-labelledby="activity-heading">
      <h2 id="activity-heading">Recent activity</h2>
      <ul>
        <li><strong>Mara Chen</strong> updated the release plan for Orbit.</li>
        <li><strong>Devon Ruiz</strong> assigned two reviewers to Atlas.</li>
        <li><strong>Priya Shah</strong> moved Beacon to in review.</li>
      </ul>
    </section>
  </AppShell>
</Story>

<Story name="Combined navigation">
  <AppShell navbar={combinedNavbar} sidebar={combinedSidebar}>
    <PageHeader
      title="Projects"
      description="Track ownership, status, and recent activity across the workspace."
      breadcrumbs={[{ label: 'Workspace', href: '#' }, { label: 'Projects' }]}
      actions={headerActions}
    />
    {@render projectTable()}
  </AppShell>
</Story>

<Story name="Narrow screen">
  <div class="narrow-frame">
    <AppShell navbar={narrowNavbar} sidebar={narrowSidebar}>
      <PageHeader
        title="Overview"
        description="What changed, what needs attention, and who owns the next step."
      />
      <section class="activity" aria-labelledby="narrow-activity-heading">
        <h2 id="narrow-activity-heading">Recent activity</h2>
        <ul>
          <li><strong>Mara Chen</strong> updated the release plan for Orbit.</li>
          <li><strong>Devon Ruiz</strong> assigned two reviewers to Atlas.</li>
        </ul>
      </section>
    </AppShell>
  </div>
</Story>

<style>
  .activity {
    display: grid;
    gap: var(--space-sm);
  }

  .activity h2 {
    margin: 0;
    font-size: var(--font-size-subheading);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-subheading);
  }

  .activity ul {
    display: grid;
    gap: var(--space-sm);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .activity li {
    padding-top: var(--space-sm);
    border-top: var(--border-width) solid var(--color-border);
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .activity strong {
    color: var(--color-text-primary);
    font-weight: var(--font-weight-medium);
  }

  .narrow-frame {
    width: min(420px, 100%);
    margin: 0 auto;
    background: var(--color-canvas);
  }

  .narrow-frame :global(.app-shell),
  .narrow-frame :global(.app-shell.with-sidebar) {
    grid-template-columns: minmax(0, 1fr);
    min-height: 0;
  }
</style>
