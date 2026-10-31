<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button, Container, EmptyState, Stack, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/Stack',
    component: Stack,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component: 'Stack arranges children in one vertical flow with consistent gaps. Use it for page sections, form groups, and content blocks, not for horizontal rows or two-dimensional layouts. Choose the gap from the relationship between items and avoid overriding margins inside the stack.'
        }
      }
    }
  });
</script>

<Story name="Default" asChild>
  <Container width="reading">
    <Stack gap="md">
      <Text variant="heading" as="h2">Recent activity</Text>
      <Text variant="body" tone="secondary">
        Every change keeps its actor and timestamp so the history stays readable.
      </Text>
      <Text variant="body-sm" tone="muted">Updated 31 October 2026</Text>
    </Stack>
  </Container>
</Story>

<Story name="Compact" asChild>
  <Container width="form">
    <Stack gap="xs">
      <Text variant="label" as="span" tone="secondary">Workspace</Text>
      <Text variant="body">Orbit team</Text>
      <Text variant="label" as="span" tone="secondary">Owner</Text>
      <Text variant="body">Mara Chen</Text>
    </Stack>
  </Container>
</Story>

{#snippet createProject()}
  <Button>New project</Button>
{/snippet}

<Story name="Centered" asChild>
  <Container width="reading">
    <EmptyState
      title="No projects yet"
      description="Create the first project to give the team a shared place to work."
      action={createProject}
    />
  </Container>
</Story>

<style>
  :global(body) {
    background: var(--color-workspace);
  }
</style>
