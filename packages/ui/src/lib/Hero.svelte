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

<section class="hero" class:center={align === 'center'} class:has-aside={!!aside}>
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
    padding: var(--space-2xl) 0;
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .hero.has-aside {
    grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
    align-items: center;
  }

  .hero.center {
    justify-items: center;
    text-align: center;
  }

  .copy {
    display: grid;
    gap: var(--space-md);
    max-width: 60ch;
  }

  .center .copy {
    justify-items: center;
  }

  .eyebrow {
    color: var(--color-text-secondary);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-semibold);
    letter-spacing: 0.08em;
    line-height: var(--line-height-caption);
    text-transform: uppercase;
  }

  h1 {
    max-width: 20ch;
    margin: 0;
    font-size: var(--font-size-display);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-display);
  }

  .center h1 {
    max-width: 24ch;
  }

  p {
    max-width: 60ch;
    margin: 0;
    color: var(--color-text-secondary);
    font-size: var(--font-size-body);
    line-height: var(--line-height-body);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    margin-top: var(--space-xs);
  }

  .aside {
    min-width: 0;
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
