<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ContextMenu from '../lib/ContextMenu.svelte';

  const { Story } = defineMeta({
    title: 'Components/ContextMenu',
    component: ContextMenu,
    parameters: { layout: 'centered' }
  });
  import '../styles/index.css';
</script>

<Story name="Default" asChild>
  <ContextMenu
    items={[
      { label: 'Copy', shortcut: '⌘C' },
      { label: 'Paste', shortcut: '⌘V' },
      { type: 'checkbox', label: 'Show hidden', checked: true }
    ]}
  >
    <div style="padding: 2rem; border: 1px dashed var(--color-border); text-align: center;">
      Right click here
    </div>
  </ContextMenu>
</Story>
