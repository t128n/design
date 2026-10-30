<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { Tree } from "../../lib/components/tree";

  const nodes = [
    {
      id: "docs",
      label: "Docs",
      children: [
        { id: "runbook", label: "Runbook" },
        {
          id: "spec",
          label: "Spec",
          children: [{ id: "deep", label: "Deep dive" }],
        },
      ],
    },
    { id: "issues", label: "Issues" },
    { id: "releases", label: "Releases" },
  ];

  const { Story } = defineMeta({
    title: "Components/Tree",
    component: Tree,
    parameters: {
      docs: {
        description: {
          component:
            "A tree shows hierarchy in --control-h rows indented by one --icon per level. Chevrons expand, arrow keys navigate, and the add and more actions appear on hover while staying reachable by keyboard.",
        },
      },
    },
    argTypes: {
      nodes: {
        control: "object",
        description: "Hierarchy of nodes; children nest one indent level deeper.",
      },
      expanded: {
        control: "object",
        description: "IDs that are open when the tree mounts or is re-controlled.",
      },
      selected: {
        control: "text",
        description: "ID of the selected node, rendered with the selected tint.",
      },
      onToggle: {
        action: "toggled",
        description: "Called with the node ID and the next expanded set.",
      },
    },
  });
</script>

<Story name="Default" args={{ nodes, expanded: ["docs"], selected: "runbook" }} />

<Story name="Collapsed" args={{ nodes, expanded: [] }} />

<Story name="Deep tree" args={{ nodes, expanded: ["docs", "spec"], selected: "deep" }} />
