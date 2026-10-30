<script lang="ts">
  interface Props {
    title: string;
    caption?: string;
    cover?: string;
    href?: string;
  }

  let { title, caption, cover, href }: Props = $props();
</script>

{#snippet content()}
  {#if cover}
    <span class="t128n-gallery__cover" data-testid="gallery-cover">
      <img src={cover} alt="" />
    </span>
  {/if}
  <span class="t128n-gallery__body">
    <span class="t128n-gallery__title t128n-heading">{title}</span>
    {#if caption}
      <span class="t128n-gallery__caption t128n-caption">{caption}</span>
    {/if}
  </span>
{/snippet}

<article
  class={href ? "t128n-gallery t128n-gallery--interactive" : "t128n-gallery"}
  data-testid="gallery-card"
>
  {#if href}
    <a class="t128n-gallery__link" {href}>{@render content()}</a>
  {:else}
    <div class="t128n-gallery__link">{@render content()}</div>
  {/if}
</article>

<style>
  .t128n-gallery {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: var(--ring-offset) solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
  }

  .t128n-gallery__link {
    display: flex;
    flex-direction: column;
    color: inherit;
    text-decoration: none;
  }

  .t128n-gallery__link:hover {
    text-decoration: none;
  }

  .t128n-gallery--interactive {
    cursor: pointer;
  }

  .t128n-gallery--interactive:hover {
    background: var(--surface-sunken);
  }

  .t128n-gallery--interactive:active {
    background: var(--state-pressed);
  }

  .t128n-gallery__cover {
    display: block;
    background: var(--surface-sunken);
    border-bottom: var(--ring-offset) solid var(--border);
  }

  .t128n-gallery__cover img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .t128n-gallery__body {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-2) var(--space-3);
  }

  .t128n-gallery__title {
    color: var(--text-1);
    font: var(--type-heading);
  }

  .t128n-gallery__caption {
    color: var(--text-3);
    font: var(--type-caption);
  }
</style>
