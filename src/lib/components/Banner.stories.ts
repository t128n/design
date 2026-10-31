import type { Meta, StoryObj } from '@storybook/svelte-vite';
import BannerStory from '../../stories/foundations/BannerStory.svelte';

const meta = {
  title: 'Components/Banner',
  component: BannerStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Banners describe system-level conditions: offline, sync failure, a permission that needs attention. The status color is used at --tint-weak over --surface-panel with a --tint-strong border, a leading glyph and a title in --type-action. Body copy is text-2; the action is a secondary button unless the condition blocks all work. For context inside a document use a callout instead.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    status: { control: 'select', options: ['success', 'warning', 'danger', 'info'] },
    body: { control: 'text', description: 'One or two sentences in text-2' },
    actionLabel: { control: 'text', description: 'Next step; empty hides the action' },
    actionVariant: {
      control: 'select',
      options: ['secondary', 'primary', 'ghost', 'danger'],
    },
  },
  args: {
    title: 'Sync failed',
    status: 'danger',
    body: 'Changes from the last 20 minutes are queued locally and will retry automatically.',
    actionLabel: 'Retry sync',
    actionVariant: 'secondary',
  },
  render: (args) => ({ Component: BannerStory, props: args }),
} satisfies Meta<typeof BannerStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Danger: Story = {};

export const Info: Story = {
  args: {
    title: 'A new version is ready',
    status: 'info',
    body: 'Reload to pick up the latest filters and keyboard shortcuts.',
    actionLabel: 'Reload',
  },
};

export const Success: Story = {
  args: {
    title: 'Import finished',
    status: 'success',
    body: '1,284 issues were added to the workspace.',
    actionLabel: '',
  },
};

export const Warning: Story = {
  args: {
    title: 'Two members have no access',
    status: 'warning',
    body: 'Their invitations expired before they signed in.',
    actionLabel: 'Review members',
  },
};

export const WithoutAction: Story = {
  args: { title: 'Offline', body: 'Changes are saved locally and will sync when the connection returns.', actionLabel: '' },
};
