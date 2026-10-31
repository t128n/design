<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    AppShell,
    Badge,
    Button,
    Link,
    List,
    Navbar,
    PageHeader,
    Sidebar,
    Table,
    Text
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
    <Text variant="subheading" as="h2" id="projects-heading">Active projects</Text>
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
      <Text variant="subheading" as="h2" id="activity-heading">Recent activity</Text>
      <List marker="none" separated gap="sm">
        <Text as="li" variant="body-sm" tone="secondary">
          <Text as="strong" variant="body-sm" weight="medium" tone="primary">Mara Chen</Text>
          updated the release plan for Orbit.
        </Text>
        <Text as="li" variant="body-sm" tone="secondary">
          <Text as="strong" variant="body-sm" weight="medium" tone="primary">Devon Ruiz</Text>
          assigned two reviewers to Atlas.
        </Text>
        <Text as="li" variant="body-sm" tone="secondary">
          <Text as="strong" variant="body-sm" weight="medium" tone="primary">Priya Shah</Text>
          moved Beacon to in review.
        </Text>
      </List>
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


</style>
