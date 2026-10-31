<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Toggle } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Controls/Toggle',
    component: Toggle,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story name="Default" asChild>
  <Toggle ariaLabel="Toggle bold">Bold</Toggle>
</Story>

<Story name="Pressed" asChild>
  <Toggle ariaLabel="Toggle italic" pressed>Italic</Toggle>
</Story>

<style>
</style>
