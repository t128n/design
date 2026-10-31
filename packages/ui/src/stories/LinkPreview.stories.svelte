<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LinkPreview } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/LinkPreview',
    component: LinkPreview,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story name="Default" asChild>
  <LinkPreview href="https://example.com" label="Hover over me">
    {#snippet content()}
      <div style="display: grid; gap: var(--space-xs);">
        <strong style="font-size: var(--font-size-label);">Example</strong>
        <span style="color: var(--color-text-secondary);">Preview content for the link.</span>
      </div>
    {/snippet}
  </LinkPreview>
</Story>
