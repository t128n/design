<script lang="ts">
  import { Dialog, Input } from '../../src/index.js';
</script>

<Dialog
  open
  title="Rename project"
  description="Choose a new name for this project. The URL stays the same."
>
  <Input label="Project name" description="Keep it short and readable." />
</Dialog>
