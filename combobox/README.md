# PR 72 review assets

Visual evidence for `t128n/design#72` (Combobox grouped and async options).

Captured from Storybook with Playwright:

- `before-query.png` / `before.gif` — `origin/main` before the change.
- `after-query.png` / `after.gif` — the PR branch after the change.
- `after-grouped.png` — grouped dist-tags and versions with descriptions.
- `after-async.png` — manual result set with package descriptions.

The before captures set the query through an input event (paste, mobile input,
or a controlled update), which is the path the old wrapper did not open on.
