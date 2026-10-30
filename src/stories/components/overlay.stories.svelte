<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Dialog from "../../lib/components/overlay/Dialog.svelte";
  import Menu from "../../lib/components/overlay/Menu.svelte";
  import Popover from "../../lib/components/overlay/Popover.svelte";
  import SlashMenu from "../../lib/components/overlay/SlashMenu.svelte";

  const { Story } = defineMeta<any, any>({
    title: "Components/Overlay",
    component: Menu,
    tags: ["autodocs"],
    parameters: {
      docs: {
        description: {
          component:
            "Overlays share one surface recipe: --surface-panel, a --border-strong border, --radius-lg corners and --shadow-overlay, and each takes its stacking order from a single layer token. Menus and the slash menu sit at --layer-menu, popovers at --layer-popover and dialogs at --layer-dialog. Menus use --control-h rows, right-aligned kbd shortcuts and put destructive actions last after a separator in --danger. The dialog is a native dialog element, so focus is trapped by the platform and only irreversible steps ask for confirmation. Overlay entry and exit fade over --duration-fast with --ease-standard and become instant under prefers-reduced-motion.",
        },
      },
    },
  });
</script>

<Story
  name="Menu"
  args={{
    label: "Actions",
    items: [
      { id: "edit", label: "Edit issue", shortcut: "Ctrl E" },
      { id: "copy", label: "Copy link", shortcut: "Ctrl C" },
      { id: "delete", label: "Delete issue", destructive: true },
    ],
  }}
  argTypes={{
    trigger: {
      control: false,
      description: "Snippet rendered inside the trigger button.",
    },
    items: {
      control: "object",
      description:
        "Menu rows with id, label, optional shortcut and destructive flag.",
    },
    onSelect: {
      control: false,
      description: "Called with the selected item id.",
    },
  }}
>
  {#snippet template(args)}
    <div class="t128n-overlay-story__stack">
      <Menu items={args.items} onSelect={() => {}}>
        {#snippet trigger()}{args.label}{/snippet}
      </Menu>
    </div>
  {/snippet}
</Story>

<Story
  name="Popover"
  args={{ message: "Filters apply to this view only." }}
  argTypes={{
    trigger: {
      control: false,
      description: "Snippet rendered inside the trigger button.",
    },
    children: {
      control: false,
      description: "Menu-styled surface content and its small actions.",
    },
  }}
>
  {#snippet template(args)}
    <div class="t128n-overlay-story__stack">
      <Popover>
        {#snippet trigger()}Filters{/snippet}
        {#snippet children()}
          <p class="t128n-overlay-story__copy">{args.message}</p>
          <div class="t128n-overlay-story__actions">
            <button type="button" class="t128n-overlay-story__button">
              Reset
            </button>
            <button
              type="button"
              class="t128n-overlay-story__button t128n-overlay-story__button--primary"
            >
              Apply
            </button>
          </div>
        {/snippet}
      </Popover>
    </div>
  {/snippet}
</Story>

<Story
  name="Dialog"
  args={{
    title: "Delete 142 issues",
    open: true,
    body: "This cannot be undone. The issues and their comments are removed.",
  }}
  argTypes={{
    title: { control: "text", description: "Heading of the dialog." },
    open: {
      control: "boolean",
      description: "Opens the native dialog with showModal.",
    },
    onOpenChange: {
      control: false,
      description: "Called with false when the dialog closes.",
    },
    children: { control: false, description: "Dialog body content." },
    actions: {
      control: false,
      description: "Right-aligned footer actions on --surface-sunken.",
    },
  }}
>
  {#snippet template(args)}
    <div class="t128n-overlay-story__stack">
      <Dialog title={args.title} open={args.open} onOpenChange={() => {}}>
        {#snippet children()}
          <p class="t128n-overlay-story__copy">{args.body}</p>
        {/snippet}
        {#snippet actions()}
          <button type="button" class="t128n-overlay-story__button">
            Cancel
          </button>
          <button
            type="button"
            class="t128n-overlay-story__button t128n-overlay-story__button--danger"
          >
            Delete 142 issues
          </button>
        {/snippet}
      </Dialog>
    </div>
  {/snippet}
</Story>

<Story
  name="Slash menu"
  args={{
    items: [
      { icon: "H", title: "Heading", caption: "Section title" },
      { icon: "¶", title: "Text", caption: "Plain paragraph" },
      { icon: "•", title: "Bulleted list", caption: "Unordered items" },
    ],
  }}
  argTypes={{
    items: {
      control: "object",
      description: "Block rows with icon, title and caption.",
    },
    onSelect: {
      control: false,
      description: "Called with the chosen block item.",
    },
  }}
>
  {#snippet template(args)}
    <div class="t128n-overlay-story__slash">
      <SlashMenu items={args.items} onSelect={() => {}} />
    </div>
  {/snippet}
</Story>

<style>
  .t128n-overlay-story__stack {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-5);
  }

  .t128n-overlay-story__copy {
    margin: 0;
    color: var(--text-2);
    font: var(--type-body);
  }

  .t128n-overlay-story__actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-2);
    margin-top: var(--space-3);
  }

  .t128n-overlay-story__button {
    min-height: var(--control-h);
    padding: 0 var(--space-3);
    border: var(--ring-offset) solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-action);
    cursor: pointer;
  }

  .t128n-overlay-story__button:hover {
    background: var(--surface-sunken);
  }

  .t128n-overlay-story__button:active {
    background: var(--state-pressed);
  }

  .t128n-overlay-story__button:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .t128n-overlay-story__button--primary {
    border: 0;
    background: var(--accent);
    color: var(--text-on-accent);
  }

  .t128n-overlay-story__button--danger {
    border: 0;
    background: var(--danger);
    color: var(--text-on-accent);
  }

  .t128n-overlay-story__slash {
    position: relative;
    min-height: var(--calendar-cell-h);
    padding: var(--space-5);
  }
</style>
