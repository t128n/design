<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
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

By contributing, you agree that your contribution is licensed under the
Mozilla Public License 2.0 in [`LICENSE`](LICENSE).

Every tracked file carries an SPDX header. Add one to a new file with:

```sh
uvx --from reuse reuse annotate -t mpl --copyright "t128n Torben Haack" --license MPL-2.0 <path>
bun run license:lint
```

Files that cannot hold a header or are generated are covered in `REUSE.toml`.
`bun run license:fix` adds any missing header, and the CI License job runs the
same check. The License fix workflow opens a pull request for anything merged
without one.
