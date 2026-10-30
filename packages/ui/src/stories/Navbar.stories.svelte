<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button, Navbar } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/Navbar',
    component: Navbar,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' }
  });
</script>

{#snippet actions()}
  <Button variant="secondary">Sign in</Button>
  <Button>New project</Button>
{/snippet}

<Story name="Default" asChild>
  <Navbar
    links={[
      { label: 'Overview', active: true },
      { label: 'Projects' },
      { label: 'Activity' },
      { label: 'Settings' }
    ]}
    {actions}
  />
</Story>
