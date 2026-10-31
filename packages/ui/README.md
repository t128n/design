# @t128n/ui

Svelte 5 design framework for quiet, spacious, technical application interfaces. Tokens feed a small typography and layout primitive layer, and the existing components build on that vocabulary.

See [`DESIGN.md`](../../DESIGN.md) for the visual contract.

## Install and import

Import the stylesheet once at the application root, then import components from the package entry.

```svelte
<script lang="ts">
  import { Button, Stack, Text } from '@t128n/ui';
  import '@t128n/ui/styles';
</script>
```

The stylesheet import is required for tokens, fonts, focus rings, reduced motion, and component styles.

## Framework uses

### Text

`variant` controls appearance. `as` controls the native element. They are independent; choose both explicitly.

`as` is semantic and `variant` is visual. Choose headings for document order, not for size: `PageHeader`, `Hero`, and `Card` expose `level` (`1`–`6`) and render the matching `h1`–`h6`. A card that sits under a page title and a section heading uses `level={3}` while keeping the subheading scale.

Each element also types its own attributes. `<Text as="time" datetime="2026-10-31">` compiles, while `as="a"` is rejected because navigation belongs to `Link` and actions belong to `Button`.

```svelte
<Text variant="display" as="h1">Projects</Text>
<Text variant="heading" as="h2">Recent activity</Text>
<Text variant="subheading" as="h3">Ownership</Text>
<Text variant="body" tone="secondary">
  Every project has a named owner and a visible next step.
</Text>
<Text variant="body-sm" as="p">Small UI text — 14px / 1.5.</Text>
<Text variant="label" as="span" tone="secondary">Active projects</Text>
<Text variant="caption" as="time" datetime="2026-10-31">31 October 2026</Text>
```

Available variants: `display`, `heading`, `subheading`, `body`, `body-sm`, `label`, `caption`.
Available tones: `primary`, `secondary`, `muted`, `inherit`, `info`, `progress`, `success`, `warning`, `danger`, `disabled`.

`Text` never renders an anchor or a button. Use `Link` for navigation and `Button` for actions. Use the form `Label` for form associations; `Text variant="label"` is display text.

### Code

```svelte
<Text variant="body">
  Set <Code>projectId</Code> before creating the project.
</Text>

<Code block>{`const projectId = 'design-v0.1';`}</Code>
```

### Lists

`List` owns the native container, marker, orientation, spacing, and optional separators. List items are `Text as="li"`; description terms and values are `Text as="dt"` and `Text as="dd"`. There is no separate `ListItem` component: the native element belongs to `Text` so its typography stays in one place.

```svelte
<List as="ol" gap="sm">
  <Text as="li" variant="body" tone="secondary">Invite the project owners.</Text>
  <Text as="li" variant="body" tone="secondary">Connect a repository.</Text>
</List>

<List marker="none" separated gap="sm">
  <Text as="li" variant="body-sm" tone="secondary">Orbit · Mara updated the plan.</Text>
  <Text as="li" variant="body-sm" tone="secondary">Atlas · Devon assigned reviewers.</Text>
</List>

<List as="dl" gap="md">
  <Text as="dt" variant="label" tone="secondary">Owner</Text>
  <Text as="dd" variant="body">Mara Chen</Text>
  <Text as="dt" variant="label" tone="secondary">Environment</Text>
  <Text as="dd" variant="body">Production</Text>
</List>

<List orientation="horizontal" marker="none" gap="xl">
  <Text as="li" variant="body-sm" tone="secondary">Docs</Text>
  <Text as="li" variant="body-sm" tone="secondary">Status</Text>
  <Text as="li" variant="body-sm" tone="secondary">Privacy</Text>
</List>
```

`as` accepts `ul`, `ol`, and `dl`. A `dl` defaults to `marker="none"` and emits no marker class or marker padding; pair it with `dt`/`dd`. `separated` adds only the row separator — the `gap` value carries all vertical rhythm, so `gap="xs"` and `gap="lg"` stay visibly different.

Markers: `none`, `disc`, `circle`, `square`, `decimal`, `lower-alpha`, `upper-roman`.

### Layout

```svelte
<Stack gap="lg">
  <Text variant="heading" as="h2">Recent projects</Text>
  <Text variant="body-sm" tone="secondary">
    Ownership, status, and the latest update for each project.
  </Text>
  <Inline gap="sm">
    <Button variant="secondary">Export</Button>
    <Button>New project</Button>
  </Inline>
</Stack>
```

- `Stack` — vertical rhythm; `gap` accepts the spacing scale `xs` through `3xl`.
- `Inline` — wrapping horizontal rows with `gap`, `align`, `justify`, and `wrap`.
- `Grid` — fixed columns or `columns="auto"` with `minItem="sm|md|lg"`.
- `Container` — `width="content|reading|form|full"` and token padding.
- `List` — semantic `ul`/`ol`/`dl` with `marker`, `orientation`, `gap`, and `separated`.

`Text` has no margins. Spacing belongs to the layout primitive.

### Empty states

