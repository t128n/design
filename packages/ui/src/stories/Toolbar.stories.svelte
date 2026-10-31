<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Toolbar } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Controls/Toolbar',
    component: Toolbar,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Toolbar groups related actions in a compact row. Use it for formatting and view controls around a shared target, not for page navigation or a single button. Do group related controls with separators and give icon-only items accessible names; do not mix destructive actions into the primary cluster.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <Toolbar
    items={[
      { label: 'Bold' },
      { label: 'Italic' },
      { label: 'Underline' }
    ]}
  />
</Story>

<Story name="Vertical">
  <Toolbar
    orientation="vertical"
    items={[
      { label: 'Align left' },
      { label: 'Align center' },
      { label: 'Align right' }
    ]}
  />
</Story>
