<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { NavigationMenu } from '../index.js';

  const { Story } = defineMeta({
    title: 'Components/Navigation/NavigationMenu',
    component: NavigationMenu,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'NavigationMenu opens grouped links from a top-level trigger. Use it for site-wide navigation with a shallow hierarchy, not for actions or deep application trees. Do keep each group labelled and the trigger a link to the section overview; do not hide the only path to a page inside a hover-only menu.'
        }
      }
    }
  });
  import '../styles/index.css';
</script>

<Story name="Default" asChild>
  <NavigationMenu
    items={[
      {
        trigger: 'Product',
        links: [
          { href: '#', label: 'Overview' },
          { href: '#', label: 'Features' },
          { href: '#', label: 'Pricing', active: true }
        ]
      },
      {
        trigger: 'Docs',
        links: [
          { href: '#', label: 'Getting started' },
          { href: '#', label: 'API' }
        ]
      }
    ]}
  />
</Story>
