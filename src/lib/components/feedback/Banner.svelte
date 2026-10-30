<script lang="ts">
  import type { Snippet } from "svelte";

  type Tone = "success" | "warning" | "danger" | "info";

  interface Props {
    tone?: Tone;
    title: string;
    children?: Snippet;
    action?: Snippet;
  }

  let { tone = "info", title, children, action }: Props = $props();
</script>

<div
  class="t128n-banner t128n-banner--{tone}"
  data-testid="banner"
  data-tone={tone}
  role="status"
>
  <svg
    class="t128n-banner__glyph"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    {#if tone === "success"}
      <path d="m3 8.5 3.5 3.5L13 4.5" />
    {:else if tone === "warning"}
      <path d="M8 2.5 14.5 13.5h-13L8 2.5Z" />
      <path d="M8 6v3.5" />
      <path d="M8 12v.01" />
    {:else if tone === "danger"}
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5V9" />
      <path d="M8 11.5v.01" />
    {:else}
      <circle cx="8" cy="8" r="6" />
      <path d="M8 7v4" />
      <path d="M8 4.5v.01" />
    {/if}
  </svg>

  <div class="t128n-banner__body">
    <p class="t128n-banner__title">{title}</p>
    {#if children}
      <div class="t128n-banner__description">{@render children()}</div>
    {/if}
  </div>

  {#if action}
    <div class="t128n-banner__action">{@render action()}</div>
  {/if}
</div>

<style>
  .t128n-banner {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    border: 1px solid
      color-mix(
        in srgb,
        var(--banner-status) var(--tint-strong),
        var(--surface-panel)
      );
    border-radius: var(--radius-lg);
    background: color-mix(
      in srgb,
      var(--banner-status) var(--tint-weak),
      var(--surface-panel)
    );
    color: var(--text-1);
  }

  .t128n-banner--success {
    --banner-status: var(--success);
  }

  .t128n-banner--warning {
    --banner-status: var(--warning);
  }

  .t128n-banner--danger {
    --banner-status: var(--danger);
  }

  .t128n-banner--info {
    --banner-status: var(--info);
  }

  .t128n-banner__glyph {
    flex: none;
    width: var(--icon);
    height: var(--icon);
    margin-top: 2px;
    color: var(--banner-status);
  }

  .t128n-banner__body {
    flex: 1;
    min-width: 0;
  }

  .t128n-banner__title {
    font: var(--type-action);
    color: var(--text-1);
  }

  .t128n-banner__description {
    margin-top: var(--space-1);
    font: var(--type-body);
    color: var(--text-2);
  }

  .t128n-banner__action {
    flex: none;
    align-self: center;
    margin-left: auto;
  }
</style>
