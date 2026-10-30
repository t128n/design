<script lang="ts">
  import type { Snippet } from "svelte";

  export type BadgeTone =
    | "neutral"
    | "success"
    | "warning"
    | "danger"
    | "info";

  interface Props {
    tone?: BadgeTone;
    dot?: boolean;
    children: Snippet;
  }

  let { tone = "neutral", dot = false, children }: Props = $props();
</script>

<span class="t128n-badge" data-tone={tone}>
  {#if dot}
    <span class="t128n-badge__dot" aria-hidden="true"></span>
  {/if}
  {@render children()}
</span>

<style>
  .t128n-badge {
    --t128n-badge-color: var(--text-3);

    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    height: var(--chip-h);
    padding: 0 var(--space-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
    color: var(--text-2);
    font: var(--type-label);
    white-space: nowrap;
  }

  .t128n-badge__dot {
    flex: none;
    width: var(--space-1);
    height: var(--space-1);
    border-radius: var(--radius-full);
    background: var(--t128n-badge-color);
  }

  .t128n-badge[data-tone="neutral"] {
    --t128n-badge-color: var(--text-3);
  }

  .t128n-badge[data-tone="success"] {
    --t128n-badge-color: var(--success);
  }

  .t128n-badge[data-tone="warning"] {
    --t128n-badge-color: var(--warning);
  }

  .t128n-badge[data-tone="danger"] {
    --t128n-badge-color: var(--danger);
  }

  .t128n-badge[data-tone="info"] {
    --t128n-badge-color: var(--info);
  }
</style>
