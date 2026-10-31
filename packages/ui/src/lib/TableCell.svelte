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
