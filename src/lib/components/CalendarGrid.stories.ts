import type { Meta, StoryObj } from '@storybook/svelte-vite';
import CalendarGrid from '$lib/components/CalendarGrid.svelte';

type Event = {
  day: number;
  label: string;
  tone?: 'neutral' | 'blue' | 'green' | 'yellow' | 'red' | 'violet';
};

const events: Event[] = [
  { day: 1, label: 'Design review', tone: 'blue' },
  { day: 5, label: 'Sprint start', tone: 'green' },
  { day: 7, label: 'Release 4.2', tone: 'violet' },
  { day: 12, label: 'Research readout', tone: 'neutral' },
  { day: 14, label: 'Accessibility audit', tone: 'yellow' },
  { day: 19, label: 'Density review', tone: 'blue' },
  { day: 22, label: 'Release 4.3', tone: 'violet' },
  { day: 26, label: 'Incident retro', tone: 'red' },
  { day: 28, label: 'Design system sync', tone: 'blue' },
  { day: 30, label: 'Sprint end', tone: 'green' },
];

const meta = {
  title: 'Components/Calendar grid',
  component: CalendarGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A month is a 7-column grid of hairlines (DESIGN.md 7.5). Cells are at least `--calendar-cell-h`, days outside the month sit on `--surface-sunken`, and today is a filled accent circle. Events are soft tags — hue plus text, never a bare colored dot. The grid is exposed as a `role="grid"` with each cell labelled by its full date.',
      },
    },
  },
  argTypes: {
    month: { control: { type: 'range', min: 1, max: 12, step: 1 }, description: 'Month, 1–12' },
    year: { control: 'number', description: 'Four-digit year' },
    today: { control: 'number', description: 'Day of this month to mark as today' },
    events: { control: 'object', description: 'Events keyed by day of month' },
  },
  args: {
    month: 10,
    year: 2026,
    today: 28,
    events,
  },
  render: (args) => ({
    Component: CalendarGrid,
    props: args,
  }),
} satisfies Meta<typeof CalendarGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const QuietMonth: Story = {
  args: {
    month: 2,
    year: 2026,
    today: undefined,
    events: [],
  },
};

export const WeekBoundary: Story = {
  args: {
    month: 3,
    year: 2026,
    today: 1,
    events: [
      { day: 1, label: 'Month opens on a Sunday', tone: 'yellow' },
      { day: 31, label: 'Month closes on a Tuesday', tone: 'neutral' },
    ],
  },
};
