<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ContextMenu from '../lib/ContextMenu.svelte';

  const { Story } = defineMeta({
    title: 'Components/Overlays/ContextMenu',
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
    <div class="context-demo">
      Right click here
    </div>
  </ContextMenu>
</Story>

<style>
  .context-demo {
    padding: var(--space-2xl);
    border: var(--border-width) dashed var(--color-border);
    text-align: center;
  }
</style>
