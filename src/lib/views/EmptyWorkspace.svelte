<script lang="ts">
  import Button from "../components/button/Button.svelte";
  import EmptyState from "../components/feedback/EmptyState.svelte";
  import Header from "../components/shell/Header.svelte";

  interface Props {
    title: string;
    description?: string;
    onCreate?: () => void;
  }

  let { title, description, onCreate }: Props = $props();

  /**
   * Button owns no event prop (T4), so the view forwards activation from the
   * action wrapper. The real button keeps its focus, hover and pressed states;
   * the wrapper only relays the click.
   */
  function activate(node: HTMLElement) {
    const handle = () => onCreate?.();
    node.addEventListener("click", handle);

    return {
      destroy() {
        node.removeEventListener("click", handle);
      },
    };
  }
</script>

<div class="t128n-empty-workspace" data-testid="empty-workspace">
  <Header>
    {#snippet context()}
      <span>Workspace</span>
    {/snippet}
  </Header>

  <div class="t128n-empty-workspace__body">
    <EmptyState {title} {description} icon="folder">
      {#snippet action()}
        <span class="t128n-empty-workspace__action" use:activate>
          <Button variant="primary">Create project</Button>
        </span>
      {/snippet}
    </EmptyState>
  </div>
</div>

<style>
  .t128n-empty-workspace {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    background: var(--surface-panel);
  }

  .t128n-empty-workspace__body {
    display: grid;
    flex: 1 1 auto;
    place-items: center;
    padding: var(--space-6) var(--page-inset);
  }

  .t128n-empty-workspace__action {
    display: inline-flex;
  }
</style>
