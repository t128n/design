<script lang="ts">
  interface Props {
    code: string;
    language?: string;
  }

  let { code, language }: Props = $props();
</script>

<div class="t128n-code" data-testid="code-block">
  {#if language}
    <div class="t128n-code__header">
      <span class="t128n-code__language">{language}</span>
    </div>
  {/if}
  <pre class="t128n-code__pre t128n-mono" data-testid="code"><code>{code}</code></pre>
</div>

<style>
  .t128n-code {
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
  }

  .t128n-code__header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: var(--space-2) var(--space-3) 0;
  }

  .t128n-code__language {
    font: var(--type-caption);
    color: var(--text-3);
  }

  .t128n-code__pre {
    margin: 0;
    padding: var(--space-3);
    overflow-x: auto;
    color: var(--text-1);
    white-space: pre;
  }

  .t128n-mono {
    font: var(--type-mono);
  }
</style>
