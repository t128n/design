<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
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
