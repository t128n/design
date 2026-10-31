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
```

## License

By contributing, you agree that your contribution is licensed under the MIT
license in [`LICENSE`](LICENSE).
