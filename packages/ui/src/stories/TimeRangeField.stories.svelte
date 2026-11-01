<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { TimeRangeField } from '../index.js';

  const { Story } = defineMeta({
    title: 'Components/Forms/TimeRangeField',
    component: TimeRangeField,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'TimeRangeField collects a start and end time as one labelled group. Use it for opening hours and availability windows, not for elapsed duration. Keep the two fields adjacent and validate that the end follows the start.'
        }
      }
    }
  });
  import '../styles/index.css';
</script>

<Story name="Default" args={{ label: 'Time range' }} />
<Story name="With error" args={{ label: 'Time range', error: 'Select a valid range.' }} />
