<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Button from "../../lib/components/button/Button.svelte";
  import IconButton from "../../lib/components/button/IconButton.svelte";
  import AppShell from "../../lib/components/shell/AppShell.svelte";
  import Header from "../../lib/components/shell/Header.svelte";
  import SectionHeader from "../../lib/components/shell/SectionHeader.svelte";
  import Toolbar from "../../lib/components/shell/Toolbar.svelte";

  const { Story } = defineMeta<any, any>({
    title: "Components/Shell",
    component: AppShell,
    tags: ["autodocs"],
    parameters: {
      docs: {
        description: {
          component:
            "The shell fixes the frame every view shares. The sidebar sits on --surface-app; content lives in a --surface-panel with a hairline and a --space-2 outer margin. Headers are --header-h tall, use --page-inset padding, carry a --border hairline below and follow one anatomy: context first, actions last with --space-1 gaps, and the outermost ghost icon buttons pulled --space-2 outward so their glyphs align to the gutter. Toolbars repeat the inset at --row-h with filters left and search plus actions right. Section headers are quieter: --row-h-sm, a heading on the left and ghost actions on the right, with no rule. A view may show at most one primary action.",
        },
      },
    },
  });
</script>

{#snippet appNav()}
  <nav class="t128n-shell-story__nav" aria-label="Workspace">
    <p class="t128n-shell-story__nav-title">Atlas</p>
    <a class="t128n-shell-story__nav-item" href="#issues" aria-current="page">
      Issues
    </a>
    <a class="t128n-shell-story__nav-item" href="#inbox">Inbox</a>
    <a class="t128n-shell-story__nav-item" href="#settings">Settings</a>
  </nav>
{/snippet}

{#snippet appMain()}
  <div class="t128n-shell-story__page">
    <h1 class="t128n-shell-story__title">Issues</h1>
    <p class="t128n-shell-story__copy">
      The main panel holds the view. Its hairline and margin come from the
      layout skeleton, never from the view.
    </p>
  </div>
{/snippet}

{#snippet headerContext()}
  <span>Issues</span>
{/snippet}

{#snippet headerActions()}
  <IconButton label="Search" icon="search" />
  <Button variant="primary">New issue</Button>
  <IconButton label="More actions" icon="more" />
{/snippet}

{#snippet toolbarFilters()}
  <Button size="sm">Status</Button>
  <Button size="sm">Assignee</Button>
{/snippet}

{#snippet toolbarSearch()}
  <span class="t128n-shell-story__search">Search issues</span>
{/snippet}

{#snippet toolbarActions()}
  <Button size="sm" variant="ghost">Display</Button>
{/snippet}

{#snippet sectionActions()}
  <Button size="sm" variant="ghost">Edit</Button>
{/snippet}

<Story
  name="App shell"
  args={{}}
  argTypes={{
    nav: {
      control: false,
      description: "Sidebar content on --surface-app.",
    },
    children: {
      control: false,
      description: "Main content panel with its hairline and outer margin.",
    },
  }}
>
  {#snippet template(args)}
    <div class="t128n-shell-story__viewport">
      <AppShell nav={appNav} children={appMain} {...args} />
    </div>
  {/snippet}
</Story>

<Story
  name="Header"
  args={{ id: "issues-header" }}
  argTypes={{
    context: {
      control: false,
      description: "Context first: a breadcrumb, a heading or a back button.",
    },
    actions: {
      control: false,
      description:
        "Actions last: ghost icon buttons, at most one primary, at most one segmented control.",
    },
    id: {
      control: "text",
      description: "Optional id for the header landmark.",
    },
  }}
>
  {#snippet template(args)}
    <div class="t128n-shell-story__frame">
      <Header id={args.id} context={headerContext} actions={headerActions} />
      <div class="t128n-shell-story__body">
        <p class="t128n-shell-story__copy">
          The context is the first child and the actions are the last. The
          outermost ghost icons sit on the gutter line.
        </p>
      </div>
    </div>
  {/snippet}
</Story>

<Story
  name="Toolbar"
  args={{}}
  argTypes={{
    filters: {
      control: false,
      description: "Filters left, at --row-h height.",
    },
    search: {
      control: false,
      description: "Search control right of the filters.",
    },
    actions: {
      control: false,
      description: "Actions at the far right of the toolbar.",
    },
  }}
>
  {#snippet template(args)}
    <div class="t128n-shell-story__frame">
      <Toolbar
        filters={toolbarFilters}
        search={toolbarSearch}
        actions={toolbarActions}
        {...args}
      />
      <div class="t128n-shell-story__body">
        <p class="t128n-shell-story__copy">Rows start below the toolbar.</p>
      </div>
    </div>
  {/snippet}
</Story>

<Story
  name="Section header"
  args={{ title: "Labels" }}
  argTypes={{
    title: {
      control: "text",
      description: "Heading on the left in the heading role.",
    },
    actions: {
      control: false,
      description: "Ghost actions last. A section header has no rule.",
    },
  }}
>
  {#snippet template(args)}
    <div class="t128n-shell-story__frame">
      <SectionHeader title={args.title} actions={sectionActions} />
      <div class="t128n-shell-story__body">
        <p class="t128n-shell-story__copy">
          Section headers group content without adding another hairline.
        </p>
      </div>
    </div>
  {/snippet}
</Story>

<style>
  .t128n-shell-story__viewport {
    height: calc(var(--size-5) * 8);
    overflow: auto;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }

  .t128n-shell-story__nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: calc(var(--space-6) * 8);
    padding: var(--space-2);
    background: var(--surface-app);
  }

  .t128n-shell-story__nav-title {
    padding: 0 var(--space-2);
    font: var(--type-label);
    color: var(--text-3);
  }

  .t128n-shell-story__nav-item {
    display: flex;
    align-items: center;
    height: var(--row-h-sm);
    padding: 0 var(--space-2);
    border-radius: var(--radius-md);
    color: var(--text-2);
    font: var(--type-body);
    text-decoration: none;
  }

  .t128n-shell-story__nav-item:hover {
    background: var(--state-hover);
    color: var(--text-1);
  }

  .t128n-shell-story__nav-item:active {
    background: var(--state-pressed);
  }

  .t128n-shell-story__nav-item:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .t128n-shell-story__nav-item[aria-current="page"] {
    background: var(--state-selected);
    color: var(--text-1);
    font: var(--type-action);
  }

  .t128n-shell-story__page,
  .t128n-shell-story__body {
    padding: var(--space-6) var(--page-inset);
  }

  .t128n-shell-story__frame {
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
  }

  .t128n-shell-story__title {
    color: var(--text-1);
    font: var(--type-title);
  }

  .t128n-shell-story__copy {
    margin-top: var(--space-2);
    color: var(--text-2);
    font: var(--type-body);
  }

  .t128n-shell-story__search {
    display: inline-flex;
    align-items: center;
    height: calc(var(--control-h) - 4px);
    padding: 0 var(--space-3);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-md);
    color: var(--text-3);
    font: var(--type-caption);
  }
</style>
