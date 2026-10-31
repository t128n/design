<script lang="ts">
  import Badge from '$lib/components/Badge.svelte';

  interface Props {
    title?: string;
    description?: string;
  }

  let {
    title = 'Issues',
    description = 'Everything assigned to you and your team, grouped by status.',
  }: Props = $props();

  const rows = [
    { id: 'T128N-4821', title: 'Keyboard path for the tree component', status: 'in progress' },
    { id: 'T128N-4816', title: 'Pagination needs a focus ring on the current page', status: 'todo' },
    { id: 'T128N-4802', title: 'Breadcrumbs drop the last segment on narrow panes', status: 'done' },
  ] as const;
</script>

<div class="body">
  <div class="inner">
    <div class="head">
      <h2>{title}</h2>
      <p class="caption">{rows.length} open · updated just now</p>
    </div>
    <p class="description">{description}</p>
    <ul>
      {#each rows as row}
        <li>
          <span class="mono">{row.id}</span>
          <span class="title">{row.title}</span>
          <Badge label={row.status} status={row.status === 'done' ? 'success' : undefined} />
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .body {
    flex: 1;
    min-height: 0;
    overflow: auto;
    padding: var(--space-6) var(--page-inset);
    background: var(--surface-panel);
  }

  .inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    max-width: var(--width-reading);
  }

  .head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-3);
  }

  h2 {
    font: var(--type-title);
    color: var(--text-1);
  }

  .description {
    font: var(--type-body);
    color: var(--text-2);
  }

  ul {
    display: flex;
    flex-direction: column;
    margin-top: var(--space-2);
  }

  li {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    height: var(--row-h);
    border-bottom: 1px solid var(--border);
  }

  .mono {
    font: var(--type-mono);
    color: var(--text-3);
    flex: none;
  }

  .title {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font: var(--type-body);
    color: var(--text-1);
  }

  .caption {
    font: var(--type-caption);
    color: var(--text-3);
    flex: none;
  }
</style>
