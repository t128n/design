# Typography and layout framework layer

**Goal:** Turn `@t128n/ui` from a collection of styled components into an opinionated framework: application and story copy is rendered through primitives such as `<Text variant="heading" as="h2">`, layout rhythm comes from primitives rather than one-off margins, and compliance is enforced by tests and documentation.

**Architecture:** Keep the existing token layer and component inventory. Add a small primitive layer above tokens and below components: typography (`Text`, `Code`) and layout (`Stack`, `Inline`, `Grid`, `Container`). Migrate content components and all stories to those primitives. Leave control internals on token-based CSS so form controls keep their exact geometry. Add a framework audit test so plain prose markup and literal type values cannot drift back in.

**Spec:** `DESIGN.md` §§Typography, Layout, Shapes, Refusals, System governance. Current prompt scale: display 32px, heading 24px, subheading 18px, body 16px/1.5, label and small UI text 14px/1.5.

**Tech stack:** Svelte 5 runes, existing token CSS, Storybook 10, Vitest + jsdom, Playwright/Storybook a11y. No new runtime dependencies.

---

## 1. What already exists

### Inventory

| Area | Current state |
| --- | --- |
| Components | 55 exported components in `packages/ui/src/lib/`, all exported from `src/index.ts` |
| Stories | 58 story files; `Foundations` is the only type/spacing reference page |
| Tests | 22 test files, including source audits (`design-audit`, `surface-rules`, `tokens`) and render/a11y tests |
| Tokens | Full type scale already exists: `--font-size-*`, `--font-weight-*`, `--line-height-*`, `--font-family-sans/mono` |
| Layout | `AppShell`, `PageHeader`, `Hero`, `Footer`, `Separator`, `Card`; no general layout primitives |
| Typography | No `Text`, `Code`, `Heading`, or type utility component; every component writes its own type CSS |
| Enforcement | No rule prevents raw `<p>`, `<h1>`, or one-off typography classes in stories or application code |

### Token scale today

`packages/ui/src/styles/tokens.css`:

| Variant | Size | Weight | Line height |
| --- | --- | --- | --- |
| display | 2rem / 32px | 600 | 1.2 |
| heading | 1.5rem / 24px | 600 | 1.3 |
| subheading | 1.125rem / 18px | 600 | 1.4 |
| body | 1rem / 16px | 400 | 1.5 |
| body-sm | 0.875rem / 14px | 400 | 1.5 |
| label | 0.875rem / 14px | 500 | **1.4** |
| caption | 0.75rem / 12px | 500 | 1.3 |

The prompt says label and small UI text are **14px / 1.5**. The `label` token currently uses 1.4. This plan aligns `--line-height-label` to 1.5 and updates `DESIGN.md`; `caption` remains 12px/1.3 as compact metadata.

### Drift found

- 54 raw `<p>`/`<h1>`–`<h6>` occurrences across stories. Headings and body copy are styled with local CSS classes that repeat the scale.
- 344 direct `font-family` / `font-size` / `font-weight` / `line-height` declarations across `lib/` components. They mostly reference tokens, but every component re-implements the same combinations.
- `Foundations.stories.svelte` demonstrates the type scale with one-off classes (`.display`, `.heading`, `.subheading`, `.small`) instead of the system itself.
- `PageHeader` and `Hero` both render page titles but make different local choices (`heading` vs `display`). That is legitimate, but the choice is not expressed through a shared API.
- `Link` hardcodes 14px, so a link inside body copy does not inherit the surrounding text scale.
- `Alert`, `Card`, `Footer`, `PageHeader`, and `Hero` all own local title/body styles. This is the main source of future drift.
- The existing `Label` is a form label. It must not be repurposed as the typography label; `Text variant="label"` covers display text.

---

## 2. Framework model

```
tokens.css
   ↓
typography + layout primitives        ← new
   ↓
existing components (Button, Card, Table, …)
   ↓
layouts and patterns (AppShell, PageHeader, Hero, Footer)
   ↓
views and stories (Dashboard, Settings, Landing, Foundations)
   ↓
framework audit (tests + Storybook documentation)
```

