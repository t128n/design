<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LinkPreview, Stack, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Overlays/LinkPreview',
    component: LinkPreview,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'LinkPreview shows a small preview when a link is hovered or focused. Use it for supplementary context on an external or referenced destination, not for essential content or touch-only flows. Keep the preview short and ensure the same information is reachable without hover.'
        }
      }
    }
  });
</script>

<Story name="Default" asChild>
  <LinkPreview href="https://example.com" label="Hover over me">
    {#snippet content()}
      <Stack gap="xs">
        <Text variant="label" as="strong" weight="medium">Example</Text>
        <Text variant="body-sm" tone="secondary">Preview content for the link.</Text>
      </Stack>
    {/snippet}
  </LinkPreview>
</Story>
