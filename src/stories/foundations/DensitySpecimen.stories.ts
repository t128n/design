import type { Meta, StoryObj } from '@storybook/svelte-vite';
import DensitySpecimen from './DensitySpecimen.svelte';

const meta = {
  title: 'Foundations/Density',
  component: DensitySpecimen,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Density is a property of a container, set with data-density. Compact is 32/28/24, default 36/32/28 and comfortable 44/36/36 for row, small row and control. Components read the tokens and never branch on the mode. Bear in mind that the sample blocks set their own density, so the toolbar density only affects the page around them.',
      },
    },
  },
  render: () => ({ Component: DensitySpecimen }),
} satisfies Meta<typeof DensitySpecimen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Modes: Story = {};
