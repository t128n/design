<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Popover from '../lib/Popover.svelte';

  const { Story } = defineMeta({
    title: 'Components/Popover',
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
    <div>
      <strong>Popover content</strong>
      <p>This is a simple popover.</p>
    </div>
  </Popover>
</Story>
