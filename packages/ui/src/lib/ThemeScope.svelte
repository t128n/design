<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Theme = 'light' | 'dark' | 'system';

  type Props = HTMLAttributes<HTMLDivElement> & {
    theme?: Theme;
    tokens?: Record<string, string>;
    class?: string;
    children?: Snippet;
  };

  let {
    theme = 'system',
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

  // "system" inherits the surrounding or OS theme, so it must not emit
  // data-theme. Explicit values opt the subtree into that theme block.
  const explicitTheme = $derived(theme === 'system' ? undefined : theme);
  const overrideStyle = $derived(tokenStyle(tokens));
  const mergedStyle = $derived([overrideStyle, style].filter(Boolean).join(' '));
</script>

<div
  {...restProps}
  data-theme={explicitTheme}
  class={className}
  style={mergedStyle || undefined}
>
  {@render children?.()}
</div>
