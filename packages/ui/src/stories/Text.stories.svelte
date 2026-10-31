<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Container, Inline, Stack, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Text',
    component: Text,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' }
  });
</script>

<Story name="Display" args={{ variant: 'display', as: 'h1' }}>
  Display — IBM Plex Sans, 32px
</Story>

<Story name="Heading" args={{ variant: 'heading', as: 'h2' }}>
  Heading — IBM Plex Sans, 24px
</Story>

<Story name="Subheading" args={{ variant: 'subheading', as: 'h3' }}>
  Subheading — IBM Plex Sans, 18px
</Story>

<Story name="Body" args={{ variant: 'body' }}>
  Body — 16px / 1.5 for readable application content.
</Story>

<Story name="Body small" args={{ variant: 'body-sm' }}>
  Small UI text — 14px / 1.5.
</Story>

<Story name="Label" args={{ variant: 'label', as: 'span' }}>
  Label — IBM Plex Sans, 14px
</Story>

<Story name="Caption" args={{ variant: 'caption', as: 'span' }}>
  Caption — IBM Plex Sans, 12px
</Story>

<Story name="All variants" asChild>
  <Container width="content">
    <Stack gap="lg">
      <Text variant="display" as="h1">Display — IBM Plex Sans, 32px</Text>
      <Text variant="heading" as="h2">Heading — IBM Plex Sans, 24px</Text>
      <Text variant="subheading" as="h3">Subheading — IBM Plex Sans, 18px</Text>
      <Text variant="body">Body — 16px / 1.5 for readable application content.</Text>
      <Text variant="body-sm">Small UI text — 14px / 1.5.</Text>
      <Text variant="label" as="span">Label and small UI text — 14px / 1.5.</Text>
      <Text variant="caption" as="span">Caption — metadata at 12px / 1.3.</Text>
    </Stack>
  </Container>
</Story>

<Story name="Tones and weights" asChild>
  <Container width="content">
    <Stack gap="sm">
      <Text variant="body">Primary body text.</Text>
      <Text variant="body" tone="secondary">Secondary body text.</Text>
      <Text variant="body" tone="muted">Muted supporting text.</Text>
      <Text variant="body" tone="danger">Danger is reserved for destructive or invalid states.</Text>
      <Text variant="body" weight="medium">Medium weight for restrained emphasis.</Text>
      <Text variant="body" weight="semibold">Semibold weight for headings and key labels.</Text>
    </Stack>
  </Container>
</Story>

<Story name="Numeric" asChild>
  <Container width="form">
    <Stack as="dl" gap="sm">
      <Inline gap="xl" justify="between">
        <Text as="dt" variant="body-sm" tone="secondary">Active projects</Text>
        <Text as="dd" variant="body" numeric>24</Text>
      </Inline>
      <Inline gap="xl" justify="between">
        <Text as="dt" variant="body-sm" tone="secondary">Needs review</Text>
        <Text as="dd" variant="body" numeric>1,248</Text>
      </Inline>
    </Stack>
  </Container>
</Story>

<Story name="Semantic elements" asChild>
  <Container width="reading">
    <Stack gap="lg">
      <Text variant="heading" as="h1">Page title</Text>
      <Text variant="body">
        The variant controls appearance. The as prop controls the native element and its meaning.
      </Text>
      <Text variant="body-sm" as="blockquote">
        Use blocks for meaningful quotations, not for decoration.
      </Text>
      <Text variant="caption" as="time" datetime="2026-10-31">31 October 2026</Text>
    </Stack>
  </Container>
</Story>

<Story name="Not for links or actions" asChild>
  <Container width="reading">
    <Stack gap="sm">
      <Text variant="body">
        Text never renders an anchor or button. Use Link for navigation and Button for actions.
      </Text>
      <Text variant="caption" as="span">
        This restriction keeps interaction semantics and focus behavior in the components that own them.
      </Text>
    </Stack>
  </Container>
</Story>

<style>
  :global(body) {
    background: var(--color-workspace);
  }
</style>
