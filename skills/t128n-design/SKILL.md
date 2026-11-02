---
name: t128n-design
description: >
  Apply the t128n design language when building, redesigning, or reviewing
  application interfaces, dashboards, developer tools, and websites. Covers
  visual hierarchy, layout, typography, color, components, responsive
  behavior, accessibility, and reference implementations. Framework-agnostic.
---

# t128n Design

Apply the t128n visual language to user interfaces. Read
[DESIGN.md](references/DESIGN.md) before making design decisions or
implementing UI changes.

## Workflow

1. Inspect the existing application.
   - Identify the framework and component library.
   - Reuse existing components and established patterns.
   - Preserve working product behavior.

2. Determine the appropriate layout.
   - Select a shell described in DESIGN.md.
   - Respect the application's information architecture.
   - Do not introduce unnecessary navigation or containers.

3. Apply the visual language.
   - Use the semantic color tokens and the canonical token block.
   - Follow typography, spacing, and sizing conventions.
   - Establish hierarchy through alignment and whitespace.
   - Use Lucide outline icons consistently.

4. Consult the examples when a pattern is unclear.
   - Start at [references/examples/README.md](references/examples/README.md).
   - Open the closest view and read only the relevant `index.html`,
     `styles.css`, and `app.js`.
   - Copy tokens and patterns, not whole pages.
   - If an example and DESIGN.md disagree, DESIGN.md wins.

5. Implement using established technologies.
   - Prefer the application's existing component library.
   - Use accessible platform primitives.
   - Keep application-specific components local.
   - Do not introduce a new UI framework unnecessarily.

6. Review the result.
   - Verify visual consistency.
   - Check keyboard accessibility and responsive layouts.
   - Test relevant interaction and feedback states.
   - Remove unnecessary decoration and complexity.

## Examples

Six standalone views in `references/examples/` show the system applied to
different shells and tasks. Use them to resolve questions about composition,
states, and interaction details.

| View | Shell | Useful for |
| --- | --- | --- |
| [`landing/`](references/examples/landing/index.html) | Content | Marketing hierarchy, hero composition, copy confirmation |
| [`personal/`](references/examples/personal/index.html) | Content | Ruled lists, monospace identifiers, no navigation |
| [`dashboard/`](references/examples/dashboard/index.html) | App | Dense tables, sorting, filters, empty states, row menus |
| [`settings/`](references/examples/settings/index.html) | App, single column | Form validation, inline success, destructive dialogs |
| [`docs/`](references/examples/docs/index.html) | Content | Reading measure, code blocks, callouts, tables, TOC |
| [`workspaces/`](references/examples/workspaces/index.html) | Focused app | Search-first launcher, inline create, keyboard shortcuts |

They are reference implementations, not templates. Open `index.html` directly;
there is no build step and no runtime dependency.

## Rules

- DESIGN.md is the visual reference, not an instruction to rebuild the
  application architecture.
- Accessibility and platform conventions take precedence.
- Prefer existing components over new abstractions.
- Treat design defaults as defaults, not absolute rules.
- Do not add dependencies solely for visual consistency.
- Do not create a design-system implementation package.
- Deviate when product requirements justify it; note the reason.

## Output

Implement the requested UI changes directly. For design reviews, report
concrete problems and actionable improvements, prioritized by impact. Avoid
unrelated abstractions or refactors.
