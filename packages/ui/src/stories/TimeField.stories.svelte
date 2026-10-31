<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { TimeField } from '../index.js';

  const { Story } = defineMeta({
    title: 'Primitives/TimeField',
    component: TimeField,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
  import '../styles/index.css';
</script>

<Story name="Default" args={{ label: 'Time' }} />
<Story name="Twenty four hour" args={{ label: 'Start time', hourCycle: 24 }} />
<Story name="With error" args={{ label: 'Time', error: 'Time is required.' }} />
