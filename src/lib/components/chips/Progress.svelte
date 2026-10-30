<script lang="ts">
  interface Props {
    value: number;
    max?: number;
    label?: string;
  }

  let { value, max = 100, label }: Props = $props();

  const now = $derived(Math.min(Math.max(value, 0), max));
  const percent = $derived(max > 0 ? (now / max) * 100 : 0);
</script>

<div
  class="t128n-progress"
  role="progressbar"
  aria-valuenow={now}
  aria-valuemin="0"
  aria-valuemax={max}
  aria-label={label}
  data-testid="progress"
>
  <div class="t128n-progress__bar" style="width: {percent}%"></div>
</div>

<style>
  .t128n-progress {
    width: 100%;
    height: var(--space-1);
    border-radius: var(--radius-full);
    background: var(--surface-subtle);
    overflow: hidden;
  }

  .t128n-progress__bar {
    height: 100%;
    border-radius: var(--radius-full);
    background: var(--accent);
  }
</style>
