<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { DateField } from '../index.js';

  const { Story } = defineMeta({
    title: 'Primitives/DateField',
    component: DateField,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
  import '../styles/index.css';
</script>

<Story name="Default" args={{ label: 'Date of birth' }} />
<Story name="With error" args={{ label: 'Start date', error: 'Start date is required.' }} />
<Story name="Disabled" args={{ label: 'Start date', disabled: true }} />
