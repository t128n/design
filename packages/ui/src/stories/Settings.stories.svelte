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
    parameters: {
      layout: 'fullscreen',
      controls: { disable: true },
      docs: {
        description: {
          component: 'Settings is a composed workspace view with navigation, sections, and form controls. Use it as a reference for preference screens, not as a form primitive. Keep each section focused on one decision; switches apply immediately, typed fields and checkboxes use the section Save action, and the two commit models are labeled. Signature patterns: continuous workspace, section headings, one danger-zone card.'
        }
      }
    }
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

{#snippet saveWorkspace()}
  <Inline gap="sm">
    <Button variant="secondary">Reset</Button>
    <Button>Save workspace details</Button>
  </Inline>
{/snippet}

{#snippet saveReviewRules()}
  <Button variant="secondary">Save review rules</Button>
{/snippet}

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
        <Section id="settings-workspace" title="Workspace" actions={saveWorkspace} gap="md">
          <Grid columns="auto" minItem="md" gap="md">
            <Input label="Workspace name" value="Acme" />
            <Select label="Default region" items={regions} value="us-east" />
          </Grid>
        </Section>

        <Section id="settings-review" title="Review rules" actions={saveReviewRules} gap="md">
          <Stack gap="md">
            <Switch
              label="Require review before archive"
              description="Applies immediately. An owner must approve the archive before it takes effect."
              checked
            />
            <Checkbox
              label="Allow guest access"
              description="Saved with Save review rules. Guests can read projects but cannot change them."
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
      </Page>
    </AppShell>
  </div>
</Story>

<style>
  .settings-view {
    background: var(--color-workspace);
  }
</style>
