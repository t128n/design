import type { Meta, StoryObj } from '@storybook/svelte-vite';
import { Document, Folder } from 'carbon-icons-svelte';
import GalleryCard from '$lib/components/GalleryCard.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const meta = {
  title: 'Components/Gallery card',
  component: GalleryCard,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A gallery card from DESIGN.md 7.5: a `--surface-sunken` cover with a hairline and a centered 16px icon, then a title in `body` and a caption in caption/text-3. The card is `--surface-panel` with a hairline, radius `--radius-lg`, and hover moves the surface to `--surface-sunken`. The cover height is a token calculation, not a raw pixel value.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Card title, the dominant element' },
    caption: { control: 'text', description: 'Metadata below the title' },
    icon: { control: false, description: 'Optional Carbon icon in the cover' },
    coverHeight: { control: 'text', description: 'CSS height for the cover area' },
  },
  args: {
    title: 'Design principles',
    caption: 'Page · Updated Oct 24',
    icon: Document,
    coverHeight: 'calc(var(--size-5) * 3)',
  },
  render: (args) => ({ Component: GalleryCard, props: args }),
} satisfies Meta<typeof GalleryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutIcon: Story = {
  args: { icon: undefined, title: 'Untitled page', caption: 'Draft · Updated today' },
};

export const TallCover: Story = {
  args: {
    title: 'Release 4.3 notes',
    caption: 'Document · 12 comments',
    icon: Folder,
    coverHeight: 'calc(var(--size-5) * 5)',
  },
};

export const LongCaption: Story = {
  args: {
    title: 'A card title long enough to wrap onto a second line',
    caption:
      'Page · Owned by Avery Chen · Updated Oct 24, 2026 · Shared with the design systems team',
  },
};
