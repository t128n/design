# t128n agent skills

Two skills teach coding agents to build and audit t128n interfaces from this
repository's spec instead of restating it.

| Skill | Use |
| :--- | :--- |
| `t128n-ui` | Build or change t128n admin consoles, record browsers, audit views, dashboards, tables, forms, and dialogs. |
| `t128n-ui-review` | Audit a page for design conformance, consistency, and accessibility, then report findings against the spec. |

## Canonical paths

The skills are pointers. Everything they read lives in this repository:

- `DESIGN.md` — normative tokens, rules, and the canonical layout CSS block.
- `dist/tokens.css` — generated light/dark variables.
- `dist/layouts.css` — generated page skeletons.
- `preview/` — reference app and bare layout pages.
- `skills/t128n-ui-review/scripts/audit-css.mjs` — the CSS audit helper.

To change the design system, edit `DESIGN.md`, run `bun run build`, and commit
the regenerated files under `dist/`. Never copy token values or CSS into a
skill: `bun test` fails when a skill duplicates a canonical artifact.

## Install

Run these commands from the repository root:

```sh
mkdir -p ~/.agents/skills
ln -sfn "$(pwd)/skills/t128n-ui" ~/.agents/skills/t128n-ui
ln -sfn "$(pwd)/skills/t128n-ui-review" ~/.agents/skills/t128n-ui-review
```

The links point at this checkout, so both skills keep reading the canonical
files here. Build the artifacts first with `bun install` and `bun run build` if
`dist/` is empty, and re-run the `ln` commands if you move the checkout.

## Audit

Run the helper on any stylesheet to get JSON findings and a nonzero exit code
when errors exist:

```sh
bun skills/t128n-ui-review/scripts/audit-css.mjs path/to/app.css
```

Each finding carries its rule, line, severity, and message. Warnings do not
fail the run; errors do.

## Keep the pointers honest

- `bun run build` regenerates `dist/tokens.css` and `dist/layouts.css` from
  `DESIGN.md`.
- `bun run check` rebuilds and fails when the committed artifacts drift.
- `bun test` includes guard tests that reject hex colors, token values, and
  copied CSS inside skill files.
