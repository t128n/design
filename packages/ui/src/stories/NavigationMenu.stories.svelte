<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import NavigationMenu from '../lib/NavigationMenu.svelte';

  const { Story } = defineMeta({
    title: 'Components/Navigation/NavigationMenu',
    component: NavigationMenu,
    parameters: { layout: 'centered' }
  });
  import '../styles/index.css';
</script>

<Story name="Default" asChild>
  <NavigationMenu
    items={[
      {
        trigger: 'Product',
        links: [
          { href: '#', label: 'Overview' },
          { href: '#', label: 'Features' },
          { href: '#', label: 'Pricing', active: true }
        ]
      },
      {
        trigger: 'Docs',
        links: [
          { href: '#', label: 'Getting started' },
          { href: '#', label: 'API' }
        ]
      }
    ]}
  />
</Story>
