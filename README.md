# t128n Design System

Canonical design tokens, generated CSS, and tooling for t128n web apps.

## Purpose

[DESIGN.md](DESIGN.md) is the single normative source for tokens and design
guidance. Everything else in this repository is derived from it or describes
how to consume it:

- `DESIGN.md` — palette, typography, spacing, shapes, components, and rules.
- [dist/tokens.css](dist/tokens.css) — generated light/dark CSS variables.
- [layouts.css](layouts.css) — standard CSS grid page skeletons.
- [preview](preview/) — Vite + Svelte + bits-ui visual acceptance app.

Values live in one place.

## Repository layout

```
DESIGN.md                    Normative tokens and guidance
scripts/build.mjs            Front-matter parser and CSS renderer
dist/tokens.css              Generated CSS (committed, never hand-edited)
layouts.css                  Standard CSS grid page skeletons
preview/                     Vite + Svelte 5 + bits-ui preview app
README.md                    This document
CHANGELOG.md                 Version history
package.json                 Scripts and pinned toolchain
bun.lock                     Locked dependency graph
.github/workflows/design.yml CI gate (push and pull request)
.github/workflows/pages.yml  Preview deployment
tests/*.test.mjs             Focused Bun tests
```

## Quick start

Requires Bun `>=1.4.0`.

```sh
bun install
bun test
bun run check
```

- `bun install` installs the exact toolchain from `bun.lock`.
- `bun test` runs the test suites.
- `bun run check` runs the build and fails if `dist/` is dirty.

Build the artifact yourself, or lint the source directly:

```sh
bun run build
bun run lint
```

`bun run build` runs `bun run lint`, then
`bun scripts/build.mjs`. `bun run check` is the same as `bun run build`
followed by `git diff --exit-code -- dist`.

Preview the app locally with Vite:

```sh
bun run preview:dev
bun run preview:build
```

## Using the tokens

Link the generated stylesheet and the standard layouts, then use the CSS
variables they define:

```html
<link rel="stylesheet" href="dist/tokens.css">
<link rel="stylesheet" href="layouts.css">
```

The generated CSS variables are:

- `--color-<name>` for light colors, e.g. `var(--color-primary)` or
  `var(--color-surface)`.
- `--font-<type>` and `--text-<type>-size|weight|line-height|letter-spacing|font-feature`.
- `--space-<name>` for spacing, including `--space-touch` (44px) for touch
  targets.
- `--radius-<name>` for corners.

`:root` carries the light values and `color-scheme: light`. There are no
`--color-dark-*` variables to consume: dark tokens are mapped onto the same
`--color-*` names inside the dark selectors, so components never branch on
theme.

Do not edit `dist/tokens.css` by hand and do not copy values into app
stylesheets. Change `DESIGN.md`, run `bun run build`, and commit the
regenerated artifact.

## Layouts

`layouts.css` provides the shared page skeletons. They are mobile-first: the
phone composition is the base, and `min-width` upgrades add columns and
restore desktop density:

```html
<div class="t128n-app-shell">
  <header class="t128n-app-shell__header">…</header>
  <nav class="t128n-app-shell__nav">…</nav>
  <main class="t128n-app-shell__main t128n-register">
    <header class="t128n-register__header">…</header>
    <div class="t128n-register__toolbar">…</div>
    <div class="t128n-register__body">…</div>
  </main>
</div>
```

Available: `t128n-page`, `t128n-grid` with `t128n-grid--1/2/3` and
`t128n-grid__full`, `t128n-app-shell`, `t128n-register`, `t128n-split`,
`t128n-record`, `t128n-form-grid`, `t128n-stack`, `t128n-cluster`,
`t128n-table-scroll`, and `t128n-table-scroll--pin-first`.
See `DESIGN.md` for the grid definitions.

Equal-column example:

```html
<div class="t128n-grid t128n-grid--3">
  <section>…</section>
  <section>…</section>
  <section>…</section>
</div>
```

Override `--t128n-columns` or `--t128n-gap` on the grid element for a one-off
composition. Equal-column grids start at one column: three-column grids become
two at `640px` and three at `1024px`; two-column grids split at `800px`.

Bare skeletons for every layout live in
[preview/pages/](preview/pages/) and are deployed at
[t128n.github.io/design/pages/](https://t128n.github.io/design/pages/).

### Mobile

Phones are the base viewport, not a fallback. The stylesheets are mobile-first:
import both as above and compose the single-column layout first. The
breakpoints are `min-width` values at `640px`, `800px`, and `1024px`, and no
component relies on a desktop-first `max-width` override.

- Page gutters are `--space-xl` (16px) at the base and `--space-3xl` (32px)
  from `800px`, using `max()` with `env(safe-area-inset-left)` and
  `env(safe-area-inset-right)` so content clears notches and rounded corners.
- Interactive targets — buttons, inputs, icon buttons, row actions, and
  navigation links — are at least `--space-touch` (44px) tall on phones.
  Desktop `28px` control geometry returns at `800px`.
- App shells use `100dvh` with a `100vh` fallback so mobile browser chrome
  cannot clip content.
- Record tables stay tables. Wrap them in `t128n-table-scroll` with an
  explicit minimum width, and add `t128n-table-scroll--pin-first` to keep the
  identifier column visible while the rest scrolls horizontally below
  `800px`. Never replace a record table with a card grid.

Run the preview on a phone-sized viewport to check gutters, touch targets, and
table scrolling before shipping a layout change.

## Preview

The preview is a Vite + Svelte 5 app using bits-ui primitives and Octicons
over the generated tokens. It deploys to
[t128n.github.io/design](https://t128n.github.io/design/) on every push to
`main`. The Pages site is public.

## Dark mode

Set `data-theme` on the root element to pick a theme explicitly:

```html
<html data-theme="dark">
```

`document.documentElement.dataset.theme = 'dark'` (or `'light'`) switches it at
runtime. `[data-theme="dark"]` redefines every base `--color-*` variable with
its dark counterpart and sets `color-scheme: dark`.

When no `data-theme` is set, the `@media (prefers-color-scheme: dark)` block
applies the same overrides to `:root:not([data-theme])` as a fallback, so the
page follows the operating system. An explicit `data-theme` always wins.

## Adopting in an app

1. Read [DESIGN.md](DESIGN.md) and the [preview](preview/).
2. Pin a commit of this repository and vendor
   [dist/tokens.css](dist/tokens.css) and [layouts.css](layouts.css) into your app.
3. Link both stylesheets from every page.
4. Map the app's state vocabulary onto the seven semantic roles.
5. Re-vendor the CSS when you bump the pinned commit.

## Versioning

The design system's version is `package.json` (`0.1.0` at present). The
`version: alpha` value in `DESIGN.md` is the format version of the DESIGN.md
spec, not the system version. History lives in [CHANGELOG.md](CHANGELOG.md).

## Enforcement

CI (`.github/workflows/design.yml`) runs on push and pull request on Bun 1.4:
`bun install --frozen-lockfile`, `bun test`, then `bun run check`. Because
`bun run check` rebuilds and asserts `git diff --exit-code -- dist`, a change to
`DESIGN.md` that was not followed by `bun run build` fails the build.
`bun run lint` must report `0 errors` and `0 warnings`.

## Contributing

1. Change `DESIGN.md` only. Do not hand-edit `dist/tokens.css`.
2. Run `bun run build`, then `bun test` and `bun run check`.
3. Commit the source change and the regenerated `dist/tokens.css` together.
