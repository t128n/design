import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFile(resolve(process.cwd(), path), 'utf8');

describe('design intent', () => {
  it('keeps intent, precedence, differentiation, and voice in the design language page', async () => {
    const design = await read('packages/ui/docs/design-language.mdx');

    for (const heading of [
      '## Design intent',
      '### Non-negotiables',
      '### Anti-goals',
      '### Precedence',
      '### Decision status',
      '## Identity and differentiation',
      '### Three defensible bets',
      '### Signature patterns',
      '### The logo-off test',
      '## Voice and tone',
      '### Rules',
      '### Patterns'
    ]) {
      expect(design, heading).toContain(heading);
    }

    expect(design).toContain('quiet competence');
    expect(design).toContain('generic AI-generated SaaS screen');
    expect(design).toContain('at least two');
    expect(design).toContain('one term per concept');
    expect(design).toContain('A public page still uses the **workspace**');
  });

  it('removes the old canvas-versus-workspace contradiction', async () => {
    const design = await read('packages/ui/docs/design-language.mdx');

    expect(design).not.toContain('Preserve canvas `#F2F4F8` for subdued public, marketing');
    expect(design).toContain('Landing, workspaces, and persistent Sidebars share one continuous white background');
  });

  it('labels the settings commit model in the composed Settings view', async () => {
    const settings = await read('packages/ui/src/stories/Settings.stories.svelte');

    expect(settings).toContain('Save workspace details');
    expect(settings).toContain('Save review rules');
    expect(settings).toContain('Applies immediately.');
    expect(settings).toContain('Saved with Save review rules.');
  });

  it('documents the same contract in the Storybook guidance and Foundations story', async () => {
    const storybook = await read('AGENTS.md');
    const foundations = await read('packages/ui/src/stories/Foundations.stories.svelte');

    expect(storybook).toContain('## Design intent and voice');
    expect(storybook).toContain('Signature patterns:');
    expect(foundations).toContain('Design intent');
    expect(foundations).toContain('Voice and tone');
    expect(foundations).toContain('Signature patterns:');
    expect(foundations).toContain('Not: “Oops! Something went wrong.”');
    expect(foundations).toContain('Instead: “Project name is required. Enter a name to continue.”');
  });
});
