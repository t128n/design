<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Badge, Button, Table } from '../index.js';
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
          <h2 id="active-projects-heading">Active projects</h2>
          <p>Ownership and status for work in flight.</p>
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
          <h2 id="archived-projects-heading">Archived projects</h2>
          <p>An independent surface for records outside the active workspace.</p>
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
        <h2 id="project-health-heading">Project health</h2>
        <p>A compact layout for scanning many records at once.</p>
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
        <h2 id="narrow-projects-heading">Deployment pipeline for the Orbit production environment</h2>
        <p>Long names stay readable while the table scrolls on its own axis.</p>
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

  .section h2 {
    margin: 0;
    font-size: var(--font-size-subheading);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-subheading);
  }

  .section p {
    max-width: var(--layout-reading-width);
    margin: 0;
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
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
