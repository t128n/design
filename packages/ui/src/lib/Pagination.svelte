<script lang="ts">
  import { Pagination } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import ChevronLeftIcon from '~icons/carbon/chevron-left';
  import ChevronRightIcon from '~icons/carbon/chevron-right';

  type Props = {
    count: number;
    perPage?: number;
    page?: number;
    siblingCount?: number;
    onPageChange?: (page: number) => void;
    loop?: boolean;
    class?: string;
    prevLabel?: string;
    nextLabel?: string;
  };

  let {
    count,
    perPage = 10,
    page = $bindable(1),
    siblingCount = 1,
    onPageChange,
    loop = false,
    class: className = '',
    prevLabel = 'Previous',
    nextLabel = 'Next'
  }: Props = $props();
</script>

<div class="pagination {className}">
  <Pagination.Root {count} {perPage} bind:page {siblingCount} {onPageChange} {loop}>
    {#snippet children({ pages, range })}
      <div class="pagination-row">
        <Pagination.PrevButton class="pagination-nav">
          <ChevronLeftIcon class="pagination-icon" aria-hidden="true" />
          <span>{prevLabel}</span>
        </Pagination.PrevButton>
        <div class="pagination-pages">
          {#each pages as pageItem (pageItem.key)}
            {#if pageItem.type === 'ellipsis'}
              <span class="pagination-ellipsis">...</span>
            {:else}
              <Pagination.Page page={pageItem} class="pagination-page">
                {pageItem.value}
              </Pagination.Page>
            {/if}
          {/each}
        </div>
        <Pagination.NextButton class="pagination-nav">
          <span>{nextLabel}</span>
          <ChevronRightIcon class="pagination-icon" aria-hidden="true" />
        </Pagination.NextButton>
      </div>
      {#if range}
        <div class="pagination-range">
          Showing {range.start}–{range.end} of {count}
        </div>
      {/if}
    {/snippet}
  </Pagination.Root>
</div>

<style>
  .pagination {
    font-family: var(--font-family-sans);
    color: var(--color-text-primary);
  }

  .pagination-row {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    flex-wrap: wrap;
  }

  .pagination-pages {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }

  .pagination :global(.pagination-nav) {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    height: var(--control-height);
    padding: 0 var(--space-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font: inherit;
    font-size: var(--font-size-label);
    line-height: var(--line-height-label);
    cursor: pointer;
  }

  .pagination :global(.pagination-nav:hover:not(:disabled)) {
    background: var(--color-surface-subtle);
  }

  .pagination :global(.pagination-nav:focus-visible) {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .pagination :global(.pagination-nav:disabled) {
    color: var(--color-disabled-text);
    border-color: var(--color-disabled-background);
    background: var(--color-surface);
    cursor: not-allowed;
  }

  .pagination :global(.pagination-page) {
    display: grid;
    place-items: center;
    min-width: 32px;
    height: 32px;
    padding: 0 var(--space-xs);
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-text-secondary);
    font: inherit;
    font-size: var(--font-size-label);
    line-height: var(--line-height-label);
    cursor: pointer;
    font-variant-numeric: tabular-nums;
  }

  .pagination :global(.pagination-page:hover:not(:disabled):not([data-selected])) {
    background: var(--color-surface-subtle);
    color: var(--color-text-primary);
  }

  .pagination :global(.pagination-page:focus-visible) {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .pagination :global(.pagination-page[data-selected]) {
    background: transparent;
    color: var(--color-accent);
    border-color: var(--color-accent);
  }

  .pagination :global(.pagination-page:disabled) {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .pagination-ellipsis {
    display: grid;
    place-items: center;
    min-width: 32px;
    height: 32px;
    color: var(--color-text-muted);
    font-size: var(--font-size-label);
  }

  .pagination :global(.pagination-icon) {
    width: 16px;
    height: 16px;
  }

  .pagination-range {
    margin-top: var(--space-sm);
    color: var(--color-text-muted);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  @media (prefers-reduced-motion: reduce) {
    .pagination :global(.pagination-nav),
    .pagination :global(.pagination-page) {
      transition: none;
    }
  }
</style>
