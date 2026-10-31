<script lang="ts">
  type Status = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

  interface Props {
    label: string;
    status?: Status;
  }

  let { label, status = 'neutral' }: Props = $props();
</script>

<span class="badge" data-status={status}>
  <span class="dot" aria-hidden="true"></span>
  {label}
</span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    height: var(--chip-h);
    padding: 0 var(--space-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
    color: var(--text-2);
    font: var(--type-label);
    white-space: nowrap;
  }

  .dot {
    width: var(--space-1);
    height: var(--space-1);
    border-radius: var(--radius-full);
    background: var(--text-3);
    flex: none;
  }

  [data-status='success'] .dot {
    background: var(--success);
  }

  [data-status='warning'] .dot {
    background: var(--warning);
  }

  [data-status='danger'] .dot {
    background: var(--danger);
  }

  [data-status='info'] .dot {
    background: var(--info);
  }
</style>
