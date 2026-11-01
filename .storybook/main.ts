// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

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
