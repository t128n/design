<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import ThemeScope from '../../src/lib/ThemeScope.svelte';
</script>

<ThemeScope theme="dark" tokens={{ '--color-accent': 'rebeccapurple', '--color-surface': 'linen' }}>
  <div data-testid="outer">
    <ThemeScope theme="light" tokens={{ '--color-accent': 'steelblue' }}>
      <div data-testid="inner">
        Nested theme
        <ThemeScope theme="dark">
          <div data-testid="inner-dark">Dark inside light</div>
        </ThemeScope>
      </div>
    </ThemeScope>
  </div>
</ThemeScope>
