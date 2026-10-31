<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import SearchField from '$lib/components/SearchField.svelte';
  import StateMatrix from './StateMatrix.svelte';

  type Props = ComponentProps<typeof SearchField>;
  let props: Props = $props();
</script>

<StateMatrix
  component={SearchField}
  args={props}
  states={['default', 'focus-visible', 'disabled']}
/>
