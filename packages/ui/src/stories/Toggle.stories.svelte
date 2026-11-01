<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Toggle } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Controls/Toggle',
    component: Toggle,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Toggle switches a formatting or view option on and off. Use it for a pressed state that applies immediately, not for navigation or for a setting that needs a label and description. Do keep the label visible and announce the pressed state; do not use it as a submit button.'
        }
      }
    }
  });
</script>

<Story name="Default" asChild>
  <Toggle ariaLabel="Toggle bold">Bold</Toggle>
</Story>

<Story name="Pressed" asChild>
  <Toggle ariaLabel="Toggle italic" pressed>Italic</Toggle>
</Story>

<style>
</style>
