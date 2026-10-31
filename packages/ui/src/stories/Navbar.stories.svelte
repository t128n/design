<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button, Navbar } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/Navbar',
    component: Navbar,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' }
  });

  const primaryLinks = [
    { label: 'Overview', active: true },
    { label: 'Projects' },
    { label: 'Reports' },
    { label: 'Team' },
    { label: 'Settings' }
  ];

  const accountLinks = [
    { label: 'Overview' },
    { label: 'Projects', active: true },
    { label: 'Deployments' },
    { label: 'Members' },
    { label: 'Billing' }
  ];

  const longLinks = [
    { label: 'Overview', active: true },
    { label: 'Data integration pipelines' },
    { label: 'Compliance and retention' },
    { label: 'Workspace access reviews' },
    { label: 'Usage and billing history' }
  ];
</script>

{#snippet accountUtilities()}
  <a class="utility" href="#">Account</a>
  <Button variant="secondary">Sign in</Button>
{/snippet}

<Story name="Basic" asChild>
  <Navbar links={primaryLinks} />
</Story>

<Story name="Account utilities" asChild>
  <Navbar links={accountLinks} actions={accountUtilities} />
</Story>

<Story name="Narrow screen" asChild>
  <div class="narrow">
    <Navbar links={accountLinks} actions={accountUtilities} />
  </div>
</Story>

<Story name="Long labels" asChild>
  <div class="scroll-frame">
    <Navbar links={longLinks} />
  </div>
</Story>

<style>
  .utility {
    color: var(--color-text-secondary);
    font-size: var(--font-size-label);
    text-decoration: none;
    white-space: nowrap;
  }

  .utility:hover {
    color: var(--color-text-primary);
  }

  .utility:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: 2px;
  }

  .narrow {
    width: 360px;
    max-width: 100%;
  }

  .scroll-frame {
    width: 420px;
    max-width: 100%;
  }
</style>
