<script lang="ts">
  import Header from './Header.svelte';
  import Button from './Button.svelte';
  import Menu from './Menu.svelte';
  import Popover from './Popover.svelte';
  import Dialog from './Dialog.svelte';
  import Tooltip from './Tooltip.svelte';
  import CommandPalette from './CommandPalette.svelte';
  import { Add, Document, Folder, Settings, TrashCan } from 'carbon-icons-svelte';

  interface Props {
    menuOpen?: boolean;
    popoverOpen?: boolean;
    dialogOpen?: boolean;
    tooltipOpen?: boolean;
    paletteOpen?: boolean;
  }

  let {
    menuOpen = $bindable(false),
    popoverOpen = $bindable(false),
    dialogOpen = $bindable(false),
    tooltipOpen = $bindable(false),
    paletteOpen = $bindable(false),
  }: Props = $props();

  const menuItems = [
    { label: 'Rename', shortcut: '⌘R' },
    { label: 'Duplicate', shortcut: '⇧⌘D' },
    { label: 'Archive', separatorBefore: true },
    { label: 'Delete', danger: true, separatorBefore: true },
  ];

  const paletteGroups = [
    {
      label: 'Actions',
      items: [
        { label: 'New issue', shortcut: '⌘N', icon: Add },
        { label: 'New document', shortcut: '⌘⇧N', icon: Document },
      ],
    },
    {
      label: 'Navigate',
      items: [
        { label: 'Go to settings', shortcut: 'G S', icon: Settings },
        { label: 'Go to archive', shortcut: 'G A', icon: Folder },
        { label: 'Move to trash', shortcut: '⌘⌫', icon: TrashCan },
      ],
    },
  ];
</script>

<div class="frame">
  <div class="surface">
    <Header title="Overlays">
      {#snippet actions()}
        <Menu label="More actions" items={menuItems} bind:open={menuOpen} />
      {/snippet}
    </Header>
    <div class="body">
      <p class="lede">
        Every overlay shares the panel surface, a strong edge, the large radius and the one
        shadow. Only the z token changes with the role.
      </p>
      <div class="rows">
        <div class="row">
          <div class="copy">
            <p class="row-title">Menu</p>
            <p class="row-caption">Items on the control height; shortcut hints right-aligned.</p>
          </div>
          <div class="row-action">
            <Menu label="Row actions" items={menuItems} />
          </div>
        </div>
        <div class="row">
          <div class="copy">
            <p class="row-title">Popover</p>
            <p class="row-caption">A short message and one or two small actions.</p>
          </div>
          <div class="row-action">
            <Popover
              label="Open popover"
              message="This change applies to every selected record."
              primaryLabel="Apply"
              secondaryLabel="Dismiss"
              bind:open={popoverOpen}
            />
          </div>
        </div>
        <div class="row">
          <div class="copy">
            <p class="row-title">Dialog</p>
            <p class="row-caption">Confirm only the irreversible, and name the consequence.</p>
          </div>
          <div class="row-action">
            <Button label="Review deletion" onclick={() => (dialogOpen = true)} />
          </div>
        </div>
        <div class="row">
          <div class="copy">
            <p class="row-title">Tooltip</p>
            <p class="row-caption">Inverse surface, one caption line, optional shortcut.</p>
          </div>
          <div class="row-action">
            <Tooltip
              label="Expand the activity panel"
              shortcut="⌘E"
              triggerLabel="Hover target"
              bind:open={tooltipOpen}
            />
          </div>
        </div>
        <div class="row">
          <div class="copy">
            <p class="row-title">Command palette</p>
            <p class="row-caption">One palette lists every action; grouped, with shortcuts.</p>
          </div>
          <div class="row-action">
            <Button label="Open palette" onclick={() => (paletteOpen = true)} />
          </div>
        </div>
      </div>
      <p class="token">
        --layer-menu 200 · --layer-popover 100 · --layer-dialog 300 · --layer-palette 400 ·
        --layer-tooltip 500
      </p>
    </div>
  </div>
</div>

<Dialog
  bind:open={dialogOpen}
  title="Delete 3 records?"
  description="This permanently removes the records and their history. This cannot be undone."
  confirmLabel="Delete 3 records"
  destructive
/>
<CommandPalette bind:open={paletteOpen} groups={paletteGroups} />

<style>
  .frame {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    padding: var(--page-inset);
    background: var(--surface-app);
  }

  .surface {
    width: 100%;
    max-width: calc(var(--width-reading) + var(--width-label));
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
    overflow: hidden;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    padding: var(--space-5);
  }

  .lede {
    max-width: var(--width-reading);
    font: var(--type-body);
    color: var(--text-2);
  }

  .rows {
    border-top: 1px solid var(--border);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    min-height: var(--row-h);
    padding: var(--space-2) 0;
    border-bottom: 1px solid var(--border);
  }

  .copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .row-title {
    font: var(--type-body);
    color: var(--text-1);
  }

  .row-caption {
    font: var(--type-caption);
    color: var(--text-3);
  }

  .row-action {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    flex: none;
  }

  .token {
    color: var(--text-3);
    font: var(--type-mono);
  }
</style>
