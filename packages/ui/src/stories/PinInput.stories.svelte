<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { PinInput } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Forms/PinInput',
    component: PinInput,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'PinInput collects a short fixed-length code across separate cells. Use it for verification and one-time codes, not for passwords or free-form numbers. Keep the label visible and let paste and keyboard navigation work across the whole group.'
        }
      }
    }
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
