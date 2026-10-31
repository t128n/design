import { render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import EmptyState from '../src/lib/EmptyState.svelte';
import { readFile } from 'node:fs/promises';

const raw = (html: string) =>
  createRawSnippet(() => ({
    render: () => html
  }));

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const action = raw('<button type="button">New project</button>');

describe('EmptyState', () => {
  it('test_empty_state_render: renders the heading, description, and required action', () => {
    const { container } = render(EmptyState, {
      title: 'No projects yet',
      description: 'Create the first project to give the team a shared place to work.',
      action
    });

    expect(
      screen.getByRole('heading', { level: 2, name: 'No projects yet' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Create the first project to give the team a shared place to work.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'New project' })).toBeInTheDocument();

    const section = container.querySelector('section');
    expect(section).toHaveClass('empty-state');
    expect(section).toHaveAccessibleName('No projects yet');
  });

  it('test_empty_state_level: maps the semantic level to the native heading', () => {
    render(EmptyState, {
      title: 'No archived projects',
      level: 3,
      action
    });

    expect(
      screen.getByRole('heading', { level: 3, name: 'No archived projects' })
    ).toBeInTheDocument();
  });

  it('test_empty_state_class: merges the consumer class', () => {
    const { container } = render(EmptyState, {
      title: 'Nothing here',
      action,
      class: 'consumer-region'
    });

    expect(container.querySelector('section')).toHaveClass('empty-state', 'consumer-region');
  });

  it('test_empty_state_action_required: the action prop is a required snippet', async () => {
    const source = await readSource('../src/lib/EmptyState.svelte');

    expect(source).toContain('action: Snippet;');
    expect(source).not.toContain('action?: Snippet');
    expect(source).toContain('aria-labelledby={titleId}');
    expect(source).toContain('<Stack');
    expect(source).toContain('<Text');
  });

  it('test_empty_state_adoption: Stack and Dashboard use the pattern instead of ad-hoc copy', async () => {
    const stack = await readSource('../src/stories/Stack.stories.svelte');
    const dashboard = await readSource('../src/stories/Dashboard.stories.svelte');

    expect(stack).toContain('<EmptyState');
    expect(stack).toContain('action={createProject}');
    expect(stack).not.toContain('No projects yet</Text>');

    expect(dashboard).toContain('<EmptyState');
    expect(dashboard).toContain('action={archiveAction}');
  });
});
