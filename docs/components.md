# Component reference

This is the reference for every component exported from `packages/ui/src/index.ts`. It states the intended use, the props that shape composition and behavior, and the boundary that keeps the framework coherent (R48).

All examples assume the stylesheet is imported once at the application root:

```svelte
<script lang="ts">
  import { Button, Stack, Text } from '@t128n/ui';
  import '@t128n/ui/styles';
</script>
```

Props marked “bindable” support `bind:value` or the matching `bind:` prop. Native attributes are forwarded unless a component explicitly owns the element.

## Composition and layout

### Page

Owns the page measure, centering, vertical rhythm between sections, and the optional header slot. `Page` adds no padding, surface, or border.

- **Props:** `width` (`content` default, `reading`, `form`, `full`), `gap` (`xs`–`3xl`, default `2xl`), `header` snippet, `class`.
- **Example:**

```svelte
<Page width="content" header={pageHeader}>
  <Section id="recent-projects" title="Recent projects">…</Section>
  <Section id="activity" title="Activity">…</Section>
</Page>
```

- **Not for:** outer edge padding (`AppShell` or `Container` owns it), page backgrounds, cards, or a second measure nested inside another `Page`.

### Section

A titled region with a subheading-scale heading, description, optional actions, and compact heading-to-content rhythm. It renders a `<section>` labelled by its heading.

- **Props:** `title`, `description`, `actions` snippet, `id`, `level` (default `2`), `gap` (default `sm`), `labelledBy` (string or `false`), `class`.
- **Example:**

```svelte
<Section
  id="recent-projects"
  title="Recent projects"
  description="Ownership and status for work in flight."
  actions={viewAll}
>
  <Table columns={columns} labelledBy="recent-projects">…</Table>
</Section>
```

- **Not for:** page titles (`PageHeader` or `Hero` owns level 1), independent surfaces (`Card`), or a named landmark that duplicates a nested table region — pass `labelledBy={false}` in that case.

### AppShell

The application frame: skip link, optional navbar, optional sidebar, and a focusable main region that owns outer padding by default.

- **Props:** `sidebar` snippet, `navbar` snippet, `padding` (`none` or `xs`–`3xl`, default `xl`), `children`.
- **Example:**

```svelte
<AppShell {sidebar} {navbar}>
  <Page header={pageHeader}>
    <Section title="Overview">…</Section>
  </Page>
</AppShell>
```

- **Not for:** marketing pages, page measure (`Page`), or adding a second shell around an existing application. It arranges regions but draws no structural borders.

### Container

A measure and optional padding owner, with responsive padding collapse. Use it for standalone pages and fullscreen stories where no `AppShell` provides the frame.

- **Props:** `as` (layout tag, default `div`), `width` (`content` default, `reading`, `form`, `full`), `padding` (`none` or a space, default `xl`), `paddingAt` (`sm` default, `md`, `lg`), `class`.
- **Example:**

```svelte
<Container as="main" width="reading" padding="2xl" paddingAt="lg">
  <Page width="reading">…</Page>
</Container>
```

- **Not for:** section rhythm (use `Page`), the application frame (`AppShell`), or padding on top of a default `AppShell` padding layer.

### Stack

Vertical rhythm and alignment for a group of elements.

- **Props:** `as` (layout tag, default `div`), `gap` (space, default `md`), `align` (`start`, `center`, `end`, `stretch`), `class`.
- **Example:**

```svelte
<Stack gap="lg">
  <Text variant="heading" as="h2">Recent projects</Text>
  <List>…</List>
</Stack>
```

- **Not for:** horizontal rows (`Inline`), columns (`Grid`), or replacing the page-level section rhythm (`Page`).

### Inline

A wrapping horizontal row with alignment, distribution, and an optional stack-at breakpoint.

- **Props:** `as` (layout tag), `gap` (default `sm`), `align` (`start`, `center` default, `end`, `baseline`, `stretch`), `justify` (`start`, `center`, `end`, `between`), `wrap` (default `true`), `stackAt` (`never` default, `sm`, `md`, `lg`), `class`.
- **Example:**

```svelte
<Inline justify="between" stackAt="sm" gap="sm">
  <Text variant="body-sm" tone="secondary">3 projects</Text>
  <Button>New project</Button>
</Inline>
```

- **Not for:** vertical rhythm (`Stack`), equal-width columns (`Grid`), or dense navigation rows that need their own semantics.

### Grid

Fixed or auto-fitting columns with responsive collapse.

- **Props:** `as` (layout tag), `columns` (number or `auto`, default `1`), `minItem` (`sm`, `md` default, `lg`), `gap` (default `md`), `collapseAt` (`sm` default, `md`, `lg`, `never`), `collapseColumns` (default `1`), `class`.
- **Example:**

```svelte
<Grid columns={3} collapseAt="md" collapseColumns={1} gap="xl">
  <Card title="Ownership">…</Card>
  <Card title="Activity">…</Card>
  <Card title="Reviews">…</Card>
</Grid>
```

- **Not for:** page measure (`Page` or `Container`), masonry layouts, or arbitrary responsive column counts that are not expressed through `columns`, `collapseAt`, and `collapseColumns`.

### List

Semantic `ul`, `ol`, or `dl` with marker, orientation, spacing, and optional separators. Items are `Text as="li"`; description terms and values are `Text as="dt"` and `Text as="dd"`.

