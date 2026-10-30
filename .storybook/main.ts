import type { StorybookConfig } from '@storybook/svelte-vite';

const config: StorybookConfig = {
  stories: ['../packages/ui/src/**/*.stories.@(js|ts|svelte)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-svelte-csf'],
  framework: {
    name: '@storybook/svelte-vite',
    options: { docgen: false }
  }
};

export default config;
