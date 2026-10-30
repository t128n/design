<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button, Card, PageHeader } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/Page header',
    component: PageHeader,
    tags: ['autodocs'],
    parameters: { layout: 'padded' }
  });
</script>

{#snippet actions()}
  <Button variant="secondary">Export</Button>
  <Button>New project</Button>
{/snippet}

<Story name="Default" asChild>
  <div>
    <PageHeader
      title="Projects"
      description="Track ownership, status, and recent activity across the workspace."
      breadcrumbs={[
        { label: 'Workspace', href: '#' },
        { label: 'Projects' }
      ]}
      {actions}
    />
    <Card title="Orbit">
      <p>Updated 2 minutes ago by Mara Chen.</p>
    </Card>
  </div>
</Story>
