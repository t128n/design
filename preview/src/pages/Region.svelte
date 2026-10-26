<script>
  let { label, note = '', height = '', className = '' } = $props();
</script>

<div class={`sketch-region ${className}`} style:min-height={height || null}>
  <span class="sketch-label">{label}</span>
  {#if note}
    <span class="sketch-note">{note}</span>
  {/if}
</div>
