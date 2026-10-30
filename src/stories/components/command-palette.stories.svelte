<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import CommandPalette from "../../lib/components/command/CommandPalette.svelte";

  const { Story } = defineMeta<any, any>({
    title: "Components/CommandPalette",
    component: CommandPalette,
    tags: ["autodocs"],
    parameters: {
      docs: {
        description: {
          component:
            "The command palette is a pattern, not a primitive: one overlay lists every action in labelled groups. It sits at --layer-palette above dialogs, opens on the single app-owned shortcut and focuses its --header-h input. Each row shows the action on the left and an optional right-aligned kbd shortcut hint, and ArrowUp/ArrowDown move the active row, which is announced with aria-selected. Escape closes the palette and returns focus to where the user was. The palette takes the shared overlay surface: --surface-panel, a --border-strong border, --radius-lg corners and --shadow-overlay.",
        },
      },
    },
  });
</script>

<Story
  name="Open"
  args={{
    open: true,
    shortcut: "k",
    groups: [
      {
        label: "Go",
        items: [
          { id: "inbox", label: "Go to Inbox" },
          { id: "issues", label: "Go to Issues" },
          { id: "settings", label: "Go to Settings" },
        ],
      },
      {
        label: "Create",
        items: [
          { id: "new-issue", label: "Create issue", shortcut: "C" },
          { id: "new-project", label: "Create project", shortcut: "P" },
        ],
      },
    ],
  }}
  argTypes={{
    open: {
      control: "boolean",
      description: "Whether the palette is open.",
    },
    onOpenChange: {
      control: false,
      description: "Called with the next open state.",
    },
    groups: {
      control: "object",
      description:
        "Labelled groups of actions, each with id, label and optional shortcut.",
    },
    onSelect: {
      control: false,
      description: "Called with the selected action id.",
    },
    shortcut: {
      control: "text",
      description:
        "The app-owned shortcut that opens the palette, such as k for Ctrl/Cmd K.",
    },
  }}
>
  {#snippet template(args)}
    <div class="t128n-command-story">
      <p class="t128n-command-story__hint">
        Toggle open in the Controls panel. The palette opens with the
        {args.shortcut ? `Ctrl/Cmd ${args.shortcut.toUpperCase()}` : ""} shortcut.
      </p>
      <CommandPalette
        open={args.open}
        groups={args.groups}
        shortcut={args.shortcut}
        onOpenChange={() => {}}
        onSelect={() => {}}
      />
    </div>
  {/snippet}
</Story>

<style>
  .t128n-command-story {
    padding: var(--space-5);
  }

  .t128n-command-story__hint {
    margin: 0;
    color: var(--text-3);
    font: var(--type-caption);
  }
</style>
