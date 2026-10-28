# Changelog

All notable changes to t128n's personal design system are recorded here. The
format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and
the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- The repository is now a strictly spec-compliant Agent Skill, `t128n-ui`,
  under `skills/t128n-ui/`, whose folder name matches its `name` and whose
  every cited path resolves inside the skill. Install with
  `npx skills add t128n/design` (published), `npx skills add ./skills/t128n-ui`
  (local copy of just the skill), or
  `ln -sfn "$PWD/skills/t128n-ui" ~/.agents/skills/t128n-ui` (local symlink);
  the repo root is never symlinked.
- `skills/t128n-ui/references/review.md` and
  `skills/t128n-ui/references/checklist.md` carry the conformance audit
  workflow (eight ordered steps) and its R1–R30 checklist, with
  `skills/t128n-ui/scripts/audit-css.mjs` as the static scan helper.
- `spacing.touch` (`--space-touch: 44px`) and a `Mobile and touch` contract in
  `skills/t128n-ui/references/DESIGN.md`: mobile-first breakpoints, page
  gutters, safe-area insets, and table scrolling.
- `.t128n-table-scroll` and `.t128n-table-scroll--pin-first` in
  `skills/t128n-ui/assets/layouts.css` for record tables that scroll
  horizontally while the identifier stays visible.

### Changed

- The project is now t128n's personal design system — a personal system for
  t128n's own tools and interfaces, not a product or company design system.
  Titles, descriptions, preview headings, eval prompts, and docs say so.
- The skill moved into a strict `skills/t128n-ui/` directory: the normative
  spec now lives at `skills/t128n-ui/references/DESIGN.md`, generated CSS under
  `skills/t128n-ui/assets/`, build and audit helpers under
  `skills/t128n-ui/scripts/`, and the entry point at
  `skills/t128n-ui/SKILL.md`. The previous root-level skill files and `dist/`
  output are gone, and the skill no longer cites `preview/` or `evals/`.
- `skills/t128n-ui/assets/layouts.css` is mobile-first: the one-column phone
  composition is the base, with `min-width` upgrades at `640px`, `800px`, and
  `1024px`.
- The preview is mobile-native: 44px controls, 16px page gutters, a
  bottom-sheet dialog, a scrolling layout nav, and stacked form actions, with
  desktop geometry returning at `800px`.
- README documents the three install commands, the mobile-first composition,
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
