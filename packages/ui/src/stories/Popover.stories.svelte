<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Popover, Stack, Text } from '../index.js';

  const { Story } = defineMeta({
    title: 'Components/Overlays/Popover',
    component: Popover,
    tags: ['autodocs'],
    args: {
      triggerLabel: 'Open popover'
    },
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Popover anchors a small interactive panel to a trigger. Use it for contextual detail, filters, or a compact menu, not for long forms or content that must stay open while the page changes. Keep one trigger and close on outside click or Escape.'
        }
      }
    }
  });
  import '../styles/index.css';
</script>

<Story name="Default" asChild>
  <Popover triggerLabel="Open popover">
    <Stack gap="xs">
      <Text variant="label" as="strong">Popover content</Text>
      <Text variant="body-sm" tone="secondary">This is a simple popover.</Text>
    </Stack>
  </Popover>
</Story>
