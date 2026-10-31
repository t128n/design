import type { Meta, StoryObj } from '@storybook/svelte-vite';
import TableDatabaseView from '$lib/views/TableDatabaseView.svelte';

const meta = {
  title: 'Views/Table database',
  component: TableDatabaseView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Table database (DESIGN.md 8): header, toolbar with view tabs and filters, a full-width table and a footer count. The sunken header is sticky, the date column is sorted, a selected row carries a checked box and `--state-selected`, and a trailing "New" row adds an item in `--text-3`.',
      },
    },
  },
  render: () => ({ Component: TableDatabaseView }),
} satisfies Meta<typeof TableDatabaseView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TableDatabase: Story = {};
