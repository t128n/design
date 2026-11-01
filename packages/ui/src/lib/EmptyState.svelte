<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { mergeClasses } from './class';
  import Stack from './Stack.svelte';
  import Text from './Text.svelte';
  import { headingTag, type HeadingLevel } from './typography';

  type Props = {
    title: string;
    description?: string;
    /** The next step. Empty states always offer exactly one action. */
    action: Snippet;
    icon?: Snippet;
    /** Semantic heading level for document order. */
    level?: HeadingLevel;
    class?: string;
  };

  let {
    title,
    description,
    action,
    icon,
    level = 2,
    class: className = ''
  }: Props = $props();

  const id = $props.id();
  const titleId = `${id}-title`;
  const classes = $derived(mergeClasses('empty-state', className));
</script>

<section class={classes} aria-labelledby={titleId}>
  <Stack gap="sm" align="center">
    {#if icon}
      <div class="icon" aria-hidden="true">{@render icon()}</div>
    {/if}
    <Text variant="subheading" as={headingTag(level)} id={titleId} align="center">
      {title}
    </Text>
    {#if description}
      <div class="description">
        <Text variant="body-sm" tone="secondary" align="center">{description}</Text>
      </div>
    {/if}
    <div class="action">{@render action()}</div>
  </Stack>
</section>

<style>
  .empty-state {
    display: grid;
    justify-items: center;
    padding: var(--space-2xl) var(--space-lg);
    color: var(--color-text-primary);
  }

  .icon {
    display: inline-flex;
    color: var(--color-text-muted);
  }

  .description {
    max-width: var(--layout-reading-width);
  }

  .action {
    display: flex;
    justify-content: center;
    margin-top: var(--space-sm);
  }
</style>
