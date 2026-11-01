<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { ScrollArea } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/ScrollArea',
    component: ScrollArea,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'ScrollArea contains a long region with its own scroll axis. Use it for lists and panels that must stay within a fixed frame, not for the main page or for content that should flow naturally. Keep the scroll region keyboard reachable and avoid nesting scroll areas.'
        }
      }
    }
  });
</script>

<Story name="Vertical" asChild>
  <div class="container">
    <ScrollArea orientation="vertical">
      <div class="content">
        {#each Array(20) as _, i}
          <div class="item">Item {i + 1}</div>
        {/each}
      </div>
    </ScrollArea>
  </div>
</Story>

<style>
  .container {
    height: 12rem;
    width: min(20rem, calc(100vw - 2rem));
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
  }

  .content {
    padding: var(--space-md);
    display: grid;
    gap: var(--space-sm);
  }

  .item {
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }
</style>
