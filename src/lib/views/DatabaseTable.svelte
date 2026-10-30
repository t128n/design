<script lang="ts">
  import type { ComponentProps } from "svelte";

  import Button from "../components/button/Button.svelte";
  import IconButton from "../components/button/IconButton.svelte";
  import Header from "../components/shell/Header.svelte";
  import Toolbar from "../components/shell/Toolbar.svelte";
  import Table from "../components/table/Table.svelte";

  type Column = ComponentProps<typeof Table>["columns"][number];
  type Row = ComponentProps<typeof Table>["rows"][number];
  type Sort = NonNullable<ComponentProps<typeof Table>["sort"]>;

  interface Props {
    rows: Row[];
    columns: Column[];
    view: string;
    onView?: (view: string) => void;
  }

  let { rows, columns, view, onView }: Props = $props();

  const VIEWS = [
    { id: "all", label: "All" },
    { id: "board", label: "Board" },
    { id: "gallery", label: "Gallery" },
  ];

  let sort = $state<Sort | null>({ key: "id", direction: "asc" });
  let selected = $state<string[]>([]);

  const activeIndex = $derived(
    Math.max(
      0,
      VIEWS.findIndex((item) => item.id === view),
    ),
  );
  const countLabel = $derived(
    `${rows.length} ${rows.length === 1 ? "row" : "rows"}`,
  );

  function handleSort(next: Sort | null): void {
    sort = next;
  }

  function handleSelect(ids: string[]): void {
    selected = ids;
  }

  function moveTab(event: KeyboardEvent, index: number): void {
    let next: number | null = null;

    if (event.key === "ArrowRight") next = (index + 1) % VIEWS.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + VIEWS.length) % VIEWS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = VIEWS.length - 1;

    if (next === null) return;

    event.preventDefault();
    onView?.(VIEWS[next].id);
    const target = event.currentTarget as HTMLButtonElement | null;
    const tabs = target?.parentElement?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]',
    );
    tabs?.[next]?.focus();
  }
</script>

{#snippet context()}
  <h1 class="t128n-database__title">Issues</h1>
{/snippet}

{#snippet actions()}
  <IconButton label="Search" icon="search" />
  <Button variant="primary">New issue</Button>
  <IconButton label="More actions" icon="more" />
{/snippet}

{#snippet viewTabs()}
  <div class="t128n-database__views" role="tablist" aria-label="Views">
    {#each VIEWS as item, index (item.id)}
      <button
        type="button"
        role="tab"
        class="t128n-database__view"
        class:t128n-database__view--active={item.id === view}
        aria-selected={item.id === view}
        tabindex={index === activeIndex ? 0 : -1}
        onclick={() => onView?.(item.id)}
        onkeydown={(event) => moveTab(event, index)}
      >
        {item.label}
      </button>
    {/each}
  </div>
{/snippet}

{#snippet toolbarActions()}
  <Button size="sm">Filter</Button>
{/snippet}

<div class="t128n-register" data-testid="database-table">
  <Header context={context} actions={actions} />

  <Toolbar filters={viewTabs} actions={toolbarActions} />

  <div class="t128n-register__body t128n-database__body">
    <Table
      caption="Issues"
      {columns}
      {rows}
      {sort}
      {selected}
      onSort={handleSort}
      onSelect={handleSelect}
      newRow="New issue"
    />
  </div>

  <div class="t128n-register__footer t128n-database__footer">
    <span class="t128n-database__count" data-testid="count">{countLabel}</span>
    <span class="t128n-database__meta">Synced just now</span>
  </div>
</div>

<style>
  .t128n-database__title {
    margin: 0;
    color: var(--text-1);
    font: var(--type-heading);
  }

  .t128n-database__views {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    min-width: 0;
  }

  .t128n-database__view {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    height: calc(var(--control-h) - 4px);
    padding: 0 var(--space-2);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-2);
    font: var(--type-caption);
    white-space: nowrap;
    cursor: pointer;
  }

  .t128n-database__view:hover {
    background: var(--state-hover);
    color: var(--text-1);
  }

  .t128n-database__view:active {
    background: var(--state-pressed);
    color: var(--text-1);
  }

  .t128n-database__view:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .t128n-database__view--active {
    background: var(--state-selected);
    color: var(--text-1);
    font: var(--type-action);
  }

  .t128n-database__body {
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
  }

  .t128n-database__footer {
    flex: none;
  }

  .t128n-database__count {
    color: var(--text-2);
    font: var(--type-caption);
    font-variant-numeric: tabular-nums;
  }

  .t128n-database__meta {
    color: var(--text-3);
    font: var(--type-caption);
  }
</style>
