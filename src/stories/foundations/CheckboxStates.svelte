<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import StateMatrix from './StateMatrix.svelte';

  type Props = ComponentProps<typeof Checkbox>;
  let props: Props = $props();
</script>

<StateMatrix
  component={Checkbox}
  args={props}
  states={['default', 'focus-visible', 'disabled']}
/>
