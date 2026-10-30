<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import ErrorView from "../../lib/views/ErrorView.svelte";
  import ViewFrame from "./ViewFrame.svelte";

  const { Story } = defineMeta<any, any>({
    title: "Views/Error",
    component: ErrorView,
    tags: ["autodocs"],
    parameters: {
      docs: {
        description: {
          component:
            "An error view is full-bleed: no header, because navigation cannot be trusted when the system is unreachable. A danger banner names the system condition and a centred empty state offers Retry. The banner is for system-level failure only; failures inside a loaded view belong inline at the point of failure.",
        },
      },
    },
  });
</script>

<Story
  name="Error"
  args={{
    message: "Offline",
    onRetry: () => {},
  }}
  argTypes={{
    message: {
      control: "text",
      description: "The system condition named in the danger banner.",
    },
    onRetry: {
      control: false,
      description: "Called by the Retry action.",
    },
  }}
>
  {#snippet template(args)}
    <ViewFrame active="overview">
      <ErrorView message={args.message} onRetry={args.onRetry} />
    </ViewFrame>
  {/snippet}
</Story>
