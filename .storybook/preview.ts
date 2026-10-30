import type { Preview } from '@storybook/svelte-vite';

const preview: Preview = {
  parameters: {
    a11y: {
      test: 'error'
    },
    controls: {
      expanded: true
    }
  },
  globalTypes: {
    theme: {
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        items: ['light', 'dark']
      }
    },
    density: {
      description: 'Interface density',
      defaultValue: 'default',
      toolbar: {
        items: ['compact', 'default', 'comfortable']
      }
    },
    lines: {
      description: 'Line treatment',
      defaultValue: 'faint',
      toolbar: {
        items: ['none', 'faint', 'visible']
      }
    }
  }
};

export default preview;
