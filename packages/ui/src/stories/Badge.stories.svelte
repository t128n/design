<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Badge } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Badge',
    component: Badge,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Badge labels a compact status, count, or category beside content. Use it for short non-interactive metadata, not for actions, navigation, or long sentences. Choose the tone from the semantic meaning and keep the label to one or two words.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{ tone: 'info' }}>Info</Story>

<Story name="Tones" asChild>
  <div class="row">
    <Badge>Neutral</Badge>
    <Badge tone="info">Info</Badge>
    <Badge tone="progress">In progress</Badge>
    <Badge tone="success">Healthy</Badge>
    <Badge tone="warning">Needs review</Badge>
    <Badge tone="danger">Failed</Badge>
    <Badge tone="disabled">Archived</Badge>
  </div>
</Story>

<style>
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    font-family: var(--font-family-sans);
  }
</style>
