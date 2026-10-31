# Contributing

This repository is the Svelte 5 design framework published as `@t128n/ui`.
Contributions must preserve the
visual contract in [`DESIGN.md`](DESIGN.md), keep the public API documented, and
leave the checks green.

## Setup

The repository is Bun-native. `bun.lock` is the only lockfile and
`packageManager` pins Bun; do not add a pnpm or npm lockfile.

```sh
bun install --frozen-lockfile
bun run test
bun run test:storybook
cd packages/ui && bun run check
bun run build
bun run build-storybook
```

CI runs the warning-failing type check:

```sh
cd packages/ui && bunx svelte-check --tsconfig ./tsconfig.json --fail-on-warnings
```

`bun run verify` belongs to the package-delivery stack. Run it when the branch
provides it; do not assume the script exists on every branch.

## Changing a component

A component change is complete only when all of the following are true:

1. **Behavior and tokens.** The component keeps its documented prop contract,
   consumes semantic tokens, and follows Bits UI behavior for accessibility.
2. **Story.** The component has a story under `packages/ui/src/stories/`. Do not
   change story titles or metadata; the Storybook information-architecture work
   owns that taxonomy.
3. **Real screen.** At least one composed screen uses the component, or the
   exception is recorded in [`docs/component-coverage.md`](docs/component-coverage.md)
   with the reason. Do not manufacture a screen use by editing an unrelated view.
4. **Not-for note.** [`docs/components.md`](docs/components.md) states the
   component's purpose, key props, a correct example, and a “not for” boundary.
5. **Coverage table.** Add or update the component's row in
   `docs/component-coverage.md`. Keep the links to `components.md` valid.
6. **Changeset.** Run `bun run changeset` and describe the user-visible change.
   Commit the generated `.changeset/*.md` file. Do not edit
   `packages/ui/CHANGELOG.md` by hand; it is generated from changesets.

`packages/ui/tests/r48-coverage.test.ts` enforces the export list, the coverage
table, the not-for links, and the “screen or exception” rule. A new export
without a row fails the unit suite.

## R48

R48 requires three things together for every primitive: a story, a real screen
using it, and a note on what it is not for. An exception is allowed only when it
is written down with the screen, the reason, and the current date. An unrecorded
exception is a bug.

Use “Exception — reason” in the coverage table. When a screen adopts the
component later, replace the exception with the screen name; keep the row.

## CSS scoping

Components own their internals. Consumers compose through documented props and
the `class` passthrough, not internal class names.

- Keep native elements declared by a component component-scoped. Prefer a plain
  scoped selector over `:global(...)`.
- Classes passed to a Bits UI or child-component root cannot receive the parent
  scope hash. Namespace those hooks with `t128n-<component>-<part>` or a
  documented family prefix.
- Consumer-provided content selectors stay global but must be anchored by a
  component-scoped class.
- A new bare global requires an entry in `GLOBAL_ALLOWLIST` with a reason.
  `packages/ui/tests/global-scoping.test.ts` fails closed and reports the file,
  line, selector, and required entry.

## Content and styling rules

- Application and story prose uses `Text`, `Code`, and `List`. Raw `<p>`,
  `<h1>`–`<h6>`, `<ul>`, `<ol>`, and `<li>` fail the framework audit.
- Spacing belongs to `Stack`, `Inline`, `Grid`, `Page`, and `Section`, not to
  `Text` or ad-hoc margins.
- Use semantic tokens. Do not add raw hex or px values in components; add a
  token or use the existing scale.
- Use `Link` for navigation, `Button` for actions, and `Icon` with Carbon icons
  only. Icon-only controls need an accessible name and a 44px touch target.
- One overlay at a time; no nested dialogs; no toasts or transient layers.
- Every interactive component keeps a visible `:focus-visible` state and respects
  reduced motion.

## Review checklist

Before opening a pull request:

- [ ] The unit suite, Storybook tests, type check, library build, and Storybook
      build pass.
- [ ] No component behavior, prop, package metadata, build script, or CI change
      is outside the pull request's stated scope.
- [ ] New or changed components have a story, a screen use or documented
      exception, a not-for note, and a changeset.
- [ ] The component reference and coverage table match the actual exports.
- [ ] Documentation links resolve, including `docs/storybook.md` only where the
      Storybook information-architecture branch provides it.
- [ ] The package stays MIT-licensed and public, with no npm token in the
      repository: publishing relies on OIDC trusted publishing.

## Commits and releases

Use small, logical commits with a clear prefix (`feat:`, `fix:`, `docs:`,
`test:`, `refactor:`). Keep generated output out of commits. The repository is
versioned in the `0.x` line while the framework stabilizes.

Releases are not cut by hand. Changesets open a version pull request on `main`;
merging it publishes the verified tarball to npm, tags the release, and writes
the GitHub release. Do not run `npm publish` locally, and do not commit a
version bump or a `packages/ui/CHANGELOG.md` edit yourself.