`EmptyState` is the supported empty-state pattern: a heading, one sentence, and one required action. The `action` snippet is not optional, which keeps DESIGN R44 enforceable. Pass `level` to keep heading order correct when the state is nested inside a section.

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

`EmptyState` renders a labelled `<section>` and centers its content with tokens. It is not a card: put it on the workspace when the whole region is empty.

### Icons

Carbon is the only icon family. Icons are bundled at build time with
`unplugin-icons`, never fetched at runtime and never mixed with another set.

```svelte
<script lang="ts">
  import Add from '~icons/carbon/add';
  import Search from '~icons/carbon/search';
  import { Icon } from '@t128n/ui';
</script>

<Icon icon={Search} />
<Icon icon={Add} size={20} />
<Icon icon={Add} label="Add project" />
```

`Icon` renders the Carbon component directly, without a wrapper. `size` accepts
`16`, `20`, `24`, or `32` and defaults to `16`; use `16` for inline controls,
`20` for prominent actions, `24` for rare larger contexts, and `32` only for
intentionally large representations. Decorative icons are `aria-hidden` by
default. Pass `label` only when the icon itself carries meaning: it becomes
`role="img"` with that accessible name. Icon-only controls still need a name from
visible text, `VisuallyHidden`, or a labelled `Icon`, plus a 44px touch target
(DESIGN R37, R40, and the iconography guidance).

`IconComponent` and `IconSize` are exported for typed icon props.

### Form fields

`Input`, `Select`, `Combobox`, `PinInput`, and the date/time controls share one
anatomy: `label`, `description`, `error`, `required`, `disabled`, `id`, and
`class`. `Field` renders that anatomy for controls that need an external label,
and `createFieldState` derives the ids for controls that render their own label.

```svelte
<Input
  label="Project name"
  description="Use a short name that stays readable in navigation."
  required
/>

<Input label="Project name" error="Enter a project name." />
```

- One visible label per control. The label points at the control with `for`; a
  button or menu trigger is named with `aria-labelledby` instead of being wrapped
  in a `<label>`.
- `description` and `error` produce stable ids. The control receives both through
  `aria-describedby`, and an error also sets `aria-invalid` and renders with
  `role="alert"`.
- `required` renders a `*` marker with hidden “required” text and is exposed on
  the control as `required` or `aria-required`.
- A placeholder is never a label (DESIGN R24).
- `Checkbox` and `Switch` are the choice-control exception: their label stays
  inline and clickable, so they keep their own label markup but use the same
  description, error, required, disabled, and id contract.
- Date and time fields keep their bits-ui label part for segment association and
  use `Field` only for the shared message and id layer.

`Field` passes a `FieldState` to its children snippet with `id`, `labelId`,
`descriptionId`, `errorId`, `describedBy`, `invalid`, `required`, and `disabled`.
Use it for a control that is not one of the packaged fields:

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

### Visually hidden text

`VisuallyHidden` keeps text in the accessibility tree while clipping it visually. Use it to name icon-only controls and to provide the AppShell skip link; do not use `aria-label` and hidden text together.

```svelte
<script lang="ts">
  import Add from '~icons/carbon/add';
  import { Button, Icon, VisuallyHidden } from '@t128n/ui';
</script>

<Button variant="secondary">
  <Icon icon={Add} />
  <VisuallyHidden>Add project</VisuallyHidden>
</Button>

<VisuallyHidden as="a" href="#main-content" focusable>Skip to content</VisuallyHidden>
```

`as` accepts `span`, `div`, and `a`. `focusable` reveals the element on `:focus-visible` so a hidden anchor can still work as a skip link.

### Responsive layout

Breakpoints are `sm` 640px, `md` 800px, and `lg` 1024px. They live as tokens in
`styles/tokens.css` and as `breakpoints` in `src/lib/layout.ts`. Media queries
cannot read custom properties, so component media queries repeat the literal
numbers with a comment naming the token.

```svelte
<!-- Collapse a two-column grid below 800px, then into one column. -->
<Grid columns={2} collapseAt="md" collapseColumns={1} gap="lg">...</Grid>

<!-- Stack action rows below 640px; the default is never. -->
<Inline stackAt="sm" gap="sm">...</Inline>

<!-- Collapse large inline padding below 1024px. -->
<Container width="content" padding="2xl" paddingAt="lg">...</Container>
```

- `Grid.collapseAt` defaults to `sm`; `collapseColumns` defaults to `1`. Use
  `collapseAt="never"` to keep the configured columns at every width.
- `Inline.stackAt` defaults to `never`; below the chosen breakpoint it becomes a
  vertical column.
- `Container.paddingAt` defaults to `sm`; `xl`, `2xl`, and `3xl` inline padding
  collapse to `--space-lg` below the chosen breakpoint.

`AppShell` and `Sidebar` share the `md` 800px breakpoint: the sidebar column
becomes a drawer and the shell stacks to one column.

### AppShell padding and Container composition

`AppShell` owns outer content padding by default (`padding="xl"`, collapsing to
`--space-lg` below 800px). A `Container` also owns inline padding. Nesting both
with their defaults produces double padding.

