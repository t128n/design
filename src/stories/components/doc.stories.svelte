<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Callout from "../../lib/components/doc/Callout.svelte";
  import Chart from "../../lib/components/doc/Chart.svelte";
  import CodeBlock from "../../lib/components/doc/CodeBlock.svelte";

  const { Story } = defineMeta({
    title: "Components/Documents",
    parameters: {
      docs: {
        description: {
          component:
            "Document blocks stay quiet until they carry meaning. A chart is one labelled series with one accent; gridlines are a baseline only and there is no legend. Code blocks sit on the sunken surface in the mono role. Callouts are contextual notes inside documents, never system banners: a leading icon pairs with the tone so colour is not the only signal.",
        },
      },
    },
  });
</script>

<Story
  name="Chart"
  args={{ values: [4, 7, 5, 9, 6, 11, 8], label: "Issues opened per week", height: 120 }}
  argTypes={{
    values: {
      control: "object",
      description: "Series values in order; only the last bar is full accent.",
    },
    label: {
      control: "text",
      description: "Accessible name for the single image role.",
    },
    height: {
      control: { type: "number", min: 40, max: 320 },
      description: "Rendered plot height in pixels.",
    },
  }}
>
  {#snippet template(args: any)}
    <Chart values={args.values} label={args.label} height={args.height} />
  {/snippet}
</Story>

<Story
  name="Code block"
  args={{ code: "npm test -- src/lib/components/doc", language: "bash" }}
  argTypes={{
    code: {
      control: "text",
      description: "Code text rendered in the mono type role.",
    },
    language: {
      control: "text",
      description: "Optional language caption above the block.",
    },
  }}
>
  {#snippet template(args: any)}
    <CodeBlock code={args.code} language={args.language} />
  {/snippet}
</Story>

<Story
  name="Callout"
  args={{
    tone: "info",
    icon: "info",
    title: "Heads up",
    body: "Deploys are paused while the migration runs.",
  }}
  argTypes={{
    tone: {
      control: "select",
      options: ["note", "info", "success", "warning", "danger"],
      description: "Colours the leading icon; the surface stays sunken.",
    },
    icon: {
      control: "text",
      description: "Icon name from the shared 16px set.",
    },
    title: {
      control: "text",
      description: "Optional callout title in the action role.",
    },
    children: { control: false },
  }}
>
  {#snippet template(args: any)}
    <Callout tone={args.tone} icon={args.icon} title={args.title}>
      {args.body}
    </Callout>
  {/snippet}
</Story>
