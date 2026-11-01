<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { TimeField } from '../index.js';

  const { Story } = defineMeta({
    title: 'Components/Forms/TimeField',
    component: TimeField,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'TimeField collects a single time with a label and validation. Use it for appointments and schedules, not for durations or free-form timestamps. Keep the hour cycle explicit and show the accepted format in the description.'
        }
      }
    }
  });
  import '../styles/index.css';
</script>

<Story name="Default" args={{ label: 'Time' }} />
<Story name="Twenty four hour" args={{ label: 'Start time', hourCycle: 24 }} />
<Story name="With error" args={{ label: 'Time', error: 'Time is required.' }} />
