<script lang="ts">
  import type { Snippet } from 'svelte';

  type Column = {
    label: string;
    align?: 'left' | 'right';
    numeric?: boolean;
  };

  let {
    columns,
    caption,
    children
  }: { columns: Column[]; caption?: string; children?: Snippet } = $props();
</script>

<div class="table-wrap">
  <table class="table">
    {#if caption}
      <caption>{caption}</caption>
    {/if}
    <thead>
      <tr>
        {#each columns as column}
          <th
            scope="col"
            class:right={column.align === 'right'}
            class:numeric={column.numeric}
          >
            {column.label}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {@render children?.()}
    </tbody>
  </table>
</div>

<style>
  .table-wrap {
    width: 100%;
    overflow-x: auto;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  caption {
    padding: var(--space-md) var(--space-md) 0;
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    text-align: left;
  }

  .table th,
  .table :global(td) {
    padding: var(--space-sm) var(--space-md);
    border-bottom: 1px solid var(--color-border);
    white-space: nowrap;
  }

  th {
    color: var(--color-text-secondary);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
    text-align: left;
  }

  .table th.right {
    text-align: right;
  }

  .table :global(tbody tr:last-child td) {
    border-bottom: 0;
  }

  .table :global(tbody tr:hover) {
    background: var(--color-surface-subtle);
  }

  .right {
    text-align: right;
  }

  .numeric {
    font-variant-numeric: tabular-nums;
  }
</style>
