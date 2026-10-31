<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { RangeCalendar } from '../index.js';

  const { Story } = defineMeta({
    title: 'Components/Forms/RangeCalendar',
    component: RangeCalendar,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'RangeCalendar selects a start and end date in one month grid. Use it inside a date range picker, not for a single date or a list of unrelated dates. Keep the selected range visible and announce both endpoints to assistive technology.'
        }
      }
    }
  });
  import '../styles/index.css';
</script>

<Story name="Default" />
