<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import type { Snippet } from 'svelte';

  type Tone = 'neutral' | 'info' | 'progress' | 'success' | 'warning' | 'danger' | 'disabled';

  let { tone = 'neutral', children }: { tone?: Tone; children?: Snippet } = $props();
</script>

<span
  class="badge"
  class:neutral={tone === 'neutral'}
  class:info={tone === 'info'}
  class:progress={tone === 'progress'}
  class:success={tone === 'success'}
  class:warning={tone === 'warning'}
  class:danger={tone === 'danger'}
  class:disabled={tone === 'disabled'}
>
  {@render children?.()}
</span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    padding: 2px var(--space-sm);
    border-radius: var(--radius-sm);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-caption);
    white-space: nowrap;
  }

  .neutral {
    background: var(--color-surface-subtle);
    color: var(--color-text-secondary);
  }

  .info {
    background: var(--color-info-surface);
    color: var(--color-info);
  }

  .progress {
    background: var(--color-progress-surface);
    color: var(--color-progress);
  }

  .success {
    background: var(--color-success-surface);
    color: var(--color-success);
  }

  .warning {
    background: var(--color-warning-surface);
    color: var(--color-warning);
  }

  .danger {
    background: var(--color-danger-surface);
    color: var(--color-danger);
  }

  .disabled {
    background: var(--color-disabled-background);
    color: var(--color-text-secondary);
  }
</style>
