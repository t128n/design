<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { PinInput } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/PinInput',
    component: PinInput,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story
  name="Default"
  args={{
    label: 'Verification code',
    description: 'Enter the 6-digit code sent to your device.',
    maxlength: 6
  }}
/>

<Story
  name="Four digits"
  args={{
    label: 'PIN',
    description: 'Enter your 4-digit PIN.',
    maxlength: 4
  }}
/>

<Story
  name="With error"
  args={{
    label: 'Verification code',
    description: 'Enter the 6-digit code.',
    maxlength: 6,
    error: 'Invalid code.'
  }}
/>

<Story
  name="Disabled"
  args={{
    label: 'Verification code',
    description: 'Enter the 6-digit code.',
    maxlength: 6,
    disabled: true,
    value: '123456'
  }}
/>
