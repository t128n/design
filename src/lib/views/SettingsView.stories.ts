import type { Meta, StoryObj } from '@storybook/svelte-vite';
import SettingsView from '$lib/views/SettingsView.svelte';

const meta = {
  title: 'Views/Settings',
  component: SettingsView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'DESIGN.md 8, Settings: Header, section nav on the left and rows of label plus description with the control on the right. The danger zone is framed in --danger at --tint-strong and confirms with a danger button.',
      },
    },
  },
  render: () => ({ Component: SettingsView }),
} satisfies Meta<typeof SettingsView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Settings: Story = {};
