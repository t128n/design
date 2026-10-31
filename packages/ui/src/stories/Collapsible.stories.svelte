<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Collapsible } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Collapsible',
    component: Collapsible,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story name="Default" asChild>
  <div class="container">
    <Collapsible>
      {#snippet trigger()}
        Project details
      {/snippet}
      <p>
        This collapsible section contains additional information about the project, including
        metadata and configuration details.
      </p>
    </Collapsible>
  </div>
</Story>

<style>
  .container {
    width: min(24rem, calc(100vw - 2rem));
  }

  p {
    margin: 0;
    color: var(--color-text-secondary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }
</style>
