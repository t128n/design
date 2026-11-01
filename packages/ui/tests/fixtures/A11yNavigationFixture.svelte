<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import { Footer, Navbar } from '../../src/index.js';

  const links = [
    { label: 'Overview', active: true },
    { label: 'Projects' },
    { label: 'Activity' }
  ];
</script>

<Navbar brand="Acme" links={links} label="Primary" />
<Footer
  brand="Acme"
  links={[{ label: 'Docs' }, { label: 'Status' }]}
  note="© 2026 Acme"
/>
