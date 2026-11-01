<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { untrack } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { mergeClasses } from './class';
  import { getTableColumns, getTableRow } from './table-context';

  type Props = HTMLAttributes<HTMLTableCellElement> & {
    colspan?: number;
    align?: 'left' | 'right';
    numeric?: boolean;
    class?: string;
    children?: Snippet;
  };

  let {
    colspan,
    align,
    numeric,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const columns = getTableColumns();
  const row = getTableRow();

  // Capture and advance synchronously so cells resolve their column in document
  // order, including across server rendering and hydration.
  const index = row.index();
  const column = $derived(columns()[index]);

  row.advance(untrack(() => colspan) ?? 1);

  const resolvedAlign = $derived(align ?? column?.align);
  const resolvedNumeric = $derived(numeric ?? column?.numeric ?? false);
  const classes = $derived(mergeClasses(className));
</script>

<td
  {...restProps}
  colspan={colspan}
  class={classes}
  class:right={resolvedAlign === 'right'}
  class:numeric={resolvedNumeric}
>
  {@render children?.()}
</td>
