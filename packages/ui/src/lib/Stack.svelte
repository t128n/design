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
  import type { LayoutTag, Space } from './layout';

  type Props = HTMLAttributes<HTMLElement> & {
    as?: LayoutTag;
    gap?: Space;
    align?: 'start' | 'center' | 'end' | 'stretch';
    class?: string;
    children?: Snippet;
  };

  let {
    as = 'div',
    gap = 'md',
    align = 'stretch',
    class: className = '',
    children,
    ...restProps
  }: Props = $props();
</script>

<svelte:element
  this={as}
  {...restProps}
  class={`stack gap-${gap} align-${align} ${className}`}
>
  {@render children?.()}
</svelte:element>

<style>
  .stack {
    display: grid;
    min-width: 0;
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

  .align-start {
    align-items: start;
  }

  .align-center {
    align-items: center;
  }

  .align-end {
    align-items: end;
  }

  .align-stretch {
    align-items: stretch;
  }
</style>
