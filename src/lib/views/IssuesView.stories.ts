import type { Meta, StoryObj } from '@storybook/svelte-vite';
import IssuesView from '$lib/views/IssuesView.svelte';

const meta = {
  title: 'Views/Issues',
  component: IssuesView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'DESIGN.md 8, Issues: Header + grouped list, detail pane on the right at --width-detail. Selecting a row updates the detail; the selected row uses the selection tint and never an accent edge.',
      },
    },
  },
  render: () => ({ Component: IssuesView }),
} satisfies Meta<typeof IssuesView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Issues: Story = {};
