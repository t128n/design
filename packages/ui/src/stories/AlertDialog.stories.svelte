<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { AlertDialog } from '../index.js';

  const { Story } = defineMeta({
    title: 'Components/Overlays/AlertDialog',
    component: AlertDialog,
    tags: ['autodocs'],
    args: {
      triggerLabel: 'Delete',
      triggerVariant: 'secondary',
      title: 'Delete item',
      description: 'This action cannot be undone.',
      actionLabel: 'Delete',
      actionVariant: 'danger'
    },
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'AlertDialog interrupts for a consequential confirmation that needs an explicit choice. Use it for destructive or irreversible actions, not for routine forms or unsaved edits that a Dialog can hold. Keep the action label a verb that names the outcome and reserve danger styling for the destructive choice.'
        }
      }
    }
  });
  import '../styles/index.css';
</script>

<Story name="Default" />
