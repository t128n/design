<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Badge,
    Button,
    Container,
    EmptyState,
    Table,
    TableCell,
    TableRow,
    Text
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
    title: 'Components/Table',
    component: Table,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' }
  });
</script>

{#snippet createProject()}
  <Button>New project</Button>
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
  <Container width="content" padding="2xl" class="page">
    <section class="section">
      <div class="section-heading">
        <div class="section-copy">
          <Text variant="subheading" as="h2" id="active-projects-heading">Active projects</Text>
          <Text variant="body-sm" tone="secondary">Ownership and status for work in flight.</Text>
        </div>
        <div class="section-actions">
          <Button variant="secondary">View all</Button>
        </div>
      </div>
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
    </section>
  </Container>
</Story>

<Story name="Bordered" asChild>
  <Container width="content" padding="2xl" class="page">
    <section class="section">
      <div class="section-heading">
        <div class="section-copy">
          <Text variant="subheading" as="h2" id="archived-projects-heading">Archived projects</Text>
          <Text variant="body-sm" tone="secondary">
            An independent surface for records outside the active workspace.
          </Text>
        </div>
        <div class="section-actions">
          <Button variant="secondary">Export</Button>
        </div>
      </div>
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
    </section>
  </Container>
</Story>

<Story name="Dense" asChild>
  <Container width="content" padding="2xl" class="page">
    <section class="section">
      <div class="section-copy">
        <Text variant="subheading" as="h2" id="project-health-heading">Project health</Text>
        <Text variant="body-sm" tone="secondary">
          A compact layout for scanning many records at once.
        </Text>
      </div>
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
    </section>
  </Container>
</Story>

<Story name="Numeric" asChild>
  <Container width="content" padding="2xl" class="page">
    <section class="section">
      <div class="section-copy">
        <Text variant="subheading" as="h2" id="usage-heading">Resource usage</Text>
        <Text variant="body-sm" tone="secondary">
          Right-aligned tabular figures keep large numbers easy to compare.
        </Text>
      </div>
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
    </section>
  </Container>
</Story>

<Story name="Empty" asChild>
  <Container width="content" padding="2xl" class="page">
    <section class="section">
      <div class="section-copy">
        <Text variant="subheading" as="h2" id="empty-projects-heading">Projects</Text>
        <Text variant="body-sm" tone="secondary">Every project in the workspace.</Text>
      </div>
      <Table {columns} isEmpty empty={projectsEmpty} labelledBy="empty-projects-heading" />
    </section>
  </Container>
</Story>

<Story name="Narrow screen" globals={{ viewport: { value: 'narrow375' } }} asChild>
  <Container width="content" padding="2xl" class="page">
    <section class="section">
      <div class="section-copy">
        <Text variant="subheading" as="h2" id="narrow-projects-heading">
          Deployment pipeline for the Orbit production environment
        </Text>
        <Text variant="body-sm" tone="secondary">
          Long names stay readable while the table scrolls on its own axis.
        </Text>
      </div>
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
    </section>
  </Container>
</Story>

<style>
  :global(.page) {
    box-sizing: border-box;
    padding-block: var(--space-2xl);
    background: var(--color-workspace);
  }

  .section {
    display: grid;
    gap: var(--space-sm);
    width: min(56rem, 100%);
    margin-inline: auto;
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
