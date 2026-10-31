import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { Button, Card, Input } from '../src/index.js';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

describe('Button', () => {
  it('renders a 40px primary action with visible focus styling', async () => {
    const source = await readSource('../src/lib/Button.svelte');

    expect(source).toContain('<button');
    expect(source).toContain('min-height: var(--control-height)');
    expect(source).toContain(':focus-visible');
  });

  it('prevents activation while disabled or loading', async () => {
    const source = await readSource('../src/lib/Button.svelte');

    expect(source).toContain('disabled={disabled || loading}');
    expect(source).toContain("aria-busy={loading ? 'true' : undefined}");
  });
});

describe('Input', () => {
  it('always associates its supplied label and exposes errors to assistive technology', async () => {
    const source = await readSource('../src/lib/Input.svelte');
    const field = await readSource('../src/lib/Field.svelte');

    expect(source).toContain("import Field from './Field.svelte'");
    expect(source).toContain('id={state.id}');
    expect(source).toContain("aria-invalid={state.invalid ? 'true' : undefined}");
    expect(source).toContain('aria-describedby={state.describedBy}');
    expect(field).toContain('<Label');
    expect(field).toContain('role="alert"');
    expect(source).toContain('border-color: var(--color-danger)');
    expect(field).toContain('color: var(--color-danger)');
  });
});

describe('Card', () => {
  it('uses semantic surface and border tokens for its independent region', async () => {
    const source = await readSource('../src/lib/Card.svelte');

    expect(source).toContain('<section');
    expect(source).toContain('var(--color-surface)');
    expect(source).toContain('var(--color-border)');
  });
});

describe('public exports', () => {
  it('exports each primitive', () => {
    expect(Button).toBeDefined();
    expect(Input).toBeDefined();
    expect(Card).toBeDefined();
  });
});
