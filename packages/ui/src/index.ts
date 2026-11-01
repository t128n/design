// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

// Importing the stylesheet here lets Vite extract one complete `dist/index.css`
// that includes tokens, fonts, base element styles, and component styles.
import './styles/index.css';

export { default as Accordion } from './lib/Accordion.svelte';
export { default as Alert } from './lib/Alert.svelte';
export { default as AlertDialog } from './lib/AlertDialog.svelte';
export { default as AppMark } from './lib/AppMark.svelte';
export { default as AppShell } from './lib/AppShell.svelte';
export { default as AspectRatio } from './lib/AspectRatio.svelte';
export { default as Avatar } from './lib/Avatar.svelte';
export { default as Badge } from './lib/Badge.svelte';
export { default as Breadcrumbs } from './lib/Breadcrumbs.svelte';
export { default as Button } from './lib/Button.svelte';
export { default as Card } from './lib/Card.svelte';
export { default as Checkbox } from './lib/Checkbox.svelte';
export { default as Collapsible } from './lib/Collapsible.svelte';
export { default as ContextMenu } from './lib/ContextMenu.svelte';
export { default as Dialog } from './lib/Dialog.svelte';
export { default as DropdownMenu } from './lib/DropdownMenu.svelte';
export { default as Footer } from './lib/Footer.svelte';
export { default as Hero } from './lib/Hero.svelte';
export { default as Input } from './lib/Input.svelte';
export { default as Label } from './lib/Label.svelte';
export { default as Field } from './lib/Field.svelte';
export { default as Link } from './lib/Link.svelte';
export { default as Menubar } from './lib/Menubar.svelte';
export { default as Meter } from './lib/Meter.svelte';
export { default as Navbar } from './lib/Navbar.svelte';
export { default as NavigationMenu } from './lib/NavigationMenu.svelte';
export { default as Page } from './lib/Page.svelte';
export { default as PageHeader } from './lib/PageHeader.svelte';
export { default as Pagination } from './lib/Pagination.svelte';
export { default as PinInput } from './lib/PinInput.svelte';
export { default as Popover } from './lib/Popover.svelte';
export { default as Progress } from './lib/Progress.svelte';
export { default as RadioGroup } from './lib/RadioGroup.svelte';
export { default as ScrollArea } from './lib/ScrollArea.svelte';
export { default as Section } from './lib/Section.svelte';
export { default as Select } from './lib/Select.svelte';
export { default as Separator } from './lib/Separator.svelte';
export { default as Sidebar } from './lib/Sidebar.svelte';
export { default as Slider } from './lib/Slider.svelte';
export { default as Switch } from './lib/Switch.svelte';
export { default as Table } from './lib/Table.svelte';
export { default as TableRow } from './lib/TableRow.svelte';
export { default as TableCell } from './lib/TableCell.svelte';
export type { TableColumn } from './lib/table-context';
export { default as Tabs } from './lib/Tabs.svelte';
export { default as ThemeScope } from './lib/ThemeScope.svelte';
export { default as Toggle } from './lib/Toggle.svelte';
export { default as ToggleGroup } from './lib/ToggleGroup.svelte';
export { default as Tooltip } from './lib/Tooltip.svelte';
export { default as Combobox } from './lib/Combobox.svelte';
export { default as Calendar } from './lib/Calendar.svelte';
export { default as RangeCalendar } from './lib/RangeCalendar.svelte';
export { default as DateField } from './lib/DateField.svelte';
export { default as TimeField } from './lib/TimeField.svelte';
export { default as DatePicker } from './lib/DatePicker.svelte';
export { default as DateRangeField } from './lib/DateRangeField.svelte';
export { default as DateRangePicker } from './lib/DateRangePicker.svelte';
export { default as TimeRangeField } from './lib/TimeRangeField.svelte';
export { default as Command } from './lib/Command.svelte';
export { default as LinkPreview } from './lib/LinkPreview.svelte';
export { default as Toolbar } from './lib/Toolbar.svelte';
export { default as RatingGroup } from './lib/RatingGroup.svelte';
export { default as Text } from './lib/Text.svelte';
export { default as Code } from './lib/Code.svelte';
export { default as Stack } from './lib/Stack.svelte';
export { default as Inline } from './lib/Inline.svelte';
export { default as Grid } from './lib/Grid.svelte';
export { default as Container } from './lib/Container.svelte';
export { default as List } from './lib/List.svelte';
export { default as EmptyState } from './lib/EmptyState.svelte';
export { default as VisuallyHidden } from './lib/VisuallyHidden.svelte';
export { default as Icon } from './lib/Icon.svelte';
export { iconSizes } from './lib/icon';
export type { IconComponent, IconSize } from './lib/icon';
export { createFieldState } from './lib/field';
export type { FieldState, FieldStateOptions } from './lib/field';
export { headingLevels, headingTag } from './lib/typography';
export type {
  HeadingLevel,
  HeadingTag,
  TextAlign,
  TextProps,
  TextTag,
  TextTone,
  TextVariant,
  TextWeight
} from './lib/typography';
export { breakpoints } from './lib/layout';
export type { Breakpoint, CollapseAt, LayoutTag, ListMarker, Space } from './lib/layout';
export {
  APP_GLYPHS,
  APP_MARK_GEOMETRY,
  APP_MARK_RADIUS,
  APP_MARK_SIZES,
  APP_TONES,
  markMonogram,
  opticalVariant
} from './lib/app-icons';
export type {
  AppGlyphName,
  AppIcon,
  AppMarkSize,
  AppMarkVariant,
  AppTone
} from './lib/app-icons';
export { appGlyphs } from './lib/app-glyphs';
export { appRegistry } from './lib/apps';
