<script lang="ts">
  import Tabs from '$lib/components/Tabs.svelte';
  import StateMatrix from './StateMatrix.svelte';

  interface TabItem {
    value: string;
    label: string;
    count?: number;
  }

  interface Props {
    tabs?: TabItem[];
    value?: string;
    label?: string;
  }

  let {
    tabs = [
      { value: 'overview', label: 'Overview' },
      { value: 'activity', label: 'Activity', count: 8 },
      { value: 'settings', label: 'Settings' },
    ],
    value = 'overview',
    label = 'Sections',
  }: Props = $props();
</script>

<StateMatrix
  component={Tabs}
  args={{ tabs, value, label }}
  states={['default', 'hover', 'pressed', 'focus-visible']}
  supportsDisabled={false}
  note="Tabs have no disabled state in this system: a tab that cannot be opened is not shown."
/>
