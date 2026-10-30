<script lang="ts">
  type Link = {
    label: string;
    href?: string;
  };

  type Props = {
    brand?: string;
    links?: Link[];
    note?: string;
  };

  let {
    brand = 'Stellar',
    links = [],
    note
  }: Props = $props();
</script>

<footer class="footer">
  <span class="brand">{brand}</span>
  {#if links.length}
    <nav aria-label="Footer">
      {#each links as link}
        <a href={link.href ?? '#'}>{link.label}</a>
      {/each}
    </nav>
  {/if}
  {#if note}
    <span class="note">{note}</span>
  {/if}
</footer>

<style>
  .footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-lg) 0;
    border-top: 1px solid var(--color-border);
    color: var(--color-text-secondary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .brand {
    color: var(--color-text-primary);
    font-weight: var(--font-weight-semibold);
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-md);
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

  .note {
    margin-left: auto;
  }
</style>
