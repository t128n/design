import type { Decorator, Preview } from '@storybook/svelte-vite';
import '../src/app.css';

/**
 * Theme, density and line mode are container attributes (DESIGN.md 2.3, 2.6).
 * Storybook's preview is the outermost container, so the toolbar globals land on
 * the iframe's <html> element and every story inherits them.
 */
const withDesignGlobals: Decorator = (story, context) => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    const globals = context.globals as Record<string, string>;
    root.dataset.theme = globals.theme ?? 'light';
    root.dataset.density = globals.density ?? 'default';
    root.dataset.lines = globals.lines ?? 'faint';
    root.style.background = 'var(--surface-app)';
  }
  return story();
};

const preview: Preview = {
  decorators: [withDesignGlobals],
  initialGlobals: {
    theme: 'light',
    density: 'default',
    lines: 'faint',
  },
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    density: {
      description: 'Density',
      toolbar: {
        icon: 'zoom',
        items: [
          { value: 'compact', title: 'Compact' },
          { value: 'default', title: 'Default' },
          { value: 'comfortable', title: 'Comfortable' },
        ],
        dynamicTitle: true,
      },
    },
    lines: {
      description: 'Line mode',
      toolbar: {
        icon: 'component',
        items: [
          { value: 'none', title: 'No lines' },
          { value: 'faint', title: 'Faint lines' },
          { value: 'visible', title: 'Visible lines' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    controls: { expanded: true, sort: 'requiredFirst' },
    options: {
      storySort: {
        order: ['Foundations', 'Components', 'Views', '*'],
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
