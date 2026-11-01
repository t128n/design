// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import type { StorybookConfig } from '@storybook/svelte-vite';

const config: StorybookConfig = {
  stories: [
    '../packages/ui/src/**/*.stories.@(js|ts|svelte)',
    // Storybook is the primary documentation surface; these pages are the docs.
    '../packages/ui/docs/**/*.mdx'
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-svelte-csf',
    '@storybook/addon-docs',
    '@storybook/addon-vitest'
  ],
  framework: {
    name: '@storybook/svelte-vite',
    options: { docgen: true }
  }
};

export default config;
