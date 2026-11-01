<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import List from '../../src/lib/List.svelte';
  import Text from '../../src/lib/Text.svelte';
</script>

<List as="dl" gap="md" class="definition">
  <Text as="dt" variant="label" tone="secondary">Owner</Text>
  <Text as="dd" variant="body">Mara Chen</Text>
  <Text as="dt" variant="label" tone="secondary">Environment</Text>
  <Text as="dd" variant="body">Production</Text>
</List>
