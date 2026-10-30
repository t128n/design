<script lang="ts">
  interface Props {
    page: number;
    pages: number;
    onChange?: (page: number) => void;
  }

  let { page, pages, onChange }: Props = $props();

  let numbers = $derived(
    Array.from({ length: Math.max(0, pages) }, (_, index) => index + 1),
  );

  function go(next: number): void {
    if (next < 1 || next > pages || next === page) return;
    onChange?.(next);
  }
</script>

<nav class="t128n-pagination" aria-label="Pagination">
  <button
    type="button"
    class="t128n-pagination__btn t128n-pagination__btn--step"
    aria-label="Previous page"
    disabled={page <= 1}
    onclick={() => go(page - 1)}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M10 3.5 5.5 8 10 12.5" />
    </svg>
  </button>

  {#each numbers as number (number)}
    <button
      type="button"
      class="t128n-pagination__btn t128n-pagination__btn--page"
      class:t128n-pagination__btn--current={number === page}
      aria-current={number === page ? "page" : undefined}
      onclick={() => go(number)}
    >
      {number}
    </button>
  {/each}

  <button
    type="button"
    class="t128n-pagination__btn t128n-pagination__btn--step"
    aria-label="Next page"
    disabled={page >= pages}
    onclick={() => go(page + 1)}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  </button>
</nav>

<style>
  .t128n-pagination {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
  }

  .t128n-pagination__btn {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--control-h);
    height: var(--control-h);
    padding: 0 var(--space-2);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-2);
    cursor: pointer;
  }

  .t128n-pagination__btn--page {
    font: var(--type-action);
    color: var(--text-1);
  }

  .t128n-pagination__btn:hover:not(:disabled) {
    background: var(--state-hover);
  }

  .t128n-pagination__btn:active:not(:disabled) {
    background: var(--state-pressed);
  }

  .t128n-pagination__btn:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .t128n-pagination__btn:disabled {
    background: var(--surface-sunken);
    color: var(--text-2);
    cursor: default;
  }

  .t128n-pagination__btn--current {
    background: var(--state-selected);
    color: var(--text-1);
  }

  .t128n-pagination__btn--current:hover {
    background: var(--state-selected);
  }

  .t128n-pagination__btn svg {
    flex: none;
  }
</style>
