import type { Meta, StoryObj } from '@storybook/svelte-vite';
import SlashMenuDemo from './SlashMenuDemo.svelte';

const meta = {
  title: 'Components/Slash menu',
  component: SlashMenuDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Block insertion menu (DESIGN.md 7.7). It lives at `--layer-menu`, uses the menu surface with a strong hairline and the overlay shadow, and gives every row a `--size-4` icon tile, title and caption. The menu is opened from the document, never from app chrome.',
      },
    },
  },
  render: () => ({ Component: SlashMenuDemo }),
} satisfies Meta<typeof SlashMenuDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
