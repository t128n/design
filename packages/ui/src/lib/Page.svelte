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
  import type { Space } from './layout';

  type Props = HTMLAttributes<HTMLDivElement> & {
    width?: 'content' | 'reading' | 'form' | 'full';
    /** Vertical rhythm between the header and each section. */
    gap?: Space;
    header?: Snippet;
    class?: string;
    children?: Snippet;
  };

  let {
    width = 'content',
    gap = '2xl',
    header,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(mergeClasses('page', `width-${width}`, `gap-${gap}`, className));
</script>

<!-- Page owns measure and vertical rhythm only. AppShell or Container owns padding. -->
<div {...restProps} class={classes}>
  {#if header}
    <div class="header">{@render header()}</div>
  {/if}
  {@render children?.()}
</div>

<style>
  .page {
    display: grid;
    min-width: 0;
    margin-inline: auto;
  }

  .width-content {
    max-width: var(--layout-content-width);
  }

  .width-reading {
    max-width: var(--layout-reading-width);
  }

  .width-form {
    max-width: var(--layout-form-width);
  }

  .width-full {
    max-width: none;
  }

  .gap-xs {
    gap: var(--space-xs);
  }

  .gap-sm {
    gap: var(--space-sm);
  }

  .gap-md {
    gap: var(--space-md);
  }

  .gap-lg {
    gap: var(--space-lg);
  }

  .gap-xl {
    gap: var(--space-xl);
  }

  .gap-2xl {
    gap: var(--space-2xl);
  }

  .gap-3xl {
    gap: var(--space-3xl);
  }

  .header {
    min-width: 0;
  }

  /* Page owns the vertical rhythm, so a composed PageHeader drops its own margin. */
  .header :global(.page-header) {
    margin-bottom: 0;
  }
</style>
