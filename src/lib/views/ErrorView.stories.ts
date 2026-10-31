import type { Meta, StoryObj } from '@storybook/svelte-vite';
import ErrorView from './ErrorView.svelte';

const meta = {
  title: 'Views/Error',
  component: ErrorView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Error view (DESIGN.md section 8, Error, and 7.6 Feedback): a danger banner carries the system condition, then an inline empty state with Retry and a secondary status action.',
      },
    },
  },
  render: () => ({ Component: ErrorView }),
} satisfies Meta<typeof ErrorView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {};