- **Props:** `as` (`ul` default, `ol`, `dl`), `marker` (`none`, `disc`, `circle`, `square`, `decimal`, `lower-alpha`, `upper-roman`; `dl` defaults to none), `orientation` (`vertical` default, `horizontal`), `gap` (default `sm`), `separated` (default `false`), `class`.
- **Example:**

```svelte
<List as="dl" gap="md">
  <Text as="dt" variant="label" tone="secondary">Owner</Text>
  <Text as="dd" variant="body">Mara Chen</Text>
  <Text as="dt" variant="label" tone="secondary">Environment</Text>
  <Text as="dd" variant="body">Production</Text>
</List>
```

- **Not for:** navigation menus (`Navbar`, `Sidebar`, and menu components own their internal list semantics), layout rows of unrelated controls (`Inline`), or a list without a real list relationship.

### PageHeader

The page title block: optional breadcrumbs, title, description, page actions, and metadata on the workspace itself.

- **Props:** `title`, `description`, `breadcrumbs` (`{ label, href? }[]`), `actions` snippet, `meta` snippet, `level` (default `1`).
- **Example:**

```svelte
<PageHeader
  title="Orbit"
  description="Deploy history and environment health for the Orbit project."
  breadcrumbs={[{ label: 'Workspace', href: '/' }, { label: 'Projects', href: '/projects' }]}
  actions={detailActions}
/>
```

- **Not for:** landing-page heroes (`Hero`), ordinary section headings (`Section`), or wrapping the header in a card. It draws no background or border.

### Hero

The landing or empty-workspace introduction: optional eyebrow, title, description, actions, and an optional aside.

- **Props:** `eyebrow`, `title`, `description`, `actions` snippet, `aside` snippet, `align` (`left` default, `center`), `level` (default `1`).
- **Example:**

```svelte
<Hero
  eyebrow="Quiet project operations"
  title="Keep the work visible without the noise"
  description="One place for projects, ownership, and the changes that matter."
  actions={heroActions}
  aside={recentActivity}
/>
```

- **Not for:** ordinary application pages, settings screens, or repeating hero treatment inside a dashboard.

### Footer

A page footer with optional brand, utility links, note, and top border.

- **Props:** `brand` (default `Acme`), `links` (`{ label, href? }[]`), `note`, `bordered` (default `true`).
- **Example:**

```svelte
<Footer
  brand="Acme"
  links={[{ label: 'Docs' }, { label: 'Status' }, { label: 'Privacy' }]}
  note="© 2026 Acme"
/>
```

- **Not for:** primary navigation, application chrome, or a second footer inside a scrolling card.

### Navbar

The top application bar with brand, links, actions, and a compact menu below the mobile breakpoint.

- **Props:** `brand` (default `Acme`), `links` (`{ label, href?, active? }[]`), `actions` snippet, `label` (default `Primary`).
- **Example:**

```svelte
<Navbar
  brand="Acme"
  links={[{ label: 'Product', active: true }, { label: 'Docs' }, { label: 'Pricing' }]}
  actions={navbarActions}
/>
```

- **Not for:** in-page tabs (`Tabs`), section navigation (`NavigationMenu`), or icon-only desktop navigation.

### Sidebar

Persistent application navigation with sections, nested items, badges, an optional header and footer, and a mobile drawer.

- **Props:** `sections` (`{ label?, items }[]`), `header` snippet, `footer` snippet, `label` (default `Sections`), `toggleLabel` (default `Navigation`), `surface` (`workspace` default, `navigation`).
- **Example:**

```svelte
<Sidebar
  sections={[
    { label: 'Workspace', items: [{ label: 'Overview', active: true }, { label: 'Projects', badge: '12' }] },
    { label: 'Account', items: [{ label: 'Settings' }] }
  ]}
  label="Workspace"
  toggleLabel="Workspace"
/>
```

- **Not for:** marketing sites, a second navigation region beside `Navbar`, or decorative icon-only desktop navigation. It stays quieter than content.

## Typography and content

### Text

The single typography primitive for prose, headings, labels, definitions, and list items. `variant` is visual; `as` is semantic.

- **Props:** `as` (`p` default, plus `span`, `div`, `h1`–`h6`, `strong`, `blockquote`, `figcaption`, `dt`, `dd`, `li`, `legend`, `time`, `address`), `variant` (`display`, `heading`, `subheading`, `body`, `body-sm`, `label`, `caption`), `tone`, `weight` (`regular`, `medium`, `semibold`), `align` (`start`, `center`, `end`), `numeric`, `class`.
- **Example:**

```svelte
<Text variant="display" as="h1">Projects</Text>
<Text variant="body" tone="secondary">Every project has a named owner and a visible next step.</Text>
<Text variant="caption" as="time" datetime="2026-10-31">31 October 2026</Text>
```

- **Not for:** anchors, buttons, arbitrary font sizes, truncation, colors, or line heights. Use `Link` for navigation and `Button` for actions.

### Code

Inline code and code blocks in IBM Plex Mono.

- **Props:** `block` (default `false`), `class`.
- **Example:**

```svelte
<Text variant="body">Set <Code>projectId</Code> before creating the project.</Text>
<Code block>{`const projectId = 'design-v0.1';`}</Code>
```

- **Not for:** ordinary UI labels, headings, or decorative monospace text.

### Card

An independent surface with an optional title. Cards must earn their border; ordinary content stays directly on the workspace.

- **Props:** `title`, `level` (default `2`), `children`.
- **Example:**

