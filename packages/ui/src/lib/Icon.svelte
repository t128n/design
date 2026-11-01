<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import { mergeClasses } from './class';
  import type { IconComponent, IconSize } from './icon';

  type Props = {
    /** A Carbon icon component: `import Add from '~icons/carbon/add'`. */
    icon: IconComponent;
    size?: IconSize;
    /** Labels the icon as an image. Omit it for decorative icons. */
    label?: string;
    class?: string;
  };

  let { icon: Glyph, size = 16, label, class: className = '' }: Props = $props();

  const classes = $derived(mergeClasses('icon', className));
</script>

<Glyph
  width={size}
  height={size}
  class={classes}
  role={label ? 'img' : undefined}
  aria-label={label}
  aria-hidden={label ? undefined : 'true'}
/>
