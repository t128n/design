<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Combobox } from '../index.js';
  import '../styles/index.css';

  const frameworks = [
    { value: 'svelte', label: 'Svelte' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'solid', label: 'Solid' }
  ];

  const { Story } = defineMeta({
    title: 'Components/Forms/Combobox',
    component: Combobox,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story
  name="Default"
  args={{
    label: 'Framework',
    placeholder: 'Search framework...',
    items: frameworks
  }}
/>

<Story
  name="With value"
  args={{
    label: 'Framework',
    placeholder: 'Search framework...',
    items: frameworks,
    value: 'svelte',
    inputValue: 'Svelte'
  }}
/>

<Story
  name="With error"
  args={{
    label: 'Framework',
    placeholder: 'Search framework...',
    items: frameworks,
    error: 'Select a framework.'
  }}
/>

<Story
  name="Disabled"
  args={{
    label: 'Framework',
    placeholder: 'Search framework...',
    items: frameworks,
    value: 'react',
    inputValue: 'React',
    disabled: true
  }}
/>
