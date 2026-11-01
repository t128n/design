# t128n design — examples

Six standalone views built from `DESIGN.md`. They began as independent interpretations by separate authors; they now share one token block, one shell spine, and one component inventory. The differences that remain are shell-driven — app, content, and focused app — not stylistic drift.

Open any `index.html` directly in a browser. No build step, no dependencies.

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

- The token block is **byte-identical** in all six `styles.css` files. It is the canonical block: add a token here and in `DESIGN.md` at the same time. No raw hex outside it.
- Control padding is bound to control height (8/12/16 ↔ 28/36/44); nav and menu rows use 8px padding.
- Label–value rows are tabular: value right-aligned with tabular figures, mono 13 for identifiers, 1px rules with no container, and a hover fill that spans exactly the rule width.
- Theme resolves before first paint: stored override, otherwise OS preference. One key, `t128n-theme`, shared by all six, so a toggle carries across views. Clearing the override returns to the system.
- Geist Sans 400/600 and Geist Mono 400 via Fontsource, latin subset, with system fallbacks. No build step, no font files in the repo.
- Lucide outline icons inline as SVG: 16 inline, 20 in controls and the app bar.
- **No floating notifications.** Every outcome is inline: field errors under the field, action results beside the action or section, copy confirmations next to the trigger.
- 2px focus rings with 2px offset (`accent-on-dark` on the app bar), skip links, one `<main>` and one `<h1>` per page.
- The wordmark uses the accent: `primary` on light headers, `accent-on-dark` on the dark app bar. No separate brand color.
- Responsive at 1280 / 1024 / 768 / 320 with no page-level horizontal scroll. The app-shell drawer starts below the app bar and locks body scroll; the focused app shell has no drawer.

Data and network calls are simulated locally. These are design examples, not production pages.
