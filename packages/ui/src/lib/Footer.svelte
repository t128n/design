<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import Link from './Link.svelte';
  import List from './List.svelte';
  import Text from './Text.svelte';

  type LinkItem = {
    label: string;
    href?: string;
  };

  type Props = {
    brand?: string;
    links?: LinkItem[];
    note?: string;
    bordered?: boolean;
  };

  let {
    brand = 'Acme',
    links = [],
    note,
    bordered = true
  }: Props = $props();
</script>

<footer class="footer" class:bordered={bordered}>
  <Text variant="body-sm" as="span" weight="medium">{brand}</Text>
  {#if links.length}
    <nav aria-label="Footer">
      <List orientation="horizontal" marker="none" gap="xl">
        {#each links as link}
          <Text as="li" variant="body-sm">
            <Link href={link.href ?? '#'} class="footer-link">{link.label}</Link>
          </Text>
        {/each}
      </List>
    </nav>
  {/if}
  {#if note}
    <span class="note">
      <Text variant="body-sm" as="span" tone="muted">{note}</Text>
    </span>
  {/if}
</footer>

<style>
  .footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-md) var(--space-xl);
    padding: var(--space-lg) 0;
  }

  .footer.bordered {
    border-top: var(--border-width) solid var(--color-border);
  }

  nav {
    min-width: 0;
  }

  .footer :global(.footer-link) {
    color: var(--color-text-secondary);
    text-decoration: none;
  }

  .footer :global(.footer-link:hover) {
    color: var(--color-text-primary);
    text-decoration: underline;
  }

  .footer :global(.footer-link:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .note {
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
