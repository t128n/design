<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Slider } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Slider',
    component: Slider,
    tags: ['autodocs'],
    parameters: { layout: 'padded' }
  });
</script>

<Story
  name="Default"
  args={{
    label: 'Volume',
    value: [50],
    showValue: true,
    min: 0,
    max: 100,
    step: 1
  }}
/>

<Story
  name="Range"
  args={{
    label: 'Price range',
    value: [20, 80],
    showValue: true,
    min: 0,
    max: 100,
    step: 5
  }}
/>

<Story
  name="Disabled"
  args={{
    label: 'Volume',
    value: [30],
    showValue: true,
    disabled: true
  }}
/>
