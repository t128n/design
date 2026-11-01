<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

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
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Combobox combines a text input with a filtered option list. Use it when the option set is long enough to search, not for a short fixed list that a Select can show directly. Keep the label visible, announce the active option, and allow keyboard selection without leaving the field.'
        }
      }
    }
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
