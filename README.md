# t128n design

A minimal, technical, enterprise-influenced visual language for personal
applications, developer tools, dashboards, and websites.

t128n is distributed as an **Agent Skill**: a small workflow plus a canonical
specification and reference implementations that coding agents load only when
they are relevant. It is not an npm package, a component library, or a runtime
dependency.

## Install

Install for the current project:

```sh
npx skills add t128n/design --skill t128n-design
```

Install globally for all projects:

```sh
npx skills add t128n/design --skill t128n-design -g
```

The [Skills CLI](https://skills.sh) supports OpenCode, Claude Code, Codex, and
other agents that understand Agent Skills.

Update an installed skill:

```sh
npx skills update t128n-design
```

## Use

Ask your agent to apply the design language directly:

> Implement this dashboard using the t128n design language.

The skill applies t128n as the default visual language for UI work. It teaches
the agent to inspect the existing application, reuse its components, choose the
right shell, apply the visual language, and review accessibility and responsive
behavior. Projects with an established design system keep their own system.

## What is included

- [`skills/t128n-design/SKILL.md`](skills/t128n-design/SKILL.md) — the
  implementation and review workflow.
- [`skills/t128n-design/references/PATTERNS.md`](skills/t128n-design/references/PATTERNS.md)
  — copyable snippets for shells, controls, forms, tables, dialogs, feedback,
  responsive behavior, and review.
- [`skills/t128n-design/references/DESIGN.md`](skills/t128n-design/references/DESIGN.md)
  — the canonical specification: tokens, layout, components, states,
  accessibility, motion, and the quality bar.
- [`skills/t128n-design/references/tokens.css`](skills/t128n-design/references/tokens.css)
  — the canonical token file, with namespaced custom properties for color,
  type, spacing, control and layout sizing, radius, shadow, motion, and
  z-index.
- [`skills/t128n-design/references/examples/`](skills/t128n-design/references/examples/README.md)
  — six full static views showing the system applied to different shells and
  tasks.

The examples are part of the skill, so installing or updating the skill carries
the specification, token file, and reference implementations together. There is
no separate copy of `DESIGN.md` to keep in sync.

## Tokens

`references/tokens.css` is the only file that should contain literal design
values. The skill instructs agents to:

- copy it into the target project and import it before component styles;
- consume tokens for color, type, spacing, control and layout sizing, radius,
  motion, and z-index;
- add a named token for a new value instead of hardcoding it;
- allow only 1px hairlines, 2px focus rings and indicators, breakpoints, shadow
  geometry, and `<meta name="theme-color">` as literals outside the token file;
  documentation pages may display token values as content.

```css
/* tokens.css */
:root {
  --color-canvas: #FFFFFF;
  --color-text-primary: #161616;
  --space-4: 1rem;
  --size-control-md: 2.25rem;
}

/* component.css */
.card {
  background: var(--color-canvas);
  color: var(--color-text-primary);
  padding: var(--space-4);
  min-height: var(--size-control-md);
}
```

## Design at a glance

- Structure comes from alignment and 1px rules, not shadows or containers.
- One accent — Oxocarbon blue — and namespaced role tokens instead of raw hex.
- `--font-size-body` Geist Sans at `--font-weight-regular` and
  `--font-weight-semibold`; Geist Mono only for code, identifiers, and aligned
  numerals.
- `--size-control-md` controls, `--layout-page-padding`, dense tables without
  cards.
- Outcomes are shown inline, never as floating notifications.
- Accessibility, keyboard operation, and platform conventions outrank visual
  consistency.

Read the full specification in
[`DESIGN.md`](skills/t128n-design/references/DESIGN.md).

## Examples

Six self-contained views, each with `index.html`, `styles.css`, and `app.js`.
All six import the shared [`tokens.css`](skills/t128n-design/references/tokens.css)
before their component styles:

| View | Shell | Demonstrates |
| --- | --- | --- |
| [`landing/`](skills/t128n-design/references/examples/landing/index.html) | Content | Marketing hierarchy, flat hero, copy confirmation |
| [`personal/`](skills/t128n-design/references/examples/personal/index.html) | Content | Ruled lists, mono identifiers, no navigation |
| [`dashboard/`](skills/t128n-design/references/examples/dashboard/index.html) | App | Dense table, sorting, filters, empty states, mobile drawer |
| [`settings/`](skills/t128n-design/references/examples/settings/index.html) | App, single column | Form validation, inline success, destructive dialog |
| [`docs/`](skills/t128n-design/references/examples/docs/index.html) | Content | Reading measure, code and copy, callout, TOC |
| [`workspaces/`](skills/t128n-design/references/examples/workspaces/index.html) | Focused app | Search-first launcher, inline create, keyboard shortcuts |

Open any `index.html` directly in a browser. No build step, no dependencies.

## Repository layout

```text
skills/t128n-design/
  SKILL.md                 agent workflow and guardrails
  references/
    PATTERNS.md            copyable implementation snippets
    DESIGN.md              canonical specification
    tokens.css             canonical token source
    examples/              six full static views
```

## Scope

This repository shares design decisions, not implementation complexity. It does
not provide a design-system package, component generator, token compilation
pipeline, or framework-specific skills. The token file is plain CSS custom
properties; applications implement their own components from the specification.
