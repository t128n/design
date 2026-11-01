<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

# Contributing

Storybook is the primary source of content and documentation for this
repository: https://t128n.github.io/design/

- **Contributor guide:** Storybook → Foundations → Contributing.
- **Rules, commands, and the R48 coverage table:** [`AGENTS.md`](AGENTS.md).
  Agents and tooling read this file; keep it current.
- **Documentation changes:** edit the MDX pages in `packages/ui/docs`. Do not add
  `docs/*.md` files.
- **Releases:** add a changeset with `bun run changeset` in the pull request that
  changes behavior.

Before opening a pull request:

```sh
bun run test
cd packages/ui && bun run check
cd ../.. && bun run build && bun run build-storybook
bun run license:lint
```

## License

By contributing, you agree that your contribution is licensed under the MIT
license in [`LICENSE`](LICENSE).

Every tracked file carries an SPDX header. Add one to a new file with:

```sh
uvx --from reuse reuse annotate --copyright t128n --license MIT <path>
bun run license:lint
```

Files that cannot hold a header or are generated are covered in `REUSE.toml`.
The CI License job runs the same check.