Rules the framework adds:

1. **Application and story prose uses `Text`.** No raw `<p>`, `<h1>`–`<h6>`, or typography classes in stories or application code.
2. **Spacing between text/elements uses layout primitives.** `Text` has no margins; `Stack`/`Inline`/`Grid` provide rhythm.
3. **`as` controls semantics; `variant` controls appearance.** Neither is inferred from the other.
4. **Control internals are an explicit exception.** Buttons, inputs, menus, date fields, and tables keep token-based local CSS because their geometry and states are tighter than prose. They still may not use literal type sizes or colors.
5. **New variants require a token, a DESIGN.md entry, and a test.** No one-off classes.

---

## 3. Proposed public API

### 3.1 `Text`

```svelte
<Text variant="display" as="h1">Projects</Text>
<Text variant="heading" as="h2">Recent activity</Text>
<Text variant="subheading" as="h3">Ownership</Text>
<Text variant="body" tone="secondary">
  Every project has a named owner and a visible next step.
</Text>
<Text variant="label" as="span" tone="secondary">Active projects</Text>
<Text variant="caption" as="span" tone="muted">Updated 3 minutes ago</Text>
<Text variant="body-sm" as="span" numeric>1,248</Text>
```

```ts
type TextVariant = 'display' | 'heading' | 'subheading' | 'body' | 'body-sm' | 'label' | 'caption';
type TextTone = 'primary' | 'secondary' | 'muted' | 'inherit' | 'info' | 'progress' | 'success' | 'warning' | 'danger' | 'disabled';
type TextWeight = 'regular' | 'medium' | 'semibold';
type TextTag =
  | 'p' | 'span' | 'div'
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'strong' | 'blockquote' | 'figcaption'
  | 'dt' | 'dd' | 'li' | 'legend' | 'time';
```

Props:

| Prop | Default | Behavior |
| --- | --- | --- |
| `variant` | `body` | Sets size, default weight, and line height from tokens |
| `as` | `p` | Sets the rendered element; never inferred from `variant` |
| `tone` | `primary` | Semantic text color; no arbitrary color prop |
| `weight` | variant default | `regular`, `medium`, `semibold`; used to override emphasis |
| `align` | `start` | `start`, `center`, `end`; centered copy is reserved for `Hero` and empty states |
| `numeric` | `false` | Applies `font-variant-numeric: tabular-nums` |
| `class` | — | Merged with the framework classes for layout escape hatches only |
| other HTML attributes | — | `id`, `role`, `aria-*`, `data-*`, `style` pass through |
| `children` | — | Svelte snippet |

Implementation notes:

- Render with `<svelte:element this={as}>`.
- `Text` resets `margin: 0` and sets `font-family: var(--font-family-sans)`.
- The variant classes map 1:1 to existing tokens. No literal `px` or `rem` values.
- `Text` does **not** accept `href`, `onclick`, or `button` semantics. Links stay with `Link`; actions stay with `Button`.
- `Text` does **not** offer `truncate`, arbitrary `fontSize`, `color`, or `lineHeight` props. Truncated identifiers need a reveal path per R41.
- `strong` is allowed; `em` is not, because the system uses weight rather than italics (R22).
- The typography label remains `variant="label"`; the existing `Label` component remains the form label.

### 3.2 `Code`

```svelte
<Code>const projectId = 'design-v0.1';</Code>

<Code block>{`type Project = {
  id: string;
  name: string;
};`}</Code>
```

- Inline renders `<code>`; `block` renders `<pre><code>`.
- Uses `--font-family-mono` only for genuinely technical content.
- Inline code uses a relative size so it follows the surrounding `Text` variant; block code uses `--font-size-body-sm` and scrolls horizontally.
- No syntax-highlighting dependency in this phase.

### 3.3 Layout primitives

| Component | Purpose | Key props |
| --- | --- | --- |
| `Stack` | Vertical rhythm and grouping | `gap` (`xs`–`3xl`), `align`, `as`, `class` |
| `Inline` | Wrapping horizontal rows (actions, metadata, chips) | `gap`, `align`, `justify`, `wrap`, `as` |
| `Grid` | Responsive column layouts | `columns`, `gap`, `minItem`, `as` |
| `Container` | Content measure and page gutters | `width` (`content`, `reading`, `form`, `full`), `padding`, `as` |

