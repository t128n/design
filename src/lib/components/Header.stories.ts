import type { Meta, StoryObj } from '@storybook/svelte-vite';
import HeaderChrome from '../../stories/foundations/HeaderChrome.svelte';

const meta = {
  title: 'Components/Header',
  component: HeaderChrome,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Every header has the same anatomy (7.1): --header-h tall, --page-inset padding, a hairline below, on --surface-panel. Context on the left — a breadcrumb, a title in the heading role or a back button — and actions on the right, grouped with --space-1. At most one primary button and at most one segmented control. IDs are mono in text-3 as the last breadcrumb segment. The story composes the real shell with the sidebar so the header sits in its actual chrome.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Heading-role title; ignored when a breadcrumb is present' },
    breadcrumb: {
      control: 'text',
      description: 'Segments separated by "/" — a breadcrumb replaces the title',
    },
    id: { control: 'text', description: 'Mono ID appended to the breadcrumb as the last segment' },
    showBack: { control: 'boolean', description: 'Leading back icon button' },
    showActions: { control: 'boolean', description: 'Right-aligned ghost actions and one primary button' },
    contentTitle: { control: 'text', description: 'Content below the header, for context' },
  },
  args: {
    title: 'Issues',
    breadcrumb: '',
    id: '',
    showBack: false,
    showActions: true,
    contentTitle: 'Issues',
  },
  render: (args) => ({ Component: HeaderChrome, props: args }),
} satisfies Meta<typeof HeaderChrome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Title: Story = {};

export const Breadcrumb: Story = {
  args: {
    breadcrumb: 'Projects / Website / Issues',
    id: 'T128N-4812',
    contentTitle: 'Issue T128N-4812',
  },
};

export const WithBack: Story = {
  args: { showBack: true, title: 'Settings' },
};

export const WithoutActions: Story = {
  args: { showActions: false, contentTitle: 'Overview' },
};
