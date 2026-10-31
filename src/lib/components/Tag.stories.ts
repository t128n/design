import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Tag from '$lib/components/Tag.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Tags are hues, never status. Each tag is --chip-h, --radius-md, --type-label and always contains its label as text; the fill is the tag hue at --tint over the panel, and the text mixes the hue 75% with text-1 so contrast holds. A tag that implies status has the wrong token.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    tone: {
      control: 'select',
      options: ['neutral', 'blue', 'green', 'yellow', 'red', 'violet'],
      description: 'Tag hue; carries meaning only as a label, not as a status',
    },
  },
  args: { label: 'design-system', tone: 'neutral' },
  render: (args) => ({ Component: Tag, props: args }),
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Blue: Story = {
  args: { tone: 'blue', label: 'navigation' },
};

export const Green: Story = {
  args: { tone: 'green', label: 'ready' },
};

export const Yellow: Story = {
  args: { tone: 'yellow', label: 'needs-review' },
};

export const Red: Story = {
  args: { tone: 'red', label: 'blocked' },
};

export const Violet: Story = {
  args: { tone: 'violet', label: 'research' },
};
