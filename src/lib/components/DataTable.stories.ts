import type { Meta, StoryObj } from '@storybook/svelte-vite';
import DataTable from '$lib/components/DataTable.svelte';

const columns: {
  key: string;
  label: string;
  align?: 'left' | 'right';
  width?: string;
}[] = [
  { key: 'id', label: 'ID', width: 'calc(var(--size-5) * 2)' },
  { key: 'title', label: 'Title' },
  { key: 'status', label: 'Status', width: 'calc(var(--size-5) * 3)' },
  { key: 'priority', label: 'Priority', width: 'calc(var(--size-5) * 3)' },
  { key: 'updated', label: 'Updated', align: 'right', width: 'calc(var(--size-5) * 2)' },
];

const rows: Record<string, unknown>[] = [
  {
    id: 'ENG-412',
    title: 'Keyboard trap in command palette',
    status: 'In progress',
    priority: 'Urgent',
    updated: '2h ago',
  },
  {
    id: 'ENG-408',
    title: 'Sticky header jumps on scroll',
    status: 'In review',
    priority: 'High',
    updated: '4h ago',
  },
  {
    id: 'DES-231',
    title: 'Density tokens for compact tables',
    status: 'In progress',
    priority: 'Medium',
    updated: '6h ago',
  },
  {
    id: 'ENG-401',
    title: 'Focus ring clipped in overflow rows',
    status: 'Blocked',
    priority: 'High',
    updated: '1d ago',
  },
  {
    id: 'DES-224',
    title: 'Tag contrast in dark mode',
    status: 'Done',
    priority: 'Low',
    updated: '2d ago',
  },
];

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Tables are the densest expression of the system (DESIGN.md 7.5). The header is `--row-h-sm` on `--surface-sunken`, the body is `--row-h`, and a single faint hairline separates rows. Hover is a tint; selection is a `--state-selected` fill with a checked box, never an accent edge. The sorted column carries a `--size-0` arrow. First and last cells align to `--page-inset`.',
      },
    },
  },
  argTypes: {
    columns: {
      control: 'object',
      description: 'Column definitions: key, label, optional alignment and width',
    },
    rows: { control: 'object', description: 'Row records keyed by column key' },
    rowKey: { control: 'text', description: 'Field used as the stable row key' },
    selectedKey: { control: 'text', description: 'Key of the selected row' },
    sort: { control: 'object', description: 'Active sort column and direction' },
    selectable: { control: 'boolean', description: 'Shows the selection checkbox column' },
    onrowclick: { action: 'row clicked', description: 'Row activation callback' },
    onsort: { action: 'sorted', description: 'Column sort callback; makes headers sortable' },
    newRowLabel: { control: 'text', description: 'Trailing row label that adds an item' },
    onnewrow: { action: 'new row', description: 'Trailing row activation callback' },
    cell: { control: false, description: 'Optional custom cell snippet (row, column)' },
  },
  args: {
    columns,
    rows,
    rowKey: 'id',
    selectable: false,
  },
  render: (args) => ({
    Component: DataTable,
    props: args,
  }),
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sorted: Story = {
  args: {
    sort: { key: 'id', direction: 'asc' },
  },
};

export const Selected: Story = {
  args: {
    selectable: true,
    selectedKey: 'ENG-408',
  },
};

export const NewRow: Story = {
  args: {
    selectable: true,
    newRowLabel: 'New issue',
  },
};
