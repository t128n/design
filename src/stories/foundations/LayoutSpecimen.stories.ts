import type { Meta, StoryObj } from '@storybook/svelte-vite';
import LayoutSpecimen from './LayoutSpecimen.svelte';

const meta = {
  title: 'Foundations/Layout',
  component: LayoutSpecimen,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The fixed ladders from DESIGN.md 2.5 and 2.8: spacing 4–24, radius 2/4/7/full, sizes 12–40, one icon size, header 48 and chip 20, plus the layer tokens. Nothing here is derived by multiplication except the documented size arithmetic on --control-h.',
      },
    },
  },
  render: () => ({ Component: LayoutSpecimen }),
} satisfies Meta<typeof LayoutSpecimen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ladders: Story = {};
