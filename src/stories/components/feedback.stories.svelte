<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Banner from "../../lib/components/feedback/Banner.svelte";
  import EmptyState from "../../lib/components/feedback/EmptyState.svelte";
  import InlineError from "../../lib/components/feedback/InlineError.svelte";
  import Skeleton from "../../lib/components/feedback/Skeleton.svelte";
  import Tooltip from "../../lib/components/feedback/Tooltip.svelte";

  const { Story } = defineMeta<any, any>({
    title: "Components/Feedback",
    component: Banner,
    tags: ["autodocs"],
    parameters: {
      docs: {
        description: {
          component:
            "Feedback appears in place, never as a toast. Status always pairs colour with a glyph or text. Banners are reserved for system conditions, inline errors sit at the point of failure, and loading stays silent for the first 300ms before a caption and row-height skeletons appear.",
        },
      },
    },
  });
</script>

<Story
  name="Banner"
  args={{
    tone: "warning",
    title: "Sync delayed",
    description: "Changes will retry automatically.",
  }}
  argTypes={{
    tone: {
      control: "select",
      options: ["success", "warning", "danger", "info"],
    },
    title: { control: "text" },
    children: { control: false },
    action: { control: false },
  }}
>
  {#snippet template(args)}
    <Banner tone={args.tone} title={args.title}>
      {args.description}
    </Banner>
  {/snippet}
</Story>

<Story
  name="Inline error"
  args={{ message: "Could not save changes." }}
  argTypes={{
    message: { control: "text" },
    onRetry: { control: false },
  }}
>
  {#snippet template(args)}
    <InlineError message={args.message} onRetry={() => {}} />
  {/snippet}
</Story>

<Story
  name="Empty state"
  args={{
    title: "No projects yet",
    description: "Create a project to start tracking work.",
    icon: "folder",
  }}
  argTypes={{
    title: { control: "text" },
    description: { control: "text" },
    icon: { control: "text" },
    action: { control: false },
  }}
>
  {#snippet template(args)}
    <EmptyState title={args.title} description={args.description} icon={args.icon}>
      {#snippet action()}
        <button
          type="button"
          class="t128n-feedback-story__button t128n-feedback-story__button--primary"
        >
          New project
        </button>
      {/snippet}
    </EmptyState>
  {/snippet}
</Story>

<Story
  name="Skeleton"
  args={{ rows: 3 }}
  argTypes={{
    rows: { control: { type: "number", min: 1, max: 12 } },
  }}
>
  {#snippet template(args)}
    <div class="t128n-feedback-story__stack">
      <p class="t128n-feedback-story__caption">Loading issues…</p>
      <Skeleton rows={args.rows} />
    </div>
  {/snippet}
</Story>

<Story
  name="Tooltip"
  args={{ content: "Copy link", shortcut: "Ctrl C" }}
  argTypes={{
    content: { control: "text" },
    shortcut: { control: "text" },
    children: { control: false },
  }}
>
  {#snippet template(args)}
    <div class="t128n-feedback-story__stack">
      <Tooltip content={args.content} shortcut={args.shortcut}>
        Copy
      </Tooltip>
    </div>
  {/snippet}
</Story>

<style>
  .t128n-feedback-story__stack {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-4);
  }

  .t128n-feedback-story__caption {
    font: var(--type-caption);
    color: var(--text-3);
  }

  .t128n-feedback-story__button {
    height: var(--control-h);
    padding: 0 var(--space-3);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-action);
  }

  .t128n-feedback-story__button:hover {
    background: var(--surface-sunken);
  }

  .t128n-feedback-story__button:active {
    background: var(--state-pressed);
  }

  .t128n-feedback-story__button:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .t128n-feedback-story__button--primary {
    border: 0;
    background: var(--accent);
    color: var(--text-on-accent);
  }

  .t128n-feedback-story__button--primary:hover {
    background: color-mix(in srgb, var(--accent) 90%, var(--text-1));
  }
</style>
