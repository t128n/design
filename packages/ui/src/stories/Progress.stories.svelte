<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Progress } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Feedback/Progress',
    component: Progress,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Progress shows completion of a task with a known total. Use it for uploads, imports, and other bounded operations, not for static measurements or indefinite loading. Pair it with a label when the operation is not obvious and keep the value updated.'
        }
      }
    }
  });
</script>

<Story name="Default" asChild>
  <div class="progress-story">
    <Progress value={60} />
  </div>
</Story>

<Story name="WithLabel" asChild>
  <div class="progress-story">
    <Progress value={72} label="Uploading" showValue />
  </div>
</Story>

<Story name="Indeterminate" asChild>
  <div class="progress-story">
    <Progress value={null} label="Processing" />
  </div>
</Story>

<style>
  .progress-story {
    width: min(24rem, calc(100vw - 2rem));
    display: grid;
    gap: var(--space-md);
  }
</style>
