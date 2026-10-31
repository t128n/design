import { readFile } from 'node:fs/promises';
import { render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import Card from '../src/lib/Card.svelte';
import Page from '../src/lib/Page.svelte';
import PageHeader from '../src/lib/PageHeader.svelte';
import Section from '../src/lib/Section.svelte';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const raw = (html: string) =>
  createRawSnippet(() => ({
    render: () => html
  }));

const action = createRawSnippet(() => ({
  render: () => '<button type="button">View all</button>'
}));

describe('Section', () => {
  it('renders a section labelled by a subheading with description and actions', () => {
    const { container } = render(Section, {
      id: 'recent-projects',
      title: 'Recent projects',
      description: 'Ownership, status, and the latest update for each project.',
      level: 3,
      actions: action,
      children: raw('<p>Rows</p>')
    });
    const section = container.querySelector('section');
    const heading = screen.getByRole('heading', { name: 'Recent projects', level: 3 });

    expect(section).toHaveClass('section', 'gap-sm');
    expect(section).toHaveAttribute('aria-labelledby', 'recent-projects');
    expect(heading).toHaveAttribute('id', 'recent-projects');
    expect(heading).toHaveClass('text-subheading');
    expect(screen.getByText('Ownership, status, and the latest update for each project.')).toHaveClass(
      'text-body-sm',
      'tone-secondary'
    );
    expect(screen.getByRole('button', { name: 'View all' })).toBeInTheDocument();
  });

  it('generates a stable id and links the heading when id is omitted', () => {
    const first = render(Section, { title: 'First', children: raw('<p>One</p>') });
    const second = render(Section, { title: 'Second', children: raw('<p>Two</p>') });
    const firstSection = first.container.querySelector('section');
    const secondSection = second.container.querySelector('section');
    const firstId = firstSection?.getAttribute('aria-labelledby');
    const secondId = secondSection?.getAttribute('aria-labelledby');

    expect(firstId).toBeTruthy();
    expect(secondId).toBeTruthy();
    expect(firstId).not.toBe(secondId);
    expect(first.container.querySelector('h2')?.getAttribute('id')).toBe(firstId);
    expect(second.container.querySelector('h2')?.getAttribute('id')).toBe(secondId);
  });

  it('does not invent an accessible name without a title', () => {
    const { container } = render(Section, {
      'aria-label': 'Filters',
      children: raw('<p>Body</p>')
    });
    const section = container.querySelector('section');

    expect(section).toHaveAttribute('aria-label', 'Filters');
    expect(section).not.toHaveAttribute('aria-labelledby');
    expect(container.querySelector('h1, h2, h3, h4, h5, h6')).toBeNull();
    expect(container.querySelector('p')).toHaveTextContent('Body');
  });

  it('can leave the section unnamed when a nested table owns the heading id', () => {
    const { container } = render(Section, {
      id: 'projects-heading',
      title: 'Projects',
      labelledBy: false,
      children: raw('<p>Rows</p>')
    });
    const section = container.querySelector('section');

    expect(section).not.toHaveAttribute('aria-labelledby');
    expect(section).not.toHaveAttribute('aria-label');
    expect(container.querySelector('h2')).toHaveAttribute('id', 'projects-heading');
  });

  it('defaults to a level 2 heading and an sm gap', async () => {
    const source = await readSource('../src/lib/Section.svelte');
    const { container } = render(Section, { title: 'Defaults', children: raw('<p>Body</p>') });

    expect(container.querySelector('section')).toHaveClass('gap-sm');
    expect(container.querySelector('h2')).not.toBeNull();
    expect(source).toContain('level = 2');
    expect(source).toContain("gap = 'sm'");
    expect(source).toContain('aria-labelledby={name}');
  });
});

describe('Page', () => {
  it('composes a header and sections with width and gap classes', () => {
    const { container } = render(Page, {
      width: 'reading',
      gap: 'lg',
      header: raw('<p>Header</p>'),
      children: raw('<section>Body</section>')
    });
    const page = container.querySelector('.page');

    expect(page).toHaveClass('page', 'width-reading', 'gap-lg');
    expect(page?.querySelector('.header')).not.toBeNull();
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('defaults to the content width and 2xl rhythm', async () => {
    const source = await readSource('../src/lib/Page.svelte');
    const { container } = render(Page, { children: raw('<section>Body</section>') });
    const page = container.querySelector('.page');

    expect(page).toHaveClass('width-content', 'gap-2xl');
    expect(source).toContain("width = 'content'");
    expect(source).toContain("gap = '2xl'");
  });

  it('maps every width to a layout token and owns no padding', async () => {
    const source = await readSource('../src/lib/Page.svelte');

    for (const [width, token] of [
      ['content', '--layout-content-width'],
      ['reading', '--layout-reading-width'],
      ['form', '--layout-form-width']
    ]) {
      expect(source).toContain(`.width-${width}`);
      expect(source).toContain(`var(${token})`);
    }

    expect(source).toContain('.width-full');
    expect(source).toContain('margin-inline: auto');
    expect(source).toContain('min-width: 0');
    expect(source).not.toMatch(/(?:padding|padding-inline|padding-block):/);
    expect(source).toContain('AppShell or Container owns padding');
  });
});

describe('heading order', () => {
  it('keeps PageHeader, Section, and Card headings sequential', () => {
    render(PageHeader, { title: 'Overview', level: 1 });
    render(Section, { title: 'Recent projects', level: 2, children: raw('<p>Rows</p>') });
    render(Card, { title: 'Deployments', level: 3 });

    const levels = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((element) =>
      Number(element.tagName.slice(1))
    );

    expect(levels).toEqual([1, 2, 3]);
  });
});

describe('Page and Section migration audit', () => {
  const migrated = [
    'Table',
    'Dashboard',
    'Settings',
    'Landing',
    'PageHeader',
    'AppShell',
    'Personal'
  ];

  const readStory = (name: string) =>
    readSource(`../src/stories/${name}.stories.svelte`);

  it('composes every migrated story with Page and Section', async () => {
    for (const name of migrated) {
      const story = await readStory(name);

      expect(story, name).toContain('<Page');
      expect(story, name).toContain('<Section');
    }
  });

  it('removes the old local section layout selectors', async () => {
    const forbidden = [
      /\.section(?![\w-])\s*\{/,
      /\.section-heading\s*\{/,
      /\.section-copy\s*\{/,
      /\.section-actions\s*\{/,
      /\.settings-section\s*\{/
    ];

    for (const name of migrated) {
      const story = await readStory(name);

      for (const selector of forbidden) {
        expect(story, `${name} ${selector}`).not.toMatch(selector);
      }
    }
  });

  it('keeps story-only .page rules to background and colour', async () => {
    for (const name of migrated) {
      const story = await readStory(name);
      const blocks = [
        ...story.matchAll(/:global\(\.page\)\s*\{([^}]*)\}/g),
        ...story.matchAll(/(?<!:global\()\.page\s*\{([^}]*)\}/g)
      ].map((match) => match[1]);

      for (const block of blocks) {
        expect(block, name).not.toMatch(
          /(?:^|[;\s])(?:padding|margin|width|min-width|max-width|display|grid|gap|box-sizing)\s*:/
        );
      }
    }
  });

  it('drops bespoke wrapper layout from the migrated views', async () => {
    const landing = await readStory('Landing');
    const settings = await readStory('Settings');
    const appShell = await readStory('AppShell');

    for (const selector of ['.wrap', '.features', '.feature-list', '.feature']) {
      expect(landing, selector).not.toMatch(
        new RegExp(`${selector.replace('.', '\\.')}(?![\\w-])\\s*\\{`)
      );
    }

    for (const selector of ['.settings', '.form-grid', '.choices', '.actions']) {
      expect(settings, selector).not.toMatch(
        new RegExp(`${selector.replace('.', '\\.')}(?![\\w-])\\s*\\{`)
      );
    }

    for (const selector of ['.projects', '.activity']) {
      expect(appShell, selector).not.toMatch(
        new RegExp(`${selector.replace('.', '\\.')}(?![\\w-])\\s*\\{`)
      );
    }
  });
});