```svelte
<Stack gap="lg">
  <Text variant="heading" as="h2">Recent projects</Text>
  <Text variant="body-sm" tone="secondary">
    Ownership, status, and the latest update for each project.
  </Text>
  <Inline gap="sm">
    <Button>New project</Button>
    <Button variant="secondary">Export</Button>
  </Inline>
</Stack>
```

- All gap values map to existing `--space-*` tokens.
- `Container` widths map to `--layout-content-width`, `--layout-reading-width`, `--layout-form-width`, or `100%`.
- `Grid` collapses to one column below 640px unless it uses auto-fit.
- No `Box`, `Surface`, or arbitrary style primitive: those would make it easy to reintroduce boxed panels and one-off spacing.

### 3.4 `Link` adjustment

- Default `Link` inherits font size and line height from its surrounding `Text`.
- `variant="ghost"` keeps the 14px label scale because it is a standalone utility control.
- `variant="link"` inherits the surrounding size while keeping underline and accent color.
- This lets `<Text variant="body">Read the <Link href="/docs">documentation</Link>.</Text>` render coherently without a second size class.

### 3.5 Deferred candidates

Not in this plan, but compatible with the framework direction:

- `List` / `ListItem` for consistent semantic list spacing.
- `VisuallyHidden` for screen-reader-only text.
- `Icon` wrapper enforcing 16/20/24px sizes, `aria-hidden` defaults, and no global stroke overrides.
- `Prose` for long-form rich text. Skip it until there is real long-form content; it would encourage raw HTML again.

---

## 4. Decisions to confirm

| # | Decision | Recommendation |
| --- | --- | --- |
| D1 | Label line height | Set `label` to 14px/1.5 to match this brief; update `DESIGN.md` from 1.4 to 1.5. `caption` stays 12px/1.3. |
| D2 | Scope of framework primitives | Ship typography **and** the four layout primitives together. Typography without controlled spacing will immediately create new one-off margins. |
| D3 | `Text` and semantics | Default `as="p"` and require explicit heading levels. Do not auto-map `variant="heading"` to `<h2>`. |
| D4 | Control internals | Keep token-based local CSS in form controls/overlays. Do not force `Text` into `Button`, `Input`, `Select`, etc. in this phase. |
| D5 | Enforcement | Enforce with Vitest source audits plus Storybook usage. Do not add ESLint/Svelte lint dependencies yet. |

---

## 5. Work plan

### T1 — Reconcile the type contract

**Owns:** `DESIGN.md`, `packages/ui/src/styles/tokens.css`, `packages/ui/src/lib/typography.ts`, `packages/ui/tests/framework.test.ts`

- Change `--line-height-label` to `1.5`; update the DESIGN.md typography block.
- Add the framework usage section to DESIGN.md: prose through `Text`, code through `Code`, spacing through layout primitives, control exception.
- Add a refusal rule: no raw `<p>`/`<h1>`–`<h6>` or local type classes in application/story code outside framework primitives.
- Define shared `TextVariant`, `TextTone`, `TextWeight`, `TextTag`, and `Space` types.
- Add contract tests for every token-to-variant mapping.

**Done when:** tokens and DESIGN.md agree; the variant type list is tested.

### T2 — Ship typography primitives

**Owns:** `lib/Text.svelte`, `lib/Code.svelte`, `src/index.ts`, stories, tests

- Implement `Text` with `as`, `variant`, `tone`, `weight`, `align`, `numeric`, `class`, and attribute forwarding.
- Implement inline and block `Code`.
- Add `Primitives/Text` and `Primitives/Code` stories:
  - all seven variants;
  - correct semantic `as` examples (`h1`–`h3`, `p`, `span`, `li`, `time`);
  - tones and weights;
  - numeric alignment;
  - an explicit “not for links or actions” note.
- Add render tests for element choice, class mapping, attribute forwarding, and margin reset.
- Add source tests that `Text` uses only typography tokens.

