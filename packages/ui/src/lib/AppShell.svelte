<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    sidebar?: Snippet;
    navbar?: Snippet;
    children?: Snippet;
  };

  let { sidebar, navbar, children }: Props = $props();
</script>

<div
  class="app-shell"
  class:with-sidebar={Boolean(sidebar)}
  class:has-navbar={Boolean(navbar)}
>
  <a class="skip-link" href="#main-content">Skip to content</a>
  {#if navbar}
    <div class="navbar">{@render navbar()}</div>
  {/if}
  <div class="body">
    {#if sidebar}
      <div class="sidebar">{@render sidebar()}</div>
    {/if}
    <main id="main-content" tabindex="-1" class="content">
      <div class="content-inner">
        {@render children?.()}
      </div>
    </main>
  </div>
</div>

<style>
  .app-shell {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    min-height: 100vh;
    background: var(--color-workspace);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .app-shell.has-navbar {
    grid-template-rows: auto minmax(0, 1fr);
  }

  .body {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    min-width: 0;
    min-height: 0;
  }

  .app-shell.with-sidebar .body {
    grid-template-columns: var(--layout-sidebar-width) minmax(0, 1fr);
  }

  .sidebar,
  .main,
  .navbar {
    min-width: 0;
  }

  .main {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .content {
    flex: 1;
    min-width: 0;
    min-height: 0;
    padding: var(--space-xl);
    background: var(--color-workspace);
  }

  .content:focus {
    outline: none;
  }

  .content:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: calc(-1 * var(--border-width-emphasis));
  }

  .content-inner {
    width: 100%;
    max-width: var(--layout-content-width);
    margin-inline: auto;
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

  .skip-link:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width);
    transform: translateY(0);
  }

  @media (max-width: 800px) {
    .app-shell.with-sidebar .body {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr);
    }

    .content {
      padding: var(--space-lg);
    }
  }
</style>
