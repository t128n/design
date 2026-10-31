<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import StateMatrix from './StateMatrix.svelte';

  type Props = ComponentProps<typeof IconButton>;
  let props: Props = $props();
</script>

<StateMatrix
  component={IconButton}
  args={props}
  states={['default', 'hover', 'pressed', 'focus-visible', 'disabled']}
/>
