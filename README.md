<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

# t128n design

The Svelte 5 design framework published as [`@t128n/ui`](https://www.npmjs.com/package/@t128n/ui): semantic tokens, a small typography and layout vocabulary, and components that consume only those tokens.

- Documentation: https://t128n.github.io/design/
- Package: [`@t128n/ui`](https://www.npmjs.com/package/@t128n/ui)
- Design language: Storybook → Foundations → Design language
- Agent and contributor contract: [`AGENTS.md`](AGENTS.md)

## Install

```sh
bun add @t128n/ui
```

## Develop

```sh
bun install --frozen-lockfile
bun run storybook        # documentation and stories at http://localhost:6006
bun run test
bun run build
bun run verify
```

Components, styles, tests, and documentation pages live in `packages/ui`.
Storybook configuration and sidebar order live in `.storybook`.

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`AGENTS.md`](AGENTS.md). A change
that affects the framework needs a changeset: `bun run changeset`.

## License

MPL-2.0. See [`LICENSE`](LICENSE). Every file records its own copyright and license
with an SPDX header, so the repository is compliant with
[REUSE 3.3](https://reuse.software/spec/); run `bun run license:lint` to check it.
