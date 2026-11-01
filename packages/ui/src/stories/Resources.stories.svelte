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
    Alert,
    AppShell,
    Badge,
    Button,
    Combobox,
    DropdownMenu,
    Link,
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

  const catalog = [
    {
      value: 'postgres',
      label: 'Postgres',
      description: 'Managed relational database',
      group: 'Databases'
    },
    { value: 'redis', label: 'Redis', description: 'Managed key-value store', group: 'Databases' },
    {
      value: 'object-storage',
      label: 'Object storage',
      description: 'Bucket for build artifacts',
      group: 'Storage'
    },
    {
      value: 'event-stream',
      label: 'Event stream',
      description: 'Change events for downstream jobs',
      group: 'Runtime'
    },
    {
      value: 'scheduler',
      label: 'Scheduler',
      description: 'Recurring jobs for the workspace',
      group: 'Runtime'
    }
  ];

  const columns = [
    { label: 'Service' },
    { label: 'Description' },
    { label: 'Plan' },
    { label: 'Status' }
  ];

  const sections = [
    {
      label: 'Workspace',
      items: [
        { label: 'Resources', href: '/workspaces/orbit/resources', active: true },
        { label: 'Activity', href: '/workspaces/orbit/activity' },
        { label: 'Variables', href: '/workspaces/orbit/variables' }
      ]
    }
  ];

  const links = [
    { label: 'Catalog', href: '/catalog' },
    { label: 'Docs', href: '/docs' },
    { label: 'Support', href: '/support' }
  ];

  const workspaceActions = [
    { label: 'Edit workspace' },
    { label: 'Copy workspace id' },
    { label: 'Delete workspace', disabled: true }
  ];

  const breadcrumbs = [
    { label: 'Workspaces', href: '/workspaces' },
    { label: 'Orbit', href: '/workspaces/orbit' },
    { label: 'Resources' }
  ];

  const { Story } = defineMeta({
    title: 'Views/Resources',
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      controls: { disable: true },
      docs: {
        description: {
          component:
            'Resources is a composed workspace view with top navigation, a section sidebar, breadcrumbs, a searchable catalog, and a status table. Use it as a reference for an application resource screen, not as a reusable template with fixed services. Keep one search-and-add action above the list, and let the table report status as text plus one tone. Signature patterns: continuous workspace, borderless table, inline feedback, one primary action.'
        }
      }
    }
  });
</script>

<script lang="ts">
  type StatusTone = 'success' | 'progress' | 'warning';

  type Service = {
    slug: string;
    name: string;
    description: string;
    plan: string;
    status: string;
    tone: StatusTone;
  };

  let services = $state<Service[]>([
    {
      slug: 'postgres',
      name: 'Postgres',
      description: 'Managed relational database',
      plan: 'Default',
      status: 'Ready',
      tone: 'success'
    },
    {
      slug: 'object-storage',
      name: 'Object storage',
      description: 'Bucket for build artifacts',
      plan: 'Default',
      status: 'Ready',
      tone: 'success'
    },
    {
      slug: 'event-stream',
      name: 'Event stream',
      description: 'Change events for downstream jobs',
      plan: 'Default',
      status: 'Pending',
      tone: 'progress'
    }
  ]);

  let serviceValue = $state<string | undefined>(undefined);
  let serviceInput = $state('');
  let added = $state<string | null>(null);

  const catalogOptions = $derived(
    catalog.map((item) => ({
      ...item,
      disabled: services.some((service) => service.slug === item.value)
    }))
  );

  const selectedService = $derived(catalog.find((item) => item.value === serviceValue));

  function addService() {
    const item = selectedService;

    if (!item) return;

    services = [
      ...services,
      {
        slug: item.value,
        name: item.label,
        description: item.description,
        plan: 'Default',
        status: 'Pending',
        tone: 'progress'
      }
    ];
    added = item.label;
    serviceValue = undefined;
    serviceInput = '';
  }
</script>

{#snippet headerActions()}
  <Button variant="secondary">Details</Button>
  <DropdownMenu
    triggerLabel="Actions"
    triggerVariant="secondary"
    align="end"
    items={workspaceActions}
  />
{/snippet}

{#snippet pageHeader()}
  <PageHeader
    title="Resources"
    description="Services attached to the Orbit workspace and their deployment status."
    {breadcrumbs}
    actions={headerActions}
  />
{/snippet}

{#snippet navbar()}
  <Navbar brand="Acme" links={links} />
{/snippet}

{#snippet sidebar()}
  <Sidebar {sections} label="Workspace" toggleLabel="Workspace" />
{/snippet}

<Story name="Resources">
  <div class="resources-view">
    <AppShell navbar={navbar} sidebar={sidebar}>
      <Page header={pageHeader}>
        <Section
          id="services-heading"
          title="Services"
          description="Connect services from the catalog. The list shows the deployment status for this workspace."
          labelledBy={false}
          gap="md"
        >
          <div class="service-toolbar">
            <div class="catalog-field">
              <Combobox
                label="Catalog service"
                placeholder="Search the service catalog..."
                items={catalogOptions}
                bind:value={serviceValue}
                bind:inputValue={serviceInput}
              />
            </div>
            <Button disabled={!serviceValue} onclick={addService}>Add service</Button>
          </div>

          {#if added}
            <Alert tone="success" title="Service added">
              {added} now appears in the list with a pending status.
            </Alert>
          {/if}

          <Table {columns} labelledBy="services-heading">
            {#each services as service (service.slug)}
              <TableRow>
                <TableCell>
                  <Link href={`/workspaces/orbit/services/${service.slug}`}>{service.name}</Link>
                </TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>{service.plan}</TableCell>
                <TableCell><Badge tone={service.tone}>{service.status}</Badge></TableCell>
              </TableRow>
            {/each}
          </Table>
        </Section>
      </Page>
    </AppShell>
  </div>
</Story>

<style>
  .resources-view {
    background: var(--color-workspace);
  }

  .service-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: var(--space-sm);
  }

  .catalog-field {
    flex: 1 1 18rem;
    min-width: 0;
  }
</style>