Choose one owner:

```svelte
<!-- AppShell pads; Container is only a measure. -->
<AppShell>
  <Container padding="none">...</Container>
</AppShell>

<!-- Container pads; the shell adds nothing. -->
<AppShell padding="none">
  <Container padding="xl">...</Container>
</AppShell>
```

Use `AppShell padding="none"` for full-bleed regions that own their own edge
spacing, or when a page-level `Container` should be the single padding owner.

### Tables and empty states

`Table` renders a horizontal-scrolling wrapper, the column headers, and the body.
Use `TableRow` and `TableCell` for the body so each cell inherits its column's
`align` and `numeric` metadata. Raw `<tr>`/`<td>` children still work for
one-off markup, but they do not inherit column metadata.

```svelte
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
```

- `colspan` advances the inherited column position. A cell's own `align` or
  `numeric` prop overrides the column metadata. Use `TableCell` for every cell
  in a row that relies on column metadata; raw cells do not advance the position.
- Name the scroll wrapper with `labelledBy` (usually the surrounding section
  heading id) or `caption`. The wrapper only becomes a `region` when one of them
  supplies a real name; there is no generic “Table” fallback. When the table
  points at a section heading, leave the section itself unnamed (or name it
  differently) so the two landmarks do not share one accessible name.
- Keep a real `<caption>` when the table needs its own name. `Table` never
  renders a section title or heading.
- `isEmpty` with an `empty` snippet renders one full-width row
  (`colspan={columns.length}`). Use `EmptyState` inside it with exactly one
  action.

### Theming

The package ships validated light and dark themes from one semantic token
contract. Light is the default; dark follows the OS `prefers-color-scheme`
unless an explicit `data-theme` is present. `color-scheme` is set with each
theme so native controls and scrollbars follow.

```svelte
<!-- Inherit the OS or surrounding scope. -->
<ThemeScope>...</ThemeScope>

<!-- Force a region. Explicit light inside dark (or dark inside light) works. -->
<ThemeScope theme="dark">
  <Button>Primary action</Button>
</ThemeScope>

<!-- Token overrides work in both themes. -->
<ThemeScope tokens={{ '--color-accent': '#BE95FF' }}>...</ThemeScope>
```

Set `data-theme="light"` or `data-theme="dark"` on `<html>` to force a whole
application. Components consume only semantic tokens, so they need no
dark-specific code or styles.

See [`docs/theming.md`](../../docs/theming.md) for the light and dark semantic
maps, the public token contract, the internal token list, and nested-scope
examples.

## Component inventory

- **Typography:** `Text`, `Code`
- **Layout:** `Stack`, `Inline`, `Grid`, `Container`, `List`, `AppShell`, `PageHeader`, `Hero`, `Footer`, `Sidebar`, `Navbar`
- **Accessibility:** `VisuallyHidden`, `Icon`
- **Controls:** `Button`, `Link`, `Field`, `Input`, `Label`, `Checkbox`, `RadioGroup`, `Switch`, `Select`, `Combobox`, `Slider`, `PinInput`, `DateField`, `TimeField`, `DatePicker`, `DateRangeField`, `DateRangePicker`, `TimeRangeField`, `Toggle`, `ToggleGroup`, `RatingGroup`
- **Surfaces and feedback:** `Card`, `Alert`, `Badge`, `Table`, `Breadcrumbs`, `Pagination`, `Progress`, `Meter`, `Separator`, `Tabs`, `Accordion`, `Collapsible`, `EmptyState`
- **Overlays:** `Dialog`, `AlertDialog`, `Popover`, `Tooltip`, `DropdownMenu`, `ContextMenu`, `Menubar`, `Command`, `Toolbar`, `NavigationMenu`

## Exceptions

- Native table and form semantics stay native. Wrap their textual content in `Text`. Application and story lists use `List`; navigation internals may keep their own list markup.
- Component icons come only from `~icons/carbon/*` through `Icon`. Do not import a second icon family or fetch icons at runtime. The legacy `carbon-icons-svelte` dependency is no longer referenced by component source and can be removed in a package-delivery follow-up.
- Control internals (buttons, inputs, menus, date fields, tables) may keep token-based local CSS so geometry and interaction states stay precise.
- Application and story prose must not use raw `<p>`/`<h1>`–`<h6>` or typography classes. The framework audit enforces this.
- `Text` does not support `truncate`, arbitrary font sizes, colors, or line heights. Add a token or a documented variant instead.

## Checks

The repository is Bun-native: `bun.lock` is the only lockfile and
`packageManager` pins Bun. Use `bun install` once, then run the checks from the
repository root. Do not use pnpm or npm.

```sh
bun install
bun run test
bun run test:storybook
bun run build-storybook
cd packages/ui && bun run check
cd packages/ui && bun run build
```

CI should run the warning-failing form so a new unused selector cannot land:

```sh
cd packages/ui && bunx svelte-check --tsconfig ./tsconfig.json --fail-on-warnings
```

The audit in `packages/ui/tests/framework-audit.test.ts` fails on raw prose or list markup in stories and on literal typography values.
