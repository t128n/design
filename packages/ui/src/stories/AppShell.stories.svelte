<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    AppShell,
    Badge,
    Button,
    Link,
    List,
    Navbar,
    Page,
    PageHeader,
    Section,
    Sidebar,
    Table,
    TableCell,
    TableRow,
    Text
  } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/App shell',
    component: AppShell,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component: 'AppShell provides the persistent frame for an application screen: top navigation, sidebar, and main content. Use it for authenticated workspace views, not for marketing pages or isolated component demos. Compose Navbar and Sidebar into its named slots and keep one main landmark per screen.'
        }
      }
    }
  });

  const overviewSections = [
    {
      label: 'Workspace',
      items: [
        { label: 'Overview', active: true },
        { label: 'Projects', badge: '12' },
        { label: 'Activity' },
        { label: 'Reports' }
      ]
    },
    {
      label: 'Account',
      items: [{ label: 'Preferences' }, { label: 'Members' }]
    }
  ];

  const projectSections = [
    {
      label: 'Workspace',
      items: [
        { label: 'Overview' },
        { label: 'Projects', active: true, badge: '12' },
        { label: 'Activity' },
        { label: 'Reports' }
      ]
    },
    {
      label: 'Account',
      items: [{ label: 'Preferences' }, { label: 'Members' }]
    }
  ];

  const projectLinks = [
    { label: 'Overview' },
    { label: 'Projects', active: true },
    { label: 'Activity' },
    { label: 'Reports' }
  ];

  const projectColumns = [
    { label: 'Project' },
    { label: 'Owner' },
    { label: 'Updated', align: 'right' as const, numeric: true },
    { label: 'Status' }
  ];
</script>

{#snippet navbarUtilities()}
  <Link variant="ghost" href="/help">Help</Link>
  <Link variant="ghost" href="/account">Account</Link>
{/snippet}

{#snippet headerActions()}
  <Button variant="secondary">Export</Button>
  <Button>New project</Button>
{/snippet}

{#snippet projectsHeader()}
  <PageHeader
    title="Projects"
    description="Track ownership, status, and recent activity across the workspace."
    actions={headerActions}
  />
{/snippet}

{#snippet overviewHeader()}
  <PageHeader
    title="Overview"
    description="What changed, what needs attention, and who owns the next step."
    actions={headerActions}
  />
{/snippet}

{#snippet projectTable()}
  <Section id="projects-heading" title="Active projects" labelledBy={false}>
    <Table columns={projectColumns} labelledBy="projects-heading">
      <TableRow>
        <TableCell>Orbit</TableCell>
        <TableCell>Mara Chen</TableCell>
        <TableCell>2 minutes ago</TableCell>
        <TableCell><Badge tone="success">Healthy</Badge></TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Atlas</TableCell>
        <TableCell>Devon Ruiz</TableCell>
        <TableCell>18 minutes ago</TableCell>
        <TableCell><Badge tone="progress">In progress</Badge></TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Beacon</TableCell>
        <TableCell>—</TableCell>
        <TableCell>Yesterday</TableCell>
        <TableCell><Badge tone="warning">Needs owner</Badge></TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cinder</TableCell>
        <TableCell>Priya Shah</TableCell>
        <TableCell>2 days ago</TableCell>
        <TableCell><Badge tone="disabled">Archived</Badge></TableCell>
      </TableRow>
    </Table>
  </Section>
{/snippet}

{#snippet topNavbar()}
  <Navbar brand="Acme" links={projectLinks} actions={navbarUtilities} />
{/snippet}

{#snippet sidebarNav()}
  <Sidebar sections={overviewSections} label="Workspace" toggleLabel="Workspace" />
{/snippet}

{#snippet combinedNavbar()}
  <Navbar brand="Acme" actions={navbarUtilities} />
{/snippet}

{#snippet combinedSidebar()}
  <Sidebar sections={projectSections} label="Workspace" toggleLabel="Workspace" />
{/snippet}

<Story name="Top navigation" asChild>
  <AppShell navbar={topNavbar}>
    <Page header={projectsHeader}>
      {@render projectTable()}
    </Page>
  </AppShell>
</Story>

<Story name="Sidebar navigation" asChild>
  <AppShell sidebar={sidebarNav}>
    <Page header={overviewHeader}>
      <Section id="activity-heading" title="Recent activity">
        <List marker="none" separated gap="sm">
          <Text as="li" variant="body-sm" tone="secondary">
            <Text as="strong" variant="body-sm" weight="medium" tone="primary">Mara Chen</Text>
            updated the release plan for Orbit.
          </Text>
          <Text as="li" variant="body-sm" tone="secondary">
            <Text as="strong" variant="body-sm" weight="medium" tone="primary">Devon Ruiz</Text>
            assigned two reviewers to Atlas.
          </Text>
          <Text as="li" variant="body-sm" tone="secondary">
            <Text as="strong" variant="body-sm" weight="medium" tone="primary">Priya Shah</Text>
            moved Beacon to in review.
          </Text>
        </List>
      </Section>
    </Page>
  </AppShell>
</Story>

<Story name="Combined navigation" asChild>
  <AppShell navbar={combinedNavbar} sidebar={combinedSidebar}>
    <Page header={projectsHeader}>
      {@render projectTable()}
    </Page>
  </AppShell>
</Story>

<Story name="Narrow screen" globals={{ viewport: { value: 'narrow375' } }} asChild>
  <AppShell navbar={combinedNavbar} sidebar={combinedSidebar}>
    <Page header={projectsHeader}>
      {@render projectTable()}
    </Page>
  </AppShell>
</Story>
