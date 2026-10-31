import type { Preview } from '@storybook/svelte-vite';

const preview: Preview = {
  parameters: {
    a11y: {
      test: 'error'
    },
    controls: {
      expanded: true
    },
    options: {
      storySort: {
        order: [
          'Foundations',
          ['Overview', 'Theming'],
          'Primitives',
          'Layouts',
          'Components',
          ['Controls', 'Forms', 'Data', 'Feedback', 'Overlays', 'Navigation'],
          'Views'
        ]
      }
    },
    viewport: {
      options: {
        narrow320: {
          name: 'Narrow 320',
          styles: { width: '320px', height: '800px' },
          type: 'mobile'
        },
        narrow375: {
          name: 'Narrow 375',
          styles: { width: '375px', height: '812px' },
          type: 'mobile'
        },
        tablet768: {
          name: 'Tablet 768',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet'
        },
        desktop1280: {
          name: 'Desktop 1280',
          styles: { width: '1280px', height: '900px' },
          type: 'desktop'
        }
      }
    }
  }
};

export default preview;
