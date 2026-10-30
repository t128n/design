<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Overview from "../../lib/views/Overview.svelte";

  const stats = [
    { label: "Open issues", value: 128, delta: "12%", trend: "down" as const },
    { label: "Cycle time", value: "2.4d", delta: "0.3d", trend: "up" as const },
    { label: "Throughput", value: 48, delta: "6", trend: "flat" as const },
  ];

  const series = [4, 7, 5, 9, 6, 11, 8];

  const projects = [
    { id: "PR-1", name: "Atlas", owner: "Ada Lovelace", status: "On track" },
    { id: "PR-2", name: "Beacon", owner: "Grace Hopper", status: "At risk" },
    { id: "PR-3", name: "Cirrus", owner: "Alan Turing", status: "Paused" },
  ];

  const { Story } = defineMeta<any, any>({
    title: "Views/Overview",
    component: Overview,
    parameters: {
      docs: {
        description: {
          component:
            "The overview composes the shared header with a range control, then a three-column stat grid, one accent activity chart and a projects table. Every number is text, so the view survives greyscale; the chart is a single labelled image with a baseline only. The header keeps context first and actions last, and the view shows one primary action at most.",
        },
      },
    },
    argTypes: {
      stats: {
        control: "object",
        description:
          "Stat cards as { label, value, delta?, trend? } objects laid out in .t128n-grid--3.",
      },
      series: {
        control: "object",
        description: "Activity values for the single-series chart.",
      },
      projects: {
        control: "object",
        description:
          "Project rows as { id, name, owner, status } objects for the projects table.",
      },
      range: {
        control: "select",
        options: ["7d", "30d", "90d"],
        description: "Selected range in the header segmented control.",
      },
    },
  });
</script>

<Story
  name="Thirty days"
  args={{ stats, series, projects, range: "30d" }}
/>

<Story
  name="Seven days"
  args={{ stats, series, projects, range: "7d" }}
/>

<Story
  name="Ninety days"
  args={{ stats, series, projects, range: "90d" }}
/>
