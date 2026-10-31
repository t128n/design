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
    Switch
  } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Views/Settings',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' }
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
        { label: 'Preferences', active: true },
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
  <AppShell {sidebar}>
    <PageHeader
      title="Settings"
      description="Workspace defaults, review rules, and notification preferences."
      actions={headerActions}
    />
    <div class="settings">
      <Card title="Workspace">
        <div class="form-grid">
          <Input label="Workspace name" value="Stellar" />
          <Select label="Default region" items={regions} value="us-east" />
        </div>
      </Card>

      <Card title="Review rules">
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
      </Card>

      <Card title="Danger zone">
        <p class="danger-copy">
          Archiving removes the workspace from search and makes every project read-only.
        </p>
        <Dialog
          title="Archive workspace"
          description="This changes access for everyone in the workspace."
          triggerLabel="Archive workspace"
          triggerVariant="secondary"
          footer={dialogFooter}
        >
          <p>You can restore the workspace later from the audit log.</p>
        </Dialog>
      </Card>

      <div class="actions">
        <Button variant="secondary">Reset</Button>
        <Button>Save changes</Button>
      </div>
    </div>
  </AppShell>
</Story>

<style>
  .settings {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-lg);
    max-width: var(--layout-form-width);
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

  .danger-copy {
    margin: 0 0 var(--space-md);
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-sm);
  }
</style>
