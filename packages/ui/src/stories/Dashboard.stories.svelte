<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Alert,
    AppShell,
    Badge,
    Button,
    EmptyState,
    Grid,
    Page,
    PageHeader,
    Section,
    Sidebar,
    Stack,
    Table,
    TableCell,
    TableRow,
    Text
  } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Views/Dashboard',
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      controls: { disable: true },
      docs: {
        description: {
          component: 'Dashboard is a composed workspace view with page header, metrics, alerts, and a project table. Use it as a reference for operational screens, not as a reusable template with hard-coded content. Keep the page on the workspace surface and let sections own their own headings. Signature patterns: continuous workspace, inline alert, borderless table with tabular numerals, one primary action.'
        }
      }
    }
  });

  const sections = [
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

  const columns = [
    { label: 'Project' },
    { label: 'Owner' },
    { label: 'Updated', align: 'right' as const, numeric: true },
    { label: 'Status' }
  ];
</script>

{#snippet sidebarHeader()}
  <Stack gap="xs">
    <Text variant="label" as="span" weight="semibold">Acme</Text>
    <Text variant="caption" as="span" tone="muted">Orbit team</Text>
  </Stack>
{/snippet}

{#snippet sidebar()}
  <Sidebar
    {sections}
    header={sidebarHeader}
    label="Workspace"
    toggleLabel="Workspace"
  />
{/snippet}

{#snippet headerActions()}
  <Button variant="secondary">Export</Button>
  <Button>New project</Button>
{/snippet}

{#snippet archiveAction()}
  <Button variant="secondary">View the archive</Button>
{/snippet}

{#snippet viewAll()}
  <Button variant="secondary">View all</Button>
{/snippet}

{#snippet pageHeader()}
  <PageHeader
    title="Overview"
    description="What changed, what needs attention, and who owns the next step."
    actions={headerActions}
  />
{/snippet}

<Story name="Dashboard">
  <div class="dashboard">
    <AppShell {sidebar}>
      <Page header={pageHeader}>
        <Alert tone="warning" title="Two projects need an owner">
          Assign an owner to Beacon and Cinder before the review on Friday.
        </Alert>
        <Grid columns="auto" minItem="sm" gap="xl">
          <Stack gap="xs">
            <Text variant="body-sm" as="span" tone="secondary">Active projects</Text>
            <Text variant="heading" as="strong" numeric>12</Text>
            <Badge tone="success">+2 this week</Badge>
          </Stack>
          <Stack gap="xs">
            <Text variant="body-sm" as="span" tone="secondary">Needs review</Text>
            <Text variant="heading" as="strong" numeric>3</Text>
            <Badge tone="warning">Due Friday</Badge>
          </Stack>
          <Stack gap="xs">
            <Text variant="body-sm" as="span" tone="secondary">Archived this quarter</Text>
            <Text variant="heading" as="strong" numeric>28</Text>
            <Badge tone="neutral">No action needed</Badge>
          </Stack>
        </Grid>
        <Section
          id="recent-heading"
          labelledBy={false}
          title="Recent projects"
          description="Ownership, status, and the latest update for each project."
          actions={viewAll}
        >
          <Table {columns} labelledBy="recent-heading">
            <TableRow>
              <TableCell>Orbit</TableCell>
              <TableCell>Mara Chen</TableCell>
              <TableCell>2 minutes ago · 10:42</TableCell>
              <TableCell><Badge tone="success">Healthy</Badge></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Atlas</TableCell>
              <TableCell>Devon Ruiz</TableCell>
              <TableCell>18 minutes ago · 10:26</TableCell>
              <TableCell><Badge tone="progress">In progress</Badge></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Beacon</TableCell>
              <TableCell>No owner</TableCell>
              <TableCell>Yesterday · 16:10</TableCell>
              <TableCell><Badge tone="warning">Needs owner</Badge></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cinder</TableCell>
              <TableCell>Priya Shah</TableCell>
              <TableCell>2 days ago · 09:05</TableCell>
              <TableCell><Badge tone="disabled">Archived</Badge></TableCell>
            </TableRow>
          </Table>
        </Section>
        <EmptyState
          level={3}
          title="No archived projects"
          description="Projects you archive will appear here for reference."
          action={archiveAction}
        />
      </Page>
    </AppShell>
  </div>
</Story>

<style>
  .dashboard {
    background: var(--color-workspace);
  }
</style>
