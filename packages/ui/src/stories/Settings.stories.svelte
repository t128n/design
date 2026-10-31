<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    AppShell,
    Button,
    Card,
    Checkbox,
    Dialog,
    Grid,
    Inline,
    Input,
    Page,
    PageHeader,
    Section,
    Select,
    Sidebar,
    Stack,
    Switch,
    Text
  } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Views/Settings',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } }
  });

  const sections = [
    {
      label: 'Workspace',
      items: [
        { label: 'Overview' },
        { label: 'Projects', badge: '12' },
        { label: 'Activity' }
      ]
    },
    {
      label: 'Account',
      items: [
        { label: 'Settings', active: true },
        { label: 'Members' }
      ]
    }
  ];

  const regions = [
    { value: 'us-east', label: 'US East' },
    { value: 'eu-west', label: 'EU West' },
    { value: 'ap-south', label: 'Asia Pacific' }
  ];
</script>

{#snippet sidebar()}
  <Sidebar {sections} label="Settings" toggleLabel="Settings" />
{/snippet}

{#snippet headerActions()}
  <Button variant="secondary">View audit log</Button>
{/snippet}

{#snippet dialogFooter({ close }: { close: () => void })}
  <Button variant="secondary" onclick={close}>Cancel</Button>
  <Button onclick={close}>Archive workspace</Button>
{/snippet}

{#snippet pageHeader()}
  <PageHeader
    title="Settings"
    description="Workspace defaults, review rules, and notification preferences."
    actions={headerActions}
  />
{/snippet}

<Story name="Settings">
  <div class="settings-view">
    <AppShell {sidebar}>
      <Page width="form" header={pageHeader}>
        <Section id="settings-workspace" title="Workspace" gap="md">
          <Grid columns="auto" minItem="md" gap="md">
            <Input label="Workspace name" value="Acme" />
            <Select label="Default region" items={regions} value="us-east" />
          </Grid>
        </Section>

        <Section id="settings-review" title="Review rules" gap="md">
          <Stack gap="md">
            <Switch
              label="Require review before archive"
              description="An owner must approve the archive before it takes effect."
              checked
            />
            <Checkbox
              label="Allow guest access"
              description="Guests can read projects but cannot change them."
            />
          </Stack>
        </Section>

        <Card title="Danger zone">
          <Text variant="body-sm" tone="secondary">
            Archiving removes the workspace from search and makes every project read-only.
          </Text>
          <Dialog
            title="Archive workspace"
            description="This changes access for everyone in the workspace."
            triggerLabel="Archive workspace"
            triggerVariant="secondary"
            footer={dialogFooter}
          >
            <Text variant="body" tone="secondary">
              You can restore the workspace later from the audit log.
            </Text>
          </Dialog>
        </Card>

        <Inline justify="end" gap="sm">
          <Button variant="secondary">Reset</Button>
          <Button>Save changes</Button>
        </Inline>
      </Page>
    </AppShell>
  </div>
</Story>

<style>
  .settings-view {
    background: var(--color-workspace);
  }
</style>
