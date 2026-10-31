<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Button from '$lib/components/Button.svelte';
  import StateMatrix from './StateMatrix.svelte';

  type Props = ComponentProps<typeof Button>;
  let props: Props = $props();
</script>

<StateMatrix
  component={Button}
  args={props}
  states={['default', 'hover', 'pressed', 'focus-visible', 'disabled']}
/>
