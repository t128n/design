<script module lang="ts">
  export interface SettingsControl {
    type: "switch" | "text" | "email" | "danger";
    value?: string | boolean;
    actionLabel?: string;
    disabled?: boolean;
  }

  export interface SettingsRow {
    id: string;
    label: string;
    description?: string;
    control: SettingsControl;
  }

  export interface SettingsSection {
    id: string;
    label: string;
    icon?: string;
    danger?: boolean;
    rows: SettingsRow[];
  }
</script>

<script lang="ts">
  import { untrack } from "svelte";

  import Button from "../components/button/Button.svelte";
  import Switch from "../components/choice/Switch.svelte";
  import Field from "../components/field/Field.svelte";
  import Input from "../components/field/Input.svelte";
  import Sidebar from "../components/nav/Sidebar.svelte";
  import Header from "../components/shell/Header.svelte";

  interface Props {
    sections?: SettingsSection[];
    active?: string;
    values?: Record<string, string | boolean>;
    onChange?: (id: string, value: string | boolean) => void;
  }

  let {
    sections = [],
    active = sections[0]?.id ?? "",
    values = {},
    onChange,
  }: Props = $props();

  function initialSwitches(
    source: Record<string, string | boolean>,
    sectionList: SettingsSection[],
  ): Record<string, boolean> {
    const state: Record<string, boolean> = {};
    for (const section of sectionList) {
      for (const row of section.rows) {
        if (row.control.type !== "switch") continue;
        const provided = source[row.id];
        state[row.id] = typeof provided === "boolean" ? provided : false;
      }
    }
    return state;
  }

  let localValues = $state<Record<string, string | boolean>>(
    untrack(() => ({ ...values })),
  );
  let switchValues = $state<Record<string, boolean>>(
    untrack(() => initialSwitches(values, sections)),
  );
  let emitted = $state<Record<string, boolean>>({});

  $effect(() => {
    localValues = { ...values };
    switchValues = initialSwitches(values, sections);
  });

  // Switch is a bindable control; watch its value and report real changes.
  $effect(() => {
    for (const section of sections) {
      for (const row of section.rows) {
        if (row.control.type !== "switch") continue;

        const current = switchValues[row.id] ?? false;
        if (!(row.id in emitted)) {
          emitted[row.id] = current;
        } else if (emitted[row.id] !== current) {
          emitted[row.id] = current;
          onChange?.(row.id, current);
        }
      }
    }
  });

  const groups = $derived([
    {
      label: "Settings",
      items: sections.map((section) => ({
        id: section.id,
        label: section.label,
        icon: section.icon,
      })),
    },
  ]);

  function textValue(row: SettingsRow): string {
    const value = localValues[row.id] ?? row.control.value;
    return typeof value === "string" ? value : "";
  }

  function typeValue(row: SettingsRow, event: Event): void {
    const value = (event.currentTarget as HTMLInputElement).value;
    localValues[row.id] = value;
    onChange?.(row.id, value);
  }
</script>

<div class="t128n-settings" data-testid="settings">
  <Header>
    {#snippet context()}
      <span>Settings</span>
    {/snippet}
    {#snippet actions()}
      <Button>Cancel</Button>
      <Button variant="primary">Save changes</Button>
    {/snippet}
  </Header>

  <div class="t128n-settings__body">
    <aside class="t128n-settings__nav">
      <Sidebar {groups} {active} />
    </aside>

    <div class="t128n-settings__content">
      {#each sections as section (section.id)}
        <section
          class="t128n-settings__section"
          class:t128n-settings__section--danger={section.danger}
          data-testid={section.danger ? "danger-zone" : undefined}
          aria-labelledby={`settings-${section.id}-title`}
          id={`settings-${section.id}`}
        >
          <h2 class="t128n-settings__heading" id={`settings-${section.id}-title`}>
            {section.label}
          </h2>

          <div class="t128n-settings__rows">
            {#each section.rows as row (row.id)}
              <div class="t128n-settings__row" data-testid="settings-row">
                <div class="t128n-settings__copy">
                  <span class="t128n-settings__label">{row.label}</span>
                  {#if row.description}
                    <span class="t128n-settings__description">
                      {row.description}
                    </span>
                  {/if}
                </div>

                <div class="t128n-settings__control">
                  {#if row.control.type === "switch"}
                    <Switch
                      bind:checked={
                        () => switchValues[row.id] ?? false,
                        (checked) => {
                          switchValues[row.id] = checked;
                        }
                      }
                      disabled={row.control.disabled}
                      label={row.label}
                    />
                  {:else if row.control.type === "danger"}
                    <Button variant="danger">
                      {row.control.actionLabel ?? row.label}
                    </Button>
                  {:else}
                    <Field label={row.label} id={row.id}>
                      <Input
                        id={row.id}
                        type={row.control.type}
                        value={textValue(row)}
                        disabled={row.control.disabled}
                        oninput={(event) => typeValue(row, event)}
                      />
                    </Field>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </section>
      {/each}
    </div>
  </div>
</div>

<style>
  .t128n-settings {
    display: flex;
    flex-direction: column;
    min-height: 0;
    background: var(--surface-panel);
    color: var(--text-1);
  }

  .t128n-settings__body {
    display: flex;
    flex: 1 1 auto;
    min-height: 0;
  }

  .t128n-settings__nav {
    flex: 0 0 calc(var(--width-label) + var(--space-6));
    min-width: 0;
    overflow-y: auto;
    background: var(--surface-app);
  }

  .t128n-settings__content {
    flex: 1 1 auto;
    min-width: 0;
    overflow: auto;
    padding: var(--space-6) var(--page-inset);
  }

  .t128n-settings__section {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin-bottom: var(--space-6);
  }

  .t128n-settings__section:last-child {
    margin-bottom: 0;
  }

  .t128n-settings__section--danger {
    padding: var(--space-3);
    border: 1px solid
      color-mix(in srgb, var(--danger) var(--tint-strong), var(--surface-panel));
    border-radius: var(--radius-lg);
  }

  .t128n-settings__heading {
    margin: 0;
    color: var(--text-1);
    font: var(--type-heading);
  }

  .t128n-settings__section--danger .t128n-settings__heading {
    color: var(--danger);
  }

  .t128n-settings__rows {
    display: flex;
    flex-direction: column;
  }

  .t128n-settings__row {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-3) 0;
    border-bottom: 1px solid var(--border);
  }

  .t128n-settings__row:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }

  .t128n-settings__copy {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 0;
  }

  .t128n-settings__label {
    color: var(--text-1);
    font: var(--type-body);
  }

  .t128n-settings__description {
    color: var(--text-3);
    font: var(--type-caption);
  }

  .t128n-settings__control {
    display: flex;
    flex: 0 0 calc(var(--width-label) * 2);
    align-items: center;
    justify-content: flex-end;
    min-width: 0;
  }

  .t128n-settings__control :global(.t128n-field) {
    flex: 1 1 auto;
    gap: 0;
  }

  /* The row copy is the visible label; the control keeps its own label for
   * its accessible name only. */
  .t128n-settings__control :global(.t128n-field__label),
  .t128n-settings__control :global(.t128n-switch__label) {
    position: absolute;
    width: var(--radius-xs);
    height: var(--radius-xs);
    margin: 0;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }
</style>
