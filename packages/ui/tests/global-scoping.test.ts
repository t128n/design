import { readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * `:global(...)` classification used across the framework
 * -------------------------------------------------------
 * 1. Scoped native elements
 *    An element declared in the same component template is owned by that
 *    component. It must be styled with a plain scoped selector; `:global` is
 *    unnecessary and hides the class from Svelte's scoping.
 * 2. Child-component roots / third-party hooks
 *    bits-ui (and our own components) receive classes through a `class` prop,
 *    so the parent's scope hash can never reach those roots. These hooks stay
 *    global, but the class name must be component-prefixed: `t128n-<component>-<part>`
 *    or a documented family prefix (see ALLOWED_FAMILY_PREFIXES).
 * 3. Slotted / streamed content
 *    Selectors such as `.table :global(td)` style consumer-provided cells.
 *    They stay global but must be anchored by a component-scoped class.
 * 4. Third-party state hooks
 *    `[data-state]`, `[data-disabled]`, `[aria-current]`, and pseudo-classes
 *    are structural and may appear inside a global hook.
 *
 * The audit fails closed: a new global must either use an existing approved
 * namespace, be anchored by a class this component actually declares, or be
 * added to one of the small allowlists below with a reason.
 */

const uiRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const libRoot = join(uiRoot, 'src', 'lib');
const storiesRoot = join(uiRoot, 'src', 'stories');

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

const readSources = async (root: string): Promise<SourceFile[]> => {
  const paths = (await walk(root)).filter((path) => extname(path) === '.svelte');
  return Promise.all(
    paths.map(async (path) => ({
      path,
      relativePath: relative(uiRoot, path),
      source: await readFile(path, 'utf8')
    }))
  );
};

/**
 * Component-family prefixes that are already specific enough to live in a
 * consumer stylesheet without colliding. New/generic names use `t128n-`.
 */
const ALLOWED_FAMILY_PREFIXES = [
  't128n',
  'alert-dialog',
  'accordion',
  'breadcrumb',
  'calendar',
  'checkbox',
  'combobox',
  'command',
  'context',
  'date',
  'dialog',
  'dropdown',
  'footer',
  'link-preview',
  'menubar',
  'meter',
  'navigation',
  'pin',
  'popover',
  'progress',
  'radio',
  'range',
  'rating',
  'scroll-area',
  'select',
  'slider',
  'switch',
  'tabs',
  'time',
  'toggle',
  'toolbar',
  'tooltip'
] as const;

/**
 * Exact class hooks that are global by necessity but do not belong to a family
 * prefix. Keep this list short and justify every entry.
 */
const GLOBAL_ALLOWLIST = new Map<string, string>([
  [
    'navbar-menu',
    'Popover.Content root class. The mobile menu is a bits-ui child-component root, so the navbar cannot scope it.'
  ],
  [
    'field-required',
    'Required marker owned by Field but rendered inside the date and time field components; it is a cross-component hook.'
  ]
]);

/** Structural selectors that are allowed when a scoped class anchors them. */
const ALLOWED_STRUCTURAL = new Set(['*', 'td', 'th', 'tr', 'tbody', 'thead', 'li', 'img', 'video', 'a']);

/** Story-only chrome. The story canvas is outside the component tree. */
const STORY_GLOBAL_CLASSES = new Map<string, string>([
  ['page', 'fullscreen story wrapper background; the wrapper is created by Storybook, not by a component']
]);
const STORY_GLOBAL_ELEMENTS = new Set(['body', 'h1', 'h2', 'h3']);

const isNamespaced = (name: string): boolean =>
  ALLOWED_FAMILY_PREFIXES.some((prefix) => name === prefix || name.startsWith(`${prefix}-`));

type GlobalSelector = {
  selector: string;
  anchor: string | null;
  firstClass: string | null;
  firstToken: string | null;
  anchored: boolean;
};

const stripComments = (source: string): string => source.replace(/\/\*[\s\S]*?\*\//g, (m) => ' '.repeat(m.length));

const splitTopLevel = (value: string): string[] => {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (const char of value) {
    if (char === '(' || char === '[') depth += 1;
    if (char === ')' || char === ']') depth -= 1;
    if (char === ',' && depth === 0) {
      parts.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  parts.push(current);
  return parts.map((part) => part.trim()).filter(Boolean);
};

const globalBlocks = (selector: string): string[] => {
  const blocks: string[] = [];
  const marker = ':global(';
  let index = selector.indexOf(marker);
  while (index !== -1) {
    let depth = 1;
    let cursor = index + marker.length;
    while (cursor < selector.length && depth > 0) {
      if (selector[cursor] === '(') depth += 1;
      if (selector[cursor] === ')') depth -= 1;
      cursor += 1;
    }
    blocks.push(selector.slice(index + marker.length, cursor - 1).trim());
    index = selector.indexOf(marker, cursor);
  }
  return blocks;
};

const firstClassOf = (value: string): string | null => {
  const match = value.trim().match(/\.([A-Za-z_][A-Za-z0-9_-]*)/);
  return match ? match[1] : null;
};

const firstTokenOf = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const match = trimmed.match(/^[A-Za-z*][A-Za-z0-9*-]*/);
  return match ? match[0] : trimmed[0];
};

const classify = (selector: string): GlobalSelector => {
  const trimmed = selector.trim();
  const anchored = !trimmed.startsWith(':global(');
  const anchor = anchored ? trimmed.slice(0, trimmed.indexOf(':global(')).trim() : null;
  const blocks = globalBlocks(trimmed);
  const firstBlock = blocks[0] ?? '';

  return {
    selector: trimmed,
    anchor,
    firstClass: firstClassOf(firstBlock),
    firstToken: firstTokenOf(firstBlock),
    anchored
  };
};

/** Every selector (prelude) in a component stylesheet that mentions :global. */
const globalSelectors = (file: SourceFile): { line: number; selector: GlobalSelector }[] => {
  const styleStart = file.source.indexOf('<style>');
  const styleEnd = file.source.indexOf('</style>');
  if (styleStart === -1 || styleEnd === -1) return [];

  const offset = styleStart + '<style>'.length;
  const styleSource = stripComments(file.source.slice(offset, styleEnd));
  const found: { line: number; selector: GlobalSelector }[] = [];

  for (const match of styleSource.matchAll(/([^{}]+)\{/g)) {
    const prelude = match[1].trim();
    if (!prelude || prelude.startsWith('@')) continue;
    // Keyframe steps are not selectors.
    if (/^(?:\d+%|from|to)$/.test(prelude)) continue;

    for (const selector of splitTopLevel(prelude)) {
      if (!selector.includes(':global(')) continue;
      const index = offset + (match.index ?? 0);
      found.push({
        line: file.source.slice(0, index).split('\n').length,
        selector: classify(selector)
      });
    }
  }

  return found;
};

/** Classes the component actually declares, so an anchored global can be proven scoped. */
const declaredClasses = (file: SourceFile): Set<string> => {
  const declared = new Set<string>();
  const styleStart = file.source.indexOf('<style>');
  const markup = styleStart === -1 ? file.source : file.source.slice(0, styleStart);

  for (const tag of markup.matchAll(/<([A-Za-z][\w:.-]*)([^>]*)>/gs)) {
    const name = tag[1];
    // Component roots receive classes through props, so they are never a
    // proof that the parent scope hash applies.
    if (/^[A-Z]/.test(name) || name.includes('.')) continue;
    const attrs = tag[2];
    for (const match of attrs.matchAll(/class="([^"]*)"/g)) {
      for (const token of match[1].split(/\s+/)) declared.add(token);
    }
    for (const match of attrs.matchAll(/class=\{([^}]*)\}/g)) {
      for (const token of match[1].match(/[A-Za-z_][A-Za-z0-9_-]*/g) ?? []) declared.add(token);
    }
    for (const match of attrs.matchAll(/class:([A-Za-z_][A-Za-z0-9_-]*)/g)) declared.add(match[1]);
  }

  const styleEnd = file.source.indexOf('</style>');
  if (styleStart !== -1 && styleEnd !== -1) {
    const styleSource = stripComments(file.source.slice(styleStart + '<style>'.length, styleEnd));
    for (const match of styleSource.matchAll(/([^{}]+)\{/g)) {
      const prelude = match[1];
      // A global hook cannot prove its own anchor; the class must also appear
      // in the markup or in a fully scoped rule.
      if (prelude.includes(':global(')) continue;
      for (const name of prelude.matchAll(/\.([A-Za-z_][A-Za-z0-9_-]*)/g)) declared.add(name[1]);
    }
  }

  return declared;
};

const describeSelector = (file: SourceFile, line: number, selector: GlobalSelector): string =>
  `${file.relativePath}:${line} \`${selector.selector}\``;

const libViolationsFor = (file: SourceFile): string[] => {
  const declared = declaredClasses(file);
  const failures: string[] = [];

  for (const { line, selector } of globalSelectors(file)) {
    const where = describeSelector(file, line, selector);

    if (selector.anchored) {
      // Anchored by a class or element: acceptable, but a class anchor must be
      // declared by this component so the rule cannot leak from :global alone.
      const anchor = selector.anchor ?? '';
      const anchorClass = firstClassOf(anchor);
      const anchorElement = anchor.match(/^[A-Za-z][A-Za-z0-9-]*/)?.[0] ?? null;
      if (anchorClass && !declared.has(anchorClass)) {
        failures.push(`${where} is anchored by \`.${anchorClass}\`, which this component does not declare`);
      }
      if (!anchorClass && !anchorElement) {
        failures.push(`${where} has no scoped anchor`);
      }
      continue;
    }

    if (selector.firstClass) {
      if (isNamespaced(selector.firstClass) || GLOBAL_ALLOWLIST.has(selector.firstClass)) continue;
      failures.push(
        `${where} uses generic global class \`.${selector.firstClass}\`. ` +
          `Rename it to \`.t128n-${selector.firstClass}\` (or a component-family prefix), or add \`${selector.firstClass}\` to GLOBAL_ALLOWLIST with a reason.`
      );
      continue;
    }

    if (selector.firstToken && ALLOWED_STRUCTURAL.has(selector.firstToken)) {
      failures.push(
        `${where} is an unanchored structural global. Anchor it with a scoped class, e.g. \`.component :global(${selector.firstToken})\`.`
      );
      continue;
    }

    if (selector.firstToken && (selector.firstToken.startsWith('[') || selector.firstToken.startsWith(':'))) {
      continue;
    }

    failures.push(`${where} is not an approved global selector`);
  }

  return failures;
};

const storyViolationsFor = (file: SourceFile): string[] => {
  const declared = declaredClasses(file);
  const failures: string[] = [];

  for (const { line, selector } of globalSelectors(file)) {
    const where = describeSelector(file, line, selector);

    if (selector.anchored) {
      const anchorClass = firstClassOf(selector.anchor ?? '');
      if (anchorClass && !declared.has(anchorClass)) {
        failures.push(`${where} is anchored by \`.${anchorClass}\`, which this story does not declare`);
      }
      continue;
    }

    if (selector.firstClass) {
      if (STORY_GLOBAL_CLASSES.has(selector.firstClass)) continue;
      failures.push(
        `${where} adds a top-level story global for \`.${selector.firstClass}\`. ` +
          `Only ${[...STORY_GLOBAL_CLASSES.keys()].map((name) => `\`.${name}\``).join(', ')} are approved; scope it to a story class instead.`
      );
      continue;
    }

    if (selector.firstToken && STORY_GLOBAL_ELEMENTS.has(selector.firstToken)) continue;

    failures.push(`${where} is not an approved story global`);
  }

  return failures;
};

describe('global scoping audit', () => {
  it('test_lib_globals: every :global hook is namespaced, allowlisted, or anchored', async () => {
    const sources = await readSources(libRoot);
    const failures = sources.flatMap(libViolationsFor);

    expect(sources.length).toBeGreaterThan(40);
    expect(failures).toEqual([]);
  });

  it('test_story_globals: stories do not add undocumented top-level globals', async () => {
    const sources = await readSources(storiesRoot);
    const failures = sources.flatMap(storyViolationsFor);

    expect(sources.length).toBeGreaterThan(40);
    expect(failures).toEqual([]);
  });

  it('test_generic_names: no bare generic class is used as a global hook', async () => {
    const generic = [
      'label',
      'toggle',
      'separator',
      'toolbar',
      'icon',
      'panel',
      'viewport',
      'thumb',
      'track',
      'check',
      'box',
      'badge',
      'alert',
      'card',
      'table',
      'input',
      'error',
      'description'
    ];
    const sources = await readSources(libRoot);
    const failures: string[] = [];

    for (const file of sources) {
      for (const { line, selector } of globalSelectors(file)) {
        if (!selector.anchored && selector.firstClass && generic.includes(selector.firstClass)) {
          failures.push(`${describeSelector(file, line, selector)} leaks the bare class \`.${selector.firstClass}\``);
        }
      }
    }

    expect(failures).toEqual([]);
  });
});
