<script lang="ts">
  interface Props {
    code: string;
    label?: string;
  }

  let { code, label }: Props = $props();
</script>

<div class="block">
  {#if label}<span class="label">{label}</span>{/if}
  <!-- The block is a horizontal scroll region, so it must be reachable by keyboard. -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <pre class="code" tabindex="0"><code>{code}</code></pre>
</div>

<style>
  .block {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    width: 100%;
    min-width: 0;
  }

  .label {
    font: var(--type-caption);
    color: var(--text-3);
  }

  .code {
    margin: 0;
    padding: var(--space-3);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
    color: var(--text-1);
    font: var(--type-mono);
    overflow-x: auto;
  }

  .code:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: calc(var(--ring-offset) * -1);
  }

  code {
    font: var(--type-mono);
    white-space: pre;
  }
</style>
