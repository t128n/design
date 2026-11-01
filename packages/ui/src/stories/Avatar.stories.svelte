<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Avatar } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Avatar identifies a person or team with initials or an image. Use it beside names and ownership metadata, not as the only accessible label for an action. Pair it with a visible name or an explicit aria label and keep the size consistent within a row.'
        }
      }
    }
  });
</script>

<Story name="Fallback" asChild>
  <Avatar fallback="TN" />
</Story>

<Story name="Sizes" asChild>
  <div class="row">
    <Avatar fallback="TN" size="sm" />
    <Avatar fallback="TN" size="md" />
    <Avatar fallback="TN" size="lg" />
  </div>
</Story>

<style>
  .row {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }
</style>
