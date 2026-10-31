<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Textarea from '$lib/components/Textarea.svelte';
  import StateMatrix from './StateMatrix.svelte';

  type Props = ComponentProps<typeof Textarea>;
  let props: Props = $props();
</script>

<StateMatrix
  component={Textarea}
  args={props}
  states={['default', 'hover', 'focus-visible', 'disabled']}
/>
