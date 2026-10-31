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

```svelte
<Text variant="display" as="h1">Projects</Text>
<Text variant="heading" as="h2">Recent activity</Text>
<Text variant="subheading" as="h3">Ownership</Text>
<Text variant="body" tone="secondary">
  Every project has a named owner and a visible next step.
</Text>
<Text variant="body-sm" as="p">Small UI text — 14px / 1.5.</Text>
<Text variant="label" as="span" tone="secondary">Active projects</Text>
<Text variant="caption" as="span" tone="muted">Updated 31 October 2026</Text>
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

`List` owns the native container, marker, orientation, spacing, and optional separators. List items are `Text as="li"`.

```svelte
<List as="ol" gap="sm">
  <Text as="li" variant="body" tone="secondary">Invite the project owners.</Text>
  <Text as="li" variant="body" tone="secondary">Connect a repository.</Text>
</List>

<List marker="none" separated gap="sm">
  <Text as="li" variant="body-sm" tone="secondary">Orbit · Mara updated the plan.</Text>
  <Text as="li" variant="body-sm" tone="secondary">Atlas · Devon assigned reviewers.</Text>
</List>

<List orientation="horizontal" marker="none" gap="xl">
  <Text as="li" variant="body-sm" tone="secondary">Docs</Text>
  <Text as="li" variant="body-sm" tone="secondary">Status</Text>
  <Text as="li" variant="body-sm" tone="secondary">Privacy</Text>
</List>
```

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
- `List` — semantic `ul`/`ol` with `marker`, `orientation`, `gap`, and `separated`.

`Text` has no margins. Spacing belongs to the layout primitive.

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

### Theming

`ThemeScope` renders `data-theme="light"` and applies validated custom-property
overrides inline, so nested scopes inherit naturally. See
[`docs/theming.md`](../../docs/theming.md) for the public token contract, the
internal token list, and the nested override example. Dark mode is out of scope
until it is designed and contrast-validated separately.

## Component inventory

- **Typography:** `Text`, `Code`
- **Layout:** `Stack`, `Inline`, `Grid`, `Container`, `List`, `AppShell`, `PageHeader`, `Hero`, `Footer`, `Sidebar`, `Navbar`
- **Controls:** `Button`, `Link`, `Input`, `Label`, `Checkbox`, `RadioGroup`, `Switch`, `Select`, `Combobox`, `Slider`, `PinInput`, `DateField`, `TimeField`, `DatePicker`, `DateRangeField`, `DateRangePicker`, `TimeRangeField`, `Toggle`, `ToggleGroup`, `RatingGroup`
- **Surfaces and feedback:** `Card`, `Alert`, `Badge`, `Table`, `Breadcrumbs`, `Pagination`, `Progress`, `Meter`, `Separator`, `Tabs`, `Accordion`, `Collapsible`
- **Overlays:** `Dialog`, `AlertDialog`, `Popover`, `Tooltip`, `DropdownMenu`, `ContextMenu`, `Menubar`, `Command`, `Toolbar`, `NavigationMenu`

## Exceptions

- Native table and form semantics stay native. Wrap their textual content in `Text`. Application and story lists use `List`; navigation internals may keep their own list markup.
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
