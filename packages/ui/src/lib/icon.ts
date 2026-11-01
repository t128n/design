// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import type { Component } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

/**
 * A Carbon icon component imported through the build-time `unplugin-icons`
 * pipeline, for example `import Add from '~icons/carbon/add'`.
 */
export type IconComponent = Component<SvelteHTMLElements['svg']>;

/** Carbon's intended display sizes. 32 is reserved for large representations. */
export const iconSizes = [16, 20, 24, 32] as const;

export type IconSize = (typeof iconSizes)[number];
