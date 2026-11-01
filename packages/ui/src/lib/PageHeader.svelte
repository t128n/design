<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import type { Snippet } from 'svelte';
  import Breadcrumbs from './Breadcrumbs.svelte';
  import Text from './Text.svelte';
  import { headingTag, type HeadingLevel } from './typography';

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
    /** Semantic heading level for document order; 1 is the page title. */
    level?: HeadingLevel;
  };

  let {
    title,
    description,
    breadcrumbs,
    actions,
    meta,
    level = 1
  }: Props = $props();
</script>

<header class="page-header">
  {#if breadcrumbs?.length}
    <Breadcrumbs items={breadcrumbs} />
  {/if}
  <div class="row">
    <div class="copy">
      <Text variant="heading" as={headingTag(level)}>{title}</Text>
      {#if description}
        <div class="description">
          <Text variant="body-sm" tone="secondary">{description}</Text>
        </div>
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
    margin-bottom: var(--space-2xl);
    color: var(--color-text-primary);
  }

  .row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-lg);
  }

  .copy {
    display: grid;
    gap: var(--space-xs);
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .description {
    max-width: var(--layout-reading-width);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-sm);
  }

  @media (max-width: 640px) {
    .row {
      flex-direction: column;
      gap: var(--space-md);
    }
  }
</style>
