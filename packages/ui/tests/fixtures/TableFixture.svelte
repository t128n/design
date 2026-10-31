<script lang="ts">
  import Table from '../../src/lib/Table.svelte';
  import TableCell from '../../src/lib/TableCell.svelte';
  import TableRow from '../../src/lib/TableRow.svelte';

  const columns = [
    { label: 'Project' },
    { label: 'Owner' },
    { label: 'Updated', align: 'right' as const, numeric: true },
    { label: 'Status' }
  ];
</script>

<Table {columns} caption="Projects">
  <TableRow class="consumer-row">
    <TableCell class="consumer-cell">Orbit</TableCell>
    <TableCell>Mara Chen</TableCell>
    <TableCell>2 minutes ago</TableCell>
    <TableCell>Healthy</TableCell>
  </TableRow>
  <TableRow>
    <TableCell colspan={2}>Spanning cell</TableCell>
    <TableCell>18 minutes ago</TableCell>
  </TableRow>
  <TableRow>
    <TableCell>Beacon</TableCell>
    <TableCell>Priya Nair</TableCell>
    <TableCell align="left" numeric={false}>Yesterday</TableCell>
    <TableCell>Needs review</TableCell>
  </TableRow>
</Table>
