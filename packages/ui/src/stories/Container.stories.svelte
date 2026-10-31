<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button, Container, Inline, Stack, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/Container',
    component: Container,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component: 'Container sets the readable width and horizontal padding for page content. Use it once per page region, not around every component or inside another Container. Choose the width from the content type and keep full-width containers for workspace surfaces.'
        }
      }
    }
  });
</script>

<Story name="Content" asChild>
  <Container width="content">
    <Stack gap="md">
      <Text variant="heading" as="h2">Content measure</Text>
      <Text variant="body" tone="secondary">
        Application content stays within a readable width while the workspace remains continuous.
      </Text>
      <Inline gap="sm">
        <Button>Save changes</Button>
        <Button variant="secondary">Cancel</Button>
      </Inline>
    </Stack>
  </Container>
</Story>

<Story name="Reading" asChild>
  <Container width="reading">
    <Stack gap="sm">
      <Text variant="heading" as="h2">Reading measure</Text>
      <Text variant="body">
        Reading surfaces keep short copy comfortable instead of spreading it across the viewport.
      </Text>
    </Stack>
  </Container>
</Story>

<Story name="Form" asChild>
  <Container width="form">
    <Stack gap="sm">
      <Text variant="heading" as="h2">Form measure</Text>
      <Text variant="body-sm" tone="secondary">
        Forms stay narrow enough to scan without losing the relationship between label and control.
      </Text>
    </Stack>
  </Container>
</Story>

<Story name="Full width" asChild>
  <Container width="full" padding="lg">
    <Text variant="body-sm" tone="secondary">
      Full width keeps only the token padding at the edge.
    </Text>
  </Container>
</Story>

<style>
  :global(body) {
    background: var(--color-workspace);
  }
</style>
