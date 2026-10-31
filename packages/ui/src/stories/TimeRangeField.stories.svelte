<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { TimeRangeField } from '../index.js';

  const { Story } = defineMeta({
    title: 'Primitives/TimeRangeField',
    component: TimeRangeField,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
  import '../styles/index.css';
</script>

<Story name="Default" args={{ label: 'Time range' }} />
<Story name="With error" args={{ label: 'Time range', error: 'Select a valid range.' }} />
