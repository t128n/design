---
name: t128n-design
description: >
  Apply the t128n design language to any interface work: building,
  redesigning, restyling, or reviewing dashboards, admin tools, developer
  tools, settings screens, documentation, landing pages, and personal apps.
  Use this skill whenever the user asks to design, build, style, polish,
  audit, or review UI, even if they do not mention t128n. Covers visual
  hierarchy, layout, typography, color, components, responsive behavior,
  accessibility, motion, and reference implementations. Framework-agnostic.
---

# t128n Design

Use t128n as the default visual language for interface work. Start with
[PATTERNS.md](references/PATTERNS.md) for copyable component patterns. Read
[DESIGN.md](references/DESIGN.md) for the full specification when you are
making a system-level decision or a rule is unclear.

## Fast path

- **Small component or state change:** use the defaults and snippets in
  PATTERNS.md. Read DESIGN.md only if the rule is unclear.
- **New screen or layout:** read the shell and layout sections of DESIGN.md,
  then open the closest view in `references/examples/`.
- **Design review:** start with the review checklist in PATTERNS.md, then
  consult DESIGN.md for the relevant rule.

## Defaults

- Structure comes from alignment and 1px `border-subtle` rules, not shadows
  or containers.
- Body is 0.875rem Geist Sans; content screens use 1rem. Geist Mono is only
  for code, identifiers, and aligned numerals.
- Default controls are 2.25rem high; page padding is 1.5rem; the app bar is
  3rem and the sidebar is 15rem.
- One accent: `primary` in content, `accent-on-dark` on the app bar.
- Outcomes are inline, never floating notifications.
- Accessibility and platform conventions outrank visual consistency.

## Workflow

1. Inspect the existing application.
   - Identify the framework, component library, and design constraints.
   - If the project already has an explicit visual system or brand, preserve
     it and use t128n where it does not conflict.
   - Reuse existing components and preserve working behavior.

2. Choose the shell.
   - App shell for dashboards and multi-section tools.
   - Content shell for landing pages, docs, and personal sites.
   - Focused app shell for a single-purpose surface.
   - Do not add navigation or containers the information architecture does
     not need.

3. Apply the visual language.
   - Use semantic tokens; never raw hex outside the token block.
   - Follow the type, spacing, control, and layout scales.
   - Use Lucide outline icons inline as SVG.
   - Build hierarchy with alignment and whitespace, not decoration.

4. Use the reference views when composition is unclear.
   - Start at [references/examples/README.md](references/examples/README.md).
   - Read `index.html` and `styles.css` for layout and appearance.
   - Read `app.js` only when the interaction behavior matters.
   - Copy patterns, not whole pages.

5. Implement with the existing stack.
   - Prefer the project's component library and accessible platform
     primitives.
   - Keep application-specific components local.
   - Do not add a UI framework or dependency just for visual consistency.

6. Review the result.
   - Run the checklist in PATTERNS.md.
   - Check keyboard order, focus visibility, and 320px layout.
   - Test loading, empty, error, success, and destructive states.
   - Remove decoration that does not carry information.

## Examples

Six full static views show the system applied to different shells and tasks.
They are references, not templates; the UI is complete even where behavior is
not wired up.

| View | Shell | Useful for |
| --- | --- | --- |
| [`landing/`](references/examples/landing/index.html) | Content | Marketing hierarchy, hero composition, copy confirmation |
| [`personal/`](references/examples/personal/index.html) | Content | Ruled lists, monospace identifiers, no navigation |
| [`dashboard/`](references/examples/dashboard/index.html) | App | Dense tables, sorting, filters, empty states, row menus |
| [`settings/`](references/examples/settings/index.html) | App, single column | Form validation, inline success, destructive dialogs |
| [`docs/`](references/examples/docs/index.html) | Content | Reading measure, code blocks, callouts, tables, TOC |
| [`workspaces/`](references/examples/workspaces/index.html) | Focused app | Search-first launcher, inline create, keyboard shortcuts |

Open any `index.html` directly. There is no build step and no runtime
dependency.

## Rules

- DESIGN.md is the visual reference, not an instruction to rebuild the
  application architecture.
- Accessibility, platform conventions, and existing product behavior take
  precedence over this document.
- Prefer existing components over new abstractions.
- Treat design defaults as defaults, not absolute rules.
- Do not add dependencies solely for visual consistency.
- Do not create a design-system implementation package.
- Deviate when product requirements justify it; note the reason.

## Output

Implement the requested UI changes directly. For design reviews, report
concrete problems and actionable improvements, prioritized by impact. Avoid
unrelated abstractions or refactors.
