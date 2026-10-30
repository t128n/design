<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Tabs } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

{#snippet overview()}
  <p>Projects collect the work, owners, and activity for one initiative.</p>
{/snippet}

{#snippet activity()}
  <p>Recent changes appear here with the actor and timestamp.</p>
{/snippet}

{#snippet settings()}
  <p>Rename the project, move it between teams, or archive it.</p>
{/snippet}

<Story name="Default" asChild>
  <div class="tabs-story">
    <Tabs
      tabs={[
        { value: 'overview', label: 'Overview', content: overview },
        { value: 'activity', label: 'Activity', content: activity },
        { value: 'settings', label: 'Settings', content: settings }
      ]}
    />
  </div>
</Story>

<style>
  .tabs-story {
    width: min(36rem, calc(100vw - 2rem));
    font-family: var(--font-family-sans);
  }

  .tabs-story :global(p) {
    margin: 0;
    color: var(--color-text-secondary);
    line-height: var(--line-height-body);
  }
</style>
