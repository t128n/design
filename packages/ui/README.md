# @t128n/ui

A Svelte 5 design framework for quiet, spacious, technical application interfaces. Tokens feed a small typography and layout vocabulary; components build on that vocabulary and consume semantic tokens only.

This package is **internal to `t128n/design`**. It is not published to a registry.

- Visual contract: [`DESIGN.md`](../../DESIGN.md)
- Every component: [`docs/components.md`](../../docs/components.md)
- R48 coverage: [`docs/component-coverage.md`](../../docs/component-coverage.md)
- Theming reference: [`docs/theming.md`](../../docs/theming.md)
- Change history: [`CHANGELOG.md`](../../CHANGELOG.md)
- Contribution rules: [`CONTRIBUTING.md`](../../CONTRIBUTING.md)

## 1. Overview and principles

The framework exists so application screens feel like one continuous workspace instead of a collection of panels.

- **Quiet, spacious, technical.** Content leads. Typography, alignment, and whitespace organize the page before color, borders, icons, or motion.
- **Continuous workspaces.** Primary content sits on the workspace surface. Navbar, sidebar, tables, and forms share that surface; organization comes from hierarchy, not from alternating backgrounds or cards around ordinary content.
- **Semantic tokens only.** Components consume `--color-*`, `--space-*`, `--font-*`, `--layout-*`, and the other documented tokens. They do not invent local colors, font sizes, or spacing values.
- **Light and dark are themes, not component branches.** Theme colors flow from semantic tokens, so a validated dark theme can reuse the same components. This branch ships the validated light theme; dark tokens are a separate, contrast-validated deliverable and must not be invented locally.
- **One primary action per region.** Accent is reserved for primary actions, selected states, meaningful links, and focus. Status is always text plus one semantic tone.
- **Native semantics first.** Svelte components wrap native elements and Bits UI behavior; application copy still uses `Text`, `Code`, and `List` rather than raw prose and list markup.

## 2. Install and consume

### Internal-only package

`@t128n/ui` is deliberately not a public package:

- `packages/ui/package.json` keeps `"private": true`.
- No license is granted for external distribution; treat the package as `UNLICENSED`.
- Publishing requires an explicit license decision and a release process owned outside this document. Do not add a license file or publish a tarball publicly without that decision.

Consume it from this repository as a workspace dependency, or from a local tarball for a downstream internal project.

### Workspace dependency

```json
{
  "dependencies": {
    "@t128n/ui": "workspace:*"
  }
}
```

### Local tarball

```sh
cd packages/ui
bun run build
bun pm pack
# install the resulting t128n-ui-<version>.tgz in the consuming project
```

The build emits the ES entry and the single stylesheet. The package-delivery
stack adds the remaining distribution pieces: TypeScript declarations and
separately emitted font assets. On a branch before that stack, the Vite build
emits `dist/index.js` and `dist/index.css`; verify `dist/index.d.ts` and the font
assets before publishing a local tarball. The consuming project still provides
`svelte` (a peer dependency) and the package's runtime dependencies through its
own install.

### Stylesheet and assets

Import the stylesheet once at the application root, then import components from the package entry:

```svelte
<script lang="ts">
  import { Button, Stack, Text } from '@t128n/ui';
  import '@t128n/ui/styles';
</script>

<Stack gap="lg">
  <Text variant="heading" as="h1">Projects</Text>
  <Button>New project</Button>
</Stack>
```

`@t128n/ui/styles` is required. It carries the design tokens, the IBM Plex
font imports, base element styles, the shared `:focus-visible` ring,
reduced-motion handling, and component styles. A component imported without the
stylesheet renders without the framework's visual contract.

The stylesheet imports IBM Plex Sans 400, 500, and 600 and IBM Plex Mono 400
from `@fontsource`. A workspace consumer resolves those imports through its
bundler. The package-delivery stack owns emitting the standalone font assets for
a tarball; do not replace them with a runtime font CDN.

### Browser support

Use modern evergreen browsers with native CSS custom properties, CSS grid, `:focus-visible`, and `prefers-reduced-motion`. The framework targets a 320px minimum viewport. Internet Explorer and legacy Edge are not supported.

## 3. Composition model

### Page, Section, and the workspace

