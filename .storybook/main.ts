import type { StorybookConfig } from '@storybook/svelte-vite';

const config: StorybookConfig = {
  stories: ['../packages/ui/src/**/*.stories.@(js|ts|svelte)'],
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
