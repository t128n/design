<script lang="ts">
  import type { TagTone } from "../chips/Tag.svelte";
  import Avatar from "../chips/Avatar.svelte";
  import Tag from "../chips/Tag.svelte";

  export interface BoardCardTag {
    label: string;
    tone?: TagTone;
  }

  interface Props {
    title: string;
    id?: string;
    tags?: BoardCardTag[];
    avatar?: string;
    href?: string;
  }

  let { title, id, tags = [], avatar, href }: Props = $props();
</script>

{#snippet content()}
  <span class="t128n-card__title t128n-heading">{title}</span>
  {#if id || tags.length > 0 || avatar}
    <span class="t128n-card__meta">
      {#if id}
        <span class="t128n-card__id t128n-mono">{id}</span>
      {/if}
      {#if tags.length > 0}
        <span class="t128n-card__tags">
          {#each tags as tag}
            <Tag tone={tag.tone}>{tag.label}</Tag>
          {/each}
        </span>
      {/if}
      {#if avatar}
        <Avatar name={avatar} size={2} />
      {/if}
    </span>
  {/if}
{/snippet}

<article
  class={href ? "t128n-card t128n-card--interactive" : "t128n-card"}
  data-testid="board-card"
>
  {#if href}
    <a class="t128n-card__link" {href}>{@render content()}</a>
  {:else}
    <div class="t128n-card__link">{@render content()}</div>
  {/if}
</article>

<style>
  .t128n-card {
    display: flex;
    flex-direction: column;
    padding: var(--space-2) var(--space-3);
    border: var(--ring-offset) solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
  }

  .t128n-card__link {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    color: inherit;
    text-decoration: none;
  }

  .t128n-card__link:hover {
    text-decoration: none;
  }

  .t128n-card--interactive {
    cursor: pointer;
  }

  .t128n-card--interactive:hover {
    background: var(--surface-sunken);
  }

  .t128n-card--interactive:active {
    background: var(--state-pressed);
  }

  .t128n-card__title {
    color: var(--text-1);
    font: var(--type-heading);
  }

  .t128n-card__meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .t128n-card__id {
    color: var(--text-3);
    font: var(--type-mono);
  }

  .t128n-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
  }
</style>
