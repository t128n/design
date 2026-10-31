import type { Meta, StoryObj } from '@storybook/svelte-vite';
import EmptyWorkspaceView from './EmptyWorkspaceView.svelte';

const meta = {
  title: 'Views/Empty workspace',
  component: EmptyWorkspaceView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Empty workspace view (DESIGN.md section 8, Empty workspace): centered empty state that says what is missing, with one primary action and a keyboard hint.',
      },
    },
  },
  render: () => ({ Component: EmptyWorkspaceView }),
} satisfies Meta<typeof EmptyWorkspaceView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyWorkspace: Story = {
  name: 'EmptyWorkspace',
};
