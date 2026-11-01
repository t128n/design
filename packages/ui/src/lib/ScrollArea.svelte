<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import { ScrollArea } from 'bits-ui';
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    orientation?: 'vertical' | 'horizontal' | 'both';
    class?: string;
  };

  let { children, orientation = 'vertical', class: className = '' }: Props = $props();
</script>

<ScrollArea.Root class={`scroll-area ${className}`}>
  <ScrollArea.Viewport class="scroll-area-viewport" tabindex={0}>
    {@render children?.()}
  </ScrollArea.Viewport>
  {#if orientation === 'vertical' || orientation === 'both'}
    <ScrollArea.Scrollbar orientation="vertical" class="scroll-area-scrollbar">
      <ScrollArea.Thumb class="scroll-area-thumb" />
    </ScrollArea.Scrollbar>
  {/if}
  {#if orientation === 'horizontal' || orientation === 'both'}
    <ScrollArea.Scrollbar orientation="horizontal" class="scroll-area-scrollbar">
      <ScrollArea.Thumb class="scroll-area-thumb" />
    </ScrollArea.Scrollbar>
  {/if}
  <ScrollArea.Corner class="scroll-area-corner" />
</ScrollArea.Root>

<style>
  :global(.scroll-area) {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  :global(.scroll-area .scroll-area-viewport) {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  :global(.scroll-area .scroll-area-viewport:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: calc(-1 * var(--border-width-emphasis));
  }

  :global(.scroll-area .scroll-area-scrollbar) {
    display: flex;
    user-select: none;
    touch-action: none;
    padding: 2px;
    background: transparent;
    transition: background-color var(--transition-duration);
  }

  :global(.scroll-area .scroll-area-scrollbar[data-orientation='vertical']) {
    width: var(--scrollbar-size);
  }

  :global(.scroll-area .scroll-area-scrollbar[data-orientation='horizontal']) {
    height: var(--scrollbar-size);
    flex-direction: column;
  }

  :global(.scroll-area .scroll-area-scrollbar):hover {
    background: var(--color-surface-subtle);
  }

  :global(.scroll-area .scroll-area-thumb) {
    position: relative;
    flex: 1;
    border-radius: var(--radius-lg);
    background: var(--color-border);
  }

  :global(.scroll-area .scroll-area-thumb):hover {
    background: var(--color-text-muted);
  }

  :global(.scroll-area .scroll-area-thumb):focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  :global(.scroll-area .scroll-area-corner) {
    background: transparent;
  }
</style>