```svelte
<Card title="Danger zone" level={2}>
  <Text variant="body-sm" tone="secondary">
    Archiving removes the workspace from search and makes every project read-only.
  </Text>
</Card>
```

- **Not for:** spacing between ordinary sections, a single metric, a nested card, or a substitute for `Section`.

### Badge

A compact status label using text plus one semantic tone.

- **Props:** `tone` (`neutral` default, `info`, `progress`, `success`, `warning`, `danger`, `disabled`).
- **Example:**

```svelte
<Badge tone="success">Healthy</Badge>
<Badge tone="warning">Needs owner</Badge>
```

- **Not for:** color-only status, interactive filters, or navigation counts that do not change where the user should go.

### Alert

An inline status message that stays at the point of action until resolved or dismissed.

- **Props:** `tone` (`neutral` default, `info`, `progress`, `success`, `warning`, `danger`), `title`, `children`.
- **Example:**

```svelte
<Alert tone="warning" title="Two projects need an owner">
  Assign an owner to Beacon and Cinder before the review on Friday.
</Alert>
```

- **Not for:** transient toasts, field-level errors (use the field `error` prop), or success messages for changes already visible on screen.

### Breadcrumbs

A hierarchical trail to the current page. The final item is the current page and carries no link.

- **Props:** `items` (`{ label, href? }[]`).
- **Example:**

```svelte
<Breadcrumbs
  items={[
    { label: 'Workspace', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Orbit' }
  ]}
/>
```

- **Not for:** primary navigation, multi-step progress, or a trail on a top-level page.

### Avatar

A compact person or entity image with a text fallback.

- **Props:** `src`, `alt` (default empty), `fallback` (required), `size` (`sm`, `md` default, `lg`).
- **Example:**

```svelte
<Avatar src="/people/mara.jpg" alt="Mara Chen" fallback="MC" size="md" />
<Avatar fallback="TN" />
```

- **Not for:** decorative imagery, status indicators, or an image without a meaningful fallback.

### AspectRatio

Constrains media or a placeholder to a fixed ratio.

- **Props:** `ratio` (default `1`), `class`, `children`.
- **Example:**

```svelte
<AspectRatio ratio={16 / 9}>
  <img src="/release.png" alt="Release dashboard" />
</AspectRatio>
```

- **Not for:** text layout, cards, or content whose height should follow its content.

### Separator

A structural divider between regions.

- **Props:** `orientation` (`horizontal` default, `vertical`), `decorative` (default `true`), `class`.
- **Example:**

```svelte
<Stack gap="md">
  <Text variant="body">Content above</Text>
  <Separator />
  <Text variant="body">Content below</Text>
</Stack>
```

- **Not for:** spacing (use `Stack`, `Inline`, or `Section` gaps), repeated dividers between every row, or a border that duplicates one owned by a region.

### ScrollArea

A styled scroll container for a bounded region.

- **Props:** `orientation` (`vertical` default, `horizontal`, `both`), `class`, `children`.
- **Example:**

```svelte
<ScrollArea orientation="vertical">
  <Stack gap="sm">…</Stack>
</ScrollArea>
```

- **Not for:** scrolling the page, nested scroll containers, or a substitute for a table's own horizontal scroll region.

### EmptyState

The supported empty-region pattern: a heading, one sentence, and exactly one required action.

- **Props:** `title`, `description`, `action` snippet (required), `icon` snippet, `level` (default `2`), `class`.
- **Example:**

```svelte
{#snippet createProject()}
  <Button>New project</Button>
{/snippet}

<EmptyState
  title="No projects yet"
  description="Create the first project to give the team a shared place to work."
  action={createProject}
/>
```

- **Not for:** cards, illustrations, optional or multiple actions, or an empty table row without the table's `empty` snippet.

## Tables

### Table

Renders the horizontal scroll region, column headers, body, and optional empty row. Column metadata is shared with `TableRow` and `TableCell`.

- **Props:** `columns` (`{ label, align?, numeric? }[]`, required), `caption`, `labelledBy` (id of the naming element), `bordered` (default `false`), `density` (`standard` default, `dense`), `isEmpty` (default `false`), `empty` snippet, `children`.
- **Types:** `TableColumn`.
- **Example:**

```svelte
<Section id="usage-heading" title="Usage" labelledBy={false}>
  <Table
    columns={[
      { label: 'Project' },
      { label: 'Requests', align: 'right', numeric: true }
    ]}
    labelledBy="usage-heading"
  >
    <TableRow>
      <TableCell>Orbit</TableCell>
      <TableCell>128,400</TableCell>
    </TableRow>
  </Table>
</Section>
```

- **Not for:** page layout, section headings (the surrounding `Section` owns the title), key-value summaries (`List as="dl"`), or wrapping ordinary data in a bordered card.

### TableRow

A body row that resets column position and exposes it to its cells.

- **Props:** native `<tr>` attributes, `class`, `children`.
- **Example:**

```svelte
<TableRow>
  <TableCell>Orbit</TableCell>
  <TableCell>Healthy</TableCell>
</TableRow>
```

- **Not for:** header rows (`Table` renders the header), visual layout rows, or content that is not a real table row.

### TableCell

A body cell that inherits its column's `align` and `numeric` metadata. A local prop overrides the column.

- **Props:** native `<td>` attributes, `colspan`, `align` (`left`, `right`), `numeric`, `class`.
- **Example:**

