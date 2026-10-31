<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Badge, Button, Table, Text } from '../index.js';
  import '../styles/index.css';

  const columns = [
    { label: 'Project' },
    { label: 'Owner' },
    { label: 'Updated' },
    { label: 'Status' }
  ];

  const { Story } = defineMeta({
    title: 'Components/Table',
    component: Table,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' }
  });
</script>

<Story name="Default" asChild>
  <div class="page">
    <section class="section" aria-labelledby="active-projects-heading">
      <div class="section-heading">
        <div class="section-copy">
          <Text variant="subheading" as="h2" id="active-projects-heading">Active projects</Text>
          <Text variant="body-sm" tone="secondary">Ownership and status for work in flight.</Text>
        </div>
        <div class="section-actions">
          <Button variant="secondary">View all</Button>
        </div>
      </div>
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
  </div>
</Story>

<Story name="Bordered" asChild>
  <div class="page">
    <section class="section" aria-labelledby="archived-projects-heading">
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
      <Table {columns} bordered>
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
          <td>Priya Nair</td>
          <td>Yesterday</td>
          <td><Badge tone="warning">Needs review</Badge></td>
        </tr>
        <tr>
          <td>Comet</td>
          <td>—</td>
          <td>3 days ago</td>
          <td><Badge tone="neutral">Paused</Badge></td>
        </tr>
      </Table>
    </section>
  </div>
</Story>

<Story name="Dense" asChild>
  <div class="page">
    <section class="section" aria-labelledby="project-health-heading">
      <div class="section-copy">
        <Text variant="subheading" as="h2" id="project-health-heading">Project health</Text>
        <Text variant="body-sm" tone="secondary">
          A compact layout for scanning many records at once.
        </Text>
      </div>
      <Table {columns} density="dense">
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
          <td>Priya Nair</td>
          <td>Yesterday</td>
          <td><Badge tone="warning">Needs review</Badge></td>
        </tr>
        <tr>
          <td>Cinder</td>
          <td>No owner</td>
          <td>2 days ago</td>
          <td><Badge tone="warning">Needs owner</Badge></td>
        </tr>
        <tr>
          <td>Comet</td>
          <td>—</td>
          <td>3 days ago</td>
          <td><Badge tone="neutral">Paused</Badge></td>
        </tr>
      </Table>
    </section>
  </div>
</Story>

<Story name="Narrow screen" globals={{ viewport: { value: 'narrow375' } }} asChild>
  <div class="page">
    <section class="section" aria-labelledby="narrow-projects-heading">
      <div class="section-copy">
        <Text variant="subheading" as="h2" id="narrow-projects-heading">
          Deployment pipeline for the Orbit production environment
        </Text>
        <Text variant="body-sm" tone="secondary">
          Long names stay readable while the table scrolls on its own axis.
        </Text>
      </div>
      <Table {columns}>
        <tr>
          <td>Deployment pipeline for the Orbit production environment</td>
          <td>Mara Chen and Devon Ruiz</td>
          <td>2 minutes ago · 10:42 UTC</td>
          <td><Badge tone="success">Healthy</Badge></td>
        </tr>
        <tr>
          <td>Atlas staging environment with extended review</td>
          <td>Priya Nair and the platform team</td>
          <td>18 minutes ago · 10:26 UTC</td>
          <td><Badge tone="progress">In progress</Badge></td>
        </tr>
        <tr>
          <td>Beacon</td>
          <td>No owner assigned yet</td>
          <td>Yesterday · 16:10 UTC</td>
          <td><Badge tone="warning">Needs review</Badge></td>
        </tr>
      </Table>
    </section>
  </div>
</Story>

<style>
  .page {
    box-sizing: border-box;
    min-height: 100vh;
    padding: var(--space-2xl) var(--space-xl);
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
