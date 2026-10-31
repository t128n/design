<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    AppShell,
    Button,
    Card,
    Checkbox,
    Dialog,
    Input,
    PageHeader,
    Select,
    Sidebar,
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

<Story name="Settings">
  <div class="settings-view">
    <AppShell {sidebar}>
      <PageHeader
        title="Settings"
        description="Workspace defaults, review rules, and notification preferences."
        actions={headerActions}
      />
      <div class="settings">
        <section class="settings-section" aria-labelledby="settings-workspace">
          <Text variant="subheading" as="h2" id="settings-workspace">Workspace</Text>
          <div class="form-grid">
            <Input label="Workspace name" value="Acme" />
            <Select label="Default region" items={regions} value="us-east" />
          </div>
        </section>

        <section class="settings-section" aria-labelledby="settings-review">
          <Text variant="subheading" as="h2" id="settings-review">Review rules</Text>
          <div class="choices">
            <Switch
              label="Require review before archive"
              description="An owner must approve the archive before it takes effect."
              checked
            />
            <Checkbox
              label="Allow guest access"
              description="Guests can read projects but cannot change them."
            />
          </div>
        </section>

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

        <div class="actions">
          <Button variant="secondary">Reset</Button>
          <Button>Save changes</Button>
        </div>
      </div>
    </AppShell>
  </div>
</Story>

<style>
  .settings-view {
    background: var(--color-workspace);
  }

  .settings {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-2xl);
    max-width: var(--layout-form-width);
  }

  .settings-section {
    display: grid;
    gap: var(--space-md);
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--space-md);
  }

  .choices {
    display: grid;
    gap: var(--space-md);
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-sm);
  }
</style>
