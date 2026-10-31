import type { Meta, StoryObj } from '@storybook/svelte-vite';
import InboxView from '$lib/views/InboxView.svelte';

const meta = {
  title: 'Views/Inbox',
  component: InboxView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'DESIGN.md 8, Inbox: Header, tabs and notification rows. Unread uses a dot plus an action-weight title; hover replaces the timestamp with secondary actions, and the row stays legible without color alone.',
      },
    },
  },
  render: () => ({ Component: InboxView }),
} satisfies Meta<typeof InboxView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inbox: Story = {};
