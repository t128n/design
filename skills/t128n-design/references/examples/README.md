# t128n design — examples

Six standalone views built from [DESIGN.md](../DESIGN.md). They began as independent interpretations by separate authors; they now share one token block, one shell spine, and one component inventory. The differences that remain are shell-driven — app, content, and focused app — not stylistic drift.

These examples are part of the `t128n-design` agent skill. Read `DESIGN.md` before making design decisions, and use [PATTERNS.md](../PATTERNS.md) for copyable component snippets. Use the view closest to the task to resolve questions about full-screen composition, states, and interaction details. Copy tokens and patterns, not whole pages.

Open any `index.html` directly in a browser. No build step, no dependencies. Each view is a complete static screen; `app.js` only demonstrates interaction behavior and is optional when using the view as a visual reference.

| View | Shell | Demonstrates |
| --- | --- | --- |
| [`landing/`](landing/index.html) | Content shell | Marketing hierarchy, flat hero, specimen controls, copy confirmation, shell comparison |
| [`personal/`](personal/index.html) | Content shell | Personal home page, ruled link and work lists, monospace identifiers, no navigation |
| [`dashboard/`](dashboard/index.html) | App shell | Dense table, sorting, search + filter, no-results state, row menu, inline copy confirmation, mobile drawer, touch targets |
| [`settings/`](settings/index.html) | App shell, single column | Form validation, loading + inline success, confirmed member removal, destructive dialog, inline status |
| [`docs/`](docs/index.html) | Content shell | Reading measure, type hierarchy, code + copy, callout, table, TOC scroll-spy |
| [`workspaces/`](workspaces/index.html) | Focused app shell | Search-first launcher, inline create form, keyboard shortcuts, no sidebar |

Each view is self-contained: `index.html`, `styles.css`, `app.js`.

## Shared implementation

- The token block is **byte-identical** in all six `styles.css` files. It is the canonical block: add a token here and in [DESIGN.md](../DESIGN.md) at the same time. No raw hex outside it. Type, spacing, control, and layout tokens are rem; only 1px hairlines, 2px focus rings and bars, shadow geometry, and breakpoints stay in px.
- Control padding is bound to control height (0.5/0.75/1rem ↔ 1.75/2.25/2.75rem); nav and menu rows use 0.5rem padding.
- Label–value rows are tabular: value right-aligned with tabular figures, mono 0.8125 for identifiers, 1px rules with no container, and a hover fill that spans exactly the rule width.
- Tables and lists are page structure, not objects: no surrounding border, radius, or card.
- Theme resolves before first paint: stored override, otherwise OS preference. One key, `t128n-theme`, shared by all six, so a toggle carries across views. Clearing the override returns to the system.
- Search, filters, sorting, and the inline create form live in the query string, so a copied URL reproduces the screen.
- Geist Sans 400/600 and Geist Mono 400 via Fontsource, latin subset, with system fallbacks. No build step, no font files in the repo.
- Lucide outline icons inline as SVG: 1rem inline and in 1.75rem controls, 1.25rem in 2.25/2.75rem controls and the app bar.
- **No floating notifications.** Every outcome is inline: field errors under the field, action results beside the action or section, copy confirmations next to the trigger.
- Hover is gated behind `(hover: hover) and (pointer: fine)`; controls set `touch-action: manipulation`; overlays contain overscroll; `prefers-contrast` and `forced-colors` keep structure visible.
- Horizontal current navigation uses a full-width 2px `primary` underline flush with the header rule, 600 weight, and no fill. Vertical current navigation uses the `surface-3` selected fill and a full-row-height leading bar.
- 2px focus rings with 2px offset (`accent-on-dark` on the app bar), skip links, one `<main>` and one `<h1>` per page.
- The wordmark uses the accent: `primary` on light headers, `accent-on-dark` on the dark app bar. No separate brand color.
- Responsive at 1280 / 1024 / 768 / 320 with no page-level horizontal scroll. The app-shell drawer starts below the app bar and locks body scroll; the focused app shell has no drawer.

Data and network calls are simulated locally. These are design examples, not production pages.
