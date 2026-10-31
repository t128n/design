<script lang="ts">
  import type { Snippet } from 'svelte';
  import Text from './Text.svelte';
  import type { TextTone } from './typography';

  type Tone = 'neutral' | 'info' | 'progress' | 'success' | 'warning' | 'danger';

  let {
    tone = 'neutral',
    title,
    children
  }: { tone?: Tone; title: string; children?: Snippet } = $props();

  const titleTone: TextTone = $derived(tone === 'neutral' ? 'primary' : tone);
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
  <Text variant="label" as="strong" tone={titleTone}>{title}</Text>
  {#if children}
    <Text as="div" variant="body-sm" tone="secondary">{@render children()}</Text>
  {/if}
</div>

<style>
  .alert {
    display: grid;
    gap: var(--space-xs);
    padding: var(--space-sm) var(--space-md);
    border: var(--border-width) solid var(--color-border);
    border-left: var(--border-width-accent) solid var(--color-text-muted);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
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
</style>
