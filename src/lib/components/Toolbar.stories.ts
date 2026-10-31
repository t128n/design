import type { Meta, StoryObj } from '@storybook/svelte-vite';
import ToolbarChrome from '../../stories/foundations/ToolbarChrome.svelte';

const meta = {
  title: 'Components/Toolbar',
  component: ToolbarChrome,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A toolbar sits directly under the header: --row-h tall, the same --page-inset, a hairline below, filters on the left and search plus actions on the right. It is not a header — use it for view-level filtering and bulk actions, and keep the page title in the header. The story shows the toolbar in the real shell so its hairline and inset line up with the header.',
      },
    },
  },
  argTypes: {
    showFilters: { control: 'boolean', description: 'Left-aligned segmented control' },
    showSearch: { control: 'boolean', description: 'Search field with kbd hint' },
    showActions: { control: 'boolean', description: 'Ghost filter toggle plus one primary button' },
    view: { control: 'text', description: 'Selected segmented value' },
    search: { control: 'text', description: 'Search value' },
  },
  args: {
    showFilters: true,
    showSearch: true,
    showActions: true,
    view: 'all',
    search: '',
  },
  render: (args) => ({ Component: ToolbarChrome, props: args }),
} satisfies Meta<typeof ToolbarChrome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FiltersOnly: Story = {
  args: { showSearch: false, showActions: false },
};

export const SearchOnly: Story = {
  args: { showFilters: false, showActions: false },
};

export const ActionsOnly: Story = {
  args: { showFilters: false, showSearch: false },
};
