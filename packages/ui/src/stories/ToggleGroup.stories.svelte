<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { ToggleGroup } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Controls/ToggleGroup',
    component: ToggleGroup,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'ToggleGroup lets the reader choose one or more pressed options from a small set. Use it for view modes and formatting controls, not for form submission or long option lists. Keep the options mutually exclusive when the group is single-select and label the group.'
        }
      }
    }
  });

  const alignItems = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' }
  ];

  const formatItems = [
    { value: 'bold', label: 'Bold' },
    { value: 'italic', label: 'Italic' },
    { value: 'underline', label: 'Underline' }
  ];
</script>

<Story name="Single" args={{ type: 'single', value: 'left', items: alignItems }} />

<Story name="Multiple" args={{ type: 'multiple', value: ['bold'], items: formatItems }} />

<Story name="Vertical" args={{ type: 'single', value: 'left', orientation: 'vertical', items: alignItems }} />
