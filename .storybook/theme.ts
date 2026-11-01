// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { create } from 'storybook/theming';

const shared = {
  brandTitle: 't128n design',
  fontBase: '"IBM Plex Sans", system-ui, sans-serif',
  fontCode: '"IBM Plex Mono", ui-monospace, monospace',
  appBorderRadius: 4,
  inputBorderRadius: 4
};

export const lightDocsTheme = create({
  ...shared,
  base: 'light',
  colorPrimary: '#0F62FE',
  colorSecondary: '#0F62FE',
  appBg: '#F2F4F8',
  appContentBg: '#FFFFFF',
  appHoverBg: '#F2F4F8',
  appPreviewBg: '#FFFFFF',
  appBorderColor: '#DDE1E6',
  textColor: '#161616',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#525252',
  barBg: '#FFFFFF',
  barTextColor: '#525252',
  barHoverColor: '#0F62FE',
  barSelectedColor: '#0F62FE',
  buttonBg: '#FFFFFF',
  buttonBorder: '#DDE1E6',
  booleanBg: '#F2F4F8',
  booleanSelectedBg: '#FFFFFF',
  inputBg: '#FFFFFF',
  inputBorder: '#DDE1E6',
  inputTextColor: '#161616'
});

export const darkDocsTheme = create({
  ...shared,
  base: 'dark',
  colorPrimary: '#78A9FF',
  colorSecondary: '#78A9FF',
  appBg: '#0B0B0B',
  appContentBg: '#161616',
  appHoverBg: '#262626',
  appPreviewBg: '#161616',
  appBorderColor: '#393939',
  textColor: '#F2F4F8',
  textInverseColor: '#161616',
  textMutedColor: '#DDE1E6',
  barBg: '#161616',
  barTextColor: '#DDE1E6',
  barHoverColor: '#78A9FF',
  barSelectedColor: '#78A9FF',
  buttonBg: '#262626',
  buttonBorder: '#393939',
  booleanBg: '#262626',
  booleanSelectedBg: '#393939',
  inputBg: '#262626',
  inputBorder: '#393939',
  inputTextColor: '#F2F4F8'
});

const prefersDark =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

/** Keep Storybook's docs chrome on the same theme as the design tokens. */
export const docsTheme = prefersDark ? darkDocsTheme : lightDocsTheme;
