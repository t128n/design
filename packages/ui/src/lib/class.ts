// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import type { ClassValue } from 'svelte/elements';

type MaybeClass = ClassValue | false | null | undefined;

const flatten = (value: ClassValue, out: string[]) => {
  if (!value) return;

  if (typeof value === 'string') {
    out.push(value);
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      flatten(item, out);
    }
    return;
  }

  for (const [name, enabled] of Object.entries(value)) {
    if (enabled) out.push(name);
  }
};

/**
 * Joins class values in order, dropping empty entries and flattening class
 * arrays and maps. Components merge their own classes with the consumer's
 * `class` prop instead of overwriting it.
 */
export function mergeClasses(...values: MaybeClass[]): string {
  const classes: string[] = [];

  for (const value of values) {
    if (value) flatten(value, classes);
  }

  return classes.join(' ');
}
