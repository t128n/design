<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
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