`Page` owns measure, centering, and the vertical rhythm between sections. `Section` owns a titled region: heading, description, actions, and the compact rhythm to its content.

```svelte
{#snippet pageHeader()}
  <PageHeader
    title="Overview"
    description="What changed, what needs attention, and who owns the next step."
    actions={headerActions}
  />
{/snippet}

<Page width="content" gap="2xl" header={pageHeader}>
  <Section
    id="recent-projects"
    title="Recent projects"
    description="Ownership and status for work in flight."
    actions={viewAll}
  >
    <Table columns={columns} labelledBy="recent-projects">…</Table>
  </Section>
</Page>
```

- `Page.width`: `content` (default), `reading`, `form`, `full`.
- `Page.gap`: `2xl` by default.
- `Section.level`: semantic heading level, default `2`. `Section` generates a stable heading id unless `id` is supplied.
- A `Section` without a title invents no accessible name. Pass `aria-label` only when the region needs one.
- When a table already uses the section heading id through `labelledBy`, pass `labelledBy={false}` to the section so the two landmarks do not share one name.

### Padding ownership

`AppShell` owns outer content padding by default (`padding="xl"`, collapsing to `--space-lg` below 800px). A `Container` also owns inline padding. Nesting both with defaults produces double padding, so choose one owner:

```svelte
<!-- AppShell pads; Container is only a measure. -->
<AppShell>
  <Container padding="none" width="content">…</Container>
</AppShell>

<!-- Container pads; the shell adds nothing. -->
<AppShell padding="none">
  <Container padding="xl" width="content">…</Container>
</AppShell>
```

`Page` is never a padding owner. It contributes measure, centering, rhythm, and the optional header composition, so it can sit inside either owner without adding a second layer.

### Text, Code, and List

`Text` is the only typography primitive. `variant` is visual; `as` is semantic. Choose both explicitly, and choose heading levels for document order rather than size.

```svelte
<Text variant="display" as="h1">Projects</Text>
<Text variant="subheading" as="h2">Recent activity</Text>
<Text variant="body" tone="secondary">
  Every project has a named owner and a visible next step.
</Text>
<Text variant="label" as="span" tone="secondary">Active projects</Text>
<Text variant="caption" as="time" datetime="2026-10-31">31 October 2026</Text>
```

- Variants: `display`, `heading`, `subheading`, `body`, `body-sm`, `label`, `caption`.
- Tones: `primary`, `secondary`, `muted`, `inherit`, `info`, `progress`, `success`, `warning`, `danger`, `disabled`.
- `Text` never renders an anchor or a button, and it has no margins. Use `Link` for navigation, `Button` for actions, and a layout primitive for spacing.
- Use `Code` for inline code, file paths, identifiers, and code blocks. Do not switch ordinary UI labels to monospace.
- Use `List` for `ul`, `ol`, and `dl`; items are `Text as="li"`, and description terms and values are `Text as="dt"` and `Text as="dd"`. There is no separate list-item component.

### Tables

`Table` renders the scroll region, column headers, and body. Body rows and cells use `TableRow` and `TableCell` so each cell inherits its column's `align` and `numeric` metadata.

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

- `colspan` advances the inherited column position; a cell's own `align` or `numeric` prop overrides the column.
- Raw `<tr>`/`<td>` still work for one-off markup, but they do not inherit column metadata and do not advance the position.
- Name the scroll region with `labelledBy` (usually the section heading) or `caption`. There is no generic “Table” fallback; the wrapper becomes a region only when one of those supplies a real name.
- `isEmpty` plus the `empty` snippet renders one full-width row. Put `EmptyState` with exactly one action inside it.
- Table never renders a section title or heading. Keep a real `<caption>` when the table needs its own name.

### Form field anatomy

`Input`, `Select`, `Combobox`, `PinInput`, and the date/time controls share one contract: `label`, `description`, `error`, `required`, `disabled`, `id`, and `class`. `Field` renders that anatomy for a control that needs an external label; `createFieldState` derives the ids for a control that renders its own.

```svelte
<Input
  label="Project name"
  description="Use a short name that stays readable in navigation."
  required
/>

<Field label="Project name" error="Enter a project name.">
  {#snippet children(state)}
    <input
      id={state.id}
      aria-describedby={state.describedBy}
      aria-invalid={state.invalid ? 'true' : undefined}
    />
  {/snippet}
</Field>
```

