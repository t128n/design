<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { AppShell, Card, Navbar, PageHeader, Sidebar } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/App shell',
    component: AppShell,
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

{#snippet sidebar()}
  <Sidebar {sections} />
{/snippet}

{#snippet navbar()}
  <Navbar
    links={[
      { label: 'Overview', active: true },
      { label: 'Projects' },
      { label: 'Activity' }
    ]}
  />
{/snippet}

<Story name="Default" asChild>
  <AppShell {sidebar} {navbar}>
    <PageHeader
      title="Overview"
      description="The shell combines navigation, a page header, and the content region."
    />
    <Card title="Content region">
      <p>Sidebar on the left, navbar on top, and a focusable main region.</p>
    </Card>
  </AppShell>
</Story>
