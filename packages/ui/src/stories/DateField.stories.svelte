<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { DateField } from '../index.js';

  const { Story } = defineMeta({
    title: 'Components/Forms/DateField',
    component: DateField,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'DateField renders a labelled text field for a single date. Use it when the date is typed or pasted, not when the reader needs a calendar to compare dates. Do provide a visible label and a format example; do not rely on placeholder text as the label.'
        }
      }
    }
  });
  import '../styles/index.css';
</script>

<Story name="Default" args={{ label: 'Date of birth' }} />
<Story name="With error" args={{ label: 'Start date', error: 'Start date is required.' }} />
<Story name="Disabled" args={{ label: 'Start date', disabled: true }} />
