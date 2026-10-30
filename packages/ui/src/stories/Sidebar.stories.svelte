<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Sidebar } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/Sidebar',
    component: Sidebar,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' }
  });

  const sections = [
    {
      label: 'Workspace',
      items: [
        { label: 'Overview', active: true },
        { label: 'Projects', badge: '12' },
        { label: 'Activity' }
      ]
    },
    {
      label: 'Account',
      items: [{ label: 'Preferences' }, { label: 'Members' }]
    }
  ];
</script>

<Story name="Default" asChild>
  <div class="sidebar-story">
    <Sidebar {sections} />
  </div>
</Story>

<style>
  .sidebar-story {
    width: 240px;
    min-height: 100vh;
    background: var(--color-canvas);
  }
</style>
