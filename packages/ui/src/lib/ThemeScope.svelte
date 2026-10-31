<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement> & {
    theme?: 'light';
    tokens?: Record<string, string>;
    class?: string;
    children?: Snippet;
  };

  let {
    theme = 'light',
    tokens = {},
    class: className = '',
    style,
    children,
    ...restProps
  }: Props = $props();

  function tokenStyle(values: Record<string, string>): string {
    const entries = Object.entries(values);
    const invalid = entries.find(([key]) => !key.startsWith('--'));

    if (invalid) {
      throw new Error(
        `ThemeScope tokens must be custom properties starting with "--"; received "${invalid[0]}".`
      );
    }

    return entries.map(([key, value]) => `${key}: ${value};`).join(' ');
  }

  const overrideStyle = $derived(tokenStyle(tokens));
  const mergedStyle = $derived([overrideStyle, style].filter(Boolean).join(' '));
</script>

<div
  {...restProps}
  data-theme={theme}
  class={className}
  style={mergedStyle || undefined}
>
  {@render children?.()}
</div>
