<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { DateRangePicker } from '../index.js';

  const { Story } = defineMeta({
    title: 'Components/Forms/DateRangePicker',
    component: DateRangePicker,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
  import '../styles/index.css';
</script>

<Story name="Default" args={{ label: 'Date range' }} />
<Story name="With error" args={{ label: 'Date range', error: 'Select a valid range.' }} />
