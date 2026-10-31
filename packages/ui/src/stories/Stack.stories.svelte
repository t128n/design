<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Container, Stack, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Stack',
    component: Stack,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' }
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

<Story name="Centered" asChild>
  <Container width="reading">
    <Stack gap="sm" align="center">
      <Text variant="subheading" as="h2" align="center">No projects yet</Text>
      <Text variant="body-sm" tone="secondary" align="center">
        Create the first project to give the team a shared place to work.
      </Text>
    </Stack>
  </Container>
</Story>

<style>
  :global(body) {
    background: var(--color-workspace);
  }
</style>
