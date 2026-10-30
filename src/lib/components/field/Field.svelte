<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    label: string;
    hint?: string;
    error?: string;
    id?: string;
    children: Snippet;
  }

  let { label, hint = "", error = "", id, children }: Props = $props();

  const generatedId = $props.id();
  const fieldId = $derived(id ?? generatedId);
  const hintId = $derived(`${fieldId}-hint`);
  const errorId = $derived(`${fieldId}-error`);

  let root: HTMLDivElement | undefined = $state();

  $effect(() => {
    const element = root;
    if (!element) return;

    const control = element.querySelector<HTMLElement>(
      "input, textarea, select",
    );
    if (!control) return;

    const describedBy = [hint ? hintId : "", error ? errorId : ""]
      .filter(Boolean)
      .join(" ");

    if (describedBy) {
      control.setAttribute("aria-describedby", describedBy);
    } else {
      control.removeAttribute("aria-describedby");
    }

    if (error) {
      control.setAttribute("aria-invalid", "true");
    } else {
      control.removeAttribute("aria-invalid");
    }
  });
</script>

<div class="t128n-field" bind:this={root}>
  <label class="t128n-field__label" for={fieldId}>{label}</label>
  <div class="t128n-field__control">
    {@render children()}
  </div>
  {#if hint}
    <p class="t128n-field__hint" id={hintId}>{hint}</p>
  {/if}
  {#if error}
    <p class="t128n-field__error" id={errorId} role="alert">
      <svg
        class="t128n-field__error-glyph"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="6.25"></circle>
        <path d="M8 5v3.5"></path>
        <circle cx="8" cy="11" r="0.75" fill="currentColor" stroke="none"></circle>
      </svg>
      <span>{error}</span>
    </p>
  {/if}
</div>

<style>
  .t128n-field {
    display: grid;
    gap: var(--space-1);
    font: var(--type-body);
    color: var(--text-1);
  }

  .t128n-field__label {
    font: var(--type-label);
    color: var(--text-2);
  }

  .t128n-field__control {
    display: block;
    min-width: 0;
  }

  .t128n-field__hint {
    margin: 0;
    font: var(--type-caption);
    color: var(--text-3);
  }

  .t128n-field__error {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    margin: 0;
    font: var(--type-caption);
    color: var(--danger);
  }

  .t128n-field__error-glyph {
    flex: none;
    width: var(--icon);
    height: var(--icon);
  }
</style>
