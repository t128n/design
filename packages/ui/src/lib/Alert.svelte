<script lang="ts">
  import type { Snippet } from 'svelte';

  type Tone = 'neutral' | 'info' | 'progress' | 'success' | 'warning' | 'danger';

  let {
    tone = 'neutral',
    title,
    children
  }: { tone?: Tone; title: string; children?: Snippet } = $props();
</script>

<div
  class="alert"
  class:neutral={tone === 'neutral'}
  class:info={tone === 'info'}
  class:progress={tone === 'progress'}
  class:success={tone === 'success'}
  class:warning={tone === 'warning'}
  class:danger={tone === 'danger'}
  role={tone === 'danger' ? 'alert' : 'status'}
>
  <strong class="title">{title}</strong>
  {#if children}
    <div class="body">{@render children()}</div>
  {/if}
</div>

<style>
  .alert {
    display: grid;
    gap: 2px;
    padding: var(--space-sm) var(--space-md);
    border: 1px solid var(--color-border);
    border-left: 3px solid var(--color-text-muted);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .neutral {
    border-left-color: var(--color-text-secondary);
    background: var(--color-surface-subtle);
  }

  .info {
    border-left-color: var(--color-info);
    background: var(--color-info-surface);
  }

  .progress {
    border-left-color: var(--color-progress);
    background: var(--color-progress-surface);
  }

  .success {
    border-left-color: var(--color-success);
    background: var(--color-success-surface);
  }

  .warning {
    border-left-color: var(--color-warning);
    background: var(--color-warning-surface);
  }

  .danger {
    border-left-color: var(--color-danger);
    background: var(--color-danger-surface);
  }

  .title {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-label);
  }

  .neutral .title { color: var(--color-text-primary); }
  .info .title { color: var(--color-info); }
  .progress .title { color: var(--color-progress); }
  .success .title { color: var(--color-success); }
  .warning .title { color: var(--color-warning); }
  .danger .title { color: var(--color-danger); }

  .body {
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }
</style>
