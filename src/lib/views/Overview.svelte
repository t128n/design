<script lang="ts">
  import Button from "../components/button/Button.svelte";
  import StatCard from "../components/chips/StatCard.svelte";
  import type { StatTrend } from "../components/chips/StatCard.svelte";
  import Chart from "../components/doc/Chart.svelte";
  import SegmentedControl from "../components/nav/SegmentedControl.svelte";
  import Header from "../components/shell/Header.svelte";
  import Table from "../components/table/Table.svelte";
  import type { TableColumn } from "../components/table/Table.svelte";

  export interface OverviewStat {
    label: string;
    value: string | number;
    delta?: string;
    trend?: StatTrend;
  }

  export type OverviewProject = {
    id: string;
    name: string;
    owner: string;
    status: string;
  };

  interface Props {
    stats: OverviewStat[];
    series: number[];
    projects: OverviewProject[];
    range: string;
  }

  let { stats, series, projects, range }: Props = $props();

  const rangeOptions = [
    { id: "7d", label: "7 days" },
    { id: "30d", label: "30 days" },
    { id: "90d", label: "90 days" },
  ];

  const projectColumns: TableColumn[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Project" },
    { key: "owner", label: "Owner" },
    { key: "status", label: "Status", align: "end" },
  ];
</script>

{#snippet headerContext()}
  <span class="t128n-overview__title">Overview</span>
{/snippet}

{#snippet headerActions()}
  <SegmentedControl options={rangeOptions} value={range} />
  <Button variant="primary">New project</Button>
{/snippet}

<Header context={headerContext} actions={headerActions} />

<div class="t128n-page t128n-overview">
  <div class="t128n-stack">
    <section
      class="t128n-overview__stats t128n-grid t128n-grid--3"
      data-testid="stats"
      aria-label="Summary"
    >
      {#each stats as stat}
        <StatCard {...stat} />
      {/each}
    </section>

    <section class="t128n-overview__section" aria-labelledby="overview-activity">
      <h2 class="t128n-overview__heading" id="overview-activity">Activity</h2>
      <Chart values={series} label="Activity" height={160} />
    </section>

    <section class="t128n-overview__section" aria-labelledby="overview-projects">
      <h2 class="t128n-overview__heading" id="overview-projects">Projects</h2>
      <Table columns={projectColumns} rows={projects} caption="Projects" />
    </section>
  </div>
</div>

<style>
  .t128n-overview {
    color: var(--text-1);
  }

  .t128n-overview__heading {
    margin: 0;
    color: var(--text-1);
    font: var(--type-heading);
  }
</style>
