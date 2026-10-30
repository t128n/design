import type { StorybookConfig } from '@storybook/svelte-vite';

const config: StorybookConfig = {
  stories: ['../packages/ui/src/**/*.stories.@(js|ts|svelte)'],
  addons: ['@storybook/addon-a11y'],
  framework: '@storybook/svelte-vite'
};

export default config;
