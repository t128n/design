# t128n implementation patterns

Copyable extracts for implementing the t128n visual language. Start here for
component-level work; read [DESIGN.md](DESIGN.md) when you need the full
specification or are making a system-level decision.

These snippets are derived from the reference views. If a snippet and the
specification disagree, the specification wins.

## Contents

1. [Core defaults](#core-defaults)
2. [Theme bootstrap](#theme-bootstrap)
3. [App shell](#app-shell)
4. [Content shell](#content-shell)
5. [Focused app shell](#focused-app-shell)
6. [Buttons](#buttons)
7. [Fields and forms](#fields-and-forms)
8. [Tables](#tables)
9. [Navigation](#navigation)
10. [Dialogs](#dialogs)
11. [Inline feedback](#inline-feedback)
12. [Empty states](#empty-states)
13. [Responsive and accessibility](#responsive-and-accessibility)
14. [Review checklist](#review-checklist)

## Core defaults

Use the token block from any view's `styles.css` unchanged. It is the canonical
block and is byte-identical in all six views.

- Body: `0.875rem` / `1.5`, Geist Sans 400.
- Content body: `1rem` / `1.6`; headings use 600.
- Controls: `2.25rem` high; compact rows `2.25rem`; page padding `1.5rem`.
- App bar: `3rem`; sidebar: `15rem`; reading measure: `72ch`.
- Structure: `1px solid var(--border-subtle)`, not shadows or cards.
- One accent: `var(--primary)` in content, `var(--accent-on-dark)` on the app bar.
- Feedback is inline, never a floating notification.
- Hover styles sit behind `(hover: hover) and (pointer: fine)`.

```css
body {
  margin: 0;
  background: var(--canvas);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: var(--text-body);
  font-weight: 400;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

@media (hover: hover) and (pointer: fine) {
  .button:hover { background: var(--surface); }
}
```

## Theme bootstrap

Resolve the theme before first paint. Use one storage key so a toggle carries
across views.

```html
<script>
  (function () {
    var key = "t128n-theme";
    var stored = null;
    try { stored = window.localStorage.getItem(key); } catch (error) {}
    var systemDark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (systemDark ? "dark" : "light");
    var root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
  })();
</script>
```

## App shell

Use for dashboards, admin tools, and multi-section applications.

```html
<a class="skip-link" href="#main">Skip to main content</a>

<header class="app-bar">
  <span class="wordmark" translate="no">t128n</span>
  <span class="app-bar__divider" aria-hidden="true"></span>
  <span class="app-bar__context">Personal</span>
  <span class="app-bar__spacer"></span>
  <button class="icon-button" type="button" aria-label="Switch theme">…</button>
</header>

<div class="shell">
  <aside class="sidebar">
    <nav aria-label="Primary">
      <ul class="nav__list">
        <li>
          <a class="nav__item" href="#" aria-current="page">Overview</a>
        </li>
        <li><a class="nav__item" href="#">Projects</a></li>
      </ul>
    </nav>
  </aside>

  <main class="main" id="main" tabindex="-1">
    <header class="page-header">
      <h1 class="page-title">Projects</h1>
      <p class="page-description">Everything in the Personal workspace.</p>
    </header>
  </main>
</div>
```

```css
.app-bar {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: var(--app-bar-height);
  padding: 0 var(--page-padding);
  border-bottom: 1px solid var(--app-bar-divider);
  background: var(--app-bar);
  color: var(--app-bar-text);
}

.shell {
  display: grid;
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
  align-items: start;
}

.sidebar {
  position: sticky;
  top: var(--app-bar-height);
  height: calc(100vh - var(--app-bar-height));
  padding: var(--space-4) var(--space-3);
  overflow-y: auto;
  border-right: 1px solid var(--border-subtle);
  background: var(--surface);
}

.main {
  min-width: 0;
  padding: var(--page-padding);
}
```

Below `64rem`, collapse the shell to one column and move navigation into a
drawer below the app bar.

## Content shell

Use for landing pages, documentation, and personal sites.

```html
<header class="site-header">
  <div class="header-inner">
    <a class="wordmark" href="#" translate="no">t128n</a>
    <nav aria-label="Primary">
      <a href="#" aria-current="page">Overview</a>
      <a href="#">Foundations</a>
    </nav>
  </div>
</header>

<main id="main">
  <div class="page">
    <h1>…</h1>
  </div>
</main>
```

```css
.site-header {
  border-bottom: 1px solid var(--border-subtle);
  background: var(--canvas);
}

.header-inner,
.page {
  width: 100%;
  max-width: calc(var(--measure) + var(--page-padding) + var(--page-padding));
  margin-inline: auto;
  padding-inline: var(--page-padding);
}

.page {
  padding-block: var(--space-7) var(--space-8);
}
```

## Focused app shell

Use for a single-purpose surface such as a search-first launcher or onboarding
flow. Keep the app bar, omit the sidebar.

```html
<header class="app-bar">…</header>
<main class="main" id="main" tabindex="-1">
  <div class="page">
    <header class="page-header">
      <h1 class="page-title">Open a Project</h1>
      <p class="page-description">Search the workspace, or start something new.</p>
    </header>
  </div>
</main>
```

## Buttons

Use primary for the single main action in a region. Use secondary for adjacent
actions and ghost for low-emphasis actions. Use danger only for destructive
actions.

```html
<button class="button button--primary" type="button">Create Project</button>
<button class="button button--secondary" type="button">Cancel</button>
<button class="button button--ghost" type="button">Clear</button>
<button class="button button--danger" type="button">Delete Workspace</button>
```

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  height: var(--control-md);
  padding: 0 var(--space-3);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--text-primary);
  font-family: inherit;
  font-size: var(--text-body);
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
}

.button--primary {
  background: var(--primary);
  color: var(--on-primary);
}

.button--secondary {
  border-color: var(--border-strong);
  background: var(--canvas);
  color: var(--text-primary);
}

.button--ghost {
  background: transparent;
  color: var(--text-primary);
}

.button--danger {
  background: var(--error);
  color: var(--on-error);
}

.button:disabled,
.button[aria-disabled="true"] {
  border-color: transparent;
  background: var(--surface-2);
  color: var(--text-disabled);
  cursor: not-allowed;
}

@media (hover: hover) and (pointer: fine) {
  .button--primary:hover { background: var(--primary-hover); }
  .button--secondary:hover { background: var(--surface); }
  .button--ghost:hover { background: var(--surface); }
  .button--danger:hover:not(:disabled) { background: var(--error-hover); }
}
```

## Fields and forms

Put persistent labels above fields. Errors sit under the field and are tied to
it with `aria-describedby`. Do not use placeholders as labels.

```html
<div class="field">
  <label class="field__label" for="workspace-name">Workspace name</label>
  <input class="input" id="workspace-name" name="name" type="text"
         required aria-describedby="workspace-name-help workspace-name-error">
  <p class="field__helper" id="workspace-name-help">Shown in the sidebar.</p>
  <p class="field__error" id="workspace-name-error" hidden>
    Enter a name between 2 and 40 characters.
  </p>
</div>
```

```css
.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.field__label {
  color: var(--text-primary);
  font-size: var(--text-body);
  font-weight: 400;
  line-height: 1.5;
}

.input {
  width: 100%;
  height: var(--control-md);
  padding: 0 var(--space-3);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  background: var(--canvas);
  color: var(--text-primary);
  font-family: inherit;
  font-size: var(--text-body);
}

.field__helper {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--text-caption);
}

.field__error {
  display: flex;
  align-items: flex-start;
  gap: var(--space-1);
  margin: 0;
  color: var(--error);
  font-size: var(--text-caption);
}
```

Do not block typing to show validation. Validate on blur or submit, keep the
value, move focus to the first invalid field, and keep the error description
in sync.

## Tables

Tables are page structure. Do not wrap them in a card, add a surrounding
border, or round the container.

```html
<div class="table-wrap">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Project</th>
        <th scope="col">Owner</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="project-name">Customer Portal</span></td>
        <td>Nora Lindqvist</td>
        <td><span class="status status--success">Ready</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

```css
.table-wrap {
  min-width: 0;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-body);
}

.table th {
  height: var(--row-compact);
  padding: 0 var(--space-3);
  border-bottom: 1px solid var(--border-subtle);
  background: var(--surface-2);
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
}

.table td {
  height: var(--row-default);
  padding: 0 var(--space-3);
}

.table tbody tr:nth-child(even) {
  background: var(--surface);
}

@media (hover: hover) and (pointer: fine) {
  .table tbody tr:hover { background: var(--surface-2); }
}
```

Right-align numeric columns and use `font-variant-numeric: tabular-nums`.
Identifiers use `var(--font-mono)` at `0.75rem` or `0.8125rem`.

## Navigation

Horizontal navigation takes no fill and uses a 2px `primary` underline.
Vertical navigation adds the `surface-3` selected fill and a full-row-height
2px `primary` leading bar. Never invert the label or fill a row with solid
`primary`.

```html
<nav aria-label="Primary">
  <ul class="nav__list">
    <li><a class="nav__item" href="#" aria-current="page">Overview</a></li>
    <li><a class="nav__item" href="#">Settings</a></li>
  </ul>
</nav>
```

```css
.nav__item {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  height: var(--control-md);
  padding: 0 var(--space-2);
  overflow: hidden;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: var(--text-body);
  text-decoration: none;
}

.nav__item[aria-current="page"] {
  color: var(--text-primary);
  font-weight: 600;
}

.nav__item[aria-current="page"]::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 2px;
  background: var(--primary);
}
```

## Dialogs

Use the native `<dialog>` element and `showModal()`. Destructive dialogs must
name the object and the consequence, and the confirm button must repeat the
action verb.

```html
<dialog class="dialog" id="delete-dialog" aria-labelledby="delete-title"
        aria-describedby="delete-description">
  <h2 id="delete-title">Delete Workspace?</h2>
  <p id="delete-description">
    This permanently deletes the Personal workspace, including its projects
    and deployments. This cannot be undone.
  </p>
  <div class="dialog__actions">
    <button class="button button--secondary" type="button" data-close>Cancel</button>
    <button class="button button--danger" type="button">Delete Workspace</button>
  </div>
</dialog>
```

```css
.dialog {
  width: min(30rem, calc(100vw - var(--space-6)));
  max-height: 80vh;
  margin: auto;
  padding: var(--space-5);
  overflow: auto;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  background: var(--canvas);
  color: var(--text-primary);
  box-shadow: var(--shadow-overlay);
}

.dialog::backdrop {
  background: var(--overlay);
}

.dialog__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--space-2);
  margin-top: var(--space-5);
}
```

Return focus to the trigger when the dialog closes. Do not close on backdrop
click for destructive confirmations.

## Inline feedback

Every outcome appears next to the action or section that caused it. Do not add
toasts, snackbars, or floating notifications.

```html
<p class="inline-status" role="status" aria-live="polite" aria-atomic="true"></p>
```

```css
.inline-status {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin: var(--space-3) 0 0;
  color: var(--text-secondary);
  font-size: var(--text-body);
}

.inline-status:empty {
  display: none;
}

.inline-status--success { color: var(--success); }
.inline-status--error { color: var(--error); }
```

Use `role="status"` for success and `role="alert"` for errors that need
immediate announcement.

## Empty states

An empty state is a short statement plus the action that resolves it. Keep it
in the page flow; do not center it in a decorative card.

```html
<div class="empty-state">
  <p>No projects match “api”.</p>
  <button class="button button--secondary" type="button">Clear Search</button>
</div>
```

```css
.empty-state {
  padding: 2rem 0;
}

.empty-state p {
  margin: 0;
  color: var(--text-primary);
  font-size: var(--text-body);
}

.empty-state .button {
  margin-top: var(--space-2);
}
```

## Responsive and accessibility

- Breakpoints: 1280 / 1024 / 768 / 320. No page-level horizontal scroll.
- Collapse app-shell navigation below `64rem`; the drawer starts below the app
  bar and locks body scroll.
- Give every control a visible `:focus-visible` ring with 2px offset.
- Use one `<main>`, one `<h1>`, and a skip link per page.
- Gate hover behind `(hover: hover) and (pointer: fine)`; set
  `touch-action: manipulation` on interactive elements.
- Keep `prefers-contrast`, `forced-colors`, and `prefers-reduced-motion`
  working. Structure must survive without color or shadow.
- Use Lucide outline icons inline as SVG. 1rem inline and in 1.75rem controls;
  1.25rem in 2.25rem and 2.75rem controls.

## Review checklist

Before finishing, verify:

- No raw hex outside the token block.
- No shadows except overlays; no cards around tables or lists.
- One accent-colored element per region unless there is a reason.
- Primary, secondary, ghost, and danger buttons are used consistently.
- Field labels are persistent; errors are inline and programmatically linked.
- Tables are striped, borderless page structure; numeric cells are tabular.
- Current navigation uses the correct 2px indicator: a leading bar with
  `surface-3` fill in vertical nav, an underline with no fill in horizontal nav.
- Outcomes are inline; no floating notifications.
- Keyboard focus is visible and in a sensible order.
- Layout holds at 320px wide without page-level horizontal scroll.
- Destructive actions require confirmation and name the consequence.
