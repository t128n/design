<script lang="ts">
  import type { ComponentProps, Snippet } from "svelte";
  import Icon from "../../icons/Icon.svelte";

  type Tone = "note" | "info" | "success" | "warning" | "danger";
  type IconName = ComponentProps<typeof Icon>["name"];

  interface Props {
    tone?: Tone;
    icon?: IconName;
    title?: string;
    children?: Snippet;
  }

  let {
    tone = "note",
    icon = "info",
    title,
    children,
  }: Props = $props();
</script>

<div
  class="t128n-callout t128n-callout--{tone}"
  role="note"
  data-testid="callout"
  data-tone={tone}
>
  <span class="t128n-callout__icon" aria-hidden="true">
    <Icon name={icon} />
  </span>

  <div class="t128n-callout__body">
    {#if title}
      <p class="t128n-callout__title">{title}</p>
    {/if}
    {#if children}
      <div class="t128n-callout__content">{@render children()}</div>
    {/if}
  </div>
</div>

<style>
  .t128n-callout {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
    color: var(--text-1);
  }

  .t128n-callout__icon {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-2);
  }

  .t128n-callout--info .t128n-callout__icon {
    color: var(--info);
  }

  .t128n-callout--success .t128n-callout__icon {
    color: var(--success);
  }

  .t128n-callout--warning .t128n-callout__icon {
    color: var(--warning);
  }

  .t128n-callout--danger .t128n-callout__icon {
    color: var(--danger);
  }

  .t128n-callout__body {
    flex: 1;
    min-width: 0;
  }

  .t128n-callout__title {
    font: var(--type-action);
    color: var(--text-1);
  }

  .t128n-callout__content {
    font: var(--type-body);
    color: var(--text-2);
  }

  .t128n-callout__title + .t128n-callout__content {
    margin-top: var(--space-1);
  }
</style>
