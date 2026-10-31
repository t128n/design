<script lang="ts">
  import type { Snippet } from 'svelte';
  import { mergeClasses } from './class';
  import { createFieldState, type FieldState } from './field';
  import Label from './Label.svelte';
  import VisuallyHidden from './VisuallyHidden.svelte';

  type Props = {
    /** Omit for self-labelled choice controls that keep their inline label. */
    label?: string;
    description?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    id?: string;
    class?: string;
    children: Snippet<[FieldState]>;
  };

  let {
    label,
    description,
    error,
    required = false,
    disabled = false,
    id,
    class: className = '',
    children
  }: Props = $props();

  const baseId = $props.id();
  const state = $derived(
    createFieldState(baseId, { id, description, error, required, disabled })
  );
  const classes = $derived(mergeClasses('field', className));
</script>

<div class={classes}>
  {#if label}
    <Label for={state.id} id={state.labelId}>
      {label}
      {#if state.required}
        <span class="required" aria-hidden="true">*</span>
        <VisuallyHidden>required</VisuallyHidden>
      {/if}
    </Label>
  {/if}
  {@render children(state)}
  {#if description}
    <span id={state.descriptionId} class="description">{description}</span>
  {/if}
  {#if error}
    <span id={state.errorId} class="error" role="alert">{error}</span>
  {/if}
</div>

<style>
  .field {
    display: grid;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .required {
    margin-inline-start: var(--space-xs);
    color: var(--color-danger);
  }

  .description {
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .error {
    color: var(--color-danger);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  /* Date and time fields keep their bits-ui label part, so they share only the
     required marker style. */
  :global(.field-required) {
    margin-inline-start: var(--space-xs);
    color: var(--color-danger);
  }
</style>
