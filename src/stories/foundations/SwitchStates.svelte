<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Switch from '$lib/components/Switch.svelte';
  import StateMatrix from './StateMatrix.svelte';

  type Props = ComponentProps<typeof Switch>;
  let props: Props = $props();
</script>

<StateMatrix component={Switch} args={props} states={['default', 'focus-visible', 'disabled']} />
