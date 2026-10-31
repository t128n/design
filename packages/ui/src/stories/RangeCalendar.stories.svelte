<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { RangeCalendar } from '../index.js';

  const { Story } = defineMeta({
    title: 'Primitives/RangeCalendar',
    component: RangeCalendar,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
  import '../styles/index.css';
</script>

<Story name="Default" />
