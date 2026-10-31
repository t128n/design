<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Link } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Controls/Link',
    component: Link,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story name="Default" args={{ href: '#documentation' }}>Read the documentation</Story>

<Story name="Ghost" args={{ href: '#account', variant: 'ghost' }}>Account settings</Story>

<Story name="Link" args={{ href: '#release-notes', variant: 'link' }}>
  View release notes
</Story>

<Story name="All variants" asChild>
  <div class="link-variants">
    <Link href="#documentation">Read the documentation</Link>
    <Link href="#account" variant="ghost">Account settings</Link>
    <Link href="#release-notes" variant="link">View release notes</Link>
  </div>
</Story>

<style>
  .link-variants {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-md);
  }
</style>
