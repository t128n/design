<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

# AGENTS.md

Operating contract for agents and tooling working in this repository.

The Storybook site is the primary source of human documentation and content.
This file carries only what has to be readable without Storybook: the repository
map, the commands, the rules that must not be broken, and the reference data that
tests parse.

- Public docs: https://t128n.github.io/design/
- Package: [`@t128n/ui`](https://www.npmjs.com/package/@t128n/ui), published to npm with OIDC trusted publishing
- Human entry points: [`README.md`](README.md) (npm landing), [`CONTRIBUTING.md`](CONTRIBUTING.md)

## What this repository is

A Svelte 5 design framework: semantic CSS tokens feed a small typography and
layout vocabulary, and the components consume only those tokens. It is built,
documented, and released from this repository; the package ships from
`packages/ui` to npm.

## Layout

```text
packages/ui/src/           components, tokens, layouts, stories
packages/ui/docs/*.mdx     Storybook documentation pages (primary docs)
packages/ui/tests/         unit, audit, a11y, coverage, delivery tests
packages/ui/scripts/       build, package verification, icon export
packages/ui/fixtures/      strict consumer fixtures
.storybook/                Storybook config, theme, sidebar order
plans/                     dated internal planning notes, not documentation
LICENSES/MIT.txt           license text referenced by the SPDX headers
REUSE.toml                 REUSE annotations for generated, headerless files
AGENTS.md                  this file: rules, commands, reference tables
```

## Commands

Run from the repository root. The repository is Bun-native: `bun.lock` is the
only lockfile and `packageManager` pins Bun. Do not add a pnpm or npm lockfile.

```sh
bun install --frozen-lockfile
bun run test                 # unit, audit, a11y, R48 coverage
bun run test:storybook       # every story in Chromium + axe
bun run build                # library build into packages/ui/dist
bun run verify               # package contents, tree-shaking, consumer fixture
bun run license:lint         # REUSE 3.3 compliance, needs `reuse` on PATH
bun run build-storybook      # static Storybook, including the docs pages
cd packages/ui && bun run check
cd packages/ui && bunx svelte-check --tsconfig ./tsconfig.json --fail-on-warnings
bun run changeset            # add a release note for a user-visible change
```

`bun run license:lint` needs the [`reuse`](https://reuse.software) tool, version
6 or newer (`brew install reuse`, `pipx install reuse`, or
`uvx --from reuse reuse`). CI runs the same check through
`fsfe/reuse-action@v6`, so a local install is optional.

A change is complete only when the unit suite, Storybook tests, warning-free
type check, library build, Storybook build, and REUSE lint pass.

## Non-negotiables

- **Semantic tokens only.** Components consume `--color-*`, `--space-*`,
  `--font-*`, and `--layout-*` tokens. No local colors, font sizes, spacing
  values, or theme-specific branches.
- **R48.** Every public component has a story, a real composed-screen use or a
  written exception, and a not-for note. See the coverage table below.
- **CSS scoping.** Components own their internals. Bits UI root hooks are
  global and namespaced `t128n-<component>-<part>`. New bare globals need an
  allowlist entry and a reason.
- **Accessibility.** One visible label per control, stable ids for description
  and error, focus-visible ring, 44px icon-only targets, no color-only status.
- **Docs are MDX.** Documentation lives in `packages/ui/docs/*.mdx`. Do not add
  `docs/*.md` pages; this file is the only markdown outside the package,
  plans, and the `README`/`CONTRIBUTING` entry points.
- **Release integrity.** Publishing uses npm OIDC trusted publishing. No npm
  token, `NODE_AUTH_TOKEN`, or `registry-url` may enter the workflow;
  `id-token: write` stays scoped to the publish job, and the publish job only
  ships the tarball built and verified by the pack job.
- **Changelog is generated.** Run `bun run changeset`; never hand-edit
  `packages/ui/CHANGELOG.md`.
- **License headers.** Every tracked file declares its copyright and MIT license
  in an SPDX header, and `LICENSES/MIT.txt` carries the text. Files that cannot
  hold a header or are generated are listed in `REUSE.toml` instead. Add a header
  to a new file with `reuse annotate --copyright t128n --license MIT <path>`;
  `bun run license:lint` and the CI License job fail closed on a missing one.

## Documentation authoring

Storybook pages live in `packages/ui/docs` and are discovered by the
`.storybook/main.ts` glob.

| Storybook title | File |
| --- | --- |
| Foundations/Manual | `packages/ui/docs/manual.mdx` |
| Foundations/Design language | `packages/ui/docs/design-language.mdx` |
| Foundations/Theming reference | `packages/ui/docs/theming.mdx` |
| Foundations/Components reference | `packages/ui/docs/components.mdx` |
| Foundations/Contributing | `packages/ui/docs/contributing.mdx` |

- Each page starts with a `{/* ... */}` license comment, then
  `import { Meta } from '@storybook/addon-docs/blocks';` and
  `<Meta title="..." />`; the source `# H1` is omitted. MDX rejects HTML
  comments, so the page header uses the JSX comment form.
- MDX treats `{` and `<` as expressions and JSX. Escape them in prose
  (`\{`, `\}`, `&lt;`); fenced and inline code are safe.
- Cross-page links use Storybook routes: `?path=/docs/<title-slug>--docs`.
- Add the sidebar position to `.storybook/preview.ts` (`options.storySort`) when
  a page is added.
- The npm package's `README.md` stays a short install and quickstart page; the
  full manual is the Storybook page.


## Storybook information architecture

The Storybook sidebar is organised by the role a component plays in an
interface, not by the file that happens to contain it. The five top-level
groups are fixed, and the order is set by `options.storySort` in
`.storybook/preview.ts`.

## Sidebar taxonomy

```
Foundations
  Overview
  Manual
  Design language
  Theming
  Theming reference
  Components reference
  Contributing

Primitives
  Text, Code, List, Icon, Visually hidden, Avatar, Badge, Separator,
  AspectRatio, ScrollArea

Layouts
  Stack, Inline, Grid, Container, Card, App shell, Page header, Hero,
  Footer, Navbar, Sidebar

Components
  Controls
    Button, Link, Toggle, ToggleGroup, Toolbar, Pagination
  Forms
    Input, Label, Field, Select, Combobox, Checkbox, Switch, RadioGroup,
    Slider, PinInput, RatingGroup, DateField, DatePicker, DateRangeField,
    DateRangePicker, TimeField, TimeRangeField, Calendar, RangeCalendar
  Data
    Table
  Feedback
    Alert, Progress, Meter, EmptyState
  Overlays
    Dialog, AlertDialog, Popover, Tooltip, DropdownMenu, ContextMenu,
    Menubar, Command, LinkPreview
  Navigation
    Breadcrumbs, Tabs, Accordion, Collapsible, NavigationMenu

Views
  Dashboard, Settings, Landing, Personal
```

`Calendar`, `RangeCalendar`, and `LinkPreview` are supporting components rather
than headline entries in the original tree. They follow the same task-area rule
as everything else: the calendars are form controls, and the link preview is an
overlay.

## Classification rules

- **Foundations** is documentation only: tokens, type specimens, theming, and
  design rules. It is not a component category and contains no interactive API.
- **Primitives** are low-level, non-compositional building blocks: typography,
  icons, badges, separators, media, and accessibility utilities. A primitive
  does not own a page region and does not compose other components into a
  workflow.
- **Layouts** own structure, rhythm, surfaces, and page regions. `Card`,
  `AppShell`, `Navbar`, and `Sidebar` belong here because they are structural,
  even though some of them expose navigation slots.
- **Components** are interactive or composed UI. The subgroup names the user
  task:
  - **Controls** trigger an action or change a view state.
  - **Forms** collect and validate input, including date and time values.
  - **Data** presents structured records.
  - **Feedback** reports status, progress, measurement, or emptiness.
  - **Overlays** place a temporary layer above the page.
  - **Navigation** moves between pages, views, or disclosure regions.
- **Views** are composed screens. A view may use layouts, components, and
  primitives, but it must not become the home of a reusable primitive.

## Where a new component belongs

1. Does it only document tokens or rules? Put it under **Foundations**.
2. Is it a non-interactive building block with no page structure? Put it under
   **Primitives**.
3. Does it own spacing, width, surface, or a page region, even if it is not
   interactive? Put it under **Layouts**.
4. Does it collect input? Put it under **Components/Forms**.
5. Does it trigger an action or toggle a view state? Put it under
   **Components/Controls**.
6. Does it present records or a dataset? Put it under **Components/Data**.
7. Does it report state, progress, or emptiness? Put it under
   **Components/Feedback**.
8. Does it float above the page and dismiss? Put it under
   **Components/Overlays**.
9. Does it move between destinations or disclosure regions? Put it under
   **Components/Navigation**.
10. Is it a complete screen assembled from the layers above? Put it under
    **Views**.

If a component fits two groups, choose the group that describes what the reader
does with it. A date picker is a form control even though it opens an overlay; a
sidebar is a layout even though it contains navigation.

## Design intent and voice

Agents building UI must read the package instructions in
[`packages/ui/AGENTS.md`](packages/ui/AGENTS.md) and the source
[`packages/ui/docs/design-language.mdx`](packages/ui/docs/design-language.mdx).
Both ship with the npm package for downstream agents.

Storybook is the worked example of the design language, not a catalogue of
everything the components can do. Read **Design intent**, **Identity and
differentiation**, and **Voice and tone** in the
[`Design language`](?path=/docs/foundations-design-language--docs) page before
adding a story.

- A component description states its purpose, its boundary, and the intent
  constraint it protects: content leads, one primary action, feedback in place,
  a continuous workspace, or text plus one role for status.
- A composed view names the surface it uses (`workspace` or `reading`) and the
  signature patterns it demonstrates. At least two patterns are required.
- Story copy follows the voice rules: sentence case, verb-first actions, and the
  object, cause, and fix. It never uses “Oops”, “Uh oh”, “Something went wrong”,
  “Invalid input”, or “Successfully”.
- A story that contradicts a refusal is a bug. Fix the story or record a dated
  exception in the design language page; do not quietly invent a variant in
  Storybook.

## Story metadata requirements

Every `defineMeta` call must include:

```ts
tags: ['autodocs'],
parameters: {
  docs: {
    description: {
      component: 'Purpose, what it is not for, and one composition or variant rule.'
    }
  }
}
```

The component description is the single place for do/don't guidance. Controls,
tables, forms, and navigation components must state both a "Do" rule and a
"Do not" rule. Table guidance must cover `TableRow`/`TableCell`, the empty
state, numeric alignment, and the density limit.

The description must also name the intent constraint the component protects.
Composed views add `Signature patterns:` and name the surface. A description is
not a restatement of the props table; it explains when the component is the
right choice and when it is not.

## Enforcement

Three unit tests keep the contract honest:

- `packages/ui/tests/story-taxonomy.test.ts` parses every story title, rejects
  an unapproved top-level group, and checks the exact target for every
  classified story file. A new story file must be added to its registry.
- `packages/ui/tests/story-docs.test.ts` requires autodocs, a component
  description, explicit do/don't guidance for the key controls, table, forms,
  and navigation stories, a voice-safe description, and the surface plus
  signature patterns for every composed view.
- `packages/ui/tests/design-intent.test.ts` keeps the intent, precedence,
  differentiation, and voice sections in the design language page, and checks
  that the Storybook guidance and Foundations story document the same contract.

Run `bun run test` after changing a title or description, and
`bun run test:storybook` to confirm the stories still render.

## R48 component coverage

R48 requires a story, a real screen using the component, and a note on what it is not for. This table tracks all three for every component exported from `packages/ui/src/index.ts`.

- **Story** is the Storybook title that exercises the component. Components without a dedicated story are covered by the composed story that renders them.
- **Composed-screen use** names a real screen or layout that uses the component. An **Exception** is explicit: the component is public, has a story and a not-for note, but no composed screen uses it yet. The reason is part of the exception.
- **“Not for”** links to the boundary in [`Components reference`](?path=/docs/foundations-components-reference--docs).

`packages/ui/tests/r48-coverage.test.ts` parses this table and fails when an export is missing, when an entry has neither a composed-screen reference nor an explicit exception, or when the not-for link is missing.

## Coverage table

| Component | Story | Composed-screen use | “Not for” |
| --- | --- | --- | --- |
| `Accordion` | `Components/Accordion` | Exception — no composed screen uses a multi-section disclosure yet; the isolated Accordion story is the only exercise. | [Note](components.md#accordion) |
| `Alert` | `Components/Alert` | `Views/Dashboard` (page-level warning that needs an owner). | [Note](components.md#alert) |
| `AlertDialog` | `Components/AlertDialog` | Exception — destructive confirmation exists only as the isolated AlertDialog story. | [Note](components.md#alertdialog) |
| `AppMark` | `Primitives/AppMark` | Exception — identity tiles are exercised by the AppMark reference sheet; no composed application screen uses them yet. | [Note](components.md#appmark) |
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
