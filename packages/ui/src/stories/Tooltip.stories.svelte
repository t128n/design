<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Tooltip } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Overlays/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Tooltip names a control or explains a short detail on hover and focus. Use it for supplementary labels, not for essential instructions or interactive content. Keep the text brief and make sure the same information is available without hover.'
        }
      }
    }
  });
</script>

<Story
  name="Default"
  args={{
    content: 'Copy the project identifier to the clipboard.',
    triggerLabel: 'Copy project ID'
  }}
/>

<Story
  name="Bottom"
  args={{
    content: 'Archived projects are hidden from search.',
    triggerLabel: 'Archived projects',
    side: 'bottom'
  }}
/>
