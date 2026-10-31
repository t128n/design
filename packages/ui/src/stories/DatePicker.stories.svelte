<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { DatePicker } from '../index.js';

  const { Story } = defineMeta({
    title: 'Primitives/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
  import '../styles/index.css';
</script>

<Story name="Default" args={{ label: 'Date' }} />
<Story name="With error" args={{ label: 'Date', error: 'Pick a date.' }} />
<Story name="Disabled" args={{ label: 'Date', disabled: true }} />
