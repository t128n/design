<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Pagination } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Controls/Pagination',
    component: Pagination,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Pagination moves through a long result set in fixed pages. Use it when the total and page size are known, not for infinite feeds or short lists that fit on one screen. Keep the current page announced and preserve filters across page changes.'
        }
      }
    }
  });
</script>

<Story name="Default" asChild>
  <div class="pagination-story">
    <Pagination count={100} perPage={10} page={1} />
  </div>
</Story>

<Story name="MiddlePage" asChild>
  <div class="pagination-story">
    <Pagination count={200} perPage={10} page={10} />
  </div>
</Story>

<style>
  .pagination-story {
    display: grid;
    gap: var(--space-md);
  }
</style>
