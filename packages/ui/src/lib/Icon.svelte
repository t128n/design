<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
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
