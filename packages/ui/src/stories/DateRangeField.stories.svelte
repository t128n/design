<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { DateRangeField } from '../index.js';

  const { Story } = defineMeta({
    title: 'Components/Forms/DateRangeField',
    component: DateRangeField,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'DateRangeField renders two labelled date inputs for a start and end date. Use it for typed ranges, not for comparing many dates across months. Keep the two fields adjacent and describe the accepted order in the field description.'
        }
      }
    }
  });
  import '../styles/index.css';
</script>

<Story name="Default" args={{ label: 'Date range' }} />
<Story name="With error" args={{ label: 'Date range', error: 'Select a valid range.' }} />
