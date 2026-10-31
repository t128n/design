import type { Meta, StoryObj } from '@storybook/svelte-vite';
import TokenSpecimen from './TokenSpecimen.svelte';

const meta = {
  title: 'Foundations/Tokens',
  component: TokenSpecimen,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The semantic layer, transcribed from DESIGN.md section 2. Surfaces, text, status, tags, borders, states and the three line modes. Swatches read the token variables directly, so use the theme and line-mode toolbar to check both themes. Status always pairs with a glyph or text; accent is interaction only and never status.',
      },
    },
  },
  render: () => ({ Component: TokenSpecimen }),
} satisfies Meta<typeof TokenSpecimen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tokens: Story = {};
