<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Space } from './layout';
  import VisuallyHidden from './VisuallyHidden.svelte';

  type Props = {
    sidebar?: Snippet;
    navbar?: Snippet;
    /**
     * Outer padding for the main region. Use `none` when a `Container` inside
     * the shell should own padding and the shell must not add a second layer.
     */
    padding?: 'none' | Space;
    children?: Snippet;
  };

  let { sidebar, navbar, padding = 'xl', children }: Props = $props();
</script>

<div
  class="app-shell"
  class:with-sidebar={Boolean(sidebar)}
  class:has-navbar={Boolean(navbar)}
>
  <VisuallyHidden as="a" href="#main-content" focusable class="skip-link">
    Skip to content
  </VisuallyHidden>
  {#if navbar}
    <div class="navbar">{@render navbar()}</div>
  {/if}
  <div class="body">
    {#if sidebar}
      <div class="sidebar">{@render sidebar()}</div>
    {/if}
    <main id="main-content" tabindex="-1" class={`content padding-${padding}`}>
      <div class="content-inner">
        {@render children?.()}
      </div>
    </main>
  </div>
</div>

<style>
  .app-shell {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    background: var(--color-workspace);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .app-shell.has-navbar {
    grid-template-rows: auto minmax(0, 1fr);
  }

  .body {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    min-width: 0;
    min-height: 0;
  }

  .app-shell.with-sidebar .body {
    grid-template-columns: var(--layout-sidebar-width) minmax(0, 1fr);
  }

  .sidebar,
  .navbar {
    min-width: 0;
  }

  .content {
    flex: 1;
    min-width: 0;
    min-height: 0;
    background: var(--color-workspace);
  }

  .content.padding-none {
    padding: 0;
  }

  .content.padding-xs {
    padding: var(--space-xs);
  }

  .content.padding-sm {
    padding: var(--space-sm);
  }

  .content.padding-md {
    padding: var(--space-md);
  }

  .content.padding-lg {
    padding: var(--space-lg);
  }

  .content.padding-xl {
    padding: var(--space-xl);
  }

  .content.padding-2xl {
    padding: var(--space-2xl);
  }

  .content.padding-3xl {
    padding: var(--space-3xl);
  }

  .content:focus {
    outline: none;
  }

  .content:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: calc(-1 * var(--border-width-emphasis));
  }

  .content-inner {
    width: 100%;
    max-width: var(--layout-content-width);
    margin-inline: auto;
  }

  /* The skip link is a VisuallyHidden anchor; AppShell owns its overlay chrome. */
  .app-shell > :global(.skip-link) {
    position: fixed;
    top: var(--space-sm);
    left: var(--space-sm);
    z-index: 100;
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-sm);
    background: var(--color-accent);
    color: var(--color-on-accent);
    font-size: var(--font-size-label);
    text-decoration: none;
  }

  .app-shell > :global(.skip-link:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width);
  }

  /* --breakpoint-md: 800px; media queries cannot consume the custom property. */
  @media (max-width: 800px) {
    .app-shell.with-sidebar .body {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr);
    }

    .content.padding-xl,
    .content.padding-2xl,
    .content.padding-3xl {
      padding: var(--space-lg);
    }
  }
</style>
