<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { AspectRatio } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/AspectRatio',
    component: AspectRatio,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story name="Sixteen by nine" asChild>
  <div class="container">
    <AspectRatio ratio={16 / 9}>
      <div class="placeholder">16:9</div>
    </AspectRatio>
  </div>
</Story>

<Story name="Four by three" asChild>
  <div class="container">
    <AspectRatio ratio={4 / 3}>
      <div class="placeholder">4:3</div>
    </AspectRatio>
  </div>
</Story>

<style>
  .container {
    width: min(32rem, calc(100vw - 2rem));
  }

  .placeholder {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    background: var(--color-surface-subtle);
    color: var(--color-text-secondary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-body-sm);
  }
</style>
