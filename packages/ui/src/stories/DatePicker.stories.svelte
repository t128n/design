<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { DatePicker } from '../index.js';

  const { Story } = defineMeta({
    title: 'Components/Forms/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'DatePicker pairs a date field with a calendar overlay. Use it when the reader benefits from seeing the month, not for dates that are always known or copied from elsewhere. Open the calendar from the field and keep the typed value and the picked value in sync.'
        }
      }
    }
  });
  import '../styles/index.css';
</script>

<Story name="Default" args={{ label: 'Date' }} />
<Story name="With error" args={{ label: 'Date', error: 'Pick a date.' }} />
<Story name="Disabled" args={{ label: 'Date', disabled: true }} />