**Done when:** all variants render correctly, Storybook a11y passes, and no raw type values exist in `Text`/`Code`.

### T3 — Ship layout primitives

**Owns:** `lib/Stack.svelte`, `lib/Inline.svelte`, `lib/Grid.svelte`, `lib/Container.svelte`, stories, tests

- Implement the four components against existing spacing/layout tokens.
- Add `Primitives/Stack`, `Primitives/Inline`, `Primitives/Grid`, and `Primitives/Container` stories with narrow/desktop cases.
- Add tests for token-backed gap values, attribute forwarding, and responsive column collapse.

**Done when:** the layout needs of `Foundations`, `Dashboard`, `Settings`, and `Landing` can be expressed without new local margin/grid CSS.

### T4 — Migrate content components

**Owns:** `lib/PageHeader.svelte`, `lib/Hero.svelte`, `lib/Card.svelte`, `lib/Alert.svelte`, `lib/Footer.svelte`, `lib/Breadcrumbs.svelte`

- Replace raw headings/paragraphs with `Text`:
  - `PageHeader`: `heading` title, `body-sm` description/meta.
  - `Hero`: `display` title, `body` description, `label` eyebrow.
  - `Card`: `subheading` title as `h2`.
  - `Alert`: `label` title and `body-sm` body with role tones.
  - `Footer`: `body-sm` text and `Link` for links.
  - `Breadcrumbs`: `body-sm` content, preserving link semantics.
- Replace local descendant type CSS with props.
- Keep structural CSS (layout, borders, colors, focus) local.
- Add a source audit that these components contain no `font-size`, `font-weight`, `line-height`, or `font-family` declarations.

**Done when:** content components own structure, not type scale.

### T5 — Migrate stories and views

**Owns:** all `src/stories/*.stories.svelte`

- Replace every raw `<p>` and `<h1>`–`<h6>` in stories with `Text`.
- Replace ad hoc grids/flex rows in `Dashboard`, `Settings`, `Landing`, `Foundations`, `PageHeader`, and `Footer` examples with `Stack`/`Inline`/`Grid`/`Container` where the structure matches.
- Rewrite `Foundations` typography section with the exact prompt copy rendered through `Text`; render `const projectId = 'design-v0.1';` through `Code`.
- Keep native table, form, and list semantics; wrap their textual content in `Text` where practical.
- Add framework audit:
  - no raw `<p>`/`<h1>`–`<h6>` in stories;
  - no raw `<p>`/`<h1>`–`<h6>` in `lib/` except `Text`/`Code`;
  - no literal `font-size`, `font-weight`, or `line-height` values under `lib/`;
  - every new primitive has a story and a real screen using it (R48).

**Done when:** the audit passes and no story needs a typography class.

### T6 — Documentation and exports

**Owns:** `src/index.ts`, `packages/ui/README.md`, `DESIGN.md`

- Export `Text`, `Code`, `Stack`, `Inline`, `Grid`, `Container`, and shared types.
- Add a README with the framework contract and before/after examples.
- Update DESIGN.md’s component inventory and governance rules.
- Document exceptions: native table/form/list markup, control internals, and third-party content.

**Done when:** a new contributor can build a screen from the README without writing typography CSS.

---

## 6. Migration examples

**Before**

```svelte
<h2 id="features-heading">Built for the work between meetings</h2>
<div class="feature-list">
  <section class="feature">
    <h3>Clear ownership</h3>
    <p>Every project has a named owner and a visible next step.</p>
  </section>
</div>
```

**After**

```svelte
<Stack gap="lg">
  <Text variant="subheading" as="h2" id="features-heading">
    Built for the work between meetings
  </Text>
  <Grid columns={3} gap="xl">
    <Stack gap="xs">
      <Text variant="body" as="h3" weight="medium">Clear ownership</Text>
      <Text variant="body-sm" tone="secondary">
        Every project has a named owner and a visible next step.
      </Text>
    </Stack>
  </Grid>
</Stack>
```

**Before**

```svelte
<p class="metric-label">Active projects</p>
<span class="metric-value">24</span>
```

