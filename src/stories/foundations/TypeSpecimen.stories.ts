import type { Meta, StoryObj } from '@storybook/svelte-vite';
import TypeSpecimen from './TypeSpecimen.svelte';

const meta = {
  title: 'Foundations/Typography',
  component: TypeSpecimen,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Nine roles, each one shorthand: components set font: var(--type-*) and never write a size, line height or weight. Tiers are not roles — secondary text is --type-body plus --text-2, metadata is --type-caption plus --text-3. Numerals are tabular everywhere, tracking is 0, and mono is reserved for machine values.',
      },
    },
  },
  render: () => ({ Component: TypeSpecimen }),
} satisfies Meta<typeof TypeSpecimen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Roles: Story = {};
