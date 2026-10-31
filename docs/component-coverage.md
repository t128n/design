# R48 component coverage

R48 requires a story, a real screen using the component, and a note on what it is not for. This table tracks all three for every component exported from `packages/ui/src/index.ts`.

- **Story** is the Storybook title that exercises the component. Components without a dedicated story are covered by the composed story that renders them.
- **Composed-screen use** names a real screen or layout that uses the component. An **Exception** is explicit: the component is public, has a story and a not-for note, but no composed screen uses it yet. The reason is part of the exception.
- **“Not for”** links to the boundary in [`components.md`](components.md).

`packages/ui/tests/r48-coverage.test.ts` parses this table and fails when an export is missing, when an entry has neither a composed-screen reference nor an explicit exception, or when the not-for link is missing.

## Coverage table

| Component | Story | Composed-screen use | “Not for” |
| --- | --- | --- | --- |
| `Accordion` | `Components/Accordion` | Exception — no composed screen uses a multi-section disclosure yet; the isolated Accordion story is the only exercise. | [Note](components.md#accordion) |
| `Alert` | `Components/Alert` | `Views/Dashboard` (page-level warning that needs an owner). | [Note](components.md#alert) |
| `AlertDialog` | `Components/AlertDialog` | Exception — destructive confirmation exists only as the isolated AlertDialog story. | [Note](components.md#alertdialog) |
| `AppShell` | `Layouts/App shell` | `Views/Dashboard`, `Views/Settings`, `Layouts/App shell`. | [Note](components.md#appshell) |
| `AspectRatio` | `Components/AspectRatio` | Exception — media placeholders are exercised only by the component story. | [Note](components.md#aspectratio) |
| `Avatar` | `Components/Avatar` | Exception — no composed screen shows people yet. | [Note](components.md#avatar) |
| `Badge` | `Components/Badge` | `Views/Dashboard`, `Layouts/Page header`, `Components/Table`. | [Note](components.md#badge) |
| `Breadcrumbs` | `Components/Breadcrumbs` | `Layouts/Page header` (header with a breadcrumb trail). | [Note](components.md#breadcrumbs) |
| `Button` | `Primitives/Button` | `Views/Dashboard`, `Views/Settings`, `Views/Landing`, `Layouts/App shell`. | [Note](components.md#button) |
| `Calendar` | `Primitives/Calendar` | Exception — no composed screen embeds a calendar yet. | [Note](components.md#calendar) |
| `Card` | `Primitives/Card` | `Views/Landing`, `Views/Settings` (danger zone). | [Note](components.md#card) |
| `Checkbox` | `Primitives/Checkbox` | `Views/Settings` (review rules). | [Note](components.md#checkbox) |
| `Code` | `Primitives/Code` | Exception — Code appears in the Foundations type specimen, not in a composed view. | [Note](components.md#code) |
| `Collapsible` | `Components/Collapsible` | Exception — single-disclosure content is exercised only by the component story. | [Note](components.md#collapsible) |
| `Combobox` | `Primitives/Combobox` | Exception — no composed screen has a searchable single-select yet. | [Note](components.md#combobox) |
| `Command` | `Primitives/Command` | Exception — the command palette is exercised only by its component story. | [Note](components.md#command) |
| `Container` | `Primitives/Container` | `Views/Landing`, `Views/Personal`, `Layouts/Page header`, `Components/Table`. | [Note](components.md#container) |
| `ContextMenu` | `Components/ContextMenu` | Exception — context actions are exercised only by the isolated menu story. | [Note](components.md#contextmenu) |
| `DateField` | `Primitives/DateField` | Exception — the Settings screen has no date entry yet. | [Note](components.md#datefield) |
| `DatePicker` | `Primitives/DatePicker` | Exception — no composed screen opens a calendar popover yet. | [Note](components.md#datepicker) |
| `DateRangeField` | `Primitives/DateRangeField` | Exception — no composed screen collects a typed date range yet. | [Note](components.md#daterangefield) |
| `DateRangePicker` | `Primitives/DateRangePicker` | Exception — no composed screen opens a range picker yet. | [Note](components.md#daterangepicker) |
| `Dialog` | `Primitives/Dialog` | `Views/Settings` (archive workspace confirmation). | [Note](components.md#dialog) |
| `DropdownMenu` | `Components/DropdownMenu` | Exception — the action menu is exercised only by its component story. | [Note](components.md#dropdownmenu) |
| `EmptyState` | `Components/EmptyState` | `Views/Dashboard` (no archived projects), `Components/Table` (empty table row). | [Note](components.md#emptystate) |
| `Field` | `Components/Field` | `Views/Settings` (the shared field anatomy behind Input and Select). | [Note](components.md#field) |
| `Footer` | `Layouts/Footer` | `Views/Landing` (page footer). | [Note](components.md#footer) |
| `Grid` | `Primitives/Grid` | `Views/Dashboard`, `Views/Settings`, `Views/Landing`. | [Note](components.md#grid) |
| `Hero` | `Layouts/Hero` | `Views/Landing` (landing introduction). | [Note](components.md#hero) |
| `Icon` | `Components/Icon` | `Layouts/App shell` (navigation icons rendered through Sidebar and Navbar). | [Note](components.md#icon) |
| `Inline` | `Primitives/Inline` | `Views/Settings` (page actions), `Views/Landing` (hero actions). | [Note](components.md#inline) |
| `Input` | `Primitives/Input` | `Views/Settings` (workspace name). | [Note](components.md#input) |
| `Label` | `Components/Label` | `Views/Settings` (labels rendered by the packaged fields). | [Note](components.md#label) |
| `Link` | `Primitives/Link` | `Views/Landing`, `Views/Personal`, `Layouts/App shell`. | [Note](components.md#link) |
| `LinkPreview` | `Primitives/LinkPreview` | Exception — link previews are exercised only by the component story. | [Note](components.md#linkpreview) |
| `List` | `Primitives/List` | `Views/Landing`, `Views/Personal`, `Layouts/App shell`. | [Note](components.md#list) |
| `Menubar` | `Components/Menubar` | Exception — an application menubar exists only in its component story. | [Note](components.md#menubar) |
| `Meter` | `Feedback/Meter` | Exception — no composed screen shows a bounded measurement yet. | [Note](components.md#meter) |
| `Navbar` | `Layouts/Navbar` | `Views/Landing`, `Layouts/App shell`. | [Note](components.md#navbar) |
| `NavigationMenu` | `Components/NavigationMenu` | Exception — no composed screen uses the grouped navigation pattern yet. | [Note](components.md#navigationmenu) |
| `Page` | `Views/Dashboard` | `Views/Dashboard`, `Views/Settings`, `Views/Landing`, `Views/Personal`, `Layouts/Page header`, `Components/Table`. | [Note](components.md#page) |
| `PageHeader` | `Layouts/Page header` | `Views/Dashboard`, `Views/Settings`, `Layouts/Page header`, `Layouts/App shell`. | [Note](components.md#pageheader) |
| `Pagination` | `Navigation/Pagination` | Exception — no composed screen has a known multi-page result set yet. | [Note](components.md#pagination) |
| `PinInput` | `Primitives/PinInput` | Exception — no composed screen has a verification-code flow yet. | [Note](components.md#pininput) |
| `Popover` | `Components/Popover` | `Layouts/App shell` (compact Navbar menu). | [Note](components.md#popover) |
| `Progress` | `Feedback/Progress` | Exception — no composed screen shows task progress yet. | [Note](components.md#progress) |
| `RadioGroup` | `Primitives/RadioGroup` | Exception — the Settings screen uses Checkbox and Switch, not a radio choice. | [Note](components.md#radiogroup) |
| `RangeCalendar` | `Primitives/RangeCalendar` | Exception — no composed screen embeds a range calendar yet. | [Note](components.md#rangecalendar) |
| `RatingGroup` | `Primitives/RatingGroup` | Exception — no composed screen collects a rating yet. | [Note](components.md#ratinggroup) |
| `ScrollArea` | `Components/ScrollArea` | Exception — no composed screen has a bounded scroll region yet. | [Note](components.md#scrollarea) |
| `Section` | `Views/Dashboard` | `Views/Dashboard`, `Views/Settings`, `Views/Landing`, `Views/Personal`, `Layouts/Page header`, `Components/Table`. | [Note](components.md#section) |
| `Select` | `Primitives/Select` | `Views/Settings` (default region). | [Note](components.md#select) |
| `Separator` | `Components/Separator` | Exception — no composed screen needs a standalone divider yet. | [Note](components.md#separator) |
| `Sidebar` | `Layouts/Sidebar` | `Views/Dashboard`, `Views/Settings`, `Layouts/App shell`. | [Note](components.md#sidebar) |
| `Slider` | `Primitives/Slider` | Exception — no composed screen sets a continuous value yet. | [Note](components.md#slider) |
| `Stack` | `Primitives/Stack` | All Views and Layouts stories. | [Note](components.md#stack) |
| `Switch` | `Primitives/Switch` | `Views/Settings` (review rules). | [Note](components.md#switch) |
| `Table` | `Components/Table` | `Views/Dashboard`, `Layouts/App shell`, `Layouts/Page header`, `Components/Table`. | [Note](components.md#table) |
| `TableCell` | `Components/Table` | `Views/Dashboard`, `Layouts/App shell`, `Layouts/Page header`, `Components/Table`. | [Note](components.md#tablecell) |
| `TableRow` | `Components/Table` | `Views/Dashboard`, `Layouts/App shell`, `Layouts/Page header`, `Components/Table`. | [Note](components.md#tablerow) |
| `Tabs` | `Primitives/Tabs` | Exception — no composed screen switches peer sections with tabs yet. | [Note](components.md#tabs) |
| `Text` | `Primitives/Text` | All Views and Layouts stories. | [Note](components.md#text) |
| `ThemeScope` | `Foundations/Theming` | Exception — the theming seam is exercised only by the Foundations story; no view scopes tokens yet. | [Note](components.md#themescope) |
| `TimeField` | `Primitives/TimeField` | Exception — the Settings screen has no time entry yet. | [Note](components.md#timefield) |
| `TimeRangeField` | `Primitives/TimeRangeField` | Exception — no composed screen collects a time range yet. | [Note](components.md#timerangefield) |
| `Toggle` | `Components/Toggle` | Exception — formatting toggles are exercised only by their component stories. | [Note](components.md#toggle) |
| `ToggleGroup` | `Components/ToggleGroup` | Exception — no composed screen groups formatting toggles yet. | [Note](components.md#togglegroup) |
| `Toolbar` | `Primitives/Toolbar` | Exception — no composed screen has a command toolbar yet. | [Note](components.md#toolbar) |
| `Tooltip` | `Primitives/Tooltip` | Exception — no composed screen relies on supplementary tooltip copy yet. | [Note](components.md#tooltip) |
| `VisuallyHidden` | `Primitives/Visually hidden` | `Layouts/App shell` (skip link). | [Note](components.md#visuallyhidden) |

## Exception review

The exceptions fall into three groups. None of them skips a story or a not-for note.

| Group | Components | Why it is acceptable today |
| --- | --- | --- |
| Advanced overlays and menus | `Accordion`, `AlertDialog`, `Collapsible`, `Command`, `ContextMenu`, `DropdownMenu`, `LinkPreview`, `Menubar`, `NavigationMenu`, `Tabs`, `Toolbar`, `Tooltip` | Their behavior, focus management, and a11y are exercised by isolated stories. A composed screen should adopt one only when the product needs that interaction, not to manufacture coverage. |
| Specialist inputs | `Calendar`, `Combobox`, `DateField`, `DatePicker`, `DateRangeField`, `DateRangePicker`, `PinInput`, `RadioGroup`, `RangeCalendar`, `RatingGroup`, `ScrollArea`, `Slider`, `TimeField`, `TimeRangeField` | The composed screens are dashboard, settings, landing, and personal pages. None of them has the matching task yet; adding an input without a real task would weaken the demo. |
| Presentation and theming | `AspectRatio`, `Avatar`, `Code`, `Meter`, `Progress`, `Pagination`, `Separator`, `ThemeScope`, `Toggle`, `ToggleGroup` | Each is either a layout ornament or a specialist display. They are covered by a story and the component reference; a future screen that needs the pattern becomes the adoption point. |

When a composed screen starts using one of these components, replace the exception in the table with the screen name in the same pull request. Do not delete the row.
