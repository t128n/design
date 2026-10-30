<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { Pagination } from "../../lib/components/pagination";

  const { Story } = defineMeta({
    title: "Components/Pagination",
    component: Pagination,
    parameters: {
      docs: {
        description: {
          component:
            "Pagination uses icon buttons for previous and next plus numbered page buttons in --type-action. The current page carries the selected tint and aria-current, and disabled steps stay visible rather than disappearing.",
        },
      },
    },
    argTypes: {
      page: {
        control: { type: "number", min: 1 },
        description: "Current page, one-based.",
      },
      pages: {
        control: { type: "number", min: 1 },
        description: "Total number of pages.",
      },
      onChange: {
        action: "pageChanged",
        description: "Called with the requested page when a step or number is chosen.",
      },
    },
  });
</script>

<Story name="Default" args={{ page: 2, pages: 5 }} />

<Story name="First page" args={{ page: 1, pages: 5 }} />

<Story name="Last page" args={{ page: 5, pages: 5 }} />
