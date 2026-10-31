import type { Meta, StoryObj } from '@storybook/svelte-vite';
import LoadingBlock from '$lib/components/LoadingBlock.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const meta = {
  title: 'Components/Loading',
  component: LoadingBlock,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'DESIGN.md 7.6 and 9.3: loading is silent for the first 300ms, then a `caption` text label and row-height skeletons so the layout does not shift when data arrives. There is no spinner or shimmer — motion is limited to overlay fades (6.5). The container is `aria-busy="true"` and `role="status"`, and the skeletons are hidden from assistive tech. The delay is a prop only so the behavior can be reviewed; keep 300ms in product.',
      },
    },
  },
  argTypes: {
    rows: { control: 'number', description: 'Number of row-height skeletons' },
    label: { control: 'text', description: 'Caption shown once the delay has elapsed' },
    delayMs: {
      control: 'number',
      description: 'Silent period before anything renders; 300ms in product',
    },
  },
  args: {
    rows: 4,
    label: 'Loading',
    delayMs: 300,
  },
  render: (args) => ({ Component: LoadingBlock, props: args }),
} satisfies Meta<typeof LoadingBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Delayed: Story = {
  args: { rows: 5, label: 'Loading issues', delayMs: 1800 },
  parameters: {
    docs: {
      description: {
        story:
          'The delay is stretched to 1800ms so the silent first 300ms rule is visible in the canvas: nothing renders, then the caption and skeletons appear without moving anything below them. Production keeps 300ms.',
      },
    },
  },
};

export const ManyRows: Story = {
  args: { rows: 8, label: 'Loading 8 rows', delayMs: 300 },
};

export const CustomLabel: Story = {
  args: { rows: 3, label: 'Syncing workspace', delayMs: 300 },
};
