<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
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
