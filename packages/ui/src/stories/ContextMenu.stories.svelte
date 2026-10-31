<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ContextMenu from '../lib/ContextMenu.svelte';

  const { Story } = defineMeta({
    title: 'Components/Overlays/ContextMenu',
    component: ContextMenu,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'ContextMenu exposes actions for the element the reader right-clicks or long-presses. Use it for secondary actions on a specific object, not for the only path to a primary action. Mirror the same actions somewhere visible and keep destructive items last.'
        }
      }
    }
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
