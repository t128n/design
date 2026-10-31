# Changesets

Every user-visible change to `@t128n/ui` ships through a changeset.

```sh
bun run changeset
```

Pick the bump (`patch`, `minor`, `major`), describe the change in one or two
sentences, and commit the generated `.changeset/*.md` file with the change.
`CHANGELOG.md` next to the package is generated from these files; do not edit it
by hand.

- The `Publish` workflow opens or updates a **chore(release): version packages**
  pull request on `main` while changesets are present.
- Merging that pull request publishes the new version to npm with OIDC trusted
  publishing and creates the git tag plus the GitHub release.
- While the package is `0.x`, a `major` changeset becomes a minor bump. See
  [`@changesets/cli` configuration](https://changesets.dev/guide/config) for the
  full option list.
