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

The skill teaches the agent to inspect the existing application, reuse its
components, choose the right shell, apply the visual language, and review
accessibility and responsive behavior. It also points the agent at the closest
reference implementation when a pattern is ambiguous.

## What is included

- [`skills/t128n-design/SKILL.md`](skills/t128n-design/SKILL.md) — the
  implementation and review workflow.
- [`skills/t128n-design/references/DESIGN.md`](skills/t128n-design/references/DESIGN.md)
  — the canonical specification: tokens, layout, components, states,
  accessibility, motion, and the quality bar.
- [`skills/t128n-design/references/examples/`](skills/t128n-design/references/examples/README.md)
  — six standalone views showing the system applied to different shells and
  tasks.

The examples are part of the skill, so installing or updating the skill carries
the specification and reference implementations together. There is no separate
copy of `DESIGN.md` to keep in sync.

## Design at a glance

- Structure comes from alignment and 1px rules, not shadows or containers.
- One accent — Oxocarbon blue — and semantic role tokens instead of raw hex.
- 0.875rem Geist Sans at 400 and 600; Geist Mono only for code, identifiers,
  and aligned numerals.
- 2.25rem default controls, 1.5rem page padding, dense tables without cards.
- Outcomes are shown inline, never as floating notifications.
- Accessibility, keyboard operation, and platform conventions outrank visual
  consistency.

Read the full specification in
[`DESIGN.md`](skills/t128n-design/references/DESIGN.md).

## Examples

Six self-contained views, each with `index.html`, `styles.css`, and `app.js`:

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
    DESIGN.md              canonical specification
    examples/              six reference implementations
```

## Scope

This repository shares design decisions, not implementation complexity. It does
not provide a design-system package, component generator, token compilation
pipeline, or framework-specific skills. Applications implement their own
components from the specification.