```svelte
<TableCell colspan={2}>No owner assigned</TableCell>
<TableCell numeric>128,400</TableCell>
```

- **Not for:** header cells (`Table` owns them), layout, or raw cells that rely on inherited metadata — use `TableCell` for every cell in such a row.

## Controls and forms

### Button

The action control. Use one primary button per region or workflow.

- **Props:** `variant` (`primary` default, `secondary`, `ghost`, `link`, `danger`), `disabled`, `loading`, native button attributes, `class`.
- **Example:**

```svelte
<Button variant="secondary">Export</Button>
<Button loading>Saving…</Button>
```

- **Not for:** navigation (`Link`), toggle state (`Toggle`), or icon-only actions without an accessible name and a 44px touch target.

### Link

The navigation control. Renders an anchor and owns navigation emphasis.

- **Props:** `href` (required), `variant` (`default`, `ghost`, `link`), native anchor attributes, `class`.
- **Example:**

```svelte
<Link href="/projects">View projects</Link>
<Link href="/account" variant="ghost">Account</Link>
```

- **Not for:** triggering actions, submitting forms, or standing in for a button.

### Label

The form label primitive, associated with a control through `for`.

- **Props:** `for`, `id`, `class`, `children`.
- **Example:**

```svelte
<Label for="project-name">Project name</Label>
<input id="project-name" />
```

- **Not for:** display text (`Text variant="label"`), wrapping buttons or menu triggers, or a second label above a packaged field.

### Field

The shared field anatomy for controls that render an external label: visible label, required marker, description, error, and the `FieldState` id/ARIA contract.

- **Props:** `label`, `description`, `error`, `required`, `disabled`, `id`, `class`, `children` snippet receiving `FieldState`.
- **Field state:** `id`, `labelId`, `descriptionId`, `errorId`, `describedBy`, `invalid`, `required`, `disabled`.
- **Example:**

```svelte
<Field label="Project name" description="Use a short, readable name." required>
  {#snippet children(state)}
    <input
      id={state.id}
      required={state.required}
      aria-describedby={state.describedBy}
      aria-invalid={state.invalid ? 'true' : undefined}
    />
  {/snippet}
</Field>
```

- **Not for:** wrapping a button or menu trigger, adding a second external label over `Input`/`Select`/date fields, or replacing the inline label of `Checkbox` and `Switch`.

### Input

A single-line text input with the shared field anatomy.

- **Props:** `label` (required), `description`, `error`, plus native `<input>` attributes (`type`, `value`, `placeholder`, `required`, `disabled`, `id`, `name`, and so on), `class`.
- **Example:**

```svelte
<Input
  label="Project name"
  description="Use a short name that stays readable in navigation."
  required
/>
```

- **Not for:** multi-line text (there is no textarea wrapper), rich text, searchable option lists (`Combobox`), or a placeholder in place of a label.

### Checkbox

An independent binary choice with an inline, clickable label.

- **Props:** `checked` (bindable), `indeterminate` (bindable), `onCheckedChange`, `label` (required), `description`, `error`, `required`, `disabled`, `id`, `name`, `value`.
- **Example:**

```svelte
<Checkbox
  label="Allow guest access"
  description="Guests can read projects but cannot change them."
/>
```

- **Not for:** mutually exclusive options (`RadioGroup`), settings that take effect immediately (`Switch`), or a label supplied only by a placeholder.

### RadioGroup

One choice from a small set of mutually exclusive options.

- **Props:** `items` (`{ value, label, description?, disabled? }[]`), `value` (bindable), `onValueChange`, `label`, `description`, `disabled`, `required`, `name`, `orientation` (`vertical` default, `horizontal`).
- **Example:**

```svelte
<RadioGroup
  label="Notification method"
  description="Choose how you want to be notified."
  items={[
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push' }
  ]}
/>
```

- **Not for:** independent choices (`Checkbox`), immediate settings (`Switch`), or long searchable lists (`Combobox`).

### Switch

An immediate on/off setting with an inline label.

- **Props:** `checked` (bindable), `onCheckedChange`, `label` (required), `description`, `error`, `required`, `disabled`, `id`, `name`, `value`.
- **Example:**

```svelte
<Switch
  label="Require review before archive"
  description="An owner must approve the archive before it takes effect."
/>
```

- **Not for:** choices that require an explicit save, multi-option selection, or an action button.

### Select

One choice from a short, predefined list.

- **Props:** `items` (`{ value, label, disabled? }[]`, required), `value` (bindable), `onValueChange`, `label` (required), `description`, `placeholder`, `error`, `disabled`, `required`, `id`, `name`, `class`.
- **Example:**

```svelte
<Select
  label="Default region"
  items={[
    { value: 'us-east', label: 'US East' },
    { value: 'eu-west', label: 'EU West' }
  ]}
  value="us-east"
/>
```

- **Not for:** searchable or long lists (`Combobox`), multiple selection, or free-text values that are not in `items`.

### Combobox

A filterable single-select built from a text input and a list of options.

- **Props:** `items` (`{ value, label, disabled? }[]`, required), `value` (bindable), `onValueChange`, `inputValue` (bindable), `label` (required), `description`, `placeholder` (default `Search...`), `error`, `disabled`, `required`, `id`, `name`, `class`.
- **Example:**

```svelte
<Combobox
  label="Framework"
  placeholder="Search framework..."
  items={[
    { value: 'svelte', label: 'Svelte' },
    { value: 'react', label: 'React' }
  ]}
/>
```

