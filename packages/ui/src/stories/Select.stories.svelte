<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

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
    title: 'Components/Forms/Select',
    component: Select,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Select chooses one option from a known list in a compact trigger. Use it for short fixed sets, not for searchable lists or multi-select. Do keep the label visible and show the chosen value in the trigger; do not use Select for actions or navigation.'
        }
      }
    }
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
