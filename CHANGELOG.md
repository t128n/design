# Changelog

All notable changes to the t128n design system are recorded here. The format
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- The repository is now one first-class Agent Skill, `t128n-ui`, at the repo
  root, with a build mode and a merged review mode. Install with
  `npx skills add t128n/design` (published) or `npx skills add . --copy`
  (local copy); both install to `~/.agents/skills/t128n-ui/`.
- `references/review.md` and `references/checklist.md` carry the conformance
  audit workflow (eight ordered steps) and its R1–R30 checklist, with
  `scripts/audit-css.mjs` as the static scan helper.
- `spacing.touch` (`--space-touch: 44px`) and a `Mobile and touch` contract in
  `references/DESIGN.md`: mobile-first breakpoints, page gutters, safe-area
  insets, and table scrolling.
- `.t128n-table-scroll` and `.t128n-table-scroll--pin-first` in `assets/layouts.css`
  for record tables that scroll horizontally while the identifier stays
  visible.

### Changed

- The skill moved to an Agent Skill layout: the normative spec now lives at
  `references/DESIGN.md`, generated CSS under `assets/` (`assets/tokens.css`
  and `assets/layouts.css`), and the build procedure at the root `SKILL.md`.
  The previous `skills/` tree and `dist/` output are gone.
- `assets/layouts.css` is mobile-first: the one-column phone composition is the base,
  with `min-width` upgrades at `640px`, `800px`, and `1024px`.
- The preview is mobile-native: 44px controls, 16px page gutters, a
  bottom-sheet dialog, a scrolling layout nav, and stacked form actions, with
  desktop geometry returning at `800px`.
- README documents the single-skill install, the mobile-first composition,
  touch targets, safe-area insets, and `t128n-table-scroll`.

## [0.1.0] - 2026-10-26

### Added

- `DESIGN.md` as the single source of truth: 30 light/dark color pairs, nine
  typography scales, eight spacing tokens, three radii, and 72 component
  tokens.
- `scripts/build.mjs` and the generated, committed `dist/tokens.css` with
  `:root` light values and dark overrides for both `[data-theme="dark"]` and
  the `prefers-color-scheme` fallback.
- `preview/` as the visual acceptance app: Vite, Svelte 5, and bits-ui
  primitives over the generated tokens, in light and dark.
- Octicons from `@primer/octicons` for preview actions.
- Standard CSS grid layouts in `dist/layouts.css` for page frames, app shells,
  registers, split views, record details, forms, stacks, clusters, and
  one/two/three-column grids.
- Bare layout skeletons under `preview/pages/` for each standard grid and
  page template.
- Dark surfaces and text aligned to the JetBrains New UI palette, with
  AA-safe muted text.
- Accessibility pass: 14px body text, 12px labels, 28px controls, 32px
  table headers, brighter dark text, `3:1` table rules, and bordered status
  badges.
- README covering purpose, layout, quick start, token usage, dark mode,
  adoption, versioning, enforcement, and contributing.
- Bun 1.4 toolchain; `Bun.YAML` parses the front matter and `bun test` runs
  the suites.
- GitHub Actions workflow gating push and pull request with
  `bun install --frozen-lockfile`, `bun test`, and `bun run check`.
- GitHub Pages workflow deploying the built preview to
  `https://t128n.github.io/design/`.

### Changed

- Standard layout CSS now lives in the `DESIGN.md` Layout section and is
  generated to `dist/layouts.css`; the root copy is removed.
- `preview/` and the tests read the generated `dist/layouts.css` instead of a
  root layout stylesheet.
