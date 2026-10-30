<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Inbox from "../../lib/views/Inbox.svelte";
  import ViewFrame from "./ViewFrame.svelte";

  const { Story } = defineMeta<any, any>({
    title: "Views/Inbox",
    component: Inbox,
    tags: ["autodocs"],
    parameters: {
      docs: {
        description: {
          component:
            "The inbox follows section 9.4: an unread row pairs a dot with an --type-action title, so attention never relies on colour alone. The header uses the standard anatomy and holds the view's single primary action; tabs switch the set rather than the data. Secondary actions fade in on hover but stay in the tab order, so the same actions are reachable by keyboard. Timestamps are captions, and the list keeps the shared --row-h rhythm with no dividers.",
        },
      },
    },
  });

  const items = [
    {
      id: "n-1",
      title: "Sync failed",
      date: "2m",
      unread: true,
      avatar: "Ada Lovelace",
      labels: ["integration"],
    },
    {
      id: "n-2",
      title: "Build passed",
      date: "1h",
      unread: true,
      avatar: "Grace Hopper",
      labels: ["deploy"],
    },
    {
      id: "n-3",
      title: "Mentioned in AUTH-12",
      date: "3h",
      unread: false,
      avatar: "Alan Turing",
      labels: ["auth"],
    },
  ];
</script>

<Story
  name="Inbox"
  args={{ items, active: "all" }}
  argTypes={{
    items: {
      control: "object",
      description:
        "Inbox entries: id, title, optional date, avatar, labels and unread flag.",
    },
    active: {
      control: "select",
      options: ["all", "unread"],
      description: "Tab id used as the initial filter.",
    },
    onRead: {
      control: false,
      description: "Called with the item id when a row opens.",
    },
  }}
>
  {#snippet template(args: any)}
    <ViewFrame active="inbox">
      <Inbox {...args} />
    </ViewFrame>
  {/snippet}
</Story>
