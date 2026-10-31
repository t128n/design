import { readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const uiRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const srcRoot = join(uiRoot, 'src');
const libRoot = join(srcRoot, 'lib');
const storiesRoot = join(srcRoot, 'stories');
const designPath = join(uiRoot, '..', '..', 'DESIGN.md');

type SourceFile = { path: string; relativePath: string; source: string };

const walk = async (root: string): Promise<string[]> => {
  const entries = await readdir(root, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(root, entry.name);
      return entry.isDirectory() ? walk(path) : Promise.resolve([path]);
    })
  );
  return files.flat();
};

const readSvelteSources = async (root: string): Promise<SourceFile[]> => {
  const paths = (await walk(root)).filter((path) => extname(path) === '.svelte');
  return Promise.all(
    paths.map(async (path) => ({
      path,
      relativePath: relative(uiRoot, path),
      source: await readFile(path, 'utf8')
    }))
  );
};

const RAW_PROSE = /<(p|h[1-6])\b/g;
const RAW_LIST = /<(ul|ol|li)\b/g;
const TYPE_DECLARATION = /(font-size|font-weight|line-height|font-family):\s*([^;]+);/g;

const matches = (sources: SourceFile[], pattern: RegExp): string[] =>
  sources.flatMap(({ relativePath, source }) =>
    [...source.matchAll(pattern)].map((match) => `${relativePath}: ${match[0].trim()}`)
  );

const literalTypeMatches = (sources: SourceFile[]): string[] =>
  sources.flatMap(({ relativePath, source }) =>
    [...source.matchAll(TYPE_DECLARATION)]
      .filter((match) => !match[2].trim().startsWith('var('))
      .map((match) => `${relativePath}: ${match[0].trim()}`)
  );

describe('framework audit', () => {
  it('test_no_raw_prose: stories and components use Text for paragraphs and headings', async () => {
    const sources = [...(await readSvelteSources(libRoot)), ...(await readSvelteSources(storiesRoot))];

    expect(matches(sources, RAW_PROSE)).toEqual([]);
  });

  it('test_no_raw_lists: stories use List for ordered and unordered items', async () => {
    const sources = await readSvelteSources(storiesRoot);

    expect(matches(sources, RAW_LIST)).toEqual([]);
  });

  it('test_literal_type: component and story styles use typography tokens', async () => {
    const sources = [...(await readSvelteSources(libRoot)), ...(await readSvelteSources(storiesRoot))];

    expect(literalTypeMatches(sources)).toEqual([]);
  });

  it('test_content_components: content surfaces delegate type to Text', async () => {
    for (const component of ['PageHeader', 'Hero', 'Card', 'Alert', 'Footer', 'Breadcrumbs']) {
      const source = await readFile(join(libRoot, `${component}.svelte`), 'utf8');

      expect(source, component).toContain("from './Text.svelte'");
      expect(source, component).not.toMatch(/(font-size|font-weight|line-height|font-family):/);
    }
  });

  it('test_typography_contract: label is 14px/1.5 and the framework scale is documented', async () => {
    const tokens = await readFile(join(srcRoot, 'styles/tokens.css'), 'utf8');
    const design = await readFile(designPath, 'utf8');

    expect(tokens).toContain('--font-size-label: 0.875rem');
    expect(tokens).toContain('--line-height-label: 1.5');
    expect(design).toContain('## Framework usage');
    expect(design).toContain('Text variant="body"');
    expect(design).toContain('Text variant="heading"');
    expect(design).toContain('| R51 |');
  });

  it('test_foundations: the type specimen uses the exact brief copy and components', async () => {
    const foundations = await readFile(join(storiesRoot, 'Foundations.stories.svelte'), 'utf8');

    expect(foundations).toContain('Display — IBM Plex Sans, 32px');
    expect(foundations).toContain('Heading — IBM Plex Sans, 24px');
    expect(foundations).toContain('Subheading — IBM Plex Sans, 18px');
    expect(foundations).toContain('Body — 16px / 1.5 for readable application content.');
    expect(foundations).toContain('Label and small UI text — 14px / 1.5.');
    expect(foundations).toContain("<Code>const projectId = 'design-v0.1';</Code>");
  });

  it('test_primitive_stories: every framework primitive has a story and a real screen use', async () => {
    for (const component of ['Text', 'Code', 'Stack', 'Inline', 'Grid', 'Container', 'List']) {
      const story = await readFile(join(storiesRoot, `${component}.stories.svelte`), 'utf8');

      expect(story, component).toContain(`title: 'Primitives/${component}'`);
    }

    for (const view of ['Dashboard', 'Settings', 'Landing']) {
      const story = await readFile(join(storiesRoot, `${view}.stories.svelte`), 'utf8');

      expect(story, view).toContain('Text');
    }
  });
});
