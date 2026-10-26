# t128n Design System

Canonical design tokens, generated CSS, and tooling for t128n web apps.

## Purpose

[DESIGN.md](DESIGN.md) is the single normative source for tokens and design
guidance. Everything else in this repository is derived from it or describes
how to consume it:

- `DESIGN.md` — palette, typography, spacing, shapes, components, and rules.
- [dist/tokens.css](dist/tokens.css) — generated light/dark CSS variables.
- [specimen.html](specimen.html) — visual acceptance page for the tokens.

Values live in one place.

## Repository layout

```
DESIGN.md                    Normative tokens and guidance
scripts/build.mjs            Front-matter parser and CSS renderer
dist/tokens.css              Generated CSS (committed, never hand-edited)
specimen.html                Visual acceptance page
README.md                    This document
CHANGELOG.md                 Version history
package.json                 Scripts and pinned toolchain
bun.lock                     Locked dependency graph
.github/workflows/design.yml CI gate (push and pull request)
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
stylesheets. Change `DESIGN.md`, run `bun run build`, and commit the
regenerated artifact.

## Preview

The specimen deploys to [t128n.github.io/design](https://t128n.github.io/design/)
on every push to `main`. The Pages site is public and contains only
`specimen.html` and `dist/tokens.css`.

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
2. Pin a commit of this repository and vendor
   [dist/tokens.css](dist/tokens.css) into your app.
3. Link `dist/tokens.css` from every page.
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
