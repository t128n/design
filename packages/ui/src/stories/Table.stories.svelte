<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Badge,
    Button,
    Container,
    EmptyState,
    Page,
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

  const numericColumns = [
    { label: 'Project' },
    { label: 'Requests', align: 'right' as const, numeric: true },
    { label: 'Error rate', align: 'right' as const, numeric: true },
    { label: 'Status' }
  ];

  const { Story } = defineMeta({
    title: 'Components/Data/Table',
    component: Table,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component: 'Table presents comparable records in rows and columns. Use Table with TableRow and TableCell for structured data, not for layout or a short list that reads better as text. Do keep one header row, put numbers in numeric right-aligned cells, use the empty slot with EmptyState when there are no rows, and reserve the dense variant for high-volume tables; do not nest tables, shrink type for density, or use them for page layout.'
        }
      }
    }
  });
</script>

{#snippet createProject()}
  <Button>New project</Button>
{/snippet}

{#snippet viewAll()}
  <Button variant="secondary">View all</Button>
{/snippet}

{#snippet exportProjects()}
  <Button variant="secondary">Export</Button>
{/snippet}

{#snippet projectsEmpty()}
  <EmptyState
    level={3}
    title="No projects yet"
    description="Create the first project to give the team a shared place to work."
    action={createProject}
  />
{/snippet}

<Story name="Default" asChild>
  <Container width="full" padding="2xl" class="page">
    <Page>
      <Section
        id="active-projects-heading"
        labelledBy={false}
        title="Active projects"
        description="Ownership and status for work in flight."
        actions={viewAll}
      >
        <Table {columns} labelledBy="active-projects-heading">
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

<Story name="Bordered" asChild>
  <Container width="full" padding="2xl" class="page">
    <Page>
      <Section
        id="archived-projects-heading"
        labelledBy={false}
        title="Archived projects"
        description="An independent surface for records outside the active workspace."
        actions={exportProjects}
      >
        <Table {columns} bordered labelledBy="archived-projects-heading">
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
            <TableCell>Priya Nair</TableCell>
            <TableCell>Yesterday</TableCell>
            <TableCell><Badge tone="warning">Needs review</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Comet</TableCell>
            <TableCell>—</TableCell>
            <TableCell>3 days ago</TableCell>
            <TableCell><Badge tone="neutral">Paused</Badge></TableCell>
          </TableRow>
        </Table>
      </Section>
    </Page>
  </Container>
</Story>

<Story name="Dense" asChild>
  <Container width="full" padding="2xl" class="page">
    <Page>
      <Section
        id="project-health-heading"
        labelledBy={false}
        title="Project health"
        description="A compact layout for scanning many records at once."
      >
        <Table {columns} density="dense" labelledBy="project-health-heading">
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
            <TableCell>Priya Nair</TableCell>
            <TableCell>Yesterday</TableCell>
            <TableCell><Badge tone="warning">Needs review</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cinder</TableCell>
            <TableCell>No owner</TableCell>
            <TableCell>2 days ago</TableCell>
            <TableCell><Badge tone="warning">Needs owner</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Comet</TableCell>
            <TableCell>—</TableCell>
            <TableCell>3 days ago</TableCell>
            <TableCell><Badge tone="neutral">Paused</Badge></TableCell>
          </TableRow>
        </Table>
      </Section>
    </Page>
  </Container>
</Story>

<Story name="Numeric" asChild>
  <Container width="full" padding="2xl" class="page">
    <Page>
      <Section
        id="usage-heading"
        labelledBy={false}
        title="Resource usage"
        description="Right-aligned tabular figures keep large numbers easy to compare."
      >
        <Table columns={numericColumns} labelledBy="usage-heading">
          <TableRow>
            <TableCell>Orbit</TableCell>
            <TableCell>128,400</TableCell>
            <TableCell>0.4%</TableCell>
            <TableCell><Badge tone="success">Healthy</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Atlas</TableCell>
            <TableCell>94,218</TableCell>
            <TableCell>1.2%</TableCell>
            <TableCell><Badge tone="progress">In progress</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Beacon</TableCell>
            <TableCell>8,760</TableCell>
            <TableCell>3.8%</TableCell>
            <TableCell><Badge tone="warning">Needs review</Badge></TableCell>
          </TableRow>
        </Table>
      </Section>
    </Page>
  </Container>
</Story>

<Story name="Empty" asChild>
  <Container width="full" padding="2xl" class="page">
    <Page>
      <Section
        id="empty-projects-heading"
        labelledBy={false}
        title="Projects"
        description="Every project in the workspace."
      >
        <Table {columns} isEmpty empty={projectsEmpty} labelledBy="empty-projects-heading" />
        </Section>
      </Page>
    </Container>
  </Story>
  
  <Story name="Narrow screen" globals={{ viewport: { value: 'narrow375' } }} asChild>
    <Container width="full" padding="2xl" class="page">
      <Page>
        <Section
          id="narrow-projects-heading"
          labelledBy={false}
          title="Deployment pipeline for the Orbit production environment"
          description="Long names stay readable while the table scrolls on its own axis."
        >
          <Table {columns} labelledBy="narrow-projects-heading">
          <TableRow>
            <TableCell>Deployment pipeline for the Orbit production environment</TableCell>
            <TableCell>Mara Chen and Devon Ruiz</TableCell>
            <TableCell>2 minutes ago · 10:42 UTC</TableCell>
            <TableCell><Badge tone="success">Healthy</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Atlas staging environment with extended review</TableCell>
            <TableCell>Priya Nair and the platform team</TableCell>
            <TableCell>18 minutes ago · 10:26 UTC</TableCell>
            <TableCell><Badge tone="progress">In progress</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Beacon</TableCell>
            <TableCell>No owner assigned yet</TableCell>
            <TableCell>Yesterday · 16:10 UTC</TableCell>
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