- **Not for:** multi-select, creating new options that are not in `items`, or a plain short list (`Select`).

### Slider

A single-value or range control for continuous or stepped numeric input.

- **Props:** `value` (bindable `number[]`, default `[0]`), `onValueChange`, `onValueCommit`, `min` (default `0`), `max` (default `100`), `step` (default `1`), `disabled`, `label`, `showValue` (default `false`), `orientation` (`horizontal` default, `vertical`), `class`.
- **Example:**

```svelte
<Slider label="Volume" value={[50]} showValue min={0} max={100} step={1} />
```

- **Not for:** precise numeric entry where typing is faster (`Input type="number"`), progress feedback (`Progress`), or a value that needs an exact committed number without a visible input.

### PinInput

A segmented one-time-code or PIN input with a shared field anatomy.

- **Props:** `value` (bindable), `onValueChange`, `onComplete`, `maxlength` (default `6`), `label`, `description`, `error`, `disabled`, `required`, `id`, `name`, `inputmode` (default `numeric`), `pattern` (default `[0-9]*`), `placeholder` (default `○`), `class`.
- **Example:**

```svelte
<PinInput
  label="Verification code"
  description="Enter the 6-digit code sent to your device."
  maxlength={6}
/>
```

- **Not for:** passwords, general text entry, or codes whose length or character set is unknown.

### Toggle

A single pressed/unpressed control for a formatting or view mode.

- **Props:** `pressed` (bindable), `onPressedChange`, `disabled`, `children`, `ariaLabel`, `class`.
- **Example:**

```svelte
<Toggle ariaLabel="Toggle bold" pressed>Bold</Toggle>
```

- **Not for:** form submission (`Checkbox`), immediate settings (`Switch`), or a toggle without a visible label or `ariaLabel`.

### ToggleGroup

A group of related toggles, single or multiple.

- **Props:** `type` (`single` default, `multiple`), `items` (`{ value, label, disabled? }[]`), `value` (bindable), `onValueChange`, `disabled`, `orientation` (`horizontal` default, `vertical`), `children`, `class`.
- **Example:**

```svelte
<ToggleGroup
  type="single"
  value="left"
  items={[
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' }
  ]}
/>
```

- **Not for:** switching content panels (`Tabs`), navigation, or a group whose options are not genuinely related.

### RatingGroup

A star rating with optional half values and a read-only mode.

- **Props:** `value` (bindable, default `0`), `onValueChange`, `min` (default `0`), `max` (default `5`), `allowHalf`, `disabled`, `readonly`, `required`, `name`, `orientation` (`horizontal` default, `vertical`), `ariaLabel` (default `Rating`).
- **Example:**

```svelte
<RatingGroup value={3} ariaLabel="Support rating" />
<RatingGroup value={4} readonly ariaLabel="Average rating" />
```

- **Not for:** ranking a list, sentiment capture without a visible label, or the only record of a decision.

### DateField

A segmented date input with the shared field anatomy.

- **Props:** `value` (bindable `DateValue`), `onValueChange`, `placeholder` (bindable), `onPlaceholderChange`, `label` (required), `description`, `error`, `disabled`, `readonly`, `required`, `id`, `locale`, `granularity` (`day` default, `hour`, `minute`, `second`), `minValue`, `maxValue`, `name`.
- **Example:**

```svelte
<DateField
  label="Start date"
  description="The first day work begins."
/>
```

- **Not for:** picking from a calendar (`DatePicker`), a date range (`DateRangeField`), or an unlabelled filter.

### TimeField

A segmented time input with the shared field anatomy.

- **Props:** `value` (bindable `Time`), `onValueChange`, `placeholder` (bindable), `onPlaceholderChange`, `label` (required), `description`, `error`, `disabled`, `readonly`, `required`, `id`, `locale`, `hourCycle` (`12` or `24`), `granularity` (`minute` default, `hour`, `second`), `hideTimeZone` (default `false`), `name`.
- **Example:**

```svelte
<TimeField label="Start time" hourCycle={24} granularity="minute" />
```

- **Not for:** durations, time ranges (`TimeRangeField`), or a value that needs a time-zone selector the field does not expose.

### DatePicker

A date field with a calendar popover.

- **Props:** all `DateField` field and value props, plus `open` (bindable), `onOpenChange`, `closeOnDateSelect` (default `true`).
- **Example:**

```svelte
<DatePicker label="Review date" description="Choose the day the review is due." />
```

- **Not for:** typed-only date entry (`DateField`), date ranges (`DateRangePicker`), or navigation through time rather than selecting one date.

### DateRangeField

A segmented start/end date input with the shared field anatomy.

- **Props:** `value` (bindable `{ start, end }`), `onValueChange`, `placeholder` (bindable), `onPlaceholderChange`, `label` (required), `description`, `error`, `disabled`, `readonly`, `required`, `id`, `locale`, `granularity`, `minValue`, `maxValue`, `name`.
- **Example:**

```svelte
<DateRangeField
  label="Review window"
  description="The first and last day of the review."
/>
```

- **Not for:** a single date (`DateField`), a visual range calendar (`RangeCalendar`), or an unbounded free-text range.

### DateRangePicker

A date range field with a range-calendar popover.

- **Props:** all `DateRangeField` field and value props, plus `open` (bindable), `onOpenChange`, `closeOnRangeSelect` (default `true`).
- **Example:**

```svelte
<DateRangePicker
  label="Reporting period"
  description="Choose the first and last day of the report."
/>
```

