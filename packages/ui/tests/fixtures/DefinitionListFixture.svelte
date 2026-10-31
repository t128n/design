<script lang="ts">
  import List from '../../src/lib/List.svelte';
  import Text from '../../src/lib/Text.svelte';
</script>

<List as="dl" gap="md" class="definition">
  <Text as="dt" variant="label" tone="secondary">Owner</Text>
  <Text as="dd" variant="body">Mara Chen</Text>
  <Text as="dt" variant="label" tone="secondary">Environment</Text>
  <Text as="dd" variant="body">Production</Text>
</List>
