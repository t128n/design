<script lang="ts">
  import type { Snippet } from "svelte";

  export type TagTone =
    | "neutral"
    | "blue"
    | "green"
    | "yellow"
    | "red"
    | "violet";

  interface Props {
    tone?: TagTone;
    children: Snippet;
  }

  let { tone = "neutral", children }: Props = $props();
</script>

<span class="t128n-tag" data-tone={tone}>
  {@render children()}
</span>

<style>
  .t128n-tag {
    --t128n-tag-color: var(--tag-neutral);

    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    height: var(--chip-h);
    padding: 0 var(--space-2);
    border-radius: var(--radius-md);
    background: color-mix(
      in srgb,
      var(--t128n-tag-color) var(--tint),
      var(--surface-panel)
    );
    color: color-mix(
      in srgb,
      var(--t128n-tag-color) 75%,
      var(--text-1)
    );
    font: var(--type-label);
    white-space: nowrap;
  }

  .t128n-tag[data-tone="neutral"] {
    --t128n-tag-color: var(--tag-neutral);
  }

  .t128n-tag[data-tone="blue"] {
    --t128n-tag-color: var(--tag-blue);
  }

  .t128n-tag[data-tone="green"] {
    --t128n-tag-color: var(--tag-green);
  }

  .t128n-tag[data-tone="yellow"] {
    --t128n-tag-color: var(--tag-yellow);
  }

  .t128n-tag[data-tone="red"] {
    --t128n-tag-color: var(--tag-red);
  }

  .t128n-tag[data-tone="violet"] {
    --t128n-tag-color: var(--tag-violet);
  }
</style>
