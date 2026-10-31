<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    eyebrow?: string;
    title: string;
    description?: string;
    actions?: Snippet;
    aside?: Snippet;
    align?: 'left' | 'center';
  };

  let {
    eyebrow,
    title,
    description,
    actions,
    aside,
    align = 'left'
  }: Props = $props();
</script>

<section
  class="hero"
  class:center={align === 'center'}
  class:has-aside={!!aside}
>
  <div class="copy">
    {#if eyebrow}
      <span class="eyebrow">{eyebrow}</span>
    {/if}
    <h1>{title}</h1>
    {#if description}
      <p>{description}</p>
    {/if}
    {#if actions}
      <div class="actions">{@render actions()}</div>
    {/if}
  </div>
  {#if aside}
    <div class="aside">{@render aside()}</div>
  {/if}
</section>

<style>
  .hero {
    display: grid;
    gap: var(--space-2xl);
    padding: var(--space-3xl) 0;
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .hero.has-aside {
    grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
    align-items: start;
  }

  .hero.center {
    justify-items: center;
    text-align: center;
  }

  .copy {
    display: grid;
    gap: var(--space-sm);
    min-width: 0;
    max-width: 100%;
  }

  .center .copy {
    justify-items: center;
  }

  .eyebrow {
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-body);
  }

  h1 {
    max-width: 18ch;
    margin: 0;
    overflow-wrap: anywhere;
    font-size: var(--font-size-display);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-display);
  }

  .center h1 {
    max-width: 22ch;
  }

  p {
    max-width: var(--layout-reading-width);
    margin: 0;
    overflow-wrap: anywhere;
    color: var(--color-text-secondary);
    font-size: var(--font-size-body);
    line-height: var(--line-height-body);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    margin-top: var(--space-lg);
  }

  .center .actions {
    justify-content: center;
  }

  .aside {
    min-width: 0;
    align-self: start;
  }

  @media (max-width: 800px) {
    .hero.has-aside {
      grid-template-columns: 1fr;
    }

    h1 {
      font-size: var(--font-size-heading);
    }
  }
</style>
