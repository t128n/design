<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Separator } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Separator',
    component: Separator,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Separator marks a change of context between content groups. Use it sparingly to divide sections that are not already separated by spacing or a surface, not as decoration under every heading. Choose horizontal for stacked content and vertical for inline groups.'
        }
      }
    }
  });
</script>

<Story name="Horizontal" asChild>
  <div class="stack">
    <div>Content above</div>
    <Separator orientation="horizontal" />
    <div>Content below</div>
  </div>
</Story>

<Story name="Vertical" asChild>
  <div class="row">
    <div>Left</div>
    <Separator orientation="vertical" />
    <div>Right</div>
  </div>
</Story>

<style>
  .stack {
    display: grid;
    gap: var(--space-md);
    width: min(24rem, calc(100vw - 2rem));
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .row {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    height: 2rem;
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }
</style>
