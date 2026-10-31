<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Separator } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Separator',
    component: Separator,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story name="Horizontal" asChild>
  <div class="stack">
    <div>Content above</div>
    <Separator orientation="horizontal" />
    <div>Content below</div>
  </div>
</Story>

<Story name="Vertical" asChild>
  <div class="row">
    <div>Left</div>
    <Separator orientation="vertical" />
    <div>Right</div>
  </div>
</Story>

<style>
  .stack {
    display: grid;
    gap: var(--space-md);
    width: min(24rem, calc(100vw - 2rem));
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .row {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    height: 2rem;
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }
</style>
