<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Badge, Button, Container, PageHeader, Table, Text } from '../index.js';
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
  <Container width="content" padding="xl" class="page">
    <PageHeader title="Projects" />
  </Container>
</Story>

<Story name="With description" asChild>
  <Container width="content" padding="xl" class="page">
    <PageHeader
      title="Projects"
      description="Track ownership, status, and recent activity across the workspace."
    />
  </Container>
</Story>

<Story name="Breadcrumbs and actions" asChild>
  <Container width="content" padding="xl" class="page">
    <PageHeader
      title="Orbit"
      description="Deploy history and environment health for the Orbit project."
      breadcrumbs={[
        { label: 'Workspace', href: '#' },
        { label: 'Projects', href: '#' }
      ]}
      actions={detailActions}
    />
  </Container>
</Story>

<Story name="Long title" asChild>
  <Container width="content" padding="xl" class="page">
    <PageHeader
      title="Deployment history for the Orbit production environment"
      description="Review each revision, its approvals, and the environments it reached."
      actions={longTitleActions}
    />
  </Container>
</Story>

<Story name="Projects page" asChild>
  <Container width="content" padding="xl" class="page">
    <PageHeader
      title="Projects"
      description="Every project in the workspace, with its owner and latest status."
      actions={projectsActions}
    />
    <section class="projects" aria-labelledby="projects-heading">
      <Text variant="subheading" as="h2" id="projects-heading">All projects</Text>
      <Table {columns}>
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
    </section>
  </Container>
</Story>

<style>
  :global(.page) {
    box-sizing: border-box;
    padding-block: var(--space-2xl);
    background: var(--color-workspace);
  }

  :global(.page) :global(.page-header),
  :global(.page) :global(.table-wrap),
  :global(.page) .projects {
    width: 100%;
    max-width: var(--layout-content-width);
    margin-inline: auto;
  }

  .projects {
    display: grid;
    gap: var(--space-sm);
  }
</style>
