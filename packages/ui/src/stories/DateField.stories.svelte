<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { DateField } from '../index.js';

  const { Story } = defineMeta({
    title: 'Components/Forms/DateField',
    component: DateField,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'DateField renders a labelled text field for a single date. Use it when the date is typed or pasted, not when the reader needs a calendar to compare dates. Do provide a visible label and a format example; do not rely on placeholder text as the label.'
        }
      }
    }
  });
  import '../styles/index.css';
</script>

<Story name="Default" args={{ label: 'Date of birth' }} />
<Story name="With error" args={{ label: 'Start date', error: 'Start date is required.' }} />
<Story name="Disabled" args={{ label: 'Start date', disabled: true }} />
