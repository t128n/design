<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import SegmentedControl from '$lib/components/SegmentedControl.svelte';
  import StateMatrix from './StateMatrix.svelte';

  type Props = ComponentProps<typeof SegmentedControl>;
  let props: Props = $props();
</script>

<StateMatrix
  component={SegmentedControl}
  args={props}
  states={['default', 'hover', 'pressed', 'focus-visible']}
  supportsDisabled={false}
/>
