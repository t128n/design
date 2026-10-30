<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    filters?: Snippet;
    search?: Snippet;
    actions?: Snippet;
  }

  let { filters, search, actions }: Props = $props();
</script>

<div class="t128n-toolbar" data-testid="toolbar">
  <div class="t128n-toolbar__filters" data-testid="toolbar-filters">
    {@render filters?.()}
  </div>
  <div class="t128n-toolbar__trailing">
    <div class="t128n-toolbar__search" data-testid="toolbar-search">
      {@render search?.()}
    </div>
    <div class="t128n-toolbar__actions" data-testid="toolbar-actions">
      {@render actions?.()}
    </div>
  </div>
</div>

<style>
  .t128n-toolbar {
    box-sizing: border-box;
    display: flex;
    flex: none;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-1);
    height: var(--row-h);
    padding: 0 var(--page-inset);
    border-bottom: 1px solid var(--border);
    background: var(--surface-panel);
    color: var(--text-1);
  }

  .t128n-toolbar__filters {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    min-width: 0;
  }

  .t128n-toolbar__trailing {
    display: flex;
    flex: none;
    align-items: center;
    gap: var(--space-1);
    margin-inline-start: auto;
  }

  .t128n-toolbar__search,
  .t128n-toolbar__actions {
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }
</style>
