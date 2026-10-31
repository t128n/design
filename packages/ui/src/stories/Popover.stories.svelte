<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Stack, Text } from '../index.js';
  import Popover from '../lib/Popover.svelte';

  const { Story } = defineMeta({
    title: 'Components/Overlays/Popover',
    component: Popover,
    args: {
      triggerLabel: 'Open popover'
    },
    parameters: { layout: 'centered' }
  });
  import '../styles/index.css';
</script>

<Story name="Default" asChild>
  <Popover triggerLabel="Open popover">
    <Stack gap="xs">
      <Text variant="label" as="strong">Popover content</Text>
      <Text variant="body-sm" tone="secondary">This is a simple popover.</Text>
    </Stack>
  </Popover>
</Story>
