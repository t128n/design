<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { mergeClasses } from './class';
  import Inline from './Inline.svelte';
  import type { Space } from './layout';
  import Stack from './Stack.svelte';
  import Text from './Text.svelte';
  import { headingTag, type HeadingLevel } from './typography';

  type Props = HTMLAttributes<HTMLElement> & {
    title?: string;
    description?: string;
    actions?: Snippet;
    id?: string;
    /** Semantic heading level for document order; sections default to 2. */
    level?: HeadingLevel;
    /** Compact rhythm between the heading block and the section content. */
    gap?: Space;
    /**
     * Override the section's accessible name. Pass `false` when a nested table
     * region already points at the heading id, so the two landmarks stay unique.
     */
    labelledBy?: string | false;
    class?: string;
    children?: Snippet;
  };

  let {
    title,
    description,
    actions,
    id,
    level = 2,
    gap = 'sm',
    labelledBy,
    class: className = '',
    'aria-labelledby': forwardedLabelledBy,
    children,
    ...restProps
  }: Props = $props();

  const generatedId = $props.id();
  const sectionId = $derived(id ?? generatedId);
  // Only a title supplies an accessible name by default. Otherwise keep a
  // consumer's aria-labelledby (or aria-label through restProps) and never
  // invent a name.
  const name = $derived(
    labelledBy === false ? undefined : (labelledBy ?? (title ? sectionId : forwardedLabelledBy))
  );
  const classes = $derived(mergeClasses('section', className));
</script>

<Stack
  as="section"
  gap={gap}
  {...restProps}
  class={classes}
  aria-labelledby={name}
>
  {#if title}
    <Inline align="start" justify="between" stackAt="sm" gap="lg">
      <Stack gap="xs">
        <Text variant="subheading" as={headingTag(level)} id={sectionId}>{title}</Text>
        {#if description}
          <div class="description">
            <Text variant="body-sm" tone="secondary">{description}</Text>
          </div>
        {/if}
      </Stack>
      {#if actions}
        <Inline gap="sm">{@render actions()}</Inline>
      {/if}
    </Inline>
  {/if}
  {@render children?.()}
</Stack>

<style>
  .description {
    max-width: var(--layout-reading-width);
  }
</style>
