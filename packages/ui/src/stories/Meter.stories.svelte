<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Meter } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Feedback/Meter',
    component: Meter,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Meter shows a measured value within a known range, such as disk usage. Use it for a static measurement, not for task progress or an indeterminate wait. Keep the value and label visible and avoid color as the only signal of a threshold.'
        }
      }
    }
  });
</script>

<Story name="Default" asChild>
  <div class="meter-story">
    <Meter value={45} />
  </div>
</Story>

<Story name="WithLabel" asChild>
  <div class="meter-story">
    <Meter value={78} label="Disk usage" showValue />
  </div>
</Story>

<Story name="High" asChild>
  <div class="meter-story">
    <Meter value={92} label="CPU load" showValue />
  </div>
</Story>

<style>
  .meter-story {
    width: min(24rem, calc(100vw - 2rem));
    display: grid;
    gap: var(--space-md);
  }
</style>