- **Not for:** single-date selection (`DatePicker`), non-contiguous dates, or a range that needs its own comparison workflow.

### TimeRangeField

A segmented start/end time input with the shared field anatomy.

- **Props:** `value` (bindable `{ start, end }`), `onValueChange`, `placeholder` (bindable), `onPlaceholderChange`, `label` (required), `description`, `error`, `disabled`, `readonly`, `required`, `id`, `locale`, `hourCycle`, `granularity` (`minute` default), `hideTimeZone`.
- **Example:**

```svelte
<TimeRangeField label="Maintenance window" hourCycle={24} />
```

- **Not for:** a single time (`TimeField`), durations, or time zones that cross days without a date range.

### Calendar

An inline single- or multiple-date calendar.

- **Props:** `type` (`single` default, `multiple`), `value` (bindable), `onValueChange`, `placeholder` (bindable), `onPlaceholderChange`, `locale`, `weekStartsOn`, `minValue`, `maxValue`, `disabled`, `readonly`, `numberOfMonths` (default `1`), `pagedNavigation`, `fixedWeeks`, `disableDaysOutsideMonth` (default `true`), `isDateDisabled`, `isDateUnavailable`, `calendarLabel` (default `Calendar`), `class`.
- **Example:**

```svelte
<Calendar type="single" calendarLabel="Choose a review date" />
```

- **Not for:** a compact trigger (`DatePicker`), a date range (`RangeCalendar`), or a date display without input.

### RangeCalendar

An inline two-ended date range calendar.

- **Props:** `value` (bindable `{ start, end }`), `onValueChange`, `placeholder` (bindable), `onPlaceholderChange`, `locale`, `weekStartsOn`, `minValue`, `maxValue`, `disabled`, `readonly`, `numberOfMonths` (default `1`), `pagedNavigation`, `fixedWeeks`, `disableDaysOutsideMonth` (default `true`), `isDateDisabled`, `isDateUnavailable`, `calendarLabel` (default `Range calendar`), `class`.
- **Example:**

```svelte
<RangeCalendar calendarLabel="Choose the reporting period" />
```

- **Not for:** single-date selection (`Calendar`), non-contiguous dates, or a range trigger (`DateRangePicker`).

## Overlays and menus

### Dialog

A focused task or confirmation in a modal layer. Focus is trapped, Escape closes, and focus returns to the trigger.

- **Props:** `open` (bindable), `onOpenChange`, `title` (required), `description`, `triggerLabel`, `triggerVariant` (`primary`, `secondary`), `children`, `footer` snippet receiving `{ close }`, `closeLabel` (default `Close dialog`).
- **Example:**

```svelte
{#snippet footer({ close })}
  <Button variant="secondary" onclick={close}>Cancel</Button>
  <Button onclick={close}>Save</Button>
{/snippet}

<Dialog title="Rename project" triggerLabel="Rename" {footer}>
  <Text variant="body" tone="secondary">Use a name that stays readable in navigation.</Text>
</Dialog>
```

- **Not for:** navigation, scrolling content, multi-step flows, nested dialogs, or a second overlay at the same time.

### AlertDialog

A modal confirmation for a destructive or irreversible action. It requires an explicit action label and a cancel path.

- **Props:** `open` (bindable), `onOpenChange`, `title` (required), `description`, `triggerLabel`, `triggerVariant`, `actionLabel` (default `Continue`), `actionVariant` (`primary`, `secondary`, `danger`), `cancelLabel` (default `Cancel`), `onAction`, `onCancel`, `children`, `footer`.
- **Example:**

```svelte
<AlertDialog
  title="Delete project"
  description="This action cannot be undone."
  triggerLabel="Delete"
  actionLabel="Delete project"
  actionVariant="danger"
  onAction={deleteProject}
/>
```

- **Not for:** reversible actions (perform them and offer undo), forms, long content, or a generic confirmation when `Dialog` is enough.

### Popover

A non-modal floating layer anchored to a trigger.

- **Props:** `open` (bindable), `onOpenChange`, `triggerLabel`, `triggerVariant`, `align` (`start`, `center` default, `end`), `side` (`top`, `right`, `bottom` default, `left`), `sideOffset`, `alignOffset`, `children`, `content` snippet, `ariaLabel`.
- **Example:**

```svelte
<Popover triggerLabel="Open filters" ariaLabel="Filters">
  <Stack gap="sm">
    <Checkbox label="Only my projects" />
    <Button variant="secondary">Apply</Button>
  </Stack>
</Popover>
```

- **Not for:** critical information available only in the popover, long forms, multi-step flows, or navigation.

### Tooltip

A short, supplementary description shown on hover or focus.

- **Props:** `content` (required), `triggerLabel` (required), `side` (`top` default, `right`, `bottom`, `left`), `delay` (default `300`), `disabled`.
- **Example:**

```svelte
<Tooltip content="Copy the project identifier." triggerLabel="Copy project ID" />
```

- **Not for:** the only explanation of an action or error, rich interactive content, or an icon-only trigger without its own accessible name.

### DropdownMenu

A menu of actions opened from a button trigger.

- **Props:** `triggerLabel` (default `Menu`), `triggerVariant`, `items` (`{ label, type?, value?, disabled?, shortcut?, checked?, onSelect? }[]`), `groups` (`{ label?, items }[]`), `children`, `align`, `side`, `sideOffset`, `alignOffset`.
- **Example:**

