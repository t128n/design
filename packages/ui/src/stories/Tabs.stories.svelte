<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Tabs, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Navigation/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Tabs switch between peer views of the same subject without leaving the page. Use them for a small set of related panels, not for sequential steps or primary navigation. Do keep all panels in the same region and preserve the selected tab in the URL when the view is linkable; do not use tabs to hide unrelated content.'
        }
      }
    }
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
