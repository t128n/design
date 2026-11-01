<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import { Accordion } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import ChevronDownIcon from '~icons/carbon/chevron-down';
  import Icon from './Icon.svelte';

  type AccordionItem = {
    value: string;
    title: string;
    content?: Snippet;
    disabled?: boolean;
  };

  type Props = {
    items: AccordionItem[];
    type?: 'single' | 'multiple';
    value?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    disabled?: boolean;
    class?: string;
  };

  let {
    items,
    type = 'single',
    value = $bindable(
      type === 'single' ? (items[0]?.value ?? '') : []
    ),
    onValueChange,
    disabled = false,
    class: className = ''
  }: Props = $props();
</script>

<div class="accordion {className}">
  {#if type === 'single'}
    <Accordion.Root type="single" bind:value={value as string} {onValueChange} {disabled}>
      {#each items as item}
        <Accordion.Item value={item.value} disabled={item.disabled} class="accordion-item">
          <Accordion.Header class="accordion-header">
            <Accordion.Trigger class="accordion-trigger">
              <span class="accordion-trigger-label">{item.title}</span>
              <Icon icon={ChevronDownIcon} class="accordion-chevron" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content class="accordion-content">
            <div class="accordion-content-inner">
              {@render item.content?.()}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      {/each}
    </Accordion.Root>
  {:else}
    <Accordion.Root type="multiple" bind:value={value as string[]} {onValueChange} {disabled}>
      {#each items as item}
        <Accordion.Item value={item.value} disabled={item.disabled} class="accordion-item">
          <Accordion.Header class="accordion-header">
            <Accordion.Trigger class="accordion-trigger">
              <span class="accordion-trigger-label">{item.title}</span>
              <Icon icon={ChevronDownIcon} class="accordion-chevron" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content class="accordion-content">
            <div class="accordion-content-inner">
              {@render item.content?.()}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      {/each}
    </Accordion.Root>
  {/if}
</div>

<style>
  .accordion {
    width: 100%;
    font-family: var(--font-family-sans);
    color: var(--color-text-primary);
  }

  .accordion :global(.accordion-item) {
    border-bottom: var(--border-width) solid var(--color-border);
  }

  .accordion :global(.accordion-item:first-child) {
    border-top: var(--border-width) solid var(--color-border);
  }

  .accordion :global(.accordion-header) {
    margin: 0;
  }

  .accordion :global(.accordion-trigger) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: var(--space-sm);
    padding: var(--space-md) 0;
    border: 0;
    background: transparent;
    color: var(--color-text-primary);
    font: inherit;
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
    text-align: left;
    cursor: pointer;
  }

  .accordion :global(.accordion-trigger:hover:not(:disabled)) {
    color: var(--color-text-primary);
  }

  .accordion :global(.accordion-trigger:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
    border-radius: var(--radius-sm);
  }

  .accordion :global(.accordion-trigger:disabled) {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .accordion-trigger-label {
    flex: 1;
  }

  .accordion :global(.accordion-chevron) {
    flex-shrink: 0;
    color: var(--color-text-secondary);
    transition: transform var(--transition-duration);
  }

  .accordion :global(.accordion-item[data-state='open']) :global(.accordion-chevron) {
    transform: rotate(180deg);
  }

  .accordion :global(.accordion-content) {
    overflow: hidden;
  }

  .accordion-content-inner {
    padding: 0 0 var(--space-md);
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  @media (prefers-reduced-motion: reduce) {
    .accordion :global(.accordion-chevron) {
      transition: none;
    }
  }
</style>
