<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Menubar } from '../index.js';

  const { Story } = defineMeta({
    title: 'Components/Overlays/Menubar',
    component: Menubar,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Menubar provides a persistent row of application menus. Use it for desktop-style commands that belong to the whole window, not for page navigation or mobile layouts. Keep menus task-oriented and make every command reachable from the keyboard.'
        }
      }
    }
  });
  import '../styles/index.css';
</script>

<Story name="Default" asChild>
  <Menubar
    menus={[
      {
        trigger: 'File',
        groups: [
          {
            items: [
              { label: 'New', shortcut: '⌘N' },
              { label: 'Open', shortcut: '⌘O' }
            ]
          },
          {
            items: [{ type: 'checkbox', label: 'Auto Save', checked: true }]
          }
        ]
      },
      {
        trigger: 'Edit',
        groups: [
          {
            items: [
              { label: 'Undo', shortcut: '⌘Z' },
              { label: 'Redo', shortcut: '⇧⌘Z' }
            ]
          }
        ]
      }
    ]}
  />
</Story>
