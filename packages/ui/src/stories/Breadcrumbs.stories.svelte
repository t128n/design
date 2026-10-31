<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Breadcrumbs } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Breadcrumbs',
    component: Breadcrumbs,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story
  name="Default"
  args={{
    items: [
      { label: 'Workspace', href: '#' },
      { label: 'Projects', href: '#' },
      { label: 'Orbit' }
    ]
  }}
/>
