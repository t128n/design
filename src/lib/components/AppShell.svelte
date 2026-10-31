<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    sidebar?: Snippet;
    children: Snippet;
  }

  let { sidebar, children }: Props = $props();
</script>

<div class="shell">
  {#if sidebar}
    <div class="sidebar">{@render sidebar()}</div>
  {/if}
  <main class="content">{@render children()}</main>
</div>

<style>
  .shell {
    display: flex;
    height: 100vh;
    min-height: 100vh;
    padding: var(--space-2);
    gap: var(--space-2);
    background: var(--surface-app);
    overflow: hidden;
    container-type: inline-size;
    container-name: shell;
  }

  .sidebar {
    flex: none;
    min-height: 0;
    display: flex;
  }

  .content {
    flex: 1;
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: var(--surface-panel);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    container-type: inline-size;
    container-name: view;
  }

  @container shell (max-width: 760px) {
    .sidebar {
      display: none;
    }
    .content {
      border: 0;
      border-radius: 0;
    }
  }

  @media (max-width: 760px) {
    .shell {
      padding: 0;
    }
  }
</style>
