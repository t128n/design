# @stellar/ui

Svelte 5 design framework for quiet, spacious, technical application interfaces. Tokens feed a small typography and layout primitive layer, and the existing components build on that vocabulary.

See [`DESIGN.md`](../../DESIGN.md) for the visual contract.

## Install and import

Import the stylesheet once at the application root, then import components from the package entry.

```svelte
<script lang="ts">
  import { Button, Stack, Text } from '@stellar/ui';
  import '@stellar/ui/styles';
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

```sh
bun run test
bun run test:storybook
bun run build-storybook
cd packages/ui && bun run check
cd packages/ui && bun run build
```

The audit in `packages/ui/tests/framework-audit.test.ts` fails on raw prose or list markup in stories and on literal typography values.
