<script lang="ts">
  import { Add, ChevronRight, OverflowMenuVertical } from 'carbon-icons-svelte';
  import Icon from './Icon.svelte';
  import IconButton from './IconButton.svelte';

  /**
   * DESIGN.md 7.4 — tree rows are --control-h tall, indent by --icon per level,
   * chevrons expand, and hover reveals add/more. Secondary actions are also
   * revealed by focus-within (6.3) and every row is reachable from the keyboard.
   */
  export interface TreeNode {
    id: string;
    label: string;
    children?: TreeNode[];
  }

  interface Props {
    nodes: TreeNode[];
    expandedIds?: string[];
    label?: string;
    onadd?: (node: TreeNode) => void;
    onmore?: (node: TreeNode) => void;
  }

  let {
    nodes,
    expandedIds = $bindable([]),
    label = 'Tree',
    onadd,
    onmore,
  }: Props = $props();

  interface VisibleRow {
    node: TreeNode;
    level: number;
  }

  const expanded = $derived(new Set(expandedIds));

  const rows = $derived.by<VisibleRow[]>(() => {
    const visible: VisibleRow[] = [];
    const walk = (list: TreeNode[], level: number) => {
      for (const node of list) {
        visible.push({ node, level });
        if (node.children?.length && expanded.has(node.id)) walk(node.children, level + 1);
      }
    };
    walk(nodes, 1);
    return visible;
  });

  let activeId = $state<string | null>(null);
  const activeRowId = $derived(activeId ?? rows[0]?.node.id ?? null);

  let treeEl: HTMLDivElement | undefined = $state();

  function toggle(id: string) {
    expandedIds = expanded.has(id)
      ? expandedIds.filter((entry) => entry !== id)
      : [...expandedIds, id];
    activeId = id;
  }

  function parentIndex(index: number) {
    const level = rows[index]?.level ?? 1;
    for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
      if (rows[cursor].level < level) return cursor;
    }
    return -1;
  }

  function focusRow(index: number) {
    const row = rows[index];
    if (!row) return;
    activeId = row.node.id;
    requestAnimationFrame(() => {
      treeEl?.querySelector<HTMLElement>(`[data-row-index="${index}"]`)?.focus();
    });
  }

  function onkeydown(event: KeyboardEvent) {
    const target = event.target as HTMLElement | null;
    if (!target || target.getAttribute('role') !== 'treeitem') return;

    const index = rows.findIndex((row) => row.node.id === target.dataset.nodeId);
    if (index === -1) return;

    const row = rows[index];
    let nextIndex = index;

    switch (event.key) {
      case 'ArrowDown':
        nextIndex = Math.min(rows.length - 1, index + 1);
        break;
      case 'ArrowUp':
        nextIndex = Math.max(0, index - 1);
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = rows.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (row.node.children?.length) {
          if (!expanded.has(row.node.id)) toggle(row.node.id);
          else nextIndex = Math.min(rows.length - 1, index + 1);
        }
        focusRow(nextIndex);
        return;
      case 'ArrowLeft':
        event.preventDefault();
        if (row.node.children?.length && expanded.has(row.node.id)) {
          toggle(row.node.id);
          focusRow(index);
        } else {
          focusRow(parentIndex(index));
        }
        return;
      case 'Enter':
      case ' ':
        if (row.node.children?.length) {
          event.preventDefault();
          toggle(row.node.id);
        }
        return;
      default:
        return;
    }

    event.preventDefault();
    focusRow(nextIndex);
  }
</script>

<div
  class="tree"
  role="tree"
  aria-label={label}
  tabindex={-1}
  bind:this={treeEl}
  {onkeydown}
>
  {#each rows as row, index (row.node.id)}
    <div
      class="row"
      role="treeitem"
      data-node-id={row.node.id}
      data-row-index={index}
      aria-level={row.level}
      aria-selected="false"
      aria-expanded={row.node.children?.length ? expanded.has(row.node.id) : undefined}
      tabindex={activeRowId === row.node.id ? 0 : -1}
      style="--level: {row.level}"
      onfocusin={() => (activeId = row.node.id)}
    >
      {#if row.node.children?.length}
        <button
          type="button"
          class="chevron"
          aria-label={`${expanded.has(row.node.id) ? 'Collapse' : 'Expand'} ${row.node.label}`}
          aria-expanded={expanded.has(row.node.id)}
          onclick={() => toggle(row.node.id)}
        >
          <span class="chevron-glyph" class:open={expanded.has(row.node.id)}>
            <Icon icon={ChevronRight} size={16} />
          </span>
        </button>
      {:else}
        <span class="chevron-spacer" aria-hidden="true"></span>
      {/if}

      <span class="label">{row.node.label}</span>

      <span class="actions">
        <IconButton
          icon={Add}
          label={`Add inside ${row.node.label}`}
          size="sm"
          onclick={() => onadd?.(row.node)}
        />
        <IconButton
          icon={OverflowMenuVertical}
          label={`More actions for ${row.node.label}`}
          size="sm"
          onclick={() => onmore?.(row.node)}
        />
      </span>
    </div>
  {/each}
</div>

<style>
  .tree {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .row {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    height: var(--control-h);
    padding-right: var(--space-2);
    padding-left: calc(var(--space-1) + (var(--level) - 1) * var(--icon));
    border-radius: var(--radius-md);
    color: var(--text-1);
    font: var(--type-body);
  }

  .row:hover {
    background: var(--state-hover);
  }

  .row:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .chevron {
    display: grid;
    place-items: center;
    width: var(--size-3);
    height: var(--size-3);
    padding: 0;
    border: 0;
    border-radius: var(--radius-xs);
    background: transparent;
    color: var(--text-3);
    flex: none;
  }

  .chevron:hover {
    background: var(--state-hover);
    color: var(--text-1);
  }

  .chevron-glyph {
    display: flex;
  }

  .chevron-glyph.open {
    transform: rotate(90deg);
  }

  .chevron-spacer {
    width: var(--size-3);
    height: var(--size-3);
    flex: none;
  }

  .label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    margin-left: auto;
    padding-left: var(--space-2);
    opacity: 0;
  }

  .row:hover .actions,
  .row:focus-within .actions {
    opacity: 1;
  }

  @media (hover: none) {
    .actions {
      opacity: 1;
    }
  }
</style>
