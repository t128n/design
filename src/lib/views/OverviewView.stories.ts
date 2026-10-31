import type { Meta, StoryObj } from '@storybook/svelte-vite';
import OverviewView from '$lib/views/OverviewView.svelte';

const meta = {
  title: 'Views/Overview',
  component: OverviewView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Overview (DESIGN.md 8): header with a range control, four stat cards with arrow deltas, a chart and activity, then a projects table with progress. One accent series, baseline only, no decoration in the header.',
      },
    },
  },
  render: () => ({ Component: OverviewView }),
} satisfies Meta<typeof OverviewView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
