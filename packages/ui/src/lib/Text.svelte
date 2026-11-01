<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script module lang="ts">
  // Props that Text owns; everything else is forwarded to the rendered element.
  const reserved = new Set([
    'as',
    'variant',
    'tone',
    'weight',
    'align',
    'numeric',
    'class',
    'children'
  ]);
</script>

<script
  lang="ts"
  generics="Tag extends 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'strong' | 'blockquote' | 'figcaption' | 'dt' | 'dd' | 'li' | 'legend' | 'time' | 'address' = 'p'"
>
  import { mergeClasses } from './class';
  import type { TextProps } from './typography';

  // The generics attribute cannot reference imported types, so the tag union
  // mirrors TextTag here while TextProps remains the exported contract.
  type Props = TextProps<Tag>;

  let props: Props = $props();

  const as = $derived(props.as ?? 'p');
  const classes = $derived(
    mergeClasses(
      'text',
      `text-${props.variant ?? 'body'}`,
      `tone-${props.tone ?? 'primary'}`,
      `align-${props.align ?? 'start'}`,
      props.weight ? `weight-${props.weight}` : '',
      props.numeric ? 'numeric' : '',
      props.class ?? ''
    )
  );
  // Per-tag props are validated at the call site; forward everything else to
  // the rendered element.
  const attributes = $derived(
    Object.fromEntries(
      Object.entries(props as Record<string, unknown>).filter(([key]) => !reserved.has(key))
    )
  );
</script>

<svelte:element this={as} {...attributes} class={classes}>
  {@render props.children?.()}
</svelte:element>

<style>
  .text {
    margin: 0;
    overflow-wrap: break-word;
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-body);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-body);
  }

  .text-display {
    font-size: var(--text-size-display, var(--font-size-display));
    font-weight: var(--font-weight-semibold);
    line-height: var(--text-leading-display, var(--line-height-display));
  }

  .text-heading {
    font-size: var(--text-size-heading, var(--font-size-heading));
    font-weight: var(--font-weight-semibold);
    line-height: var(--text-leading-heading, var(--line-height-heading));
  }

  .text-subheading {
    font-size: var(--text-size-subheading, var(--font-size-subheading));
    font-weight: var(--font-weight-semibold);
    line-height: var(--text-leading-subheading, var(--line-height-subheading));
  }

  .text-body {
    font-size: var(--text-size-body, var(--font-size-body));
    font-weight: var(--font-weight-regular);
    line-height: var(--text-leading-body, var(--line-height-body));
  }

  .text-body-sm {
    font-size: var(--text-size-body-sm, var(--font-size-body-sm));
    font-weight: var(--font-weight-regular);
    line-height: var(--text-leading-body-sm, var(--line-height-body));
  }

  .text-label {
    font-size: var(--text-size-label, var(--font-size-label));
    font-weight: var(--font-weight-medium);
    line-height: var(--text-leading-label, var(--line-height-label));
  }

  .text-caption {
    font-size: var(--text-size-caption, var(--font-size-caption));
    font-weight: var(--font-weight-medium);
    line-height: var(--text-leading-caption, var(--line-height-caption));
  }

  .weight-regular {
    font-weight: var(--font-weight-regular);
  }

  .weight-medium {
    font-weight: var(--font-weight-medium);
  }

  .weight-semibold {
    font-weight: var(--font-weight-semibold);
  }

  .tone-primary {
    color: var(--color-text-primary);
  }

  .tone-secondary {
    color: var(--color-text-secondary);
  }

  .tone-muted {
    color: var(--color-text-muted);
  }

  .tone-inherit {
    color: inherit;
  }

  .tone-info {
    color: var(--color-info);
  }

  .tone-progress {
    color: var(--color-progress);
  }

  .tone-success {
    color: var(--color-success);
  }

  .tone-warning {
    color: var(--color-warning);
  }

  .tone-danger {
    color: var(--color-danger);
  }

  .tone-disabled {
    color: var(--color-disabled-text);
  }

  .align-start {
    text-align: start;
  }

  .align-center {
    text-align: center;
  }

  .align-end {
    text-align: end;
  }

  .numeric {
    font-variant-numeric: tabular-nums;
  }
</style>
