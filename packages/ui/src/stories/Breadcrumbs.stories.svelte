<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Breadcrumbs } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Navigation/Breadcrumbs',
    component: Breadcrumbs,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Breadcrumbs show the path back through a hierarchy. Use them on deep pages where the parent context is not otherwise visible, not on top-level pages or as a substitute for primary navigation. Do keep labels equal to the destination page titles and make the last item the current, non-link page; do not use breadcrumbs for sibling navigation.'
        }
      }
    }
  });
</script>

<Story
  name="Default"
  args={{
    items: [
      { label: 'Workspace', href: '#' },
      { label: 'Projects', href: '#' },
      { label: 'Orbit' }
    ]
  }}
/>
