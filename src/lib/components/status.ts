import {
  CheckmarkFilled,
  ErrorFilled,
  InformationFilled,
  WarningAltFilled,
} from 'carbon-icons-svelte';

export const Statuses = {
  success: { icon: CheckmarkFilled, label: 'Success' },
  warning: { icon: WarningAltFilled, label: 'Warning' },
  danger: { icon: ErrorFilled, label: 'Danger' },
  info: { icon: InformationFilled, label: 'Info' },
} as const;

export type StatusName = keyof typeof Statuses;
