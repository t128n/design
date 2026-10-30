<script lang="ts">
  import type { Snippet } from "svelte";

  import Icon from "../../icons/Icon.svelte";
  import { cx } from "../../utils/cx";
  import Checkbox from "../choice/Checkbox.svelte";

  export interface TableColumn {
    key: string;
    label: string;
    align?: "start" | "end";
    width?: string;
  }

  export type TableRow = Record<string, unknown>;

  export interface TableSort {
    key: string;
    direction: "asc" | "desc";
  }

  export interface TableCellContext {
    row: TableRow;
    column: TableColumn;
    value: unknown;
    index: number;
  }

  interface Props {
    columns: TableColumn[];
    rows: TableRow[];
    sort?: TableSort | null;
    selected?: string[];
    onSort?: (sort: TableSort | null) => void;
    onSelect?: (ids: string[]) => void;
    newRow?: string;
    caption?: string;
    cell?: Snippet<[TableCellContext]>;
  }

  let {
    columns,
    rows,
    sort = null,
    selected = [],
    onSort,
    onSelect,
    newRow,
    caption,
    cell,
  }: Props = $props();

  const selectable = $derived(typeof onSelect === "function");
  const rowIds = $derived(rows.map((row, index) => String(row.id ?? index)));

  let localSelected = $state<string[]>([]);

  $effect.pre(() => {
    localSelected = [...selected];
  });

  const allSelected = $derived(
    rowIds.length > 0 && rowIds.every((id) => localSelected.includes(id)),
  );
  const someSelected = $derived(rowIds.some((id) => localSelected.includes(id)));

  function isSelected(id: string): boolean {
    return localSelected.includes(id);
  }

  function emit(next: string[]): void {
    localSelected = next;
    onSelect?.(next);
  }

  function toggleRow(id: string): void {
    emit(
      localSelected.includes(id)
        ? localSelected.filter((entry) => entry !== id)
        : [...localSelected, id],
    );
  }

  function toggleAll(): void {
    const kept = localSelected.filter((id) => !rowIds.includes(id));
    emit(allSelected ? kept : [...kept, ...rowIds]);
  }

  function toggleSort(key: string): void {
    if (!onSort) return;
    if (!sort || sort.key !== key) {
      onSort({ key, direction: "asc" });
      return;
    }
    onSort(sort.direction === "asc" ? { key, direction: "desc" } : null);
  }

  function ariaSort(key: string): "ascending" | "descending" | "none" {
    if (!sort || sort.key !== key) return "none";
    return sort.direction === "asc" ? "ascending" : "descending";
  }

  function display(value: unknown): string {
    return value === null || value === undefined ? "" : String(value);
  }
</script>

