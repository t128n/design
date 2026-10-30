<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Checkbox } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story
  name="Default"
  args={{
    label: 'Include archived projects',
    description: 'Archived projects stay read-only.'
  }}
/>

<Story
  name="Checked"
  args={{
    label: 'Include archived projects',
    description: 'Archived projects stay read-only.',
    checked: true
  }}
/>

<Story
  name="Indeterminate"
  args={{
    label: 'Select all projects',
    description: 'Some projects are selected.',
    indeterminate: true
  }}
/>

<Story
  name="Disabled"
  args={{
    label: 'Include archived projects',
    description: 'Archived projects stay read-only.',
    disabled: true
  }}
/>
