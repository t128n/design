<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Footer } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/Footer',
    component: Footer,
    tags: ['autodocs'],
    parameters: { layout: 'padded' }
  });
</script>

<Story name="Default" asChild>
  <Footer
    links={[
      { label: 'Docs' },
      { label: 'Status' },
      { label: 'Privacy' }
    ]}
    note="© 2026 Stellar"
  />
</Story>
