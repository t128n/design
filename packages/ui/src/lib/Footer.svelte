<script lang="ts">
  type Link = {
    label: string;
    href?: string;
  };

  type Props = {
    brand?: string;
    links?: Link[];
    note?: string;
    bordered?: boolean;
  };

  let {
    brand = 'Stellar',
    links = [],
    note,
    bordered = true
  }: Props = $props();
</script>

<footer class="footer" class:bordered={bordered}>
  <span class="brand">{brand}</span>
  {#if links.length}
    <nav aria-label="Footer">
      <ul>
        {#each links as link}
          <li>
            <a href={link.href ?? '#'}>{link.label}</a>
          </li>
        {/each}
      </ul>
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
    gap: var(--space-md) var(--space-xl);
    padding: var(--space-lg) 0;
    color: var(--color-text-secondary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .footer.bordered {
    border-top: var(--border-width) solid var(--color-border);
  }

  .brand {
    color: var(--color-text-primary);
    font-weight: var(--font-weight-medium);
  }

  nav {
    min-width: 0;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-md) var(--space-xl);
    margin: 0;
    padding: 0;
    list-style: none;
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
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .note {
    color: var(--color-text-muted);
    margin-left: auto;
  }

  @media (max-width: 640px) {
    .footer {
      align-items: flex-start;
      flex-direction: column;
    }

    .note {
      margin-left: 0;
    }
  }
</style>
