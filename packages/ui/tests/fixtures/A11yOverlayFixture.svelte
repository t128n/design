<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import { Dialog, Input } from '../../src/index.js';
</script>

<Dialog
  open
  title="Rename project"
  description="Choose a new name for this project. The URL stays the same."
>
  <Input label="Project name" description="Keep it short and readable." />
</Dialog>
