<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DropdownMenu from '../lib/DropdownMenu.svelte';

  const { Story } = defineMeta({
    title: 'Components/DropdownMenu',
    component: DropdownMenu,
    args: {
      triggerLabel: 'Actions'
    },
    parameters: { layout: 'centered' }
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
