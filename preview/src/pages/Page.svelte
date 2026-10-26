<script>
  import PageShell from './PageShell.svelte';
  import Region from './Region.svelte';
  import { layouts } from './layouts.js';

  let { page } = $props();
</script>

<PageShell
  current={page.id}
  title={page.title}
  description={page.description}
  grid={page.grid}
>
  {#if page.id === 'index'}
    <div class="t128n-grid t128n-grid--3">
      {#each layouts as layout}
        <a class="layout-card" href={`./${layout.slug}/`}>
          <span class="layout-card__title">{layout.title}</span>
          <span class="layout-card__grid">{layout.grid}</span>
          <span class="layout-card__note">{layout.description}</span>
        </a>
      {/each}
    </div>
  {:else if page.id === 'one-column'}
    <div class="t128n-stack">
      <Region label="Page header" note="Title, context, primary action" height="72px" />
      <div class="t128n-grid t128n-grid--1">
        <Region
          label="Main content"
          note="One column; the page scrolls normally"
          height="280px"
        />
      </div>
      <Region label="Footer" note="Secondary actions and metadata" height="56px" />
    </div>
  {:else if page.id === 'two-column'}
    <div class="t128n-stack">
      <Region label="Page header" note="Spans both columns above the grid" height="72px" />
      <div class="t128n-grid t128n-grid--2">
        <Region
          label="Primary content"
          note="Equal column; collapses to one at 800px"
          height="240px"
        />
        <Region
          label="Secondary content"
          note="Equal column; collapses to one at 800px"
          height="240px"
        />
      </div>
      <Region label="Footer" note="Spans the page below the grid" height="56px" />
    </div>
  {:else if page.id === 'three-column'}
    <div class="t128n-stack">
      <Region label="Page header" note="Spans all three columns" height="72px" />
      <div class="t128n-grid t128n-grid--3">
        <Region label="Column A" note="3 → 2 at 1024px" height="240px" />
        <Region label="Column B" note="2 → 1 at 640px" height="240px" />
        <Region label="Column C" note="One column on narrow screens" height="240px" />
      </div>
      <Region label="Footer" note="Spans the page below the grid" height="56px" />
    </div>
  {:else if page.id === 'sidebar-main'}
    <div class="t128n-app-shell sketch-shell">
      <Region
        className="t128n-app-shell__header"
        label="App header"
        note="Product, context, account"
        height="64px"
      />
      <Region
        className="t128n-app-shell__nav"
        label="Navigation"
        note="220px fixed column; moves below main at 800px"
      />
      <Region
        className="t128n-app-shell__main"
        label="Main region"
        note="Fluid; min-width: 0"
      />
    </div>
  {:else if page.id === 'list-detail'}
    <div class="t128n-split sketch-split">
      <Region
        label="List pane"
        note="minmax(220px, 320px); keeps the selected item visible"
      />
      <Region label="Detail pane" note="Fluid; scrolls independently when needed" />
    </div>
  {:else if page.id === 'record-detail'}
    <div class="t128n-record sketch-record">
      <Region
        className="t128n-record__meta"
        label="Metadata rail"
        note="180–240px; labels and record identity"
      />
      <Region
        className="t128n-record__body"
        label="Record body"
        note="Fields, sections, history"
      />
    </div>
  {:else if page.id === 'register'}
    <div class="t128n-register sketch-register">
      <Region
        className="t128n-register__header"
        label="Register header"
        note="Title, count, primary action"
        height="64px"
      />
      <Region
        className="t128n-register__toolbar"
        label="Toolbar"
        note="Filters, search, view actions"
        height="56px"
      />
      <Region
        className="t128n-register__body"
        label="Register body"
        note="Table or row register; never a card grid"
      />
      <Region
        className="t128n-register__footer"
        label="Footer"
        note="Pagination, totals, selected count"
        height="56px"
      />
    </div>
  {:else if page.id === 'form'}
    <form class="t128n-form-grid" onsubmit={(event) => event.preventDefault()}>
      <Region label="Field A" note="Visible label above the control" height="88px" />
      <Region label="Field B" note="Visible label above the control" height="88px" />
      <Region label="Field C" note="Visible label above the control" height="88px" />
      <Region
        className="t128n-form-grid__wide"
        label="Wide field"
        note="Spans all columns for long text or a group"
        height="112px"
      />
      <div class="t128n-form-grid__wide form-actions">
        <button type="submit" class="button button-primary">Primary action</button>
        <button type="button" class="button button-secondary">Secondary action</button>
      </div>
    </form>
  {:else if page.id === 'settings'}
    <div class="t128n-grid t128n-grid--2">
      <Region
        label="Section rail"
        note="Navigation for settings groups; collapses above the form"
      />
      <div class="t128n-form-grid">
        <Region label="Setting A" note="Label, control, helper text" height="88px" />
        <Region label="Setting B" note="Label, control, helper text" height="88px" />
        <Region
          className="t128n-form-grid__wide"
          label="Setting group"
          note="Full-width row for related controls"
          height="112px"
        />
      </div>
    </div>
  {:else if page.id === 'mixed-grid'}
    <div class="t128n-stack">
      <div class="t128n-grid t128n-grid--3">
        <Region label="Summary A" note="Real count with a drill-down" height="96px" />
        <Region label="Summary B" note="Real count with a drill-down" height="96px" />
        <Region label="Summary C" note="Real count with a drill-down" height="96px" />
      </div>
      <div class="t128n-register sketch-register">
        <Region
          className="t128n-register__header"
          label="Register header"
          note="Title and primary action"
          height="56px"
        />
        <Region
          className="t128n-register__toolbar"
          label="Toolbar"
          note="Filters and search"
          height="48px"
        />
        <Region
          className="t128n-register__body"
          label="Register body"
          note="The record set remains a table"
        />
        <Region
          className="t128n-register__footer"
          label="Footer"
          note="Pagination and totals"
          height="48px"
        />
      </div>
    </div>
  {:else if page.id === 'states'}
    <div class="t128n-stack">
      <Region
        label="Empty state"
        note="What happened, why, and the next action"
        height="112px"
      />
      <Region
        label="Loading state"
        note="Textual progress; no spinner-only state"
        height="112px"
      />
      <Region
        label="Error state"
        note="Failure, cause, and a named recovery action"
        height="112px"
      />
      <Region
        label="Success state"
        note="Completion, actor, and visible audit entry"
        height="112px"
      />
    </div>
  {/if}
</PageShell>
