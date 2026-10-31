<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { DateRangeField } from '../index.js';

  const { Story } = defineMeta({
    title: 'Primitives/DateRangeField',
    component: DateRangeField,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
  import '../styles/index.css';
</script>

<Story name="Default" args={{ label: 'Date range' }} />
<Story name="With error" args={{ label: 'Date range', error: 'Select a valid range.' }} />
