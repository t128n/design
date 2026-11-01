// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

export type ComboboxItem = {
  value: string;
  label: string;
  /** Optional secondary line, useful for package descriptions. */
  description?: string;
  disabled?: boolean;
  /** Optional group name, e.g. "Dist-tags" or "Versions". */
  group?: string;
};
