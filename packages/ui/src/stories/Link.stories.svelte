<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Link } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Controls/Link',
    component: Link,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Link navigates to another page, section, or resource. Use it for destinations and in-text references, not for actions that change state in place. Do keep the label descriptive of the destination and underline links inside body copy; do not style a link to look like a primary button.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{ href: '#documentation' }}>Read the documentation</Story>

<Story name="Ghost" args={{ href: '#account', variant: 'ghost' }}>Account settings</Story>

<Story name="Link" args={{ href: '#release-notes', variant: 'link' }}>
  View release notes
</Story>

<Story name="All variants" asChild>
  <div class="link-variants">
    <Link href="#documentation">Read the documentation</Link>
    <Link href="#account" variant="ghost">Account settings</Link>
    <Link href="#release-notes" variant="link">View release notes</Link>
  </div>
</Story>

<style>
  .link-variants {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-md);
  }
</style>
