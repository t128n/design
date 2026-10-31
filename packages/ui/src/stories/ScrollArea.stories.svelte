<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { ScrollArea } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/ScrollArea',
    component: ScrollArea,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
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
    border: 1px solid var(--color-border);
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
