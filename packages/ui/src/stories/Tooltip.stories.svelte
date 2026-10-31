<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Tooltip } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Overlays/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story
  name="Default"
  args={{
    content: 'Copy the project identifier to the clipboard.',
    triggerLabel: 'Copy project ID'
  }}
/>

<Story
  name="Bottom"
  args={{
    content: 'Archived projects are hidden from search.',
    triggerLabel: 'Archived projects',
    side: 'bottom'
  }}
/>
