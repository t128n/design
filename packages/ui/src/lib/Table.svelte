<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setTableColumns, type TableColumn } from './table-context';

  type Props = {
    columns: TableColumn[];
    caption?: string;
    /** Id of the element that names the scroll region. */
    labelledBy?: string;
    bordered?: boolean;
    density?: 'standard' | 'dense';
    isEmpty?: boolean;
    empty?: Snippet;
    children?: Snippet;
  };

  let {
    columns,
    caption,
    labelledBy,
    bordered = false,
    density = 'standard',
    isEmpty = false,
    empty,
    children
  }: Props = $props();

  setTableColumns(() => columns);

  const hasRegionName = $derived(Boolean(labelledBy || caption));
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex (scrollable regions must be keyboard-focusable) -->
<div
  class="table-wrap"
  class:bordered
  class:dense={density === 'dense'}
  role={hasRegionName ? 'region' : undefined}
  aria-labelledby={labelledBy}
  aria-label={labelledBy ? undefined : caption}
  tabindex="0"
>
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
      {#if isEmpty}
        <tr class="empty-row">
          <td colspan={columns.length} class="empty-cell">
            {@render empty?.()}
          </td>
        </tr>
      {:else}
        {@render children?.()}
      {/if}
    </tbody>
  </table>
</div>

<style>
  .table-wrap {
    width: 100%;
    overflow-x: auto;
  }

  .table-wrap:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .table-wrap.bordered {
    border: var(--border-width) solid var(--color-border);
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
    padding: var(--space-sm) 0 0;
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    text-align: left;
  }

  .table th,
  .table :global(td) {
    padding: var(--space-sm) var(--space-md);
    border-bottom: var(--border-width) solid var(--color-border);
    white-space: nowrap;
  }

  .table th {
    color: var(--color-text-secondary);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
    text-align: left;
  }

  .table th.right,
  .table :global(td.right) {
    text-align: right;
  }

  .table th:first-child,
  .table :global(td:first-child) {
    padding-left: 0;
  }

  .table th:last-child,
  .table :global(td:last-child) {
    padding-right: 0;
  }

  .table-wrap.dense .table th,
  .table-wrap.dense .table :global(td) {
    padding-block: var(--space-xs);
  }

  .table-wrap.bordered caption {
    padding: var(--space-md) var(--space-md) 0;
  }

  .table-wrap.bordered .table th:first-child,
  .table-wrap.bordered .table :global(td:first-child) {
    padding-left: var(--space-md);
  }

  .table-wrap.bordered .table th:last-child,
  .table-wrap.bordered .table :global(td:last-child) {
    padding-right: var(--space-md);
  }

  .table :global(tbody tr:last-child td) {
    border-bottom: 0;
  }

  .table :global(tbody tr:hover) {
    background: var(--color-surface-subtle);
  }

  .table :global(td.numeric) {
    font-variant-numeric: tabular-nums;
  }

  .table :global(td.empty-cell) {
    padding-inline: 0;
    white-space: normal;
  }
</style>
