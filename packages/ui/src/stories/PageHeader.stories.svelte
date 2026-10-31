<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Badge, Button, PageHeader, Table } from '../index.js';
  import '../styles/index.css';

  const columns = [
    { label: 'Project' },
    { label: 'Owner' },
    { label: 'Updated' },
    { label: 'Status' }
  ];

  const { Story } = defineMeta({
    title: 'Layouts/Page header',
    component: PageHeader,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' }
  });
</script>

{#snippet detailActions()}
  <Button variant="secondary">View runs</Button>
  <Button>Deploy</Button>
{/snippet}

{#snippet longTitleActions()}
  <Button variant="secondary">Compare revisions</Button>
  <Button variant="secondary">Export history</Button>
  <Button>Redeploy</Button>
{/snippet}

{#snippet projectsActions()}
  <Button variant="secondary">Export</Button>
  <Button>New project</Button>
{/snippet}

<Story name="Title only" asChild>
  <div class="story">
    <PageHeader title="Projects" />
  </div>
</Story>

<Story name="With description" asChild>
  <div class="story">
    <PageHeader
      title="Projects"
      description="Track ownership, status, and recent activity across the workspace."
    />
  </div>
</Story>

<Story name="Breadcrumbs and actions" asChild>
  <div class="story">
    <PageHeader
      title="Orbit"
      description="Deploy history and environment health for the Orbit project."
      breadcrumbs={[
        { label: 'Workspace', href: '#' },
        { label: 'Projects', href: '#' }
      ]}
      actions={detailActions}
    />
  </div>
</Story>

<Story name="Long title" asChild>
  <div class="story">
    <PageHeader
      title="Deployment history for the Orbit production environment"
      description="Review each revision, its approvals, and the environments it reached."
      actions={longTitleActions}
    />
  </div>
</Story>

<Story name="Projects page" asChild>
  <div class="story">
    <PageHeader
      title="Projects"
      description="Every project in the workspace, with its owner and latest status."
      actions={projectsActions}
    />
    <Table {columns} caption="All projects">
      <tr>
        <td>Orbit</td>
        <td>Mara Chen</td>
        <td>2 minutes ago</td>
        <td><Badge tone="success">Healthy</Badge></td>
      </tr>
      <tr>
        <td>Atlas</td>
        <td>Devon Ruiz</td>
        <td>18 minutes ago</td>
        <td><Badge tone="progress">In progress</Badge></td>
      </tr>
      <tr>
        <td>Beacon</td>
        <td>—</td>
        <td>Yesterday</td>
        <td><Badge tone="warning">Needs review</Badge></td>
      </tr>
    </Table>
  </div>
</Story>

<style>
  .story {
    box-sizing: border-box;
    min-height: 100vh;
    padding: var(--space-2xl) var(--space-xl);
    background: var(--color-workspace);
  }

  .story :global(.page-header),
  .story :global(.table-wrap) {
    width: 100%;
    max-width: var(--layout-content-width);
    margin-inline: auto;
  }
</style>
