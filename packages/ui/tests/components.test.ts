import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import {
  Alert,
  AppShell,
  Badge,
  Breadcrumbs,
  Footer,
  Hero,
  Navbar,
  PageHeader,
  Sidebar,
  Table
} from '../src/index.js';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

describe('reusable components and layouts', () => {
  it('exports every component', () => {
    for (const component of [
      Badge,
      Alert,
      Table,
      Breadcrumbs,
      Navbar,
      Sidebar,
      AppShell,
      PageHeader,
      Hero,
      Footer
    ]) {
      expect(component).toBeDefined();
    }
  });

  it('uses semantic tokens rather than local values', async () => {
    for (const component of [
      'Badge',
      'Alert',
      'Table',
      'Breadcrumbs',
      'Navbar',
      'Sidebar',
      'AppShell',
      'PageHeader',
      'Hero',
      'Footer'
    ]) {
      const source = await readSource(`../src/lib/${component}.svelte`);

      expect(source).toContain('var(--color-');
      expect(source).toContain('var(--space-');
    }
  });

  it('keeps the app shell keyboard accessible', async () => {
    const source = await readSource('../src/lib/AppShell.svelte');

    expect(source).toContain('href="#main-content"');
    expect(source).toContain('id="main-content"');
    expect(source).toContain('tabindex="-1"');
  });
});
