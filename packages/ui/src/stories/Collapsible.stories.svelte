<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Collapsible, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Navigation/Collapsible',
    component: Collapsible,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Collapsible hides optional detail behind a single trigger. Use it for supplementary explanation that most readers can skip, not for essential instructions or navigation. Keep the trigger label specific to the hidden content and preserve focus when the panel opens.'
        }
      }
    }
  });
</script>

<Story name="Default" asChild>
  <div class="container">
    <Collapsible>
      {#snippet trigger()}
        Project details
      {/snippet}
      <Text variant="body-sm" tone="secondary">
        This collapsible section contains additional information about the project, including
        metadata and configuration details.
      </Text>
    </Collapsible>
  </div>
</Story>

<style>
  .container {
    width: min(24rem, calc(100vw - 2rem));
  }
</style>
