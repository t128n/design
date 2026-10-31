<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button, EmptyState } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/EmptyState',
    component: EmptyState,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

{#snippet createProject()}
  <Button>New project</Button>
{/snippet}

{#snippet viewArchive()}
  <Button variant="secondary">View the archive</Button>
{/snippet}

<Story name="Default" asChild>
  <div class="frame">
    <EmptyState
      title="No projects yet"
      description="Create the first project to give the team a shared place to work."
      action={createProject}
    />
  </div>
</Story>

<Story name="Nested heading" asChild>
  <div class="frame">
    <EmptyState
      level={3}
      title="No archived projects"
      description="Projects you archive stay here for reference."
      action={viewArchive}
    />
  </div>
</Story>

<style>
  .frame {
    width: min(32rem, calc(100vw - var(--space-2xl)));
    background: var(--color-workspace);
  }
</style>
