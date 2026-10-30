<script lang="ts">
  type SlashMenuItem = {
    icon: string;
    title: string;
    caption: string;
  };

  let {
    items,
    onSelect,
  }: {
    items: SlashMenuItem[];
    onSelect?: (item: SlashMenuItem) => void;
  } = $props();
</script>

<div class="t128n-slash" role="menu">
  {#each items as item (item.title)}
    <button
      class="t128n-slash__item"
      type="button"
      role="menuitem"
      onclick={() => onSelect?.(item)}
    >
      <span class="t128n-slash__icon" aria-hidden="true">{item.icon}</span>
      <span class="t128n-slash__copy">
        <span class="t128n-slash__title">{item.title}</span>
        <span class="t128n-slash__caption">{item.caption}</span>
      </span>
    </button>
  {/each}
</div>

<style>
  .t128n-slash {
    position: absolute;
    z-index: var(--layer-menu);
    min-width: var(--width-label);
    padding: var(--space-1);
    background: var(--surface-panel);
    border: var(--ring-offset) solid var(--border-strong);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-overlay);
    animation: t128n-slash-in var(--duration-fast) var(--ease-standard);
  }

  .t128n-slash__item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    min-height: var(--control-h);
    padding: var(--space-1) var(--space-2);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    text-align: start;
    cursor: pointer;
  }

  .t128n-slash__item:hover {
    background: var(--state-hover);
  }

  .t128n-slash__item:active {
    background: var(--state-pressed);
  }

  .t128n-slash__item:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: calc(var(--ring-offset) * -1);
  }

  .t128n-slash__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: var(--size-4);
    height: var(--size-4);
    border-radius: var(--radius-md);
    background: var(--surface-subtle);
    color: var(--text-2);
    font: var(--type-action);
  }

  .t128n-slash__copy {
    display: flex;
    flex-direction: column;
    gap: 0;
    min-width: 0;
  }

  .t128n-slash__title {
    color: var(--text-1);
    font: var(--type-action);
  }

  .t128n-slash__caption {
    color: var(--text-3);
    font: var(--type-caption);
  }

  @keyframes t128n-slash-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .t128n-slash {
      animation: none;
    }
  }
</style>
