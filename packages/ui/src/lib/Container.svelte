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
  import type { Breakpoint, LayoutTag, Space } from './layout';

  type Props = HTMLAttributes<HTMLElement> & {
    as?: LayoutTag;
    width?: 'content' | 'reading' | 'form' | 'full';
    padding?: 'none' | Space;
    paddingAt?: Breakpoint;
    class?: string;
    children?: Snippet;
  };

  let {
    as = 'div',
    width = 'content',
    padding = 'xl',
    paddingAt = 'sm',
    class: className = '',
    children,
    ...restProps
  }: Props = $props();
</script>

<svelte:element
  this={as}
  {...restProps}
  class={`container width-${width} padding-${padding} padding-at-${paddingAt} ${className}`}
>
  {@render children?.()}
</svelte:element>

<style>
  .container {
    width: 100%;
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

  .padding-none {
    padding-inline: 0;
  }

  .padding-xs {
    padding-inline: var(--space-xs);
  }

  .padding-sm {
    padding-inline: var(--space-sm);
  }

  .padding-md {
    padding-inline: var(--space-md);
  }

  .padding-lg {
    padding-inline: var(--space-lg);
  }

  .padding-xl {
    padding-inline: var(--space-xl);
  }

  .padding-2xl {
    padding-inline: var(--space-2xl);
  }

  .padding-3xl {
    padding-inline: var(--space-3xl);
  }

  /* --breakpoint-sm: 640px; media queries cannot consume the custom property. */
  @media (max-width: 640px) {
    .container.padding-at-sm.padding-xl,
    .container.padding-at-sm.padding-2xl,
    .container.padding-at-sm.padding-3xl {
      padding-inline: var(--space-lg);
    }
  }

  /* --breakpoint-md: 800px; media queries cannot consume the custom property. */
  @media (max-width: 800px) {
    .container.padding-at-md.padding-xl,
    .container.padding-at-md.padding-2xl,
    .container.padding-at-md.padding-3xl {
      padding-inline: var(--space-lg);
    }
  }

  /* --breakpoint-lg: 1024px; media queries cannot consume the custom property. */
  @media (max-width: 1024px) {
    .container.padding-at-lg.padding-xl,
    .container.padding-at-lg.padding-2xl,
    .container.padding-at-lg.padding-3xl {
      padding-inline: var(--space-lg);
    }
  }
</style>
