<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Card } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Card',
    component: Card,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story name="Default" args={{ title: 'Project details' }}>
  <p class="card-text">Use cards for meaningful independent regions, not every content group.</p>
</Story>

<style>
  .card-text {
    margin: 0;
    color: var(--color-text-secondary);
  }
</style>
