<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import { AspectRatio } from 'bits-ui';
  import type { Snippet } from 'svelte';

  type Props = {
    ratio?: number;
    children?: Snippet;
    class?: string;
  };

  let { ratio = 1, children, class: className = '' }: Props = $props();
</script>

<AspectRatio.Root {ratio} class={`t128n-aspect-ratio ${className}`}>
  {@render children?.()}
</AspectRatio.Root>

<style>
  :global(.t128n-aspect-ratio) {
    position: relative;
    width: 100%;
  }

  :global(.t128n-aspect-ratio img),
  :global(.t128n-aspect-ratio video) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
