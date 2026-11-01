<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import type { Snippet } from 'svelte';
  import Text from './Text.svelte';
  import { headingTag, type HeadingLevel } from './typography';

  type Props = {
    title?: string;
    /** Semantic heading level for document order; cards default to 2. */
    level?: HeadingLevel;
    children?: Snippet;
  };

  let { title, level = 2, children }: Props = $props();
</script>

<section class="card" aria-label={title}>
  {#if title}
    <Text variant="subheading" as={headingTag(level)}>{title}</Text>
  {/if}
  {@render children?.()}
</section>

<style>
  .card {
    display: grid;
    gap: var(--space-md);
    padding: var(--space-lg);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
  }
</style>
