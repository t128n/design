<script lang="ts">
  import type { Snippet } from 'svelte';

  type Column = {
    label: string;
    align?: 'left' | 'right';
    numeric?: boolean;
  };

  type Props = {
    columns: Column[];
    caption?: string;
    bordered?: boolean;
    density?: 'standard' | 'dense';
    children?: Snippet;
  };

  let {
    columns,
    caption,
    bordered = false,
    density = 'standard',
    children
  }: Props = $props();
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex (scrollable regions must be keyboard-focusable) -->
<div
  class="table-wrap"
  class:bordered
  class:dense={density === 'dense'}
  role="region"
  aria-label={caption ?? 'Table'}
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
      {@render children?.()}
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

  .table th.right {
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

  .right {
    text-align: right;
  }

  .numeric {
    font-variant-numeric: tabular-nums;
  }
</style>
