<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { DropdownMenu } from '../index.js';

  const { Story } = defineMeta({
    title: 'Components/Overlays/DropdownMenu',
    component: DropdownMenu,
    tags: ['autodocs'],
    args: {
      triggerLabel: 'Actions'
    },
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'DropdownMenu opens a list of actions from a trigger. Use it for secondary actions on the current object, not for navigation menus or for a single primary action. Keep item labels verb-led, group related items, and place destructive actions last.'
        }
      }
    }
  });
  import '../styles/index.css';
</script>

<Story name="Default" asChild>
  <DropdownMenu
    triggerLabel="Actions"
    groups={[
      {
        label: 'Actions',
        items: [
          { label: 'Edit', shortcut: '⌘E' },
          { label: 'Duplicate', shortcut: '⌘D' }
        ]
      },
      {
        label: 'View',
        items: [{ type: 'checkbox', label: 'Show sidebar', checked: true }]
      }
    ]}
  />
</Story>
