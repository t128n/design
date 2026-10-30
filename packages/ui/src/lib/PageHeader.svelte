<script lang="ts">
  import type { Snippet } from 'svelte';
  import Breadcrumbs from './Breadcrumbs.svelte';

  type Crumb = {
    label: string;
    href?: string;
  };

  type Props = {
    title: string;
    description?: string;
    breadcrumbs?: Crumb[];
    actions?: Snippet;
    meta?: Snippet;
  };

  let {
    title,
    description,
    breadcrumbs,
    actions,
    meta
  }: Props = $props();
</script>

<header class="page-header">
  {#if breadcrumbs?.length}
    <Breadcrumbs items={breadcrumbs} />
  {/if}
  <div class="row">
    <div class="copy">
      <h1>{title}</h1>
      {#if description}
        <p>{description}</p>
      {/if}
    </div>
    {#if actions}
      <div class="actions">{@render actions()}</div>
    {/if}
  </div>
  {#if meta}
    <div class="meta">{@render meta()}</div>
  {/if}
</header>

<style>
  .page-header {
    display: grid;
    gap: var(--space-sm);
    margin-bottom: var(--space-lg);
    font-family: var(--font-family-sans);
    color: var(--color-text-primary);
  }

  .row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-lg);
  }

  .copy {
    display: grid;
    gap: var(--space-xs);
    min-width: 0;
  }

  h1 {
    margin: 0;
    font-size: var(--font-size-heading);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-heading);
  }

  p {
    max-width: 60ch;
    margin: 0;
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
  }

  .meta {
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  @media (max-width: 640px) {
    .row {
      align-items: flex-start;
      flex-direction: column;
      gap: var(--space-sm);
    }
  }
</style>