<div class="t128n-table__scroll">
  <table class="t128n-table" data-testid="table">
    {#if caption}
      <caption class="t128n-table__caption">{caption}</caption>
    {/if}

    <thead>
      <tr class="t128n-table__head">
        {#if selectable}
          <th scope="col" class="t128n-table__cell t128n-table__cell--select">
            <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
            <span class="t128n-table__select" onclick={toggleAll}>
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected && !allSelected}
                label="Select all rows"
              />
            </span>
          </th>
        {/if}

        {#each columns as column (column.key)}
          <th
            scope="col"
            class={cx(
              "t128n-table__cell",
              column.align === "end" && "t128n-table__cell--end",
            )}
            aria-sort={ariaSort(column.key)}
            style:width={column.width}
          >
            {#if onSort}
              <button
                type="button"
                class="t128n-table__sort"
                onclick={() => toggleSort(column.key)}
              >
                <span>{column.label}</span>
                {#if sort?.key === column.key}
                  <Icon
                    name={sort.direction === "asc" ? "chevron-up" : "chevron-down"}
                    size={12}
                  />
                {/if}
              </button>
            {:else}
              {column.label}
            {/if}
          </th>
        {/each}
      </tr>
    </thead>

    <tbody>
      {#each rows as row, index (index)}
        <tr
          class={cx(
            "t128n-table__row",
            isSelected(rowIds[index]) && "t128n-table__row--selected",
          )}
          aria-selected={selectable ? isSelected(rowIds[index]) : undefined}
        >
          {#if selectable}
            <td class="t128n-table__cell t128n-table__cell--select">
              <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
              <span class="t128n-table__select" onclick={() => toggleRow(rowIds[index])}>
                <Checkbox
                  checked={isSelected(rowIds[index])}
                  label={`Select ${rowIds[index]}`}
                />
              </span>
            </td>
          {/if}

          {#each columns as column (column.key)}
            <td
              class={cx(
                "t128n-table__cell",
                column.align === "end" && "t128n-table__cell--end",
              )}
            >
              {#if cell}
                {@render cell({
                  row,
                  column,
                  value: row[column.key],
                  index,
                })}
              {:else}
                {display(row[column.key])}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}

      {#if newRow}
        <tr class="t128n-table__row t128n-table__row--new">
          <td
            class="t128n-table__cell t128n-table__new"
            colspan={columns.length + (selectable ? 1 : 0)}
          >
            <span class="t128n-table__new-icon" aria-hidden="true">
              <Icon name="plus" size={12} />
            </span>
            {newRow}
          </td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>

<style>
  .t128n-table__scroll {
    overflow-x: auto;
  }

  .t128n-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--surface-panel);
  }

  .t128n-table__caption {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    white-space: nowrap;
  }

  .t128n-table__cell {
    box-sizing: border-box;
    padding: 0 var(--space-3);
    text-align: start;
    white-space: nowrap;
  }

  .t128n-table__cell:first-child {
    padding-left: var(--page-inset);
  }

  .t128n-table__cell:last-child {
    padding-right: var(--page-inset);
  }

  .t128n-table__cell--end {
    text-align: end;
  }

  .t128n-table__cell--select {
    width: var(--size-4);
    padding-right: 0;
  }

  .t128n-table__head .t128n-table__cell {
    height: var(--row-h-sm);
    border-bottom: 1px solid var(--border);
    background: var(--surface-sunken);
    color: var(--text-3);
    font: var(--type-label);
    font-variant-numeric: tabular-nums;
  }

  .t128n-table__sort {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    box-sizing: border-box;
    height: var(--row-h-sm);
    padding: 0;
    border: 0;
    border-radius: var(--radius-xs);
    background: none;
    color: inherit;
    font: inherit;
    font-variant-numeric: inherit;
    cursor: pointer;
  }

  .t128n-table__cell--end .t128n-table__sort {
    justify-content: flex-end;
  }

  .t128n-table__sort:hover {
    color: var(--text-1);
  }

  .t128n-table__sort:active {
    color: var(--text-1);
  }

  .t128n-table__sort:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .t128n-table__row .t128n-table__cell {
    height: var(--row-h);
    border-bottom: 1px solid var(--border);
    color: var(--text-1);
    font: var(--type-body);
    font-variant-numeric: tabular-nums;
  }

  .t128n-table__row:last-child .t128n-table__cell {
    border-bottom: 0;
  }

  .t128n-table__row:not(.t128n-table__row--new):hover {
    background: var(--state-hover);
  }

  .t128n-table__row--selected,
  .t128n-table__row--selected:hover {
    background: var(--state-selected);
  }

  .t128n-table__select {
    display: inline-flex;
    align-items: center;
  }

  .t128n-table__select :global(.t128n-checkbox) {
    gap: 0;
  }

  .t128n-table__select :global(.t128n-checkbox__label) {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    white-space: nowrap;
  }

  .t128n-table__new {
    color: var(--text-3);
    font: var(--type-body);
  }

  .t128n-table__new-icon {
    display: inline-flex;
    align-items: center;
    margin-right: var(--space-1);
    vertical-align: middle;
  }
</style>
