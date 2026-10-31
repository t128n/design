<script lang="ts">
  import { Footer, Navbar } from '../../src/index.js';

  const links = [
    { label: 'Overview', active: true },
    { label: 'Projects' },
    { label: 'Activity' }
  ];
</script>

<Navbar brand="Acme" links={links} label="Primary" />
<Footer
  brand="Acme"
  links={[{ label: 'Docs' }, { label: 'Status' }]}
  note="© 2026 Acme"
/>
