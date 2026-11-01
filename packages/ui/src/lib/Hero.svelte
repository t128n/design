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
    eyebrow?: string;
    title: string;
    description?: string;
    actions?: Snippet;
    aside?: Snippet;
    align?: 'left' | 'center';
    /** Semantic heading level for document order; 1 is the page title. */
    level?: HeadingLevel;
  };

  let {
    eyebrow,
    title,
    description,
    actions,
    aside,
    align = 'left',
    level = 1
  }: Props = $props();

  const textAlign = $derived(align === 'center' ? 'center' : 'start');
</script>

<section
  class="hero"
  class:center={align === 'center'}
  class:has-aside={!!aside}
>
  <div class="copy">
    {#if eyebrow}
      <Text variant="label" as="span" tone="secondary" align={textAlign}>{eyebrow}</Text>
    {/if}
    <div class="title">
      <Text variant="display" as={headingTag(level)} align={textAlign}>{title}</Text>
    </div>
    {#if description}
      <div class="description">
        <Text variant="body" tone="secondary" align={textAlign}>{description}</Text>
      </div>
    {/if}
    {#if actions}
      <div class="actions">{@render actions()}</div>
    {/if}
  </div>
  {#if aside}
    <div class="aside">{@render aside()}</div>
  {/if}
</section>

<style>
  .hero {
    display: grid;
    gap: var(--space-2xl);
    padding: var(--space-3xl) 0;
    color: var(--color-text-primary);
  }

  .hero.has-aside {
    grid-template-columns: minmax(0, 1.1fr) minmax(var(--layout-aside-width), 0.9fr);
    align-items: start;
  }

  .hero.center {
    justify-items: center;
    text-align: center;
  }

  .copy {
    display: grid;
    gap: var(--space-sm);
    min-width: 0;
    max-width: 100%;
  }

  .center .copy {
    justify-items: center;
  }

  .title {
    max-width: 18ch;
  }

  .center .title {
    max-width: 22ch;
  }

  .description {
    max-width: var(--layout-reading-width);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    margin-top: var(--space-lg);
  }

  .center .actions {
    justify-content: center;
  }

  .aside {
    min-width: 0;
    align-self: start;
  }

  @media (max-width: 800px) {
    .hero.has-aside {
      grid-template-columns: 1fr;
    }

    .copy {
      --text-size-display: var(--font-size-heading);
      --text-leading-display: var(--line-height-heading);
    }
  }
</style>
