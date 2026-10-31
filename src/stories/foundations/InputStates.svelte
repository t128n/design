<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Input from '$lib/components/Input.svelte';
  import StateMatrix from './StateMatrix.svelte';

  type Props = ComponentProps<typeof Input>;
  let props: Props = $props();
</script>

<StateMatrix
  component={Input}
  args={props}
  states={['default', 'hover', 'focus-visible', 'disabled']}
/>
