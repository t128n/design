<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Button from "../../lib/components/button/Button.svelte";
  import IconButton from "../../lib/components/button/IconButton.svelte";

  const { Story } = defineMeta({
    title: "Components/Button",
    parameters: {
      docs: {
        description: {
          component:
            "Buttons are --control-h tall with --space-3 horizontal padding, --radius-md corners and --type-action. Secondary sits on the panel with a --border-control edge; primary is the single accent action a view may have; ghost is text-2 and becomes text-1 on hover; danger only confirms an irreversible step and names its consequence. Every variant uses the five shared states: default, --state-hover or --surface-sunken, --state-pressed, a 2px focus ring, and a --surface-sunken disabled fill with --text-2 text that stays visible. Sizes change the height by 4px down and 8px up on the --control-h token only. Icon-only buttons are square and require an aria-label.",
        },
      },
    },
    argTypes: {
      variant: {
        control: "select",
        options: ["secondary", "primary", "ghost", "danger"],
        description: "Fill and text treatment.",
      },
      size: {
        control: "select",
        options: ["sm", "md", "lg"],
        description: "Height and type role.",
      },
      type: {
        control: "select",
        options: ["button", "submit", "reset"],
        description: "Native button type; ignored when href is set.",
      },
      disabled: {
        control: "boolean",
        description: "Keeps the label visible and disables interaction.",
      },
      href: {
        control: "text",
        description: "Renders an anchor instead of a button.",
      },
      children: {
        control: false,
        description: "Button label. Name the action.",
      },
    },
  });
</script>

{#snippet template(args: any)}
  <Button {...args}>Create issue</Button>
{/snippet}

{#snippet dangerTemplate(args: any)}
  <Button {...args}>Delete 142 issues</Button>
{/snippet}

<Story
  name="Secondary"
  args={{ variant: "secondary", size: "md", type: "button", disabled: false }}
  {template}
/>

<Story
  name="Primary"
  args={{ variant: "primary", size: "md", type: "button", disabled: false }}
  {template}
/>

<Story
  name="Ghost"
  args={{ variant: "ghost", size: "md", type: "button", disabled: false }}
  {template}
/>

<Story
  name="Danger"
  args={{ variant: "danger", size: "md", type: "button", disabled: false }}
  template={dangerTemplate}
/>

<Story
  name="Small"
  args={{ variant: "secondary", size: "sm", type: "button", disabled: false }}
  {template}
/>

<Story
  name="Large"
  args={{ variant: "secondary", size: "lg", type: "button", disabled: false }}
  {template}
/>

<Story
  name="Disabled"
  args={{ variant: "primary", size: "md", type: "button", disabled: true }}
  {template}
/>

<Story
  name="Anchor"
  args={{ variant: "ghost", size: "md", href: "/issues", disabled: false }}
  {template}
/>

<Story
  name="Icon button"
  args={{ label: "More", icon: "more", variant: "ghost", disabled: false }}
  argTypes={{
    label: { control: "text", description: "Accessible name; required." },
    icon: {
      control: "select",
      options: [
        "chevron-down",
        "chevron-right",
        "chevron-left",
        "chevron-up",
        "check",
        "search",
        "x",
        "plus",
        "more",
        "alert",
        "info",
        "success",
        "clock",
        "calendar",
        "arrow-up",
        "arrow-down",
        "arrow-right",
        "trash",
        "command",
        "dot",
      ],
      description: "Glyph rendered at --icon.",
    },
    variant: {
      control: "select",
      options: ["secondary", "primary", "ghost", "danger"],
      description: "Same fill and text rules as Button.",
    },
    disabled: {
      control: "boolean",
      description: "Keeps the icon visible and disables interaction.",
    },
  }}
>
  {#snippet template(args: any)}
    <IconButton {...args} />
  {/snippet}
</Story>
