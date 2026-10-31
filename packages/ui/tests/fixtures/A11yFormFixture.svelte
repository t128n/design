<script lang="ts">
  import { Checkbox, Input, Select } from '../../src/index.js';

  const items = [
    { value: 'production', label: 'Production' },
    { value: 'staging', label: 'Staging' }
  ];
</script>

<form aria-label="Project settings">
  <Input
    label="Project name"
    description="Use a short name that stays readable in navigation."
    required
  />
  <Input label="Project key" error="Use at least three characters." value="ab" />
  <Select
    label="Environment"
    description="Choose where the next deployment runs."
    items={items}
  />
  <Checkbox
    label="Include archived projects"
    description="Archived projects stay read-only."
  />
</form>
