<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button, Link, Navbar } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/Navbar',
    component: Navbar,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component: 'Navbar provides the top-level navigation and account utilities for a workspace. Use it once per application shell, not inside content sections or as a substitute for a sidebar. Keep primary links short and move overflow into a menu at narrow widths.'
        }
      }
    }
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

{#snippet narrowUtilities()}
  <Link variant="ghost" href="/help">Help</Link>
  <Link variant="ghost" href="/account">Account</Link>
{/snippet}

<Story name="Basic" args={{ links: primaryLinks }} />

<Story name="Account utilities" args={{ links: accountLinks, actions: accountUtilities }} />

<Story
  name="Narrow screen"
  globals={{ viewport: { value: 'narrow320' } }}
  args={{ links: accountLinks, actions: narrowUtilities }}
/>

<Story
  name="Long labels"
  globals={{ viewport: { value: 'tablet768' } }}
  args={{ links: longLinks, actions: narrowUtilities }}
/>
