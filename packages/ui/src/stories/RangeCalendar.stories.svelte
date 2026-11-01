<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { RangeCalendar } from '../index.js';

  const { Story } = defineMeta({
    title: 'Components/Forms/RangeCalendar',
    component: RangeCalendar,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'RangeCalendar selects a start and end date in one month grid. Use it inside a date range picker, not for a single date or a list of unrelated dates. Keep the selected range visible and announce both endpoints to assistive technology.'
        }
      }
    }
  });
  import '../styles/index.css';
</script>

<Story name="Default" />
