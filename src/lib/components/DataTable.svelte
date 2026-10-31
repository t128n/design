<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Add, ArrowDown, ArrowUp, Checkmark } from 'carbon-icons-svelte';
  import Icon from './Icon.svelte';

  interface Column {
    key: string;
    label: string;
    align?: 'left' | 'right';
    width?: string;
  }

  interface Sort {
    key: string;
    direction: 'asc' | 'desc';
  }

  interface Props {
    columns: Column[];
    rows: Record<string, unknown>[];
    rowKey?: string;
    selectedKey?: string;
    sort?: Sort;
    selectable?: boolean;
    onrowclick?: (row: Record<string, unknown>, index: number) => void;
    onsort?: (column: Column, direction: 'asc' | 'desc') => void;
    newRowLabel?: string;
    onnewrow?: () => void;
    cell?: Snippet<[Record<string, unknown>, Column]>;
  }

  let {
    columns,
    rows,
    rowKey,
    selectedKey,
    sort,
    selectable = false,
    onrowclick,
    onsort,
    newRowLabel,
    onnewrow,
    cell,
  }: Props = $props();

  // The table is controlled when the parent owns `selectedKey` and `sort`, but it
  // still responds locally so a story can show the selected row and sort arrow
  // without a stateful wrapper. A prop change hands control back to the parent.
  let localSelected = $state<string | undefined>(undefined);
  let localSort = $state<Sort | undefined>(undefined);

  $effect(() => {
    selectedKey;
    localSelected = undefined;
  });

  $effect(() => {
    sort;
    localSort = undefined;
  });

  const activeSelected = $derived(localSelected ?? selectedKey);
  const activeSort = $derived(localSort ?? sort);

  function keyOf(row: Record<string, unknown>, index: number): string {
    return rowKey ? String(row[rowKey] ?? index) : String(index);
  }

  function compare(a: unknown, b: unknown): number {
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    return String(a ?? '').localeCompare(String(b ?? ''), undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  }

  const view = $derived.by(() => {
    const indexed = rows.map((row, index) => ({ row, index }));
    const current = activeSort;
    if (!current) return indexed;
    const direction = current.direction === 'asc' ? 1 : -1;
    return indexed.sort((a, b) => {
      const result = compare(a.row[current.key], b.row[current.key]);
      return result === 0 ? a.index - b.index : result * direction;
    });
  });

  function toggleSort(column: Column): void {
    const direction: 'asc' | 'desc' =
      activeSort?.key === column.key && activeSort.direction === 'asc' ? 'desc' : 'asc';
    localSort = { key: column.key, direction };
    onsort?.(column, direction);
  }

  function ariaSort(column: Column): 'ascending' | 'descending' | undefined {
    if (activeSort?.key !== column.key) return undefined;
    return activeSort.direction === 'asc' ? 'ascending' : 'descending';
  }

  function select(row: Record<string, unknown>, index: number): void {
    localSelected = keyOf(row, index);
    onrowclick?.(row, index);
  }

  function onRowKeydown(
    event: KeyboardEvent,
    row: Record<string, unknown>,
    index: number,
  ): void {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    select(row, index);
  }

  function text(value: unknown): string {
    return value === null || value === undefined ? '' : String(value);
  }
</script>

<div class="table-wrap">
  <table class="ds-table">
    <colgroup>
      {#if selectable}<col class="col-select" />{/if}
      {#each columns as column}
        <col style:width={column.width} />
      {/each}
    </colgroup>
    <thead>
      <tr>
        {#if selectable}
          <th class="check-head" scope="col" aria-label="Selection"></th>
        {/if}
        {#each columns as column}
          <th scope="col" data-align={column.align ?? 'left'} aria-sort={ariaSort(column)}>
            {#if onsort}
              <button type="button" class="sort" onclick={() => toggleSort(column)}>
                <span>{column.label}</span>
                {#if activeSort?.key === column.key}
                  <Icon
                    icon={activeSort.direction === 'asc' ? ArrowUp : ArrowDown}
                    size={12}
                  />
                {/if}
              </button>
            {:else}
              <span class="head-label">
                {column.label}
                {#if activeSort?.key === column.key}
                  <Icon
                    icon={activeSort.direction === 'asc' ? ArrowUp : ArrowDown}
                    size={12}
                  />
                {/if}
              </span>
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each view as entry (keyOf(entry.row, entry.index))}
        {@const key = keyOf(entry.row, entry.index)}
        {@const isSelected = activeSelected === key}
        <tr
          data-selected={isSelected ? 'true' : undefined}
          aria-selected={selectable ? isSelected : undefined}
          tabindex={onrowclick ? 0 : undefined}
          onclick={onrowclick ? () => select(entry.row, entry.index) : undefined}
          onkeydown={onrowclick
            ? (event) => onRowKeydown(event, entry.row, entry.index)
            : undefined}
        >
          {#if selectable}
            <td class="check-cell">
              <label class="row-check">
                <input
                  type="checkbox"
                  checked={isSelected}
                  aria-label={`Select ${key}`}
                  onclick={(event) => event.stopPropagation()}
                  onchange={() => select(entry.row, entry.index)}
                />
                <span class="box" aria-hidden="true"><Icon icon={Checkmark} size={14} /></span>
              </label>
            </td>
          {/if}
          {#each columns as column}
            <td data-align={column.align ?? 'left'}>
              {#if cell}
                {@render cell(entry.row, column)}
              {:else}
                {text(entry.row[column.key])}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
      {#if newRowLabel}
        <tr class="ds-table-new">
          <td colspan={columns.length + (selectable ? 1 : 0)}>
            <button type="button" class="new-row" onclick={() => onnewrow?.()}>
              <Icon icon={Add} size={16} />
              {newRowLabel}
            </button>
          </td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>

<style>
  .table-wrap {
    width: 100%;
    overflow-x: auto;
    background: var(--surface-panel);
  }

  .col-select {
    width: var(--size-5);
  }

  .check-head,
  .check-cell {
    width: 1%;
    padding-right: 0;
    white-space: nowrap;
  }

  .check-head {
    padding-left: var(--page-inset);
  }

  .head-label {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
  }

  .sort {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--space-1);
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: inherit;
    white-space: nowrap;
  }

  th[data-align='right'] .sort {
    justify-content: flex-end;
  }

  th[data-align='right'] .head-label {
    justify-content: flex-end;
    width: 100%;
  }

  .sort:hover {
    color: var(--text-1);
  }

  .sort:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  td[data-align='right'] {
    text-align: right;
  }

  .row-check {
    position: relative;
    display: grid;
    place-items: center;
    width: var(--icon);
    height: var(--icon);
    cursor: pointer;
  }

  .row-check input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  .box {
    display: grid;
    place-items: center;
    width: var(--icon);
    height: var(--icon);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-xs);
    background: var(--surface-panel);
    color: transparent;
  }

  .row-check input:checked + .box {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--text-on-accent);
  }

  .row-check input:focus-visible + .box {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .new-row {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--text-3);
    font: var(--type-body);
    text-align: left;
  }

  .new-row:hover {
    color: var(--text-1);
  }

  .new-row:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }
</style>
