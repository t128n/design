<script lang="ts">
  import type { Snippet } from 'svelte';
  import { ChevronRight } from 'carbon-icons-svelte';
  import Icon from './Icon.svelte';

  interface Props {
    title?: string;
    breadcrumb?: string[];
    id?: string;
    leading?: Snippet;
    actions?: Snippet;
  }

  let { title, breadcrumb, id, leading, actions }: Props = $props();
</script>

<header class="header">
  <div class="left">
    {#if leading}{@render leading()}{/if}
    {#if breadcrumb?.length}
      <nav class="breadcrumb" aria-label="Breadcrumb">
        {#each breadcrumb as segment, index}
          <span class:last={index === breadcrumb.length - 1}>{segment}</span>
          {#if index < breadcrumb.length - 1}
            <Icon icon={ChevronRight} size={12} />
          {/if}
        {/each}
        {#if id}<span class="id">{id}</span>{/if}
      </nav>
    {:else if title}
      <h1>{title}</h1>
    {/if}
  </div>
  {#if actions}
    <div class="actions">{@render actions()}</div>
  {/if}
</header>

<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    flex: none;
    height: var(--header-h);
    padding: 0 var(--page-inset);
    background: var(--surface-panel);
    border-bottom: 1px solid var(--border);
  }

  .left,
  .actions {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    min-width: 0;
  }

  .actions {
    margin-right: calc(var(--space-2) * -1);
  }

  h1 {
    font: var(--type-heading);
    color: var(--text-1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    min-width: 0;
    color: var(--text-2);
    font: var(--type-body);
  }

  .breadcrumb span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .breadcrumb .last {
    color: var(--text-1);
    font: var(--type-action);
  }

  .breadcrumb .id {
    color: var(--text-3);
    font: var(--type-mono);
  }

  :global(.header-icon-button) {
    margin-left: calc(var(--space-2) * -1);
  }

  @container view (max-width: 760px) {
    .header {
      padding: 0 var(--space-3);
    }

    .breadcrumb > span:not(.last),
    .breadcrumb :global(svg),
    .breadcrumb .id {
      display: none;
    }
  }
</style>
