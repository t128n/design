<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Avatar } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story name="Fallback" asChild>
  <Avatar fallback="TN" />
</Story>

<Story name="Sizes" asChild>
  <div class="row">
    <Avatar fallback="TN" size="sm" />
    <Avatar fallback="TN" size="md" />
    <Avatar fallback="TN" size="lg" />
  </div>
</Story>

<style>
  .row {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }
</style>
