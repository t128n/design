<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import BoardCard from "../../lib/components/cards/BoardCard.svelte";
  import GalleryCard from "../../lib/components/cards/GalleryCard.svelte";

  const { Story } = defineMeta({
    title: "Components/Cards",
    parameters: {
      docs: {
        description: {
          component:
            "Cards group one record and keep the title dominant: one heading role, then id, tags and avatar. A card with an href is the whole click target and gains hover and pressed surfaces; without an href it stays plain content. The gallery card puts a sunken cover above the title and a caption in metadata colour, so an image never carries meaning the text does not.",
        },
      },
    },
  });
</script>

<Story
  name="BoardCard"
  args={{
    title: "Auth flow",
    id: "T-9",
    tags: [{ label: "Bug", tone: "blue" }],
    avatar: "Ada Lovelace",
    href: "/t/9",
  }}
  argTypes={{
    title: {
      control: "text",
      description: "Card title, the single heading role in the card.",
    },
    id: {
      control: "text",
      description: "Machine identifier, rendered mono in text-3.",
    },
    tags: {
      control: "object",
      description: "Hue-only tags: an array of { label, tone }.",
    },
    avatar: {
      control: "text",
      description: "Full name used to derive decorative avatar initials.",
    },
    href: {
      control: "text",
      description: "Makes the card a link; omitted, the card is plain content.",
    },
  }}
>
  {#snippet template(args: any)}
    <BoardCard {...args} />
  {/snippet}
</Story>

<Story
  name="GalleryCard"
  args={{
    title: "Specification",
    caption: "2 files",
    cover: "https://picsum.photos/seed/t128n/640/360",
    href: "/spec",
  }}
  argTypes={{
    title: {
      control: "text",
      description: "Card title below the cover, the single heading role.",
    },
    caption: {
      control: "text",
      description: "Metadata line under the title, rendered as a caption.",
    },
    cover: {
      control: "text",
      description: "Image URL for the sunken cover area; omitted, no cover shows.",
    },
    href: {
      control: "text",
      description: "Makes the card a link; omitted, the card is plain content.",
    },
  }}
>
  {#snippet template(args: any)}
    <GalleryCard {...args} />
  {/snippet}
</Story>
