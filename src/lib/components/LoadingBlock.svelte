<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  interface Props {
    rows?: number;
    label?: string;
    delayMs?: number;
  }

  let { rows = 4, label = 'Loading', delayMs = 300 }: Props = $props();

  let visible = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  onMount(() => {
    timer = setTimeout(() => {
      visible = true;
    }, delayMs);
  });

  onDestroy(() => {
    if (timer !== undefined) clearTimeout(timer);
  });
</script>

<div class="loading" aria-busy="true">
  {#if visible}
    <p class="label">{label}</p>
    <div class="skeletons">
      {#each Array.from({ length: rows }) as _, index (index)}
        <div class="skeleton" aria-hidden="true"></div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .loading {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    width: 100%;
    min-width: 0;
  }

  .label {
    font: var(--type-caption);
    color: var(--text-3);
  }

  .skeletons {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .skeleton {
    height: var(--row-h);
    border-radius: var(--radius-md);
    background: var(--surface-subtle);
  }
</style>
