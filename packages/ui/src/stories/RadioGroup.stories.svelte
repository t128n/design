<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { RadioGroup } from '../index.js';
  import '../styles/index.css';

  const options = [
    { value: 'email', label: 'Email', description: 'Get notifications by email.' },
    { value: 'sms', label: 'SMS', description: 'Get notifications by text message.' },
    { value: 'push', label: 'Push', description: 'Get notifications in the app.' }
  ];

  const { Story } = defineMeta({
    title: 'Components/Forms/RadioGroup',
    component: RadioGroup,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story
  name="Default"
  args={{
    label: 'Notification method',
    description: 'Choose how you want to be notified.',
    items: options
  }}
/>

<Story
  name="Horizontal"
  args={{
    label: 'Notification method',
    items: options,
    orientation: 'horizontal'
  }}
/>

<Story
  name="Disabled"
  args={{
    label: 'Notification method',
    items: options,
    value: 'email',
    disabled: true
  }}
/>
