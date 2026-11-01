<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import { Separator } from 'bits-ui';

  type Props = {
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
    class?: string;
  };

  let { orientation = 'horizontal', decorative = true, class: className = '' }: Props = $props();
</script>

<Separator.Root
  {orientation}
  decorative={decorative}
  class={`t128n-separator ${orientation === 'vertical' ? 'vertical' : 'horizontal'} ${className}`}
/>

<style>
  :global(.t128n-separator) {
    background: var(--color-border);
    flex-shrink: 0;
  }

  :global(.t128n-separator.horizontal) {
    height: 1px;
    width: 100%;
  }

  :global(.t128n-separator.vertical) {
    height: 100%;
    width: 1px;
  }
</style>
