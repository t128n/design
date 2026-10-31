<script lang="ts">
  import { AlignBoxMiddleCenter, Code, Document, Heading, ListBulleted } from 'carbon-icons-svelte';
  import SlashMenu from '$lib/components/SlashMenu.svelte';

  const items = [
    { label: 'Text', description: 'Plain paragraph', icon: Document },
    { label: 'Heading', description: 'Section heading', icon: Heading },
    { label: 'Bulleted list', description: 'A list of items', icon: ListBulleted },
    { label: 'Code block', description: 'Monospaced code', icon: Code },
    { label: 'Callout', description: 'Context inside a document', icon: AlignBoxMiddleCenter },
  ];
</script>

<div class="frame">
  <div class="document">
    <p class="before">A principle is a tie-breaker, not a preference.</p>
    <p class="cursor"><span class="marker">/</span></p>
    <SlashMenu {items} />
  </div>
</div>

<style>
  .frame {
    min-height: 100vh;
    padding: var(--space-6);
    background: var(--surface-panel);
  }

  .document {
    position: relative;
    width: var(--width-reading);
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .before {
    font: var(--type-prose);
    color: var(--text-1);
  }

  .cursor {
    min-height: var(--size-3);
    border-left: var(--ring-width) solid var(--accent);
    padding-left: var(--space-1);
  }

  .marker {
    font: var(--type-body);
    color: var(--text-3);
  }

  .document :global(.slash) {
    position: absolute;
    top: calc(var(--space-6) + var(--space-5));
    left: 0;
  }
</style>
