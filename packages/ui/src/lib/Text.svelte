<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { TextAlign, TextTag, TextTone, TextVariant, TextWeight } from './typography';

  type Props = HTMLAttributes<HTMLElement> & {
    as?: TextTag;
    variant?: TextVariant;
    tone?: TextTone;
    weight?: TextWeight;
    align?: TextAlign;
    numeric?: boolean;
    class?: string;
    children?: Snippet;
  };

  let {
    as = 'p',
    variant = 'body',
    tone = 'primary',
    weight,
    align = 'start',
    numeric = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(
    [
      'text',
      `text-${variant}`,
      `tone-${tone}`,
      `align-${align}`,
      weight ? `weight-${weight}` : '',
      numeric ? 'numeric' : '',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<svelte:element this={as} {...restProps} class={classes}>
  {@render children?.()}
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
