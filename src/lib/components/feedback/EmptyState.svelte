<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    title: string;
    description?: string;
    icon?: string;
    action?: Snippet;
  }

  let { title, description, icon, action }: Props = $props();
</script>

<div class="t128n-empty-state" data-testid="empty-state">
  {#if icon}
    <div
      class="t128n-empty-state__icon"
      aria-hidden="true"
      data-icon={icon}
      data-testid="empty-state__icon"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M2.5 4.5A1.5 1.5 0 0 1 4 3h2.3l1.2 1.5H12A1.5 1.5 0 0 1 13.5 6v5.5A1.5 1.5 0 0 1 12 13H4a1.5 1.5 0 0 1-1.5-1.5v-7Z" />
      </svg>
    </div>
  {/if}

  <h2 class="t128n-empty-state__title">{title}</h2>

  {#if description}
    <p class="t128n-empty-state__description">{description}</p>
  {/if}

  {#if action}
    <div class="t128n-empty-state__action">{@render action()}</div>
  {/if}
</div>

<style>
  .t128n-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-6);
    text-align: center;
  }

  .t128n-empty-state__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--size-5);
    height: var(--size-5);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
    color: var(--text-3);
  }

  .t128n-empty-state__icon svg {
    width: var(--size-3);
    height: var(--size-3);
  }

  .t128n-empty-state__title {
    font: var(--type-heading);
    color: var(--text-1);
  }

  .t128n-empty-state__description {
    max-width: var(--width-dialog);
    font: var(--type-body);
    color: var(--text-2);
  }

  .t128n-empty-state__action {
    margin-top: var(--space-1);
  }
</style>
