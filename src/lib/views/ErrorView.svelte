<script lang="ts">
  import Button from "../components/button/Button.svelte";
  import Banner from "../components/feedback/Banner.svelte";
  import EmptyState from "../components/feedback/EmptyState.svelte";

  interface Props {
    message: string;
    onRetry?: () => void;
  }

  let { message, onRetry }: Props = $props();

  /**
   * Button owns no event prop (T4), so the view forwards activation from the
   * action wrapper. The real button keeps its focus, hover and pressed states;
   * the wrapper only relays the click.
   */
  function activate(node: HTMLElement) {
    const handle = () => onRetry?.();
    node.addEventListener("click", handle);

    return {
      destroy() {
        node.removeEventListener("click", handle);
      },
    };
  }
</script>

<div class="t128n-error-view" data-testid="error-view">
  <div class="t128n-error-view__banner">
    <Banner tone="danger" title={message}>
      This view could not reach the server. Your work is safe.
    </Banner>
  </div>

  <div class="t128n-error-view__body">
    <EmptyState
      title="Unable to load this view"
      description="Retry to load your work."
      icon="alert"
    >
      {#snippet action()}
        <span class="t128n-error-view__action" use:activate>
          <Button variant="primary">Retry</Button>
        </span>
      {/snippet}
    </EmptyState>
  </div>
</div>

<style>
  .t128n-error-view {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-height: 100%;
    padding: var(--space-4) var(--page-inset) var(--space-6);
    background: var(--surface-panel);
  }

  .t128n-error-view__banner {
    width: 100%;
    max-width: var(--width-dialog);
    margin-inline: auto;
  }

  .t128n-error-view__body {
    display: grid;
    flex: 1 1 auto;
    place-items: center;
  }

  .t128n-error-view__action {
    display: inline-flex;
  }
</style>
