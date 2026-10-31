# Changelog

All notable changes to the design framework are recorded here. The repository is
internal-only and the package is currently versioned in the `0.x` line.

## Versioning policy

- `@t128n/ui` is not published to a registry. It stays `private`, and no license
  is granted for external distribution (`UNLICENSED`).
- While the framework stabilizes in `0.x`, a minor release may contain a breaking
  change. Every breaking change needs a migration note; patch releases are for
  compatible fixes and documentation.
- Add user-visible changes under `Unreleased` in the same pull request. The
  coordinator decides the release number when the pull request lands.
- Publishing requires an explicit license decision. Do not add a license or a
  publish workflow ahead of that decision.

## [Unreleased]

### Added

- Framework manual in `packages/ui/README.md`: principles, install and consume,
  composition model, theming, responsive model, accessibility, checks, migration,
  governance, and the R48 rule.
- `docs/components.md`, a reference for every component exported from
  `packages/ui/src/index.ts`, including purpose, key props, an example, and a
  “not for” boundary.
- `docs/component-coverage.md`, the R48 table that maps every component to its
  story, a composed-screen use or documented exception, and its not-for note.
- `packages/ui/tests/r48-coverage.test.ts`, which fails when an export is missing
  from the coverage table, when an entry has neither a screen nor a reasoned
  exception, or when a component has no not-for note.
- `CONTRIBUTING.md` with the setup, review, R48, scoping, and release rules.

### Changed

- `packages/ui/README.md` is now the framework manual rather than a component
  inventory. Component-level detail moved to `docs/components.md`.
- The README documents the single padding owner (`AppShell` or `Container`),
  `Page` and `Section` composition, the responsive breakpoints, and the current
  light-only theming boundary.

## [0.0.0] - 2026-10-31

Initial internal development line. Earlier changes are recorded in the git
history; this changelog starts with the framework manual.
