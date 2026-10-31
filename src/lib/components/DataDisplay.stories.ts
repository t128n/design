import type { Meta, StoryObj } from '@storybook/svelte-vite';
import DataShowcase from '$lib/components/DataShowcase.svelte';

const meta = {
  title: 'Components/Data display',
  component: DataShowcase,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The full data-display composition (DESIGN.md 7.5): a twelve-row issue table, a grouped list, a three-column board, a gallery card, label and status chips, an avatar stack and an editable property panel. ID is mono in text-3, title is the only dominant element, and every status color is paired with its glyph and label. Surfaces separate regions; hairlines only mark panel edges and rows. The composition is fluid at 1440 and stacks to one column below 1060.',
      },
    },
  },
  argTypes: {},
  render: () => ({
    Component: DataShowcase,
  }),
} satisfies Meta<typeof DataShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
