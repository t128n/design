<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

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
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'RadioGroup chooses exactly one option from a short visible set. Use it when every option should be compared at once, not for long lists or independent toggles. Keep option labels parallel and put shared guidance on the group label.'
        }
      }
    }
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
