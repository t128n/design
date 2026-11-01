<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
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
