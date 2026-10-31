<script lang="ts">
  import { ChevronLeft, ChevronRight } from 'carbon-icons-svelte';
  import IconButton from './IconButton.svelte';

  /**
   * DESIGN.md 7.4 — pagination: icon buttons for previous and next, numbered
   * buttons, current page on --state-selected. Keyboard path is the native
   * button order; the current page carries aria-current="page".
   */
  interface Props {
    page?: number;
    pages?: number;
    label?: string;
    onchange?: (page: number) => void;
  }

  let { page = $bindable(1), pages = 1, label = 'Pagination', onchange }: Props = $props();

  const total = $derived(Math.max(1, Math.floor(pages)));
  const current = $derived(Math.min(Math.max(1, Math.floor(page)), total));

  type Cell = number | 'gap';

  const cells = $derived.by<Cell[]>(() => {
    if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
    const list: Cell[] = [1];
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    if (start > 2) list.push('gap');
    for (let value = start; value <= end; value += 1) list.push(value);
    if (end < total - 1) list.push('gap');
    list.push(total);
    return list;
  });

  function go(next: number) {
    const target = Math.min(Math.max(1, next), total);
    if (target === current) return;
    page = target;
    onchange?.(target);
  }
</script>

<nav class="pagination" aria-label={label}>
  <IconButton
    icon={ChevronLeft}
    label="Previous page"
    disabled={current <= 1}
    onclick={() => go(current - 1)}
  />

  {#each cells as cell, index (index)}
    {#if cell === 'gap'}
      <span class="gap" aria-hidden="true">…</span>
    {:else}
      <button
        type="button"
        class="page"
        class:current={cell === current}
        aria-current={cell === current ? 'page' : undefined}
        aria-label={`Page ${cell}`}
        onclick={() => go(cell)}
      >
        {cell}
      </button>
    {/if}
  {/each}

  <IconButton
    icon={ChevronRight}
    label="Next page"
    disabled={current >= total}
    onclick={() => go(current + 1)}
  />
</nav>

<style>
  .pagination {
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }

  .page,
  .gap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--control-h);
    height: var(--control-h);
    padding: 0 var(--space-2);
    border-radius: var(--radius-md);
  }

  .page {
    border: 0;
    background: transparent;
    color: var(--text-2);
    font: var(--type-action);
    font-variant-numeric: tabular-nums;
  }

  .page:hover {
    background: var(--state-hover);
    color: var(--text-1);
  }

  .page:active {
    background: var(--state-pressed);
  }

  .page.current {
    background: var(--state-selected);
    color: var(--text-1);
  }

  .gap {
    color: var(--text-3);
    font: var(--type-caption);
  }
</style>
