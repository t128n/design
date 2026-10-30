<script lang="ts">
  interface Props {
    rows?: number;
  }

  let { rows = 3 }: Props = $props();
</script>

<div class="t128n-skeleton" aria-hidden="true" data-testid="skeleton">
  {#each Array(rows) as _, index (index)}
    <div class="t128n-skeleton__row"></div>
  {/each}
</div>

<style>
  .t128n-skeleton {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .t128n-skeleton__row {
    height: var(--row-h);
    border-radius: var(--radius-md);
    background: var(--surface-subtle);
  }
</style>
