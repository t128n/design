<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import { mergeClasses } from './class';

  type Props = HTMLAnchorAttributes & {
    href: string;
    variant?: 'default' | 'ghost' | 'link';
    children?: Snippet;
  };

  let { href, variant = 'default', class: className, children, ...restProps }: Props = $props();

  const classes = $derived(
    mergeClasses(
      'link',
      variant === 'ghost' ? 'ghost' : '',
      variant === 'link' ? 'link-variant' : '',
      className
    )
  );
</script>

<a {href} {...restProps} class={classes}>
  {@render children?.()}
</a>

<style>
  .link {
    display: inline;
    color: var(--color-accent);
    font: inherit;
    text-decoration: none;
    text-underline-offset: var(--space-xs);
    transition: color var(--transition-duration);
  }

  .link:hover {
    text-decoration: underline;
  }

  .link:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .link.ghost {
    display: inline-flex;
    align-items: center;
    min-height: var(--control-height);
    padding: 0 var(--space-sm);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-text-secondary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-label);
    text-decoration: none;
  }

  .link.ghost:hover {
    background: var(--color-surface-subtle);
    color: var(--color-text-primary);
    text-decoration: none;
  }

  .link.link-variant {
    color: var(--color-accent);
    text-decoration: underline;
  }

  .link.link-variant:hover {
    color: var(--color-text-primary);
    text-decoration: underline;
  }
</style>
