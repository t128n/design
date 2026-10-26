# t128n Design System

Canonical design tokens, generated CSS, and adoption tooling for every t128n
web app. Plain CSS only: no component library, no Tailwind preset, no npm
publish.

## Purpose

[DESIGN.md](DESIGN.md) is the single normative source for tokens and design
guidance. Everything else in this repository is derived from it or describes
how to consume it:

- `DESIGN.md` — palette, typography, spacing, shapes, components, and rules.
- [dist/tokens.css](dist/tokens.css) — generated light/dark CSS variables.
- [app-profile.template.md](app-profile.template.md) — the one-page record
  each app fills in when it adopts the system.
- [specimen.html](specimen.html) — visual acceptance page for the tokens.

Values live in one place. Apps consume them; they do not fork them.

## Repository layout

```
DESIGN.md                    Normative tokens and guidance
scripts/build.mjs            Front-matter parser and CSS renderer
dist/tokens.css              Generated CSS (committed, never hand-edited)
app-profile.template.md      Application Profile template
specimen.html                Visual acceptance page
README.md                    This document
CHANGELOG.md                 Version history
package.json                 Scripts and pinned toolchain
.github/workflows/design.yml CI gate (push and pull request)
tests/*.test.mjs             Focused node:test suites
```

## Quick start

Requires Node `>=20`.

```sh
npm ci
npm test
npm run check
```

- `npm ci` installs the exact toolchain from `package-lock.json`.
- `npm test` runs the test suites with `node --test`.
- `npm run check` runs the build and fails if `dist/` is dirty.

Build the artifact yourself, or lint the source directly:

```sh
npm run build
designmd lint DESIGN.md
```

`npm run build` runs `designmd lint DESIGN.md`, then
`node scripts/build.mjs`. `npm run check` is the same as `npm run build`
followed by `git diff --exit-code -- dist`.

## Using the tokens

Link the generated stylesheet and use the CSS variables it defines:

```html
<link rel="stylesheet" href="dist/tokens.css">
```

The generated CSS variables are:

- `--color-<name>` for light colors, e.g. `var(--color-primary)` or
  `var(--color-surface)`.
- `--font-<type>` and `--text-<type>-size|weight|line-height|letter-spacing|font-feature`.
- `--space-<name>` for spacing.
- `--radius-<name>` for corners.

`:root` carries the light values and `color-scheme: light`. There are no
`--color-dark-*` variables to consume: dark tokens are mapped onto the same
`--color-*` names inside the dark selectors, so components never branch on
theme.

Do not edit `dist/tokens.css` by hand and do not copy values into app
stylesheets. Change `DESIGN.md`, run `npm run build`, and commit the
regenerated artifact.

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

1. Read [DESIGN.md](DESIGN.md) and the [specimen](specimen.html).
2. Pin a commit of this repository in your app's dependencies or vendor
   metadata; the system has no release artifact and no npm publish.
3. Vendor [dist/tokens.css](dist/tokens.css) from that commit into your app and
   link it from every page.
4. Record the adoption in an [Application Profile](app-profile.template.md),
   including records, status vocabulary, transitions, mobile table strategy,
   exceptions, and the conformance checklist.
5. Re-vendor the CSS when you bump the pinned commit. Never fork token values
   into the app: exceptions are recorded, not silently hard-coded.

## Versioning

The design system's version is `package.json` (`0.1.0` at present). The
`version: alpha` value in `DESIGN.md` is the format version of the DESIGN.md
spec, not the system version. History lives in [CHANGELOG.md](CHANGELOG.md).

## Enforcement

CI (`.github/workflows/design.yml`) runs on push and pull request on Node 24:
`npm ci`, `npm test`, then `npm run check`. Because `npm run check` rebuilds and
asserts `git diff --exit-code -- dist`, a change to `DESIGN.md` that was not
followed by `npm run build` fails the build. `designmd lint DESIGN.md` must
report `0 errors` and `0 warnings`.

## Contributing

1. Change `DESIGN.md` only. Do not hand-edit `dist/tokens.css`.
2. Run `npm run build`, then `npm test` and `npm run check`.
3. Commit the source change and the regenerated `dist/tokens.css` together.
4. Keep the SPEC in `docs/specs/` and `docs/plans/` in sync with behaviour.
