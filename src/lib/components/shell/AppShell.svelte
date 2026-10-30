<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    nav?: Snippet;
    children?: Snippet;
  }

  let { nav, children }: Props = $props();
</script>

<div class="t128n-app-shell" data-testid="app-shell">
  <div class="t128n-app-shell__nav" data-testid="app-shell-nav">
    {@render nav?.()}
  </div>
  <main class="t128n-app-shell__main" data-testid="app-shell-main">
    {@render children?.()}
  </main>
</div>
