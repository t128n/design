<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    context?: Snippet;
    actions?: Snippet;
    id?: string;
  }

  let { context, actions, id }: Props = $props();

  /**
   * Optical alignment (§7.1): the outermost ghost icon actions sit on the
   * gutter line, pulled outward by --space-2. The class is applied to the
   * rendered action nodes, so consumers pass plain IconButtons.
   */
  function edgeActions(node: HTMLElement) {
    const ghostIcon =
      ".t128n-icon-btn--ghost, .t128n-btn--ghost[aria-label]";
    const update = () => {
      const candidates = Array.from(
        node.querySelectorAll<HTMLElement>(ghostIcon),
      );
      const first = candidates[0];
      const last = candidates[candidates.length - 1];

      for (const child of Array.from(
        node.querySelectorAll<HTMLElement>(".t128n-header__action--edge"),
      )) {
        if (child !== first && child !== last) {
          child.classList.remove("t128n-header__action--edge");
        }
      }

      for (const child of [first, last]) {
        if (child && !child.classList.contains("t128n-header__action--edge")) {
          child.classList.add("t128n-header__action--edge");
        }
      }
    };

    update();
    const observer = new MutationObserver(update);
    observer.observe(node, {
      attributes: true,
      attributeFilter: ["class"],
      childList: true,
      subtree: true,
    });

    return {
      destroy() {
        observer.disconnect();
      },
    };
  }
</script>

<header class="t128n-header" data-testid="header" {id}>
  <div class="t128n-header__context" data-testid="header-context">
    {@render context?.()}
  </div>
  <div
    class="t128n-header__actions"
    data-testid="header-actions"
    use:edgeActions
  >
    {@render actions?.()}
  </div>
</header>

<style>
  .t128n-header {
    box-sizing: border-box;
    display: flex;
    flex: none;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-1);
    height: var(--header-h);
    padding: 0 var(--page-inset);
    border-bottom: 1px solid var(--border);
    background: var(--surface-panel);
    color: var(--text-1);
  }

  .t128n-header__context {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    min-width: 0;
    overflow: hidden;
    font: var(--type-heading);
    color: var(--text-1);
  }

  .t128n-header__actions {
    display: flex;
    flex: none;
    align-items: center;
    gap: var(--space-1);
    margin-inline-start: auto;
  }

  .t128n-header__actions :global(.t128n-header__action--edge:first-child) {
    margin-inline-start: calc(var(--space-2) * -1);
  }

  .t128n-header__actions :global(.t128n-header__action--edge:last-child) {
    margin-inline-end: calc(var(--space-2) * -1);
  }
</style>