- One visible label per control. The label points at the control with `for`; a button or menu trigger is named with `aria-labelledby` instead.
- `description` and `error` produce stable ids. The control receives both through `aria-describedby`; an error also sets `aria-invalid` and renders with `role="alert"`.
- `required` renders a hidden “required” marker and is exposed on the control.
- `Checkbox` and `Switch` keep their label inline and clickable but use the same description, error, required, disabled, and id contract.
- Date and time fields keep their Bits UI label part for segment association and use `Field` only for the shared message and id layer.
- A placeholder is never a label.

### Icons

Carbon is the only icon family. Icons are bundled at build time with `unplugin-icons`; never fetch them at runtime or mix another set.

```svelte
<script lang="ts">
  import Add from '~icons/carbon/add';
  import { Icon } from '@t128n/ui';
</script>

<Icon icon={Add} />
<Icon icon={Add} size={20} />
<Icon icon={Add} label="Add project" />
```

`Icon` accepts `16` (default), `20`, `24`, or `32`. Decorative icons are hidden from assistive technology by default; pass `label` only when the icon itself carries meaning. An icon-only control still needs a name from visible text, `VisuallyHidden`, or a labelled `Icon`, plus a 44px touch target.

### Empty states and hidden text

`EmptyState` is the supported empty-region pattern: a heading, one sentence, and one required action. The `action` snippet is not optional, which keeps R44 enforceable. Pass `level` to keep heading order correct when the state is nested in a section.

`VisuallyHidden` keeps text in the accessibility tree while clipping it visually. Use it for icon-only control names and the `AppShell` skip link; do not pair hidden text with a duplicate `aria-label`. A `focusable` instance reveals itself on keyboard focus.

## 4. Theming

`ThemeScope` is the supported theming seam. It renders `data-theme` and applies validated custom-property overrides inline; nested scopes inherit the outer values and override only the tokens they name.

```svelte
<ThemeScope tokens={{ '--color-accent': '#6929C4' }}>
  <Button>Primary action</Button>

  <ThemeScope tokens={{ '--color-surface': '#F6F2FF' }}>
    <Card title="Nested scope">…</Card>
  </ThemeScope>
</ThemeScope>
```

- `data-theme` is the theme hook. Consumers and tests can target `[data-theme]` instead of inferring a theme from colors.
- This branch accepts `theme="light"` only. `ThemeScope` rejects token keys that do not start with `--`, so plain `color` or `background` overrides cannot bypass the semantic contract.
- `prefers-color-scheme` is not read by the framework yet. Automatic light/dark switching requires a designed and contrast-validated dark token set; do not add dark values or a system-preference media query ahead of it.
- Public tokens are safe to override: color roles, typography, spacing, layout measures, radius, control geometry, and breakpoints. Internal tokens such as border widths, the overlay shadow, pill radius, and transition duration are implementation details.
- See [`docs/theming.md`](../../docs/theming.md) for the token contract, the public/internal split, nested overrides, and the breakpoint synchronization rule.

## 5. Responsive model

Breakpoints live as tokens in `styles/tokens.css` and as a typed constant in `src/lib/layout.ts`.

| Breakpoint | Width | Primary users |
| --- | --- | --- |
| `sm` | 640px | `Grid.collapseAt` default, `Inline.stackAt`, `Container.paddingAt` default |
| `md` | 800px | `AppShell`/`Sidebar` drawer switch, common `Grid.collapseAt` and `Inline.stackAt` choice |
| `lg` | 1024px | `Container.paddingAt`, wider layout collapse |

```svelte
<!-- Two columns collapse below 800px, then into one column. -->
<Grid columns={2} collapseAt="md" collapseColumns={1} gap="lg">…</Grid>

<!-- Stack action rows below 640px. -->
<Inline stackAt="sm" gap="sm">…</Inline>

<!-- Collapse large inline padding below 1024px. -->
<Container width="content" padding="2xl" paddingAt="lg">…</Container>
```

