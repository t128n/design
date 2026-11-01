<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Alert, Button, Card, Combobox, Container, Inline, Stack, Text } from '../index.js';
  import '../styles/index.css';

  const packages = [
    { value: 'react', label: 'react', description: 'UI library' },
    { value: 'vue', label: 'vue', description: 'Progressive framework' },
    { value: 'vite', label: 'vite', description: 'Build tool' },
    { value: 'typescript', label: 'typescript', description: 'Typed JavaScript' },
    { value: 'zod', label: 'zod', description: 'Schema validation' }
  ];

  const { Story } = defineMeta({
    title: 'Views/Bundle',
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      controls: { disable: true },
      docs: {
        description: {
          component:
            'Bundle is a composed workspace view that turns one package choice into a downloadable archive. Use it as a reference for a single-task card composition, not as a form primitive or a generic content card. Keep the task in the title once, put the package choice in a labelled searchable field, and report the completed archive in place. Signature patterns: one primary action, inline feedback, whitespace grouping.'
        }
      }
    }
  });
</script>

<script lang="ts">
  let packageValue = $state<string | undefined>(undefined);
  let packageInput = $state('');
  let bundle = $state<string | null>(null);

  const canCreate = $derived(Boolean(packageValue));

  function createBundle() {
    if (!packageValue) return;

    bundle = `${packageValue}-latest.zip`;
  }

  function startAnother() {
    bundle = null;
    packageValue = undefined;
    packageInput = '';
  }
</script>

<Story name="Bundle">
  <div class="bundle-view">
    <Container width="form" padding="xl">
      <Card>
        <Stack gap="xs">
          <Text variant="label" as="span" tone="secondary">Package archive</Text>
          <Text variant="heading" as="h1">Create an offline bundle</Text>
        </Stack>
        <Text variant="body" tone="secondary">
          Select an npm package to create a downloadable archive.
        </Text>

        {#if bundle}
          <Alert tone="success" title="Bundle ready">
            {bundle} is ready to download.
          </Alert>
          <Inline justify="end">
            <Button variant="secondary" onclick={startAnother}>Create another bundle</Button>
            <Button>Download bundle</Button>
          </Inline>
        {:else}
          <Combobox
            label="Package"
            placeholder="Search npm packages..."
            description="Popular: react · vue · vite · typescript · zod"
            items={packages}
            bind:value={packageValue}
            bind:inputValue={packageInput}
          />
          <Inline justify="end">
            <Button disabled={!canCreate} onclick={createBundle}>Create bundle</Button>
          </Inline>
        {/if}
      </Card>
    </Container>
  </div>
</Story>

<style>
  .bundle-view {
    padding-block: var(--space-3xl);
    background: var(--color-workspace);
  }
</style>
