<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Badge, Table } from '../index.js';
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
    parameters: { layout: 'centered' }
  });
</script>

<Story name="Default" asChild>
  <div class="table-story">
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
  </div>
</Story>

<style>
  .table-story {
    width: min(40rem, calc(100vw - 2rem));
  }
</style>
