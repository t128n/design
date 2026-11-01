<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LinkPreview, Stack, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Overlays/LinkPreview',
    component: LinkPreview,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'LinkPreview shows a small preview when a link is hovered or focused. Use it for supplementary context on an external or referenced destination, not for essential content or touch-only flows. Keep the preview short and ensure the same information is reachable without hover.'
        }
      }
    }
  });
</script>

<Story name="Default" asChild>
  <LinkPreview href="https://example.com" label="Hover over me">
    {#snippet content()}
      <Stack gap="xs">
        <Text variant="label" as="strong" weight="medium">Example</Text>
        <Text variant="body-sm" tone="secondary">Preview content for the link.</Text>
      </Stack>
    {/snippet}
  </LinkPreview>
</Story>
