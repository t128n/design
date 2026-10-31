<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Switch } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Forms/Switch',
    component: Switch,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story
  name="Default"
  args={{
    label: 'Email notifications',
    description: 'Send a digest when a project changes.'
  }}
/>

<Story
  name="Checked"
  args={{
    label: 'Email notifications',
    description: 'Send a digest when a project changes.',
    checked: true
  }}
/>

<Story
  name="Disabled"
  args={{
    label: 'Email notifications',
    description: 'Send a digest when a project changes.',
    checked: true,
    disabled: true
  }}
/>
