<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Calendar } from '../index.js';

  const { Story } = defineMeta({
    title: 'Components/Forms/Calendar',
    component: Calendar,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Calendar selects a date or a set of dates in a compact month grid. Use it inside a date picker or a scheduling surface, not as a general-purpose date display. Keep the visible month labelled and pair the grid with a text field when the date must also be typed.'
        }
      }
    }
  });
  import '../styles/index.css';
</script>

<Story name="Default" args={{ type: 'single' }} />
<Story name="Multiple" args={{ type: 'multiple' }} />
