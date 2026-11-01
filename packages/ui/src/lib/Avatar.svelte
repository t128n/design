<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import { Avatar } from 'bits-ui';

  type Props = {
    src?: string;
    alt?: string;
    fallback: string;
    size?: 'sm' | 'md' | 'lg';
    class?: string;
  };

  let { src, alt = '', fallback, size = 'md', class: className = '' }: Props = $props();
</script>

<Avatar.Root class={`t128n-avatar ${size} ${className}`}>
  {#if src}
    <Avatar.Image {src} {alt} class="avatar-image" />
  {/if}
  <Avatar.Fallback class="avatar-fallback">{fallback}</Avatar.Fallback>
</Avatar.Root>

<style>
  :global(.t128n-avatar) {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 50%;
    background: var(--color-surface-subtle);
    color: var(--color-text-secondary);
    font-family: var(--font-family-sans);
    font-weight: var(--font-weight-medium);
    flex-shrink: 0;
  }

  :global(.t128n-avatar.sm) {
    width: var(--avatar-size-sm);
    height: var(--avatar-size-sm);
    font-size: var(--font-size-caption);
  }

  :global(.t128n-avatar.md) {
    width: var(--avatar-size-md);
    height: var(--avatar-size-md);
    font-size: var(--font-size-body-sm);
  }

  :global(.t128n-avatar.lg) {
    width: var(--avatar-size-lg);
    height: var(--avatar-size-lg);
    font-size: var(--font-size-body);
  }

  :global(.t128n-avatar .avatar-image) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  :global(.t128n-avatar .avatar-fallback) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  :global(.t128n-avatar:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }
</style>
