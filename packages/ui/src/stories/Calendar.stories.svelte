<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Calendar } from '../index.js';

  const { Story } = defineMeta({
    title: 'Components/Forms/Calendar',
    component: Calendar,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
  import '../styles/index.css';
</script>

<Story name="Default" args={{ type: 'single' }} />
<Story name="Multiple" args={{ type: 'multiple' }} />
