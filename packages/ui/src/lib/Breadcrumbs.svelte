<script lang="ts">
  import Link from './Link.svelte';
  import Text from './Text.svelte';

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
          <Text variant="body-sm" as="span" tone="muted" aria-hidden="true">/</Text>
        {/if}
        {#if item.href}
          <Text variant="body-sm" as="span">
            <Link href={item.href} class="breadcrumb-link">{item.label}</Link>
          </Text>
        {:else if index === items.length - 1}
          <Text variant="body-sm" as="span" weight="medium" aria-current="page">{item.label}</Text>
        {:else}
          <Text variant="body-sm" as="span" tone="secondary">{item.label}</Text>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
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
  }

  .breadcrumbs :global(.breadcrumb-link) {
    color: var(--color-text-secondary);
    text-decoration: none;
  }

  .breadcrumbs :global(.breadcrumb-link:hover) {
    color: var(--color-text-primary);
    text-decoration: underline;
  }

  .breadcrumbs :global(.breadcrumb-link:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }
</style>
