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
  class={`separator ${orientation === 'vertical' ? 'vertical' : 'horizontal'} ${className}`}
/>

<style>
  :global(.separator) {
    background: var(--color-border);
    flex-shrink: 0;
  }

  :global(.separator.horizontal) {
    height: 1px;
    width: 100%;
  }

  :global(.separator.vertical) {
    height: 100%;
    width: 1px;
  }
</style>
