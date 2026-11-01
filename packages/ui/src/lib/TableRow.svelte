<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
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
