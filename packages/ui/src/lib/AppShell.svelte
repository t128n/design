<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    sidebar?: Snippet;
    navbar?: Snippet;
    children?: Snippet;
  };

  let { sidebar, navbar, children }: Props = $props();
</script>

<div class="app-shell">
  <a class="skip-link" href="#main-content">Skip to content</a>
  {#if sidebar}
    <div class="sidebar">{@render sidebar()}</div>
  {/if}
  <div class="main">
    {#if navbar}
      <div class="navbar">{@render navbar()}</div>
    {/if}
    <main id="main-content" class="content" tabindex="-1">
      {@render children?.()}
    </main>
  </div>
</div>

<style>
  .app-shell {
    display: grid;
    grid-template-columns: minmax(200px, 240px) minmax(0, 1fr);
    min-height: 100vh;
    background: var(--color-canvas);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .sidebar {
    min-width: 0;
  }

  .main {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .content {
    flex: 1;
    min-width: 0;
    padding: var(--space-xl);
  }

  .content:focus {
    outline: none;
  }

  .skip-link {
    position: fixed;
    top: var(--space-sm);
    left: var(--space-sm);
    z-index: 100;
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-sm);
    background: var(--color-accent);
    color: var(--color-on-accent);
    font-size: var(--font-size-label);
    text-decoration: none;
    transform: translateY(-200%);
  }

  .skip-link:focus {
    transform: translateY(0);
  }

  @media (max-width: 800px) {
    .app-shell {
      grid-template-columns: 1fr;
    }

    .sidebar {
      border-bottom: 1px solid var(--color-border);
    }

    .content {
      padding: var(--space-lg);
    }
  }
</style>
