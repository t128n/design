// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// Type-only consumer fixture: compiles against the published entrypoints with strict mode.
import { Button, Dialog, Stack, Text } from '@t128n/ui';
import type { LayoutTag, Space, TextVariant } from '@t128n/ui';
import '@t128n/ui/styles';

export const gap: Space = 'md';
export const variant: TextVariant = 'body';
export const tag: LayoutTag = 'div';

export const components = { Button, Dialog, Stack, Text };
