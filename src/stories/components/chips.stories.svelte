<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Avatar from "../../lib/components/chips/Avatar.svelte";
  import Badge from "../../lib/components/chips/Badge.svelte";
  import Progress from "../../lib/components/chips/Progress.svelte";
  import StatCard from "../../lib/components/chips/StatCard.svelte";
  import Tag from "../../lib/components/chips/Tag.svelte";

  const { Story } = defineMeta({
    title: "Components/Chips",
    parameters: {
      docs: {
        description: {
          component:
            "Chips carry metadata and status without competing with the title. Tags are hues only and never imply status; badges pair a status dot with readable text; avatars are decorative initials; progress is always labelled; stat deltas pair an arrow glyph with a word so colour is never the only signal.",
        },
      },
    },
  });
</script>

<Story
  name="Tag"
  args={{ tone: "blue" }}
  argTypes={{
    tone: {
      control: "select",
      options: ["neutral", "blue", "green", "yellow", "red", "violet"],
      description: "Tag hue, never a status meaning.",
    },
    children: {
      control: false,
      description: "Tag label; the label is always visible text.",
    },
  }}
>
  {#snippet template(args: any)}
    <Tag tone={args.tone}>Bug</Tag>
  {/snippet}
</Story>

<Story
  name="Badge"
  args={{ tone: "success", dot: true }}
  argTypes={{
    tone: {
      control: "select",
      options: ["neutral", "success", "warning", "danger", "info"],
      description: "Status colour carried by the optional dot.",
    },
    dot: {
      control: "boolean",
      description: "Shows the status dot alongside the text label.",
    },
    children: {
      control: false,
      description: "Badge text label, always readable without the dot.",
    },
  }}
>
  {#snippet template(args: any)}
    <Badge tone={args.tone} dot={args.dot}>Synced</Badge>
  {/snippet}
</Story>

<Story
  name="Avatar"
  args={{ name: "Ada Lovelace", size: 3 }}
  argTypes={{
    name: {
      control: "text",
      description: "Full name used to derive initials.",
    },
    size: {
      control: "select",
      options: [1, 2, 3, 4, 5],
      description: "Diameter from the size ladder, --size-1 through --size-5.",
    },
  }}
>
  {#snippet template(args: any)}
    <Avatar {...args} />
  {/snippet}
</Story>

<Story
  name="Progress"
  args={{ value: 40, max: 100, label: "Upload" }}
  argTypes={{
    value: {
      control: "number",
      description: "Current progress value.",
    },
    max: {
      control: "number",
      description: "Upper bound of the progress range.",
    },
    label: {
      control: "text",
      description: "Accessible name announced with the progress bar.",
    },
  }}
>
  {#snippet template(args: any)}
    <Progress {...args} />
  {/snippet}
</Story>

<Story
  name="StatCard"
  args={{
    label: "Open issues",
    value: 24,
    delta: "+12% vs last week",
    trend: "up",
  }}
  argTypes={{
    label: {
      control: "text",
      description: "Metric name, rendered as a caption.",
    },
    value: {
      control: "text",
      description: "Metric value, rendered as the card title.",
    },
    delta: {
      control: "text",
      description: "Delta text shown beside the trend arrow.",
    },
    trend: {
      control: "select",
      options: ["up", "down", "flat"],
      description: "Chooses the arrow glyph and the trend word.",
    },
  }}
>
  {#snippet template(args: any)}
    <StatCard {...args} />
  {/snippet}
</Story>
