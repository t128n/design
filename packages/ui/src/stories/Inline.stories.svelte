<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Badge, Button, Container, Inline, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Inline',
    component: Inline,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' }
  });
</script>

<Story name="Actions" asChild>
  <Container width="content">
    <Inline gap="sm">
      <Button>Save changes</Button>
      <Button variant="secondary">Cancel</Button>
    </Inline>
  </Container>
</Story>

<Story name="Metadata" asChild>
  <Container width="content">
    <Inline gap="md">
      <Badge tone="success">On track</Badge>
      <Text variant="body-sm" tone="secondary">Mara Chen</Text>
      <Text variant="body-sm" tone="muted">Updated 31 October 2026</Text>
    </Inline>
  </Container>
</Story>

<Story name="Space between" asChild>
  <Container width="content">
    <Inline gap="md" justify="between">
      <Text variant="subheading" as="h2">Recent projects</Text>
      <Inline gap="sm">
        <Button variant="secondary">Export</Button>
        <Button>New project</Button>
      </Inline>
    </Inline>
  </Container>
</Story>

<Story name="No wrap" asChild>
  <Container width="content">
    <Inline gap="sm" wrap={false}>
      <Badge tone="info">In review</Badge>
      <Badge tone="neutral">Design</Badge>
      <Badge tone="warning">Blocked</Badge>
    </Inline>
  </Container>
</Story>

<style>
  :global(body) {
    background: var(--color-workspace);
  }
</style>
