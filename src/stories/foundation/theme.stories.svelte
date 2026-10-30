<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Theme from "../../lib/theme/Theme.svelte";

  const { Story } = defineMeta({
    title: "Foundation/Theme",
    component: Theme,
    parameters: {
      docs: {
        description: {
          component:
            "Theme is the container that scopes the semantic tokens: `data-theme` picks the surface palette, `data-density` sets row and control heights, and `data-lines` sets the hairline mode. Surfaces separate regions before borders do; text has three tiers and type only ever comes from the `--type-*` shorthands. Never hard-code a colour or a size in a consumer.",
        },
      },
    },
    argTypes: {
      theme: {
        control: "inline-radio",
        options: ["light", "dark"],
        description: "Surface palette, from `--surface-app` through `--text-1`.",
      },
      density: {
        control: "inline-radio",
        options: ["compact", "default", "comfortable"],
        description:
          "Sets `--row-h`, `--row-h-sm` and `--control-h`; components read the tokens.",
      },
      lines: {
        control: "inline-radio",
        options: ["none", "faint", "visible"],
        description:
          "Sets `--border-alpha`; `--border-control` stays visible even when lines are off.",
      },
      children: { control: false },
    },
  });
</script>

<Story
  name="Surfaces and text"
  args={{ theme: "light", density: "default", lines: "faint" }}
>
  <div class="t128n-page theme-demo">
    <header class="theme-demo__header">
      <h1 class="theme-demo__title">Design tokens</h1>
      <p class="theme-demo__caption">One surface per region, one type role per job.</p>
    </header>

    <div class="t128n-grid t128n-grid--3">
      <div class="theme-demo__swatch theme-demo__swatch--app">
        <span class="theme-demo__label">surface-app</span>
        <span class="theme-demo__note">Chrome and sidebar</span>
      </div>
      <div class="theme-demo__swatch theme-demo__swatch--panel">
        <span class="theme-demo__label">surface-panel</span>
        <span class="theme-demo__note">Panes, controls, cards</span>
      </div>
      <div class="theme-demo__swatch theme-demo__swatch--sunken">
        <span class="theme-demo__label">surface-sunken</span>
        <span class="theme-demo__note">Wells, code, table heads</span>
      </div>
    </div>

    <div class="t128n-stack t128n-stack--tight theme-demo__text">
      <p class="theme-demo__display">Display 32/40</p>
      <p class="theme-demo__heading">Heading 14/20</p>
      <p class="theme-demo__body">Body 13/20 is the default text role.</p>
      <p class="theme-demo__secondary">Secondary text uses body + text-2.</p>
      <p class="theme-demo__caption">Caption 12/16 in text-3 for metadata.</p>
      <p class="theme-demo__mono">T-1428</p>
    </div>
  </div>
</Story>

<Story
  name="Layout skeletons"
  args={{ theme: "light", density: "default", lines: "faint" }}
>
  <div class="theme-demo__frame">
    <div class="t128n-app-shell">
      <aside class="t128n-app-shell__nav theme-demo__nav">
        <span class="theme-demo__label">nav</span>
      </aside>
      <main class="t128n-app-shell__main">
        <div class="t128n-split">
          <div class="t128n-split__list theme-demo__pane">
            <div class="t128n-stack t128n-stack--tight">
              <span class="theme-demo__heading">Split list</span>
              <span class="theme-demo__caption">Rows live here.</span>
            </div>
          </div>
          <div class="t128n-split__detail theme-demo__pane">
            <span class="theme-demo__caption">Detail pane, --width-detail</span>
          </div>
        </div>
      </main>
    </div>
  </div>
</Story>

<style>
  .theme-demo__header {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    margin-bottom: var(--space-5);
  }

  .theme-demo__title {
    font: var(--type-title);
    color: var(--text-1);
  }

  .theme-demo__caption {
    font: var(--type-caption);
    color: var(--text-3);
  }

  .theme-demo__swatch {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-3);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }

  .theme-demo__swatch--app {
    background: var(--surface-app);
  }

  .theme-demo__swatch--panel {
    background: var(--surface-panel);
  }

  .theme-demo__swatch--sunken {
    background: var(--surface-sunken);
  }

  .theme-demo__label {
    font: var(--type-label);
    color: var(--text-2);
  }

  .theme-demo__note {
    font: var(--type-caption);
    color: var(--text-3);
  }

  .theme-demo__text {
    margin-top: var(--space-5);
  }

  .theme-demo__display {
    font: var(--type-display);
    color: var(--text-1);
  }

  .theme-demo__heading {
    font: var(--type-heading);
    color: var(--text-1);
  }

  .theme-demo__body {
    font: var(--type-body);
    color: var(--text-1);
  }

  .theme-demo__secondary {
    font: var(--type-body);
    color: var(--text-2);
  }

  .theme-demo__mono {
    font: var(--type-mono);
    color: var(--text-3);
  }

  .theme-demo__frame {
    min-height: 100vh;
    background: var(--surface-app);
  }

  .theme-demo__nav {
    min-width: var(--width-label);
  }

  .theme-demo__pane {
    padding: var(--space-3);
  }
</style>
