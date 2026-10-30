<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    theme = "light",
    density = "default",
    lines = "faint",
    children,
  }: {
    theme?: "light" | "dark";
    density?: "compact" | "default" | "comfortable";
    lines?: "none" | "faint" | "visible";
    children?: Snippet;
  } = $props();
</script>

<div
  class="t128n-theme"
  data-testid="theme"
  data-theme={theme}
  data-density={density}
  data-lines={lines}
>
  {@render children?.()}
</div>
