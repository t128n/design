<script lang="ts">
  import {
    Calendar,
    CheckmarkOutline,
    CircleOutline,
    ChevronRight,
    Document,
    Email,
    Folder,
    Grid,
    Idea,
    OverflowMenuHorizontal,
    Share,
    Star,
    Tag as TagIcon,
    User,
    UserMultiple,
  } from 'carbon-icons-svelte';
  import AppShell from '$lib/components/AppShell.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Header from '$lib/components/Header.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Avatar from '$lib/components/Avatar.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';

  const navGroups = [
    {
      label: 'Work',
      items: [
        { label: 'Inbox', icon: Email },
        { label: 'My issues', icon: CircleOutline },
        { label: 'Projects', icon: Folder },
      ],
    },
    {
      label: 'Workspace',
      items: [
        { label: 'Views', icon: Grid, active: true },
        { label: 'Initiatives', icon: Idea },
        { label: 'Team', icon: UserMultiple },
      ],
    },
  ];

  let todos = $state([
    {
      id: 'dominant',
      label: 'Name the dominant element before placing anything else.',
      checked: true,
    },
    {
      id: 'status',
      label: 'Pair every status color with a glyph or text.',
      checked: true,
    },
    {
      id: 'width',
      label: 'Check the view at 390px and in both themes.',
      checked: false,
    },
    {
      id: 'actions',
      label: 'Remove one secondary action before adding another.',
      checked: false,
    },
  ]);

  let open = $state(false);

  const codeSample = `.panel {
  background: var(--surface-panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}`;
</script>

<AppShell>
  {#snippet sidebar()}
    <Sidebar
      workspace="t128n"
      groups={navGroups}
      user={{ name: 'Avery Chen', initials: 'AC' }}
    />
  {/snippet}

  <div class="ds-page view">
    <Header breadcrumb={['t128n', 'Design system', 'Design principles']}>
      {#snippet actions()}
        <IconButton icon={Share} label="Share page" />
        <IconButton icon={Star} label="Add to favorites" />
        <IconButton icon={OverflowMenuHorizontal} label="Page actions" />
      {/snippet}
    </Header>

    <div class="ds-page-body">
      <article class="reader">
        <div class="title-block">
          <div class="page-icon">
            <Icon icon={Document} size={24} />
          </div>
          <h1>Design principles</h1>
        </div>

        <div class="ds-properties">
          <div class="ds-property-row">
            <span class="ds-property-label">
              <Icon icon={User} size={16} />
              Owner
            </span>
            <span class="ds-property-value">
              <Avatar initials="AC" size="xs" label="Avery Chen" />
              Avery Chen
            </span>
          </div>
          <div class="ds-property-row">
            <span class="ds-property-label">
              <Icon icon={CheckmarkOutline} size={16} />
              Status
            </span>
            <span class="ds-property-value">
              <Badge label="Published" status="success" />
            </span>
          </div>
          <div class="ds-property-row">
            <span class="ds-property-label">
              <Icon icon={TagIcon} size={16} />
              Tags
            </span>
            <span class="ds-property-value">
              <Tag label="foundations" tone="neutral" />
              <Tag label="principles" tone="violet" />
            </span>
          </div>
          <div class="ds-property-row">
            <span class="ds-property-label">
              <Icon icon={Calendar} size={16} />
              Updated
            </span>
            <span class="ds-property-value">Oct 24, 2026</span>
          </div>
        </div>

        <Callout
          icon={Idea}
          children="A principle is a tie-breaker, not a preference. When two layouts look equally good, the one with fewer competing focal points wins."
        />

        <section class="block">
          <h2>Hierarchy by role</h2>
          <p class="prose">
            Every screen answers one question first. A page title outranks a
            section heading, a section heading outranks a label, and metadata
            never competes with the thing it describes. Two equal focal points
            make neither primary.
          </p>
          <p class="prose">
            Role decides size, weight and color together. A title is not body
            text made heavier, and a caption is not body text made smaller. Use
            the role that matches the job.
          </p>
        </section>

        <section class="block">
          <h2>Working checklist</h2>
          <ul class="checklist">
            {#each todos as todo (todo.id)}
              <li>
                <Checkbox label={todo.label} bind:checked={todo.checked} />
              </li>
            {/each}
          </ul>
        </section>

        <div class="disclosure">
          <button
            type="button"
            class="disclosure-trigger"
            aria-expanded={open}
            aria-controls="contrast-notes"
            onclick={() => (open = !open)}
          >
            <span class="chevron" class:open>
              <Icon icon={ChevronRight} size={16} />
            </span>
            How we test contrast
          </button>
          {#if open}
            <div class="disclosure-content" id="contrast-notes">
              <p>
                We measure text on panel, app and sunken surfaces in both
                themes. Focus rings and status glyphs meet 3:1; hairlines are
                decorative and are not counted. The table in section 3 records
                every pair, and any token change re-runs the measurements.
              </p>
            </div>
          {/if}
        </div>

        <pre class="code"><code>{codeSample}</code></pre>
      </article>
    </div>
  </div>
</AppShell>

<style>
  .view {
    height: 100%;
    min-height: 0;
  }

  .reader {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    width: 100%;
    max-width: var(--width-reading);
    margin: 0 auto;
    padding: var(--space-6) var(--page-inset);
  }

  .title-block {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .page-icon {
    display: grid;
    place-items: center;
    width: var(--size-5);
    height: var(--size-5);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
    color: var(--text-2);
  }

  h1 {
    font: var(--type-display);
    color: var(--text-1);
  }

  .block {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .block h2 {
    font: var(--type-heading);
    color: var(--text-1);
  }

  .prose {
    font: var(--type-prose);
    color: var(--text-1);
  }

  .checklist {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .checklist li {
    padding: 0;
  }

  .checklist :global(.box) {
    display: grid;
    place-items: center;
    width: var(--icon);
    height: var(--icon);
    margin-top: calc(var(--space-1) / 2);
    padding: 0;
    border: 1px solid var(--border-control);
    border-radius: var(--radius-xs);
    background: var(--surface-panel);
    color: var(--text-on-accent);
    flex: none;
  }

  .checklist :global(.box[data-state='checked']) {
    background: var(--accent);
    border-color: var(--accent);
  }

  .disclosure {
    border-radius: var(--radius-md);
  }

  .disclosure-trigger {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    height: var(--row-h-sm);
    padding: 0 var(--space-2);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-1);
    font: var(--type-action);
    text-align: left;
  }

  .disclosure-trigger:hover {
    background: var(--state-hover);
  }

  .chevron {
    display: flex;
    color: var(--text-3);
  }

  .chevron.open {
    transform: rotate(90deg);
  }

  .disclosure-content {
    padding: var(--space-1) var(--space-2) var(--space-2)
      calc(var(--icon) + var(--space-4));
  }

  .disclosure-content p {
    font: var(--type-prose);
    color: var(--text-2);
  }

  .code {
    margin: 0;
    padding: var(--space-3);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
    color: var(--text-1);
    font: var(--type-mono);
    overflow-x: auto;
  }

  .code code {
    font: var(--type-mono);
  }
</style>
