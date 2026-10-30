<script lang="ts">
  import type { BoardColumn } from "./fixtures";

  import BoardCard from "../components/cards/BoardCard.svelte";
  import Button from "../components/button/Button.svelte";
  import IconButton from "../components/button/IconButton.svelte";
  import GroupHeader from "../components/list/GroupHeader.svelte";
  import Header from "../components/shell/Header.svelte";
  import Toolbar from "../components/shell/Toolbar.svelte";

  interface Props {
    columns: BoardColumn[];
  }

  let { columns }: Props = $props();

  const cardCount = $derived(
    columns.reduce((total, column) => total + column.cards.length, 0),
  );
</script>

{#snippet context()}
  <span class="t128n-board__context">Board</span>
  <span class="t128n-board__count">{cardCount}</span>
{/snippet}

{#snippet actions()}
  <IconButton label="Search cards" icon="search" />
  <IconButton label="Board actions" icon="more" />
  <Button variant="primary">New card</Button>
{/snippet}

{#snippet filters()}
  <Button variant="ghost" size="sm">All cards</Button>
  <Button variant="ghost" size="sm">Assigned to me</Button>
{/snippet}

{#snippet search()}
  <IconButton label="Search board" icon="search" />
{/snippet}

{#snippet toolbarActions()}
  <IconButton label="Display options" icon="more" />
{/snippet}

<Header context={context} actions={actions} />
<Toolbar filters={filters} search={search} actions={toolbarActions} />

<div class="t128n-board" data-testid="board">
  <div class="t128n-board__columns">
    {#each columns as column (column.id)}
      <section class="t128n-board__column" aria-label={column.title}>
        <GroupHeader
          label={column.title}
          count={column.cards.length}
          status={column.status}
        />

        <div
          class="t128n-board__list"
          role="list"
          aria-label={`${column.title} cards`}
        >
          {#each column.cards as card, index (card.id ?? `${column.id}-${index}`)}
            <div class="t128n-board__card" role="listitem">
              <BoardCard
                title={card.title}
                id={card.id}
                tags={card.tags}
                avatar={card.avatar}
                href={card.href}
              />
            </div>
          {/each}
        </div>
      </section>
    {/each}
  </div>
</div>

<style>
  .t128n-board__context {
    color: var(--text-1);
    font: var(--type-heading);
  }

  .t128n-board__count {
    color: var(--text-3);
    font: var(--type-caption);
  }

  .t128n-board {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .t128n-board__columns {
    display: flex;
    align-items: flex-start;
    gap: var(--space-4);
    padding: var(--space-4) var(--page-inset) var(--space-6);
    overflow-x: auto;
  }

  .t128n-board__column {
    display: flex;
    flex: 0 0 var(--width-detail);
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
  }

  .t128n-board__list {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
  }

  .t128n-board__card {
    min-width: 0;
  }
</style>
