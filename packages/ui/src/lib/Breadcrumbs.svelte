<script lang="ts">
  type Item = {
    label: string;
    href?: string;
  };

  let { items }: { items: Item[] } = $props();
</script>

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol>
    {#each items as item, index}
      <li>
        {#if index > 0}
          <span class="separator" aria-hidden="true">/</span>
        {/if}
        {#if item.href}
          <a href={item.href}>{item.label}</a>
        {:else if index === items.length - 1}
          <span aria-current="page">{item.label}</span>
        {:else}
          <span>{item.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  .breadcrumbs {
    font-family: var(--font-family-sans);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  ol {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-xs);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    color: var(--color-text-secondary);
  }

  a {
    color: var(--color-text-secondary);
    text-decoration: none;
  }

  a:hover {
    color: var(--color-text-primary);
    text-decoration: underline;
  }

  a:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .separator {
    color: var(--color-text-muted);
  }

  [aria-current='page'] {
    color: var(--color-text-primary);
    font-weight: var(--font-weight-medium);
  }
</style>
