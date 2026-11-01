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

  const versions = [
    { value: 'latest', label: 'latest → 4.18.1', group: 'Dist-tags' },
    { value: 'next', label: 'next → 5.0.0-rc.1', group: 'Dist-tags' },
    { value: '4.18.1', label: '4.18.1', description: 'latest', group: 'Versions' },
    { value: '4.17.21', label: '4.17.21', group: 'Versions' },
    { value: '4.17.20', label: '4.17.20', group: 'Versions' }
  ];

  const packages = [
    { value: 'svelte', label: 'svelte', description: 'Cybernetically enhanced web apps' },
    { value: '@sveltejs/kit', label: '@sveltejs/kit', description: 'Web development, streamlined' },
    { value: 'bits-ui', label: 'bits-ui', description: 'Headless component primitives' },
    { value: 'runed', label: 'runed', description: 'Svelte 5 rune utilities' }
  ];

  const { Story } = defineMeta({
    title: 'Components/Forms/Combobox',
    component: Combobox,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component:
            'Combobox combines a text input with a filtered option list. Use it when the option set is long enough to search or comes from a remote result set, not for a short fixed list that a Select can show directly. Do keep the label visible and open the list as the reader types; do not use it for multi-select or for creating values that are not in items. It protects the intent constraint that feedback stays in place: the query, results, and loading or empty state share one field.'
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
  name="Open on input"
  args={{
    label: 'Framework',
    placeholder: 'Search framework...',
    items: frameworks,
    inputValue: 're',
    open: true
  }}
/>

<Story
  name="Grouped"
  args={{
    label: 'Version',
    placeholder: 'Search versions...',
    items: versions,
    groups: ['Dist-tags', 'Versions'],
    open: true
  }}
/>

<Story
  name="Async results"
  args={{
    label: 'Package',
    placeholder: 'Search npm packages...',
    items: packages,
    filterMode: 'manual',
    open: true
  }}
/>

<Story
  name="Loading"
  args={{
    label: 'Package',
    placeholder: 'Search npm packages...',
    items: [],
    filterMode: 'manual',
    loading: true,
    open: true
  }}
/>

<Story
  name="Empty"
  args={{
    label: 'Package',
    placeholder: 'Search npm packages...',
    items: [],
    emptyLabel: 'No packages found.',
    open: true
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