**After**

```svelte
<Text variant="label" as="span" tone="secondary">Active projects</Text>
<Text variant="display" as="span" numeric>24</Text>
```

---

## 7. Verification

Run from the repository root:

```sh
bun run test
bun run build
bun run build-storybook
bun run test:storybook
cd packages/ui && bun run check
```

Acceptance:

- [ ] `Text` exposes all seven variants and the `as` prop; no variant relies on a literal size.
- [ ] `Code` handles inline and block content with mono tokens.
- [ ] `Stack`, `Inline`, `Grid`, and `Container` cover the spacing/layout needs of the composed examples.
- [ ] All story prose uses `Text`; all stories pass axe.
- [ ] Content components no longer declare type scale values.
- [ ] `DESIGN.md` documents the component-only rule and exceptions.
- [ ] No new dependencies; no raw hex/px introduced; light theme preserved.
- [ ] Existing tests remain green; new framework audits fail on raw prose or literal type values.

---

## 8. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Migrating text changes spacing because local margins disappear | Migrate with `Stack`/`Inline` in the same change; add visual checks in Storybook |
| Svelte scoped CSS means parent selectors cannot restyle `Text` | Treat that as intended encapsulation; expose props instead of descendant overrides |
| `as` allows invalid heading order | Require explicit levels; rely on Storybook axe and review; document page-title rules |
| Polymorphic typing cannot validate every per-tag attribute | Restrict `Text` to text tags and route links/actions to `Link`/`Button`; document the limitation |
| Label line-height change affects controls | Update tokens and run all control/story tests; verify 36px control geometry |
| Framework audits become noisy | Allow only documented exceptions (tables/forms/control internals) in the audit |
| Scope creeps into a full CSS-in-JS system | Keep primitives prop-small and token-only; defer `List`, `Icon`, `VisuallyHidden`, and `Prose` |
| Abstracting too much reduces flexibility | `class`, `id`, `style`, `aria-*`, and `data-*` still pass through for layout escape hatches |

---

## 9. Definition of done

The framework is in place when:

1. Typography and spacing have first-class primitives.
2. The foundations page is built with those primitives, not with one-off classes.
3. Content components use the primitives internally.
4. Every example screen uses the primitives for prose.
5. A source audit prevents regression.
6. DESIGN.md and the package README explain the contract and its exceptions.

At that point `@t128n/ui` is a framework in the useful sense: it does not only provide components, it provides the constrained vocabulary and the checks that keep screens compliant.

---

## Outcome

Implemented on 2026-10-31.

- Added `Text` and `Code` with the full seven-variant scale, semantic `as`, tones, weights, alignment, tabular numerals, and attribute forwarding.
- Added `Stack`, `Inline`, `Grid`, and `Container` backed by spacing and layout tokens.
- Added `typography.ts` and `layout.ts` shared types; exported them from the package entry.
- Aligned `label` to 14px / 1.5 and added `--font-size-code` and `--line-height-none` tokens.
- Migrated `PageHeader`, `Hero`, `Card`, `Alert`, `Footer`, `Breadcrumbs`, and all date/time descriptions to `Text`.
- `Link` now inherits surrounding text; ghost links keep the label scale.
- Replaced all raw `<p>`/`<h1>`–`<h6>` markup in stories with `Text`, and migrated `Foundations`, `Dashboard`, and other examples to the framework.
- Added `Primitives/Text`, `Code`, `Stack`, `Inline`, `Grid`, and `Container` stories.
- Added `framework.test.ts` and `framework-audit.test.ts`; the audit rejects raw prose and literal typography values.
- Added `packages/ui/README.md` and a `./styles` package export.
- Updated `DESIGN.md` with the framework usage section, the label line-height, and R51.

**Verification:** 24 unit test files / 232 tests pass; 64 Storybook files / 171 render + a11y tests pass; `svelte-check` reports 0 errors (2 pre-existing AppShell unused-selector warnings); package build and Storybook build pass.

**Note:** the root `build` script invokes `pnpm`, which is not installed in this environment. The package builds directly with `cd packages/ui && bun run build`. The root script is unchanged.
