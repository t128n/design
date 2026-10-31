<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Badge,
    Button,
    Container,
    Page,
    PageHeader,
    Section,
    Table,
    TableCell,
    TableRow
  } from '../index.js';
  import '../styles/index.css';

  const columns = [
    { label: 'Project' },
    { label: 'Owner' },
    { label: 'Updated', align: 'right' as const, numeric: true },
    { label: 'Status' }
  ];

  const { Story } = defineMeta({
    title: 'Layouts/Page header',
    component: PageHeader,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component: 'PageHeader introduces a page with a title, optional description, breadcrumbs, and actions. Use it once at the top of a workspace page, not inside cards or repeated for subsections. Keep the title the page name and put supporting metadata in the description.'
        }
      }
    }
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

{#snippet titleOnlyHeader()}
  <PageHeader title="Projects" />
{/snippet}

{#snippet descriptionHeader()}
  <PageHeader
    title="Projects"
    description="Track ownership, status, and recent activity across the workspace."
  />
{/snippet}

{#snippet detailHeader()}
  <PageHeader
    title="Orbit"
    description="Deploy history and environment health for the Orbit project."
    breadcrumbs={[
      { label: 'Workspace', href: '#' },
      { label: 'Projects', href: '#' }
    ]}
    actions={detailActions}
  />
{/snippet}

{#snippet longTitleHeader()}
  <PageHeader
    title="Deployment history for the Orbit production environment"
    description="Review each revision, its approvals, and the environments it reached."
    actions={longTitleActions}
  />
{/snippet}

{#snippet projectsHeader()}
  <PageHeader
    title="Projects"
    description="Every project in the workspace, with its owner and latest status."
    actions={projectsActions}
  />
{/snippet}

<Story name="Title only" asChild>
  <Container width="full" padding="xl" class="page">
    <Page header={titleOnlyHeader} />
  </Container>
</Story>

<Story name="With description" asChild>
  <Container width="full" padding="xl" class="page">
    <Page header={descriptionHeader} />
  </Container>
</Story>

<Story name="Breadcrumbs and actions" asChild>
  <Container width="full" padding="xl" class="page">
    <Page header={detailHeader} />
  </Container>
</Story>

<Story name="Long title" asChild>
  <Container width="full" padding="xl" class="page">
    <Page header={longTitleHeader} />
  </Container>
</Story>

<Story name="Projects page" asChild>
  <Container width="full" padding="xl" class="page">
    <Page header={projectsHeader}>
      <Section id="projects-heading" title="All projects" labelledBy={false}>
        <Table {columns} labelledBy="projects-heading">
          <TableRow>
            <TableCell>Orbit</TableCell>
            <TableCell>Mara Chen</TableCell>
            <TableCell>2 minutes ago</TableCell>
            <TableCell><Badge tone="success">Healthy</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Atlas</TableCell>
            <TableCell>Devon Ruiz</TableCell>
            <TableCell>18 minutes ago</TableCell>
            <TableCell><Badge tone="progress">In progress</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Beacon</TableCell>
            <TableCell>—</TableCell>
            <TableCell>Yesterday</TableCell>
            <TableCell><Badge tone="warning">Needs review</Badge></TableCell>
          </TableRow>
        </Table>
      </Section>
    </Page>
  </Container>
</Story>

<style>
  /* Story-only surface: the standalone fullscreen wrapper stays on the workspace. */
  :global(.page) {
    background: var(--color-workspace);
  }
</style>
