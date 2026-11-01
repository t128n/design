<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Checkbox } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Forms/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Checkbox records an independent yes or no choice, including mixed selection in a list. Use it for opt-in settings and multi-select sets, not for a single on/off preference that applies immediately. Do keep the label affirmative and group related boxes under a fieldset label; do not use a checkbox as a submit action.'
        }
      }
    }
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
