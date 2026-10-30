<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Select } from '../index.js';
  import '../styles/index.css';

  const environments = [
    { value: 'development', label: 'Development' },
    { value: 'staging', label: 'Staging' },
    { value: 'production', label: 'Production' }
  ];

  const { Story } = defineMeta({
    title: 'Primitives/Select',
    component: Select,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story
  name="Default"
  args={{ label: 'Environment', placeholder: 'Choose an environment', items: environments }}
/>

<Story
  name="With value"
  args={{
    label: 'Environment',
    placeholder: 'Choose an environment',
    items: environments,
    value: 'staging'
  }}
/>

<Story
  name="With error"
  args={{
    label: 'Environment',
    placeholder: 'Choose an environment',
    items: environments,
    value: '',
    error: 'Choose an environment.'
  }}
/>

<Story
  name="Disabled"
  args={{
    label: 'Environment',
    placeholder: 'Choose an environment',
    items: environments,
    value: 'production',
    disabled: true
  }}
/>
