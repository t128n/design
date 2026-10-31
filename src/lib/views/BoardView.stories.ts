import type { Meta, StoryObj } from '@storybook/svelte-vite';
import BoardView from '$lib/views/BoardView.svelte';

const meta = {
  title: 'Views/Board',
  component: BoardView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Board (DESIGN.md 8): header, toolbar and horizontally scrolling columns. Cards sit on a panel surface with a hairline, `--radius-lg` corners and `--space-2` × `--space-3` padding; each card is a title followed by an ID / tag / avatar row and hovers to sunken. Column headers are text plus count with no fill.',
      },
    },
  },
  render: () => ({ Component: BoardView }),
} satisfies Meta<typeof BoardView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Board: Story = {};
