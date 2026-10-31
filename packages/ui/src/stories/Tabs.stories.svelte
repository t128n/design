<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Tabs, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Navigation/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

{#snippet overview()}
  <Text variant="body" tone="secondary">
    Projects collect the work, owners, and activity for one initiative.
  </Text>
{/snippet}

{#snippet activity()}
  <Text variant="body" tone="secondary">
    Recent changes appear here with the actor and timestamp.
  </Text>
{/snippet}

{#snippet settings()}
  <Text variant="body" tone="secondary">
    Rename the project, move it between teams, or archive it.
  </Text>
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
  }
</style>
