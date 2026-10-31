<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button, Link, Navbar } from '../index.js';
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
    { label: 'Usage and billing history' },
    { label: 'Audit log exports' }
  ];
</script>

{#snippet accountUtilities()}
  <Link variant="ghost" href="/help">Help</Link>
  <Link variant="ghost" href="/account">Account</Link>
  <Button variant="ghost">Sign out</Button>
{/snippet}

<Story name="Basic" asChild>
  <Navbar links={primaryLinks} />
</Story>

<Story name="Account utilities" asChild>
  <Navbar links={accountLinks} actions={accountUtilities} />
</Story>

<Story name="Narrow screen" globals={{ viewport: { value: 'narrow320' } }} asChild>
  <Navbar links={accountLinks} actions={accountUtilities} />
</Story>

<Story name="Long labels" globals={{ viewport: { value: 'tablet768' } }} asChild>
  <Navbar links={longLinks} actions={accountUtilities} />
</Story>
