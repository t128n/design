<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    AppShell,
    Badge,
    Button,
    Link,
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

  const overviewSections = [
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

  const projectSections = [
    {
      label: 'Workspace',
      items: [
        { label: 'Overview' },
        { label: 'Projects', active: true, badge: '12' },
        { label: 'Activity' },
        { label: 'Reports' }
      ]
    },
    {
      label: 'Account',
      items: [{ label: 'Preferences' }, { label: 'Members' }]
    }
  ];

  const projectLinks = [
    { label: 'Overview' },
    { label: 'Projects', active: true },
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
  <Link variant="ghost" href="/help">Help</Link>
  <Link variant="ghost" href="/account">Account</Link>
{/snippet}

{#snippet headerActions()}
  <Button variant="secondary">Export</Button>
  <Button>New project</Button>
{/snippet}

{#snippet projectTable()}
  <section class="projects" aria-labelledby="projects-heading">
    <h2 id="projects-heading">Active projects</h2>
    <Table columns={projectColumns}>
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
  </section>
{/snippet}

{#snippet topNavbar()}
  <Navbar brand="Acme" links={projectLinks} actions={navbarUtilities} />
{/snippet}

{#snippet sidebarNav()}
  <Sidebar sections={overviewSections} label="Workspace" toggleLabel="Workspace" />
{/snippet}

{#snippet combinedNavbar()}
  <Navbar brand="Acme" actions={navbarUtilities} />
{/snippet}

{#snippet combinedSidebar()}
  <Sidebar sections={projectSections} label="Workspace" toggleLabel="Workspace" />
{/snippet}

<Story name="Top navigation" asChild>
  <AppShell navbar={topNavbar}>
    <PageHeader
      title="Projects"
      description="Track ownership, status, and recent activity across the workspace."
      actions={headerActions}
    />
    {@render projectTable()}
  </AppShell>
</Story>

<Story name="Sidebar navigation" asChild>
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

<Story name="Combined navigation" asChild>
  <AppShell navbar={combinedNavbar} sidebar={combinedSidebar}>
    <PageHeader
      title="Projects"
      description="Track ownership, status, and recent activity across the workspace."
      actions={headerActions}
    />
    {@render projectTable()}
  </AppShell>
</Story>

<Story name="Narrow screen" globals={{ viewport: { value: 'narrow375' } }} asChild>
  <AppShell navbar={combinedNavbar} sidebar={combinedSidebar}>
    <PageHeader
      title="Projects"
      description="Track ownership, status, and recent activity across the workspace."
    />
    {@render projectTable()}
  </AppShell>
</Story>

<style>
  .projects,
  .activity {
    display: grid;
    gap: var(--space-sm);
  }

  .projects h2,
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
</style>
