<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Meter } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Feedback/Meter',
    component: Meter,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
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