```svelte
<DropdownMenu
  triggerLabel="Actions"
  groups={[
    {
      label: 'Actions',
      items: [
        { label: 'Edit', shortcut: '⌘E', onSelect: editProject },
        { label: 'Duplicate', shortcut: '⌘D', onSelect: duplicateProject }
      ]
    },
    { label: 'View', items: [{ type: 'checkbox', label: 'Show sidebar', checked: true }] }
  ]}
/>
```

- **Not for:** primary navigation, destructive confirmation without an `AlertDialog`, or an action set that should stay visible.

### ContextMenu

A menu opened from a right-click or context action on its children.

- **Props:** `items`, `groups`, `children` (required trigger area), `align` (default `start`), `side` (default `right`), `sideOffset` (default `2`), `alignOffset` (default `-5`).
- **Example:**

```svelte
<ContextMenu items={[{ label: 'Copy', shortcut: '⌘C' }, { label: 'Paste', shortcut: '⌘V' }]}>
  <div class="inbox-row">Right-click this row</div>
</ContextMenu>
```

- **Not for:** actions that are only reachable by right-click, primary navigation, or a touch-only interaction without another visible affordance.

### Menubar

A horizontal application menubar with multiple menus.

- **Props:** `menus` (`{ trigger, groups }[]`, required), `ariaLabel` (default `Menubar`).
- **Example:**

```svelte
<Menubar
  menus={[
    { trigger: 'File', groups: [{ items: [{ label: 'New', shortcut: '⌘N' }, { label: 'Open', shortcut: '⌘O' }] }] },
    { trigger: 'Edit', groups: [{ items: [{ label: 'Undo', shortcut: '⌘Z' }] }] }
  ]}
/>
```

- **Not for:** website navigation, mobile navigation, or a replacement for the `Navbar`/`Sidebar` application frame.

### NavigationMenu

A horizontal navigation menu with trigger groups that reveal links.

- **Props:** `items` (`{ trigger, links, content? }[]`, required), `ariaLabel` (default `Navigation`).
- **Example:**

```svelte
<NavigationMenu
  items={[
    {
      trigger: 'Product',
      links: [
        { href: '/overview', label: 'Overview' },
        { href: '/pricing', label: 'Pricing', active: true }
      ]
    }
  ]}
/>
```

- **Not for:** a persistent application sidebar (`Sidebar`), deep hierarchies, or mobile navigation.

### Command

A filterable command menu with grouped commands and keyboard navigation.

- **Props:** `value` (bindable), `onValueChange`, `items` (`{ value, label, disabled?, keywords?, group?, icon? }[]`), `groups` (`string[]`), `placeholder` (default `Search…`), `emptyLabel` (default `No results found.`), `label` (default `Command menu`), `shouldFilter` (default `true`), `loop` (default `false`).
- **Example:**

```svelte
<Command
  items={[
    { value: 'search', label: 'Search', group: 'Suggestions' },
    { value: 'settings', label: 'Settings', group: 'Commands' }
  ]}
/>
```

- **Not for:** a full search results page, a menu of destructive actions without confirmation, or a replacement for navigation structure.

### LinkPreview

A preview card for a link, shown on hover or focus.

- **Props:** `open` (bindable), `onOpenChange`, `openDelay` (default `700`), `closeDelay` (default `300`), `disabled`, `href`, `label`, `trigger` snippet, `children`, `content` snippet, `align` (default `center`), `side` (default `bottom`), `sideOffset` (default `6`), `alignOffset`.
- **Example:**

```svelte
<LinkPreview href="https://example.com" label="Example">
  {#snippet content()}
    <Text variant="label" as="strong">Example</Text>
    <Text variant="body-sm" tone="secondary">Preview content for the link.</Text>
  {/snippet}
</LinkPreview>
```

- **Not for:** essential information that must be readable without hover, touch-only discovery, or long rich documents.

### Toolbar

A keyboard-navigable group of related command buttons or links.

- **Props:** `orientation` (`horizontal` default, `vertical`), `loop` (default `true`), `items` (`{ type?: 'button' | 'link', label, disabled?, href?, onClick? }[]`), `children`, `ariaLabel` (default `Toolbar`).
- **Example:**

```svelte
<Toolbar
  ariaLabel="Text formatting"
  items={[{ label: 'Bold' }, { label: 'Italic' }, { label: 'Underline' }]}
/>
```

- **Not for:** navigation, tabs, or a toolbar of icon-only actions without names and touch targets.

### Tabs

Peer sections switched by a tab strip with one accent underline.

- **Props:** `tabs` (`{ value, label, content?, disabled? }[]`, required), `value` (bindable), `onValueChange`, `label` (default `Sections`).
- **Example:**

```svelte
<Tabs
  tabs={[
    { value: 'overview', label: 'Overview', content: overview },
    { value: 'activity', label: 'Activity', content: activity }
  ]}
/>
```

- **Not for:** multi-step flows, primary navigation, or placing a primary action inside the tab strip.

### Accordion

A set of collapsible sections, single or multiple.

- **Props:** `items` (`{ value, title, content?, disabled? }[]`, required), `type` (`single` default, `multiple`), `value` (bindable), `onValueChange`, `disabled`, `class`.
- **Example:**

```svelte
<Accordion
  items={[
    { value: 'account', title: 'Account', content: accountContent },
    { value: 'billing', title: 'Billing', content: billingContent }
  ]}
/>
```

