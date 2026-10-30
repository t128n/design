<script lang="ts">
  import type { TagTone } from "../components/chips/Tag.svelte";
  import type { ListStatus } from "../components/list/ListRow.svelte";
  import type { Issue } from "./fixtures";

  import Avatar from "../components/chips/Avatar.svelte";
  import Tag from "../components/chips/Tag.svelte";
  import Button from "../components/button/Button.svelte";
  import IconButton from "../components/button/IconButton.svelte";
  import GroupHeader from "../components/list/GroupHeader.svelte";
  import ListRow from "../components/list/ListRow.svelte";
  import AppShell from "../components/shell/AppShell.svelte";
  import Header from "../components/shell/Header.svelte";
  import Toolbar from "../components/shell/Toolbar.svelte";

  interface Props {
    issues: Issue[];
    selectedId?: string;
    onSelect?: (id: string) => void;
  }

  let { issues, selectedId, onSelect }: Props = $props();

  let localId = $state<string | undefined>(undefined);
  const activeId = $derived(localId ?? selectedId ?? issues[0]?.id);
  const detail = $derived(issues.find((issue) => issue.id === activeId));

  const statusTone: Record<ListStatus, TagTone> = {
    neutral: "neutral",
    success: "green",
    warning: "yellow",
    danger: "red",
    info: "blue",
  };

  const statusLabel: Record<ListStatus, string> = {
    neutral: "Not started",
    success: "Done",
    warning: "At risk",
    danger: "Blocked",
    info: "In progress",
  };

  interface IssueGroup {
    id: string;
    label: string;
    status?: ListStatus;
    items: Issue[];
  }

  const groups = $derived.by(() => {
    const result: IssueGroup[] = [];

    for (const issue of issues) {
      const label = issue.group ?? "Issues";
      let group = result.find((entry) => entry.label === label);

      if (!group) {
        group = { id: label, label, items: [] };
        result.push(group);
      }

      group.items.push(issue);
    }

    for (const group of result) {
      const first = group.items[0];
      if (first && group.items.every((item) => item.status === first.status)) {
        group.status = first.status;
      }
    }

    return result;
  });

  function select(id: string): void {
    localId = id;
    onSelect?.(id);
  }
</script>

{#snippet context()}
  <span class="t128n-issues__context">Issues</span>
  <span class="t128n-issues__count">{issues.length}</span>
{/snippet}

{#snippet actions()}
  <IconButton label="Search issues" icon="search" />
  <IconButton label="Issue actions" icon="more" />
  <Button variant="primary">New issue</Button>
{/snippet}

{#snippet filters()}
  <Button variant="ghost" size="sm">All issues</Button>
  <Button variant="ghost" size="sm">Assigned to me</Button>
{/snippet}

{#snippet search()}
  <IconButton label="Search list" icon="search" />
{/snippet}

{#snippet toolbarActions()}
  <IconButton label="Display options" icon="more" />
{/snippet}

<AppShell>
  <Header context={context} actions={actions} />
  <Toolbar filters={filters} search={search} actions={toolbarActions} />

  <div class="t128n-split" data-testid="issues">
    <div class="t128n-split__list t128n-issues__list">
      {#each groups as group (group.id)}
        <GroupHeader label={group.label} count={group.items.length} status={group.status} />
        {#each group.items as issue (issue.id)}
          <ListRow
            id={issue.id}
            title={issue.title}
            status={issue.status}
            labels={issue.labels}
            avatar={issue.avatar}
            date={issue.date}
            selected={issue.id === activeId}
            onOpen={select}
          />
        {/each}
      {/each}
    </div>

    <aside class="t128n-split__detail" data-testid="detail" aria-label="Issue detail">
      {#if detail}
        <div class="t128n-issues__detail">
          <span class="t128n-issues__detail-id">{detail.id}</span>
          <h2 class="t128n-issues__detail-title">{detail.title}</h2>

          <div class="t128n-issues__detail-meta">
            <Tag tone={statusTone[detail.status]}>{statusLabel[detail.status]}</Tag>
            {#if detail.avatar}
              <Avatar name={detail.avatar} size={2} />
            {/if}
            {#if detail.date}
              <span class="t128n-issues__detail-date">{detail.date}</span>
            {/if}
          </div>

          {#if detail.labels?.length}
            <div class="t128n-issues__detail-labels">
              {#each detail.labels as label}
                <Tag tone="blue">{label}</Tag>
              {/each}
            </div>
          {/if}
        </div>
      {:else}
        <p class="t128n-issues__empty">
          Select an issue to see its detail.
        </p>
      {/if}
    </aside>
  </div>
</AppShell>

<style>
  .t128n-issues__context {
    color: var(--text-1);
    font: var(--type-heading);
  }

  .t128n-issues__count {
    color: var(--text-3);
    font: var(--type-caption);
  }

  .t128n-issues__list {
    display: flex;
    flex-direction: column;
    padding: var(--space-2) 0 var(--space-4);
  }

  .t128n-issues__detail {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-6) var(--page-inset);
  }

  .t128n-issues__detail-id {
    color: var(--text-3);
    font: var(--type-mono);
  }

  .t128n-issues__detail-title {
    color: var(--text-1);
    font: var(--type-title);
  }

  .t128n-issues__detail-meta {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .t128n-issues__detail-date {
    color: var(--text-3);
    font: var(--type-caption);
  }

  .t128n-issues__detail-labels {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
  }

  .t128n-issues__empty {
    padding: var(--space-6) var(--page-inset);
    color: var(--text-2);
    font: var(--type-body);
  }
</style>