- `Grid.collapseAt` defaults to `sm`; `collapseColumns` defaults to `1`. Use `collapseAt="never"` to keep the configured columns at every width.
- `Inline.stackAt` defaults to `never`; below the chosen breakpoint it becomes a vertical column.
- `Container.paddingAt` defaults to `sm`. `xl`, `2xl`, and `3xl` inline padding collapse to `--space-lg` below the chosen breakpoint.
- `AppShell` and `Sidebar` share the `md` 800px switch: the sidebar column becomes a drawer and the shell stacks to one column.
- Media queries cannot consume custom properties. Components repeat the literal pixel values with a comment naming the token; keep tokens, `breakpoints`, and media queries in sync. Do not add unnamed breakpoints.

## 6. Accessibility

- **Labels.** Every control has one visible label. `Input`, `Select`, `Combobox`, `PinInput`, and date/time fields render it; `Label` is for a control you compose yourself. A placeholder never substitutes for a label.
- **Descriptions and errors.** Descriptions and errors produce stable ids and reach the control through `aria-describedby`. An error also sets `aria-invalid` and uses `role="alert"`. The message names the field and the fix.
- **Required state.** `required` exposes the native attribute or `aria-required` and adds hidden “required” text to the visible marker.
- **Focus.** The stylesheet provides a shared `:focus-visible` ring. Do not remove an outline without a visible `:focus-visible` replacement. Overlays trap focus, close on Escape, and return focus to the trigger; `AppShell` makes its main region programmatically focusable for the skip link.
- **Landmarks and skip links.** `AppShell` renders a skip link to `#main-content`, and `main` is focusable. Use one main region per page. `Section` renders a labelled region when it has a title; do not give a section and a nested table region the same accessible name.
- **Icons.** Decorative icons are `aria-hidden`. Labelled icons expose `role="img"` and a name. Icon-only controls need a name and a 44px touch target, and icons never replace visible navigation labels on desktop.
- **Tables.** Name the scroll region with `labelledBy` or `caption`. Use `TableRow` and `TableCell` for body rows so column metadata is inherited. Do not rely on color alone for status; keep badges as text plus a tone.
- **Motion.** The stylesheet reduces animations and transitions under `prefers-reduced-motion: reduce`. Do not add entrance animations, infinite motion, or scroll hijacking.
- **Status.** Feedback is inline and persistent: field errors under the field, region status in an `Alert` in that region, page status in one page-level `Alert`. There are no toasts.

## 7. Testing and checks

Run all commands from the repository root. The repository is Bun-native: `bun.lock` is the only lockfile and `packageManager` pins Bun. Do not use pnpm or npm.

```sh
bun install --frozen-lockfile
bun run test
bun run test:storybook
cd packages/ui && bun run check
cd packages/ui && bun run build
bun run build-storybook
```

- `bun run test` runs the unit suite in jsdom, including the framework/design/accessibility audits, the CSS scoping audit, contrast checks, component behavior tests, and the R48 coverage test. The shared registry in `packages/ui/tests/audit-rules.ts` centralizes rule ids, allowlists with reasons, and actionable `[rule-id] path:line` failures; synthetic rule tests prove each check can fail.
- `bun run test:storybook` renders every story in Chromium and runs axe accessibility checks.
- `bun run check` runs `svelte-check`. CI uses the warning-failing form: `bunx svelte-check --tsconfig ./tsconfig.json --fail-on-warnings`.
- `bun run build` builds the library; `bun run build-storybook` builds the static Storybook.
- `bun run verify` validates the built package, declared entrypoints, stylesheet/font markers, tarball contents, tree-shaking, and a strict consumer install.

A change is not complete until the unit suite, Storybook tests, warning-free type check, library build, and Storybook build all pass.

## 8. Migration guide

Replace raw markup with the framework vocabulary. The audit in `packages/ui/tests/framework-audit.test.ts` rejects raw prose and list markup in components and stories.

