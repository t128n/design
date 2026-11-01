<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import { Checkbox, Input, Select } from '../../src/index.js';

  const items = [
    { value: 'production', label: 'Production' },
    { value: 'staging', label: 'Staging' }
  ];
</script>

<form aria-label="Project settings">
  <Input
    label="Project name"
    description="Use a short name that stays readable in navigation."
    required
  />
  <Input label="Project key" error="Use at least three characters." value="ab" />
  <Select
    label="Environment"
    description="Choose where the next deployment runs."
    items={items}
  />
  <Checkbox
    label="Include archived projects"
    description="Archived projects stay read-only."
  />
</form>
