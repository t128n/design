import type { Meta, StoryObj } from '@storybook/svelte-vite';
import CalendarView from './CalendarView.svelte';

const meta = {
  title: 'Views/Calendar',
  component: CalendarView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Calendar view (DESIGN.md section 8, Calendar): header with month navigation, toolbar with Month / Week / Day and a filter, then a 7-column month grid with hairlines, a sunken weekday header row and events as soft tags.',
      },
    },
  },
  render: () => ({ Component: CalendarView }),
} satisfies Meta<typeof CalendarView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Calendar: Story = {};
