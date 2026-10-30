<script lang="ts">
  import { tick } from "svelte";

  interface TreeNode {
    id: string;
    label: string;
    children?: TreeNode[];
  }

  interface Props {
    nodes: TreeNode[];
    expanded?: string[];
    selected?: string | null;
    onToggle?: (id: string, expanded: string[]) => void;
  }

  let { nodes, expanded = [], selected = null, onToggle }: Props = $props();

  interface Row {
    node: TreeNode;
    depth: number;
    parentId: string | null;
  }

  // svelte-ignore state_referenced_locally
  let open = $state<string[]>([...expanded]);
  // svelte-ignore state_referenced_locally
  let lastExpanded = expanded;
  let activeId = $state<string | null>(null);
  let rootEl: HTMLDivElement | undefined = $state();

  $effect(() => {
    if (expanded !== lastExpanded) {
      lastExpanded = expanded;
      open = [...expanded];
    }
  });

  function collect(
    list: TreeNode[],
    depth: number,
    parentId: string | null,
    out: Row[],
  ): void {
    for (const node of list) {
      out.push({ node, depth, parentId });
      if (node.children?.length && open.includes(node.id)) {
        collect(node.children, depth + 1, node.id, out);
      }
    }
  }

  let rows = $derived.by(() => {
    const out: Row[] = [];
    collect(nodes, 1, null, out);
    return out;
  });

  let focusableId = $derived(
    activeId && rows.some((row) => row.node.id === activeId)
      ? activeId
      : rows[0]?.node.id,
  );

  function isOpen(id: string): boolean {
    return open.includes(id);
  }

  function toggle(id: string): void {
    const next = isOpen(id) ? open.filter((value) => value !== id) : [...open, id];
    open = next;
    onToggle?.(id, next);
  }

  async function focusNode(id: string): Promise<void> {
    activeId = id;
    await tick();
    const target = Array.from(
      rootEl?.querySelectorAll<HTMLElement>("[data-tree-node]") ?? [],
    ).find((element) => element.dataset.treeNode === id);
    target?.focus();
  }

  function handleKeydown(event: KeyboardEvent, row: Row, index: number): void {
    if (event.target !== event.currentTarget) return;

    const { node, parentId } = row;
    const hasChildren = Boolean(node.children?.length);

    if (event.key === "ArrowRight" && hasChildren) {
      event.preventDefault();
      if (!isOpen(node.id)) {
        toggle(node.id);
      } else if (rows[index + 1]?.parentId === node.id) {
        void focusNode(rows[index + 1].node.id);
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (hasChildren && isOpen(node.id)) {
        toggle(node.id);
      } else if (parentId) {
        void focusNode(parentId);
      }
    } else if (event.key === "ArrowDown" || event.key === "j") {
      event.preventDefault();
      const next = rows[index + 1];
      if (next) void focusNode(next.node.id);
    } else if (event.key === "ArrowUp" || event.key === "k") {
      event.preventDefault();
      const previous = rows[index - 1];
      if (previous) void focusNode(previous.node.id);
    } else if (event.key === "Home") {
      event.preventDefault();
      if (rows[0]) void focusNode(rows[0].node.id);
    } else if (event.key === "End") {
      event.preventDefault();
      if (rows.length) void focusNode(rows[rows.length - 1].node.id);
    }
  }

  function depthClass(depth: number): string {
    return `t128n-tree__row--depth-${depth}`;
  }
</script>

<div class="t128n-tree" role="tree" aria-label="Tree" bind:this={rootEl}>
  {#each rows as row, index (row.node.id)}
    {@const node = row.node}
    {@const hasChildren = Boolean(node.children?.length)}
    <div
      class="t128n-tree__row {depthClass(row.depth)}"
      class:t128n-tree__row--selected={selected === node.id}
      role="treeitem"
      aria-label={node.label}
      aria-level={row.depth}
      aria-expanded={hasChildren ? isOpen(node.id) : undefined}
      aria-selected={selected === node.id ? "true" : undefined}
      tabindex={focusableId === node.id ? 0 : -1}
      data-tree-node={node.id}
      style="--tree-depth: {row.depth}"
      onfocus={() => (activeId = node.id)}
      onkeydown={(event) => handleKeydown(event, row, index)}
      onclick={() => (activeId = node.id)}
    >
      {#if hasChildren}
        <button
          type="button"
          class="t128n-tree__chevron"
          aria-label={isOpen(node.id) ? `Collapse ${node.label}` : `Expand ${node.label}`}
          onclick={(event) => {
            event.stopPropagation();
            toggle(node.id);
          }}
        >
          <svg
            class="t128n-tree__chevron-icon"
            class:t128n-tree__chevron-icon--open={isOpen(node.id)}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M6 3.5 10.5 8 6 12.5" />
          </svg>
        </button>
      {:else}
        <span class="t128n-tree__spacer" aria-hidden="true"></span>
      {/if}

      <span class="t128n-tree__label">{node.label}</span>

      <span class="t128n-tree__actions">
        <button
          type="button"
          class="t128n-tree__action"
          aria-label={`Add to ${node.label}`}
          onclick={(event) => event.stopPropagation()}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M8 3v10M3 8h10" />
          </svg>
        </button>
        <button
          type="button"
          class="t128n-tree__action"
          aria-label={`More actions for ${node.label}`}
          onclick={(event) => event.stopPropagation()}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            stroke="none"
            aria-hidden="true"
          >
            <circle cx="3" cy="8" r="1.25" />
            <circle cx="8" cy="8" r="1.25" />
            <circle cx="13" cy="8" r="1.25" />
          </svg>
        </button>
      </span>
    </div>
  {/each}
</div>

<style>
  .t128n-tree {
    display: flex;
    flex-direction: column;
    font: var(--type-body);
    color: var(--text-1);
  }

  .t128n-tree__row {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: var(--space-1);
    height: var(--control-h);
    min-height: var(--control-h);
    padding-right: var(--space-2);
    padding-left: calc(var(--icon) * var(--tree-depth, 1));
    border-radius: var(--radius-md);
    color: var(--text-2);
    cursor: default;
    user-select: none;
  }

  .t128n-tree__row--depth-1 {
    padding-left: calc(var(--icon) * 1);
  }

  .t128n-tree__row--depth-2 {
    padding-left: calc(var(--icon) * 2);
  }

  .t128n-tree__row--depth-3 {
    padding-left: calc(var(--icon) * 3);
  }

  .t128n-tree__row--depth-4 {
    padding-left: calc(var(--icon) * 4);
  }

  .t128n-tree__row--depth-5 {
    padding-left: calc(var(--icon) * 5);
  }

  .t128n-tree__row--depth-6 {
    padding-left: calc(var(--icon) * 6);
  }

  .t128n-tree__row:hover {
    background: var(--state-hover);
  }

  .t128n-tree__row:active {
    background: var(--state-pressed);
  }

  .t128n-tree__row:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .t128n-tree__row--selected {
    background: var(--state-selected);
    color: var(--text-1);
  }

  .t128n-tree__chevron,
  .t128n-tree__action {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: var(--icon);
    height: var(--icon);
    padding: 0;
    border: 0;
    border-radius: var(--radius-xs);
    background: transparent;
    color: var(--text-3);
    cursor: pointer;
  }

  .t128n-tree__chevron:hover,
  .t128n-tree__action:hover {
    background: var(--state-hover);
    color: var(--text-1);
  }

  .t128n-tree__chevron:active,
  .t128n-tree__action:active {
    background: var(--state-pressed);
  }

  .t128n-tree__chevron:focus-visible,
  .t128n-tree__action:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .t128n-tree__chevron:disabled,
  .t128n-tree__action:disabled {
    background: var(--surface-sunken);
    color: var(--text-2);
    cursor: default;
  }

  .t128n-tree__chevron-icon {
    flex: none;
    transform: rotate(0deg);
    transform-origin: 50% 50%;
  }

  .t128n-tree__chevron-icon--open {
    transform: rotate(90deg);
  }

  .t128n-tree__spacer {
    flex: none;
    width: var(--icon);
    height: var(--icon);
  }

  .t128n-tree__label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .t128n-tree__row--selected .t128n-tree__label {
    font: var(--type-action);
    color: var(--text-1);
  }

  .t128n-tree__actions {
    display: inline-flex;
    flex: none;
    gap: var(--space-1);
    margin-left: auto;
    opacity: 0;
  }

  .t128n-tree__row:hover .t128n-tree__actions,
  .t128n-tree__row:focus-within .t128n-tree__actions {
    opacity: 1;
  }
</style>
