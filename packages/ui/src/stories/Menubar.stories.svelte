<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Menubar from '../lib/Menubar.svelte';

  const { Story } = defineMeta({
    title: 'Components/Overlays/Menubar',
    component: Menubar,
    parameters: { layout: 'centered' }
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
