<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Code, Container, Stack, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Code',
    component: Code,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' }
  });

  const sample = `type Project = {
  id: string;
  name: string;
};`;
</script>

<Story name="Inline" asChild>
  <Container width="reading">
    <Text variant="body">
      Set <Code>projectId</Code> before creating the project.
    </Text>
  </Container>
</Story>

<Story name="Block" asChild>
  <Container width="reading">
    <Code block>{sample}</Code>
  </Container>
</Story>

<Story name="In context" asChild>
  <Container width="reading">
    <Stack gap="md">
      <Text variant="heading" as="h2">Project identifier</Text>
      <Text variant="body" tone="secondary">
        Use the stable identifier when linking to a project from another tool.
      </Text>
      <Code block>{`const projectId = 'design-v0.1';`}</Code>
    </Stack>
  </Container>
</Story>

<style>
  :global(body) {
    background: var(--color-workspace);
  }
</style>
