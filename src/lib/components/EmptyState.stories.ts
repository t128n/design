import type { Meta, StoryObj } from '@storybook/svelte-vite';
import { Document } from 'carbon-icons-svelte';
import EmptyState from '$lib/components/EmptyState.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const meta = {
  title: 'Components/Empty state',
  component: EmptyState,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'An empty state says what is missing and offers the next step. The icon sits in a bordered --surface-sunken square, the title is --type-heading, the sentence is text-2 and there is one action. It is centered in the region that would hold the content. Loading has its own treatment: silent for 300ms, then a caption label and row-height skeletons.',
      },
    },
  },
  argTypes: {
    icon: { control: false, description: 'Carbon icon in the sunken tile' },
    title: { control: 'text' },
    description: { control: 'text' },
    action: {
      control: 'object',
      description: '{ label, primary?, onclick? } — one next step, primary only when it is the view’s main action',
    },
  },
  args: {
    icon: Document,
    title: 'No issues yet',
    description: 'Issues you create here will appear in this view with their status and assignee.',
    action: { label: 'New issue', primary: true },
  },
  render: (args) => ({ Component: EmptyState, props: args }),
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutIcon: Story = {
  args: { icon: undefined },
};

export const WithoutAction: Story = {
  args: {
    action: undefined,
    title: 'Nothing to review',
    description: 'When a teammate requests your review, it will show up here.',
  },
};
