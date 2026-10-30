<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    title: string;
    actions?: Snippet;
  }

  let { title, actions }: Props = $props();
</script>

<div class="t128n-section-header" data-testid="section-header">
  <h2 class="t128n-section-header__title">{title}</h2>
  <div class="t128n-section-header__actions" data-testid="section-header-actions">
    {@render actions?.()}
  </div>
</div>

<style>
  .t128n-section-header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-1);
    height: var(--row-h-sm);
    padding: 0 var(--page-inset);
    color: var(--text-1);
  }

  .t128n-section-header__title {
    min-width: 0;
    overflow: hidden;
    color: var(--text-1);
    font: var(--type-heading);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .t128n-section-header__actions {
    display: flex;
    flex: none;
    align-items: center;
    gap: var(--space-1);
    margin-inline-start: auto;
  }
</style>
