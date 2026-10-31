<script lang="ts">
  import { ChevronRight } from 'carbon-icons-svelte';
  import Icon from './Icon.svelte';

  /**
   * DESIGN.md 7.4 — the last segment is text-1 at 500, earlier segments are
   * text-2 links, separators are --size-0 chevrons.
   */
  export interface BreadcrumbItem {
    label: string;
    href?: string;
  }

  interface Props {
    items: BreadcrumbItem[];
    label?: string;
  }

  let { items, label = 'Breadcrumb' }: Props = $props();
</script>

<nav class="breadcrumbs" aria-label={label}>
  <ol>
    {#each items as item, index (index)}
      <li>
        {#if index === items.length - 1}
          <span class="current" aria-current="page">{item.label}</span>
        {:else if item.href}
          <a href={item.href}>{item.label}</a>
        {:else}
          <span class="segment">{item.label}</span>
        {/if}
        {#if index < items.length - 1}
          <span class="separator" aria-hidden="true">
            <Icon icon={ChevronRight} size={12} />
          </span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  .breadcrumbs {
    min-width: 0;
  }

  ol {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    min-width: 0;
  }

  li {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    min-width: 0;
  }

  a,
  .segment {
    color: var(--text-2);
    font: var(--type-body);
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  a:hover {
    color: var(--text-1);
    text-decoration: none;
  }

  .current {
    color: var(--text-1);
    font: var(--type-action);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .separator {
    display: flex;
    align-items: center;
    flex: none;
    color: var(--text-3);
  }
</style>