- **Not for:** primary navigation, long-form documentation that needs a stable outline, or hiding information that is needed to complete the current task.

### Collapsible

A single disclosure region with a custom trigger.

- **Props:** `open` (bindable), `onOpenChange`, `disabled`, `trigger` snippet (required), `children`, `class`.
- **Example:**

```svelte
<Collapsible trigger={advancedTrigger}>
  <Stack gap="sm">…</Stack>
</Collapsible>
```

- **Not for:** a group of related disclosures (`Accordion`), navigation, or content that must stay visible while working.

## Feedback and navigation

### Progress

Progress for a known or indeterminate task.

- **Props:** `value` (number or `null` for indeterminate, default `null`), `max` (default `100`), `min` (default `0`), `label`, `showValue` (default `false`), `class`.
- **Example:**

```svelte
<Progress value={72} label="Uploading" showValue />
<Progress value={null} label="Processing" />
```

- **Not for:** measurements or capacity (`Meter`), fabricated percentages for unknown work, or a full-page loading state.

### Meter

A measurement within a known range, such as disk usage or load.

- **Props:** `value` (default `0`), `max` (default `100`), `min` (default `0`), `label`, `showValue` (default `false`), `class`.
- **Example:**

```svelte
<Meter value={78} label="Disk usage" showValue />
```

- **Not for:** task progress (`Progress`), status without a label, or a value outside a bounded range.

### Pagination

Page navigation for a known result count.

- **Props:** `count` (required), `perPage` (default `10`), `page` (bindable, default `1`), `siblingCount` (default `1`), `onPageChange`, `loop` (default `false`), `prevLabel` (default `Previous`), `nextLabel` (default `Next`), `class`.
- **Example:**

```svelte
<Pagination count={100} perPage={10} page={1} onPageChange={loadPage} />
```

- **Not for:** infinite scroll, carousel navigation, or a page count that is not actually known.

## Accessibility, icons, and theming

### Icon

Renders one Carbon icon through the build-time icon pipeline. Decorative icons are hidden from assistive technology; labelled icons expose an image role and name.

- **Props:** `icon` (required Carbon component), `size` (`16` default, `20`, `24`, `32`), `label`, `class`.
- **Example:**

```svelte
<script lang="ts">
  import Add from '~icons/carbon/add';
</script>

<Icon icon={Add} />
<Icon icon={Add} label="Add project" />
```

- **Not for:** a second icon family, runtime-fetched icons, decorative icons on every heading or row, or an icon-only control without a name and 44px touch target.

### VisuallyHidden

Keeps text in the accessibility tree while clipping it visually.

- **Props:** `as` (`span` default, `div`, `a`), `focusable` (default `false`), `class`.
- **Example:**

```svelte
<Button variant="secondary">
  <Icon icon={Add} />
  <VisuallyHidden>Add project</VisuallyHidden>
</Button>

<VisuallyHidden as="a" href="#main-content" focusable>Skip to content</VisuallyHidden>
```

- **Not for:** text that should be readable on screen, a duplicate of an `aria-label`, or hiding content from everyone.

### ThemeScope

Sets `data-theme` and applies validated custom-property overrides inline, so nested scopes inherit naturally. The framework ships validated light and dark themes; `system` inherits the OS or surrounding scope.

- **Props:** `theme` (`light` | `dark` | `system`, default `system`), `tokens` (`Record<string, string>`, keys must start with `--`), `class`, plus native div attributes.
- **Example:**

```svelte
<ThemeScope tokens={{ '--color-accent': '#6929C4' }}>
  <Button>Primary action</Button>
</ThemeScope>
```

- **Not for:** arbitrary CSS overrides or duplicating the token block. Use `theme` for light/dark regions. See [theming.md](theming.md) for the public and internal token contracts.

## Public non-component exports

These are exported from `src/index.ts` for typed composition.

| Export | Kind | Purpose | Boundary |
| --- | --- | --- | --- |
| `TableColumn` | type | Column label plus `align` and `numeric` metadata for `Table`. | Not a cell or row model; compose rows with `TableRow`/`TableCell`. |
| `IconComponent`, `IconSize`, `iconSizes` | types and constant | Typed Carbon icon props and the allowed display sizes `16`, `20`, `24`, `32`. | Not a registry of icon names; import Carbon through `~icons/carbon/*`. |
| `createFieldState` | function | Derives control, label, description, and error ids plus ARIA flags from a stable base id. | Not a label renderer; `Field` renders the anatomy. |
| `FieldState`, `FieldStateOptions` | types | The field contract passed to `Field` children and accepted by `createFieldState`. | Not a store; derive it once per render. |
| `headingLevels`, `headingTag` | constant and function | Semantic heading levels and the matching `h1`–`h6` tag. | Not a visual scale; use `Text` variants for size. |
| `HeadingLevel`, `HeadingTag`, `TextAlign`, `TextProps`, `TextTag`, `TextTone`, `TextVariant`, `TextWeight` | types | Typed typography props and values. | Do not add ad-hoc sizes, tones, or tags outside these unions. |
| `breakpoints`, `Breakpoint`, `CollapseAt` | constant and types | TypeScript mirror of `--breakpoint-sm|md|lg` and the responsive prop unions. | Not usable inside CSS media queries; components repeat the literal values. |
| `LayoutTag`, `ListMarker`, `Space` | types | Allowed layout elements, list markers, and spacing-scale names. | Not arbitrary tags or spacing values. |
