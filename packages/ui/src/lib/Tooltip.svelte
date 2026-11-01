<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import { Tooltip } from 'bits-ui';
  import Button from './Button.svelte';

  type Props = {
    content: string;
    triggerLabel: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    delay?: number;
    disabled?: boolean;
  };

  let {
    content,
    triggerLabel,
    side = 'top',
    delay = 300,
    disabled = false
  }: Props = $props();
</script>

<Tooltip.Provider delayDuration={delay}>
  <Tooltip.Root {disabled}>
    <Tooltip.Trigger>
      {#snippet child({ props })}
        <Button {...props} variant="secondary">{triggerLabel}</Button>
      {/snippet}
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content class="tooltip-content" role="tooltip" {side} sideOffset={6}>
        <div class="tooltip-bubble">{content}</div>
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>

<style>
  :global(.tooltip-content) {
    z-index: 60;
  }

  .tooltip-bubble {
    max-width: 18rem;
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-sm);
    background: var(--color-text-primary);
    color: var(--color-surface);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }
</style>
