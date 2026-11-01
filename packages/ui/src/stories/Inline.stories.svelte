<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Badge, Button, Container, Inline, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/Inline',
    component: Inline,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component: 'Inline lays out a short row of items with consistent gaps and wrapping. Use it for actions, metadata, and tags that read as one line, not for page sections or long forms. Let it wrap at narrow widths and keep the alignment consistent across the row.'
        }
      }
    }
  });
</script>

<Story name="Actions" asChild>
  <Container width="content">
    <Inline gap="sm">
      <Button>Save changes</Button>
      <Button variant="secondary">Cancel</Button>
    </Inline>
  </Container>
</Story>

<Story name="Metadata" asChild>
  <Container width="content">
    <Inline gap="md">
      <Badge tone="success">On track</Badge>
      <Text variant="body-sm" tone="secondary">Mara Chen</Text>
      <Text variant="body-sm" tone="muted">Updated 31 October 2026</Text>
    </Inline>
  </Container>
</Story>

<Story name="Space between" asChild>
  <Container width="content">
    <Inline gap="md" justify="between">
      <Text variant="subheading" as="h2">Recent projects</Text>
      <Inline gap="sm">
        <Button variant="secondary">Export</Button>
        <Button>New project</Button>
      </Inline>
    </Inline>
  </Container>
</Story>

<Story name="No wrap" asChild>
  <Container width="content">
    <Inline gap="sm" wrap={false}>
      <Badge tone="info">In review</Badge>
      <Badge tone="neutral">Design</Badge>
      <Badge tone="warning">Blocked</Badge>
    </Inline>
  </Container>
</Story>

<style>
  :global(body) {
    background: var(--color-workspace);
  }
</style>
