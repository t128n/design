<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { mergeClasses } from './class';
  import { setTableRow } from './table-context';

  type Props = HTMLAttributes<HTMLTableRowElement> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className = '', children, ...restProps }: Props = $props();

  // Body cells advance this cursor in document order so `TableCell` can inherit
  // alignment and numeric metadata from the matching `Table` column.
  let index = 0;

  setTableRow({
    index: () => index,
    advance: (count) => {
      index += count;
    }
  });

  const classes = $derived(mergeClasses(className));
</script>

<tr {...restProps} class={classes}>
  {@render children?.()}
</tr>
