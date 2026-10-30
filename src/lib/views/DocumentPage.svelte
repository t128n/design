<script lang="ts">
  import type { ComponentProps } from "svelte";

  import Button from "../components/button/Button.svelte";
  import IconButton from "../components/button/IconButton.svelte";
  import Callout from "../components/doc/Callout.svelte";
  import CodeBlock from "../components/doc/CodeBlock.svelte";
  import PropertyRow from "../components/list/PropertyRow.svelte";
  import Toggle from "../components/list/Toggle.svelte";
  import Header from "../components/shell/Header.svelte";
  import Icon from "../icons/Icon.svelte";

  type IconName = ComponentProps<typeof Icon>["name"];
  type CalloutTone = ComponentProps<typeof Callout>["tone"];

  export interface DocumentProperty {
    label: string;
    value: string;
    icon?: IconName;
  }

  export interface DocumentBlock {
    type: "callout" | "heading" | "checklist" | "toggle" | "code";
    text?: string;
    title?: string;
    tone?: CalloutTone;
    open?: boolean;
    language?: string;
    code?: string;
    items?: { label: string; done?: boolean }[];
  }

  export interface DocumentPageData {
    title: string;
    icon?: IconName;
    breadcrumb?: string[];
    properties?: DocumentProperty[];
    blocks?: DocumentBlock[];
  }

  interface Props {
    page: DocumentPageData;
  }

  let { page }: Props = $props();
</script>

{#snippet context()}
  <nav class="t128n-document__crumbs" aria-label="Breadcrumb">
    {#each page.breadcrumb ?? [] as crumb (crumb)}
      <span class="t128n-document__crumb">{crumb}</span>
      <span class="t128n-document__crumb-sep" aria-hidden="true">
        <Icon name="chevron-right" size={12} />
      </span>
    {/each}
    <span class="t128n-document__crumb-current">{page.title}</span>
  </nav>
{/snippet}

{#snippet actions()}
  <IconButton label="More actions" icon="more" />
  <Button variant="primary">Edit</Button>
{/snippet}

<div class="t128n-document" data-testid="document-page">
  <Header context={context} actions={actions} />

  <div class="t128n-page">
    <article class="t128n-document__reading" data-testid="page-reading">
      <div class="t128n-document__masthead">
        <span class="t128n-document__icon" aria-hidden="true">
          <Icon name={page.icon ?? "command"} size={20} />
        </span>
        <h1 class="t128n-document__title">{page.title}</h1>
      </div>

      {#if page.properties?.length}
        <div class="t128n-document__properties">
          {#each page.properties as property (property.label)}
            <PropertyRow label={property.label} icon={property.icon} editable>
              {property.value}
            </PropertyRow>
          {/each}
        </div>
      {/if}

      <div class="t128n-document__blocks">
        {#each page.blocks ?? [] as block, index (index)}
          {#if block.type === "callout"}
            <Callout tone={block.tone ?? "note"} title={block.title}>
              {block.text ?? ""}
            </Callout>
          {:else if block.type === "heading"}
            <h2 class="t128n-document__heading">{block.text}</h2>
          {:else if block.type === "checklist"}
            <ul class="t128n-document__checklist">
              {#each block.items ?? [] as item (item.label)}
                <li
                  class="t128n-document__checklist-item"
                  class:t128n-document__checklist-item--done={item.done}
                >
                  <span class="t128n-document__check" aria-hidden="true">
                    {#if item.done}
                      <Icon name="check" />
                    {:else}
                      <span class="t128n-document__check-box"></span>
                    {/if}
                  </span>
                  <span>{item.label}</span>
                </li>
              {/each}
            </ul>
          {:else if block.type === "toggle"}
            <Toggle title={block.title ?? ""} open={block.open ?? false}>
              {block.text ?? ""}
            </Toggle>
          {:else if block.type === "code"}
            <CodeBlock code={block.code ?? ""} language={block.language} />
          {/if}
        {/each}
      </div>
    </article>
  </div>
</div>

<style>
  .t128n-document {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    background: var(--surface-panel);
  }

  .t128n-document__crumbs {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
  }

  .t128n-document__crumb {
    color: var(--text-2);
    font: var(--type-body);
  }

  .t128n-document__crumb-sep {
    display: inline-flex;
    flex: none;
    color: var(--text-3);
  }

  .t128n-document__crumb-current {
    overflow: hidden;
    color: var(--text-1);
    font: var(--type-action);
    text-overflow: ellipsis;
  }

  .t128n-document__reading {
    width: 100%;
    max-width: var(--width-reading);
    margin-inline: auto;
  }

  .t128n-document__masthead {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-width: 0;
  }

  .t128n-document__icon {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: var(--size-4);
    height: var(--size-4);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
    color: var(--text-2);
  }

  .t128n-document__title {
    min-width: 0;
    margin: 0;
    color: var(--text-1);
    font: var(--type-display);
  }

  .t128n-document__properties {
    display: flex;
    flex-direction: column;
    margin-top: var(--space-6);
    padding: var(--space-2) 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .t128n-document__blocks {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-top: var(--space-6);
  }

  .t128n-document__heading {
    margin: 0;
    color: var(--text-1);
    font: var(--type-title);
  }

  .t128n-document__checklist {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .t128n-document__checklist-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--text-1);
    font: var(--type-body);
  }

  .t128n-document__checklist-item--done {
    color: var(--text-2);
  }

  .t128n-document__check {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: var(--icon);
    height: var(--icon);
    color: var(--text-2);
  }

  .t128n-document__check-box {
    box-sizing: border-box;
    width: var(--icon);
    height: var(--icon);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-xs);
  }
</style>
