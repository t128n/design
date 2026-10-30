<script lang="ts">
  import { untrack } from "svelte";

  import Button from "../components/button/Button.svelte";
  import ListRow from "../components/list/ListRow.svelte";
  import Tabs from "../components/nav/Tabs.svelte";
  import Header from "../components/shell/Header.svelte";

  export interface InboxItem {
    id: string;
    title: string;
    preview?: string;
    unread?: boolean;
    date?: string;
    avatar?: string;
    labels?: string[];
  }

  interface Props {
    items?: InboxItem[];
    active?: string;
    onRead?: (id: string) => void;
  }

  let { items = [], active = "all", onRead }: Props = $props();

  const tabs = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
  ];

  let current = $state(untrack(() => active));

  $effect(() => {
    if (active !== current) current = active;
  });

  const visible = $derived(
    current === "unread" ? items.filter((item) => item.unread) : items,
  );

  function open(id: string): void {
    onRead?.(id);
  }

  function readAll(): void {
    for (const item of items) {
      if (item.unread) onRead?.(item.id);
    }
  }
</script>

<div class="t128n-inbox" data-testid="inbox">
  <Header>
    {#snippet context()}
      <span>Inbox</span>
    {/snippet}
    {#snippet actions()}
      <span class="t128n-inbox__primary" onclick={readAll} role="presentation">
        <Button variant="primary">Mark all read</Button>
      </span>
    {/snippet}
  </Header>

  <div class="t128n-inbox__tabs">
    <Tabs {tabs} value={current} onChange={(value) => (current = value)} />
  </div>

  <div class="t128n-inbox__list">
    {#each visible as item (item.id)}
      <div
        class="t128n-inbox__row"
        data-testid={item.unread ? `unread-${item.id}` : undefined}
      >
        <ListRow
          id={item.id}
          title={item.title}
          date={item.date}
          avatar={item.avatar}
          labels={item.labels}
          unread={item.unread}
          onOpen={open}
        />
      </div>
    {:else}
      <p class="t128n-inbox__empty">Nothing here.</p>
    {/each}
  </div>
</div>

<style>
  .t128n-inbox {
    display: flex;
    flex-direction: column;
    min-height: 0;
    background: var(--surface-panel);
    color: var(--text-1);
  }

  .t128n-inbox__tabs {
    flex: none;
    padding: 0 var(--page-inset);
  }

  .t128n-inbox__list {
    flex: 1 1 auto;
    min-height: 0;
    padding: var(--space-2) 0 var(--space-6);
    overflow: auto;
  }

  .t128n-inbox__row {
    display: block;
  }

  .t128n-inbox__empty {
    margin: 0;
    padding: var(--space-3) var(--page-inset);
    color: var(--text-3);
    font: var(--type-caption);
  }

  .t128n-inbox__primary {
    display: inline-flex;
  }
</style>
