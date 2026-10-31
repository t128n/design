import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Pagination from '$lib/components/Pagination.svelte';
import StorySurface from './StorySurface.svelte';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Pagination (7.4): icon buttons for previous and next, numbered buttons, and the current page on --state-selected with aria-current="page". Previous is disabled on the first page and next on the last, so the boundary is visible rather than silent. Long ranges collapse to first, last and the current page ±1 with a non-interactive gap. The keyboard path is the native button order.',
      },
    },
  },
  argTypes: {
    page: { control: 'number', description: 'Bindable current page' },
    pages: { control: 'number', description: 'Total pages; clamped to at least one' },
    label: { control: 'text', description: 'Accessible name for the navigation landmark' },
    onchange: { action: 'page changed' },
  },
  args: { page: 3, pages: 12, label: 'Pagination' },
  render: (args) => ({ Component: Pagination, props: args }),
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FirstPage: Story = {
  args: { page: 1 },
};

export const LastPage: Story = {
  args: { page: 12 },
};

export const FewPages: Story = {
  args: { page: 2, pages: 4 },
};
