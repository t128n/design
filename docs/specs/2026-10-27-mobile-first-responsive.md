# Mobile-first responsive foundation — requirements

## Mobile tokens and DESIGN contract

- Add one token: `spacing.touch` = `44px`, emitted as `--space-touch`.
- Add a `### Mobile and touch` subsection under Layout: phones are the base viewport, gutters are 16px, interactive targets are 44px, and safe-area insets are respected.
- Breakpoints are mobile-first `min-width` values: 640px, 800px, 1024px.
- Document `.t128n-table-scroll` and the pinned identifier pattern. Tables never become card grids.
- Keep the nine typography scales and the 12px floor; the fix is composition, not type shrinking.

## Mobile-first layouts

- `layouts.css` starts from the phone composition and adds columns at `min-width`.
- `.t128n-page` uses 16px gutters and safe-area padding at the base, 32px at 800px.
- Two- and three-column grids, app shell, split, record, and form grids stack at the base.
- App shell uses `100dvh` with a `100vh` fallback.
- `.t128n-table-scroll` scrolls horizontally; `.t128n-table-scroll--pin-first` keeps the first column visible below 800px.

## Mobile-first preview component sheet

- `preview/src/app.css` uses 44px controls, buttons, icon buttons, and row actions at the base; desktop 28px geometry returns at 800px.
- The toolbar becomes a two-column action grid; the key-value grid stacks; section rhythm grows to 24px.
- Tables get a readable minimum width, 12px cell padding, and 44px headers; dialogs become bottom sheets with a `100dvh` cap and stacked actions.
- No shadows, gradients, blur, or non-token radii.

## Mobile preview markup and pages

- The preview table composes `t128n-table-scroll t128n-table-scroll--pin-first`.
- Layout browsing uses a horizontally scrollable nav with 44px links, wrapping at 800px.
- Every preview HTML entry carries `viewport-fit=cover` and `color-scheme: light dark`.
- Form actions stack at the base and return to a row at 800px.

## Mobile docs and changelog

- README documents the mobile-first base, 16px gutters, 44px targets, the 640/800/1024 ladder, safe-area insets, `--space-touch`, and `t128n-table-scroll`.
- CHANGELOG records the work under `Unreleased`.
