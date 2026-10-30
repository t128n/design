<script lang="ts">
  interface Crumb {
    label: string;
    href?: string;
  }

  let { items }: { items: Crumb[] } = $props();
</script>

<nav class="t128n-breadcrumbs" aria-label="Breadcrumb">
  <ol class="t128n-breadcrumbs__list">
    {#each items as item, index}
      <li class="t128n-breadcrumbs__item">
        {#if index < items.length - 1}
          <a class="t128n-breadcrumbs__link" href={item.href ?? "#"}>{item.label}</a>
          <svg
            class="t128n-breadcrumbs__separator"
            viewBox="0 0 16 16"
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            data-testid="breadcrumb-separator"
          >
            <path d="m6 3 5 5-5 5" />
          </svg>
        {:else}
          <span class="t128n-breadcrumbs__current" aria-current="page">{item.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  .t128n-breadcrumbs__list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .t128n-breadcrumbs__item {
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }

  .t128n-breadcrumbs__link {
    color: var(--text-2);
    font: var(--type-body);
    text-decoration: none;
    border-radius: var(--radius-xs);
  }

  .t128n-breadcrumbs__link:hover {
    color: var(--text-1);
  }

  .t128n-breadcrumbs__link:active {
    color: var(--text-2);
  }

  .t128n-breadcrumbs__link:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .t128n-breadcrumbs__separator {
    color: var(--text-3);
    flex: none;
  }

  .t128n-breadcrumbs__current {
    color: var(--text-1);
    font: var(--type-action);
  }
</style>
