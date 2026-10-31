<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { DateRangePicker } from '../index.js';

  const { Story } = defineMeta({
    title: 'Components/Forms/DateRangePicker',
    component: DateRangePicker,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'DateRangePicker pairs range fields with a calendar overlay. Use it for booking and reporting ranges where the month context matters, not for a single date or an open-ended search. Keep the selected range visible in the trigger and apply it only after both ends are chosen.'
        }
      }
    }
  });
  import '../styles/index.css';
</script>

<Story name="Default" args={{ label: 'Date range' }} />
<Story name="With error" args={{ label: 'Date range', error: 'Select a valid range.' }} />
