<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Toolbar } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Toolbar',
    component: Toolbar,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
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