| Legacy pattern | Framework replacement |
| --- | --- |
| `<p>`, `<h1>`–`<h6>` | `Text as="p"` and `Text as="h1"`–`as="h6"`, with an explicit `variant` |
| `<ul>`, `<ol>`, `<li>` | `List` plus `Text as="li"` |
| `<dl>`, `<dt>`, `<dd>` | `List as="dl"` plus `Text as="dt"` and `Text as="dd"` |
| `<table>`, `<tr>`, `<td>`, `<th>` | `Table` plus `TableRow` and `TableCell`; `Table` renders headers |
| Page and section wrapper `<div>`s with local rhythm | `Page`, `Section`, `Stack`, `Inline`, `Grid`, `Container` |
| Inline `font-size`, `color`, margins, or padding | A `Text` variant/tone and a layout primitive with token spacing |
| Local `outline` overrides | The shared `:focus-visible` ring, or a token-based replacement |
| Raw icon SVG or a second icon library | `Icon` with a `~icons/carbon/*` import |

### Paragraphs and headings

```svelte
<!-- Before -->
<section>
  <h2>Recent projects</h2>
  <p>Ownership and status for work in flight.</p>
</section>

<!-- After -->
<Section title="Recent projects" description="Ownership and status for work in flight.">
  …
</Section>
```

### Lists

```svelte
<!-- Before -->
<ul>
  <li>Invite the project owners.</li>
  <li>Connect a repository.</li>
</ul>

<!-- After -->
<List gap="sm">
  <Text as="li" variant="body" tone="secondary">Invite the project owners.</Text>
  <Text as="li" variant="body" tone="secondary">Connect a repository.</Text>
</List>
```

### Tables

```svelte
<!-- Before -->
<table>
  <thead><tr><th>Project</th><th>Owner</th></tr></thead>
  <tbody><tr><td>Orbit</td><td>Mara Chen</td></tr></tbody>
</table>

<!-- After -->
<Table columns={[{ label: 'Project' }, { label: 'Owner' }]} labelledBy="projects-heading">
  <TableRow>
    <TableCell>Orbit</TableCell>
    <TableCell>Mara Chen</TableCell>
  </TableRow>
</Table>
```

### Page wrappers

```svelte
<!-- Before -->
<div class="page"><div class="section">…</div></div>

<!-- After -->
<AppShell>
  <Page header={pageHeader}>
    <Section title="…">…</Section>
  </Page>
</AppShell>
```

## 9. Governance

### Versioning and releases

- The framework is internal-only and versioned in the `0.x` line while its APIs stabilize.
- While `0.x`, a minor release may contain a breaking change. Every breaking change needs a changelog entry and a migration note; patch releases are reserved for compatible fixes and documentation.
- `CHANGELOG.md` is the release record. Update the `Unreleased` section in the same pull request as the change.
- `CONTRIBUTING.md` defines the review checklist, including the R48 rule and the CSS scoping contract.
- Publishing to a registry is out of scope until an explicit license decision is made. Keep the package private and do not add a license that the project has not chosen.

### CSS scoping

Components own their internals. Consumers compose components and style them through documented props and the `class` passthrough; they must not depend on internal class names.

- Native elements a component declares stay component-scoped. Prefer a plain scoped selector over `:global(...)`.
- Classes passed to a Bits UI (or another child component) root cannot receive the parent scope hash. Those hooks stay global and are namespaced with `t128n-<component>-<part>` or a documented component-family prefix.
- Selectors for consumer-provided content stay global but must be anchored by a component-scoped class. Third-party state attributes are allowed inside those hooks.
- New globals require an allowlist entry and a reason. The audit in `packages/ui/tests/global-scoping.test.ts` reports the file, line, selector, and the entry it needs.

The Storybook taxonomy — how component, primitive, layout, feedback, and view stories are grouped — is documented in [`docs/storybook.md`](../../docs/storybook.md).

## 10. R48 coverage

R48 requires three things for every public component, together:

1. **A story** under `packages/ui/src/stories/`.
2. **A real screen using it** — Dashboard, Settings, Landing, Personal, AppShell, PageHeader, Table, or another composed screen — or a documented exception.
3. **A “not for” note** that states the boundary.

[`docs/component-coverage.md`](../../docs/component-coverage.md) is the coverage table. It lists every default export with its story, composed-screen use or exception, and a link to the component's not-for note in [`docs/components.md`](../../docs/components.md).

[`packages/ui/tests/r48-coverage.test.ts`](tests/r48-coverage.test.ts) parses `src/index.ts` and the coverage table. It fails when an exported component has no row, when a row has neither a composed-screen reference nor an explicit documented exception, or when the not-for note is missing.
