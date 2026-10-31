<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button, Dialog, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Overlays/Dialog',
    component: Dialog,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Dialog focuses a self-contained task on top of the page. Use it for short forms, settings, and confirmations that need context, not for long multi-step flows or content that should remain visible. Keep a clear title, one primary action, and a close path that does not discard work silently.'
        }
      }
    }
  });
</script>

{#snippet footer({ close }: { close: () => void })}
  <Button variant="secondary" onclick={close}>Cancel</Button>
  <Button onclick={close}>Save changes</Button>
{/snippet}

<Story
  name="Default"
  args={{
    title: 'Project settings',
    description: 'Changes apply to everyone working in this project.',
    triggerLabel: 'Open dialog',
    footer
  }}
>
  <Text variant="body" tone="secondary">
    Project names must be unique within the workspace.
  </Text>
</Story>
