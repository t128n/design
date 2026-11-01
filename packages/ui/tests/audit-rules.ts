import { readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Shared audit registry
 * ---------------------
 * The framework, design, and accessibility audits all report through this
 * module. Each rule has a stable id, a short explanation, and the DESIGN.md
 * rules it enforces. Allowlists are deliberately small and every entry carries
 * a reason. A failure always includes the rule id, the file, and the line so a
 * reviewer can act without re-running the suite.
 */

export const uiRoot = dirname(dirname(fileURLToPath(import.meta.url)));
export const srcRoot = join(uiRoot, 'src');
export const libRoot = join(srcRoot, 'lib');
export const storiesRoot = join(srcRoot, 'stories');
export const stylesRoot = join(srcRoot, 'styles');
export const designPath = join(uiRoot, 'docs', 'design-language.mdx');

export type SourceFile = {
  path: string;
  relativePath: string;
  source: string;
};

export type Rule = {
  id: string;
  title: string;
  description: string;
  designRefs: readonly string[];
};

export const rules = {
  'framework.raw-prose': {
    id: 'framework.raw-prose',
    title: 'Raw prose markup',
    description: 'Components and stories use Text for paragraphs and headings.',
    designRefs: ['R51']
  },
  'framework.raw-list': {
    id: 'framework.raw-list',
    title: 'Raw list markup',
    description: 'Stories use List and Text as="li" instead of raw list elements.',
    designRefs: ['R51']
  },
  'framework.literal-type': {
    id: 'framework.literal-type',
    title: 'Literal typography values',
    description: 'Typography declarations consume tokens instead of literal values.',
    designRefs: ['R23', 'R51']
  },
  'framework.raw-structure': {
    id: 'framework.raw-structure',
    title: 'Raw structural markup in stories',
    description: 'Stories use Table, TableRow, TableCell, Section, and List instead of raw structural elements.',
    designRefs: ['R51']
  },
  'framework.inline-style': {
    id: 'framework.inline-style',
    title: 'Inline style attributes and directives',
    description: 'Application and story prose styles through classes; only dynamic or positional values stay inline.',
    designRefs: ['R46', 'R51']
  },
  'framework.raw-px': {
    id: 'framework.raw-px',
    title: 'Literal pixels in story styles',
    description: 'Story CSS above the border scale uses rem or a token.',
    designRefs: ['R46']
  },
  'framework.viewport-shell': {
    id: 'framework.viewport-shell',
    title: 'Viewport-height shells',
    description: 'Stories keep normal document flow instead of 100vh shells.',
    designRefs: ['R20']
  },
  'framework.important': {
    id: 'framework.important',
    title: '!important outside reduced motion',
    description: 'Only the reduced-motion override may use !important.',
    designRefs: ['R49']
  },
  'framework.story-global': {
    id: 'framework.story-global',
    title: 'Unapproved story globals',
    description: 'Story globals reuse the global-scoping allowlist and never appear outside a style block.',
    designRefs: ['R51']
  },
  'framework.page-section-css': {
    id: 'framework.page-section-css',
    title: 'Duplicated page and section CSS',
    description: 'Stories do not recreate Page, Section, or Container layout locally; only story chrome is allowed.',
    designRefs: ['R14', 'R51']
  },
  'design.uppercase': {
    id: 'design.uppercase',
    title: 'Uppercase transforms',
    description: 'No text-transform in component styles.',
    designRefs: ['R21']
  },
  'design.letter-spacing': {
    id: 'design.letter-spacing',
    title: 'Letter-spacing budget',
    description: 'Letter-spacing stays at or below 0.02em.',
    designRefs: ['R21']
  },
  'design.radius': {
    id: 'design.radius',
    title: 'Radius budget',
    description: 'Radii stay at or below 6px except documented circular controls.',
    designRefs: ['R32']
  },
  'design.raw-px': {
    id: 'design.raw-px',
    title: 'Raw pixel geometry',
    description: 'Geometry above the 2px border scale uses a token.',
    designRefs: ['R46']
  },
  'design.hex': {
    id: 'design.hex',
    title: 'Raw hex colours',
    description: 'Components consume semantic colour tokens.',
    designRefs: ['R46']
  },
  'design.viewport-shell': {
    id: 'design.viewport-shell',
    title: 'Viewport-height shells',
    description: 'Components keep normal document flow instead of 100vh shells.',
    designRefs: ['R20']
  },
  'design.fixed-position': {
    id: 'design.fixed-position',
    title: 'Fixed positioning',
    description: 'Fixed positioning stays inside overlay layers and the skip link.',
    designRefs: ['R20']
  },
  'design.focus-visible': {
    id: 'design.focus-visible',
    title: 'Focus-visible coverage',
    description: 'Every interactive component ships a :focus-visible replacement.',
    designRefs: ['R49']
  },
  'design.important': {
    id: 'design.important',
    title: '!important outside reduced motion',
    description: 'Only the reduced-motion override may use !important.',
    designRefs: ['R49']
  },
  'design.outline-suppression': {
    id: 'design.outline-suppression',
    title: 'Outline suppression',
    description: 'outline: none or 0 needs a :focus-visible replacement or a documented non-interactive exception.',
    designRefs: ['R49']
  },
  'a11y.contrast': {
    id: 'a11y.contrast',
    title: 'Semantic contrast matrix',
    description: 'Every text, status, disabled, on-accent, and focus pairing passes its threshold in every declared theme.',
    designRefs: ['WCAG AA', 'R27', 'R33']
  }
} as const satisfies Record<string, Rule>;

export type RuleId = keyof typeof rules;

/** Border-scale pixels are allowed by name; anything larger uses a token. */
export const RAW_PX_ALLOWANCE = {
  maximum: 2,
  reason:
    '1px borders and 2px optical nudges are the border scale; any larger geometry uses a spacing or control token.'
} as const;

export type AllowlistEntry = {
  /** Path relative to packages/ui. */
  file: string;
  /** Text that must appear in the violation value/selector. */
  match: string;
  /** Why this entry is safe; required for review. */
  reason: string;
};

export const allowlists = {
  rawStructure: [
    {
      file: 'src/stories/Foundations.stories.svelte',
      match: 'section',
      reason:
        'The token specimen uses three native sections to show colour, type, and spacing scales with their own aria-labelledby. It is a documentation canvas, not an application region, and Section would change the specimen scale.'
    }
  ] satisfies AllowlistEntry[],
  inlineStyle: [
    {
      file: 'src/stories/Foundations.stories.svelte',
      match: 'style:background={value}',
      reason: 'Swatch preview driven by the colour data list; the value is not known statically.'
    },
    {
      file: 'src/stories/Foundations.stories.svelte',
      match: 'style:width={`${value}px`}',
      reason: 'Spacing specimen driven by the spacing data list; the width is positional data.'
    },
    {
      file: 'src/lib/ThemeScope.svelte',
      match: 'style={mergedStyle || undefined}',
      reason: 'Public token overrides are applied as dynamic custom properties by design.'
    },
    {
      file: 'src/lib/Grid.svelte',
      match: 'style={gridStyle || undefined}',
      reason: 'Grid track templates depend on runtime column props and cannot be expressed as static classes.'
    },
    {
      file: 'src/lib/Sidebar.svelte',
      match: 'style="--depth: {depth}"',
      reason: 'Tree depth is a dynamic custom property consumed by the item indent rule.'
    },
    {
      file: 'src/lib/Progress.svelte',
      match: "style={percentage !== null ? `transform: translateX(-${100 - percentage}%)` : undefined}",
      reason: 'Indicator position is a runtime percentage.'
    },
    {
      file: 'src/lib/Meter.svelte',
      match: 'style={`transform: translateX(-${100 - percentage}%)`}',
      reason: 'Indicator position is a runtime percentage.'
    },
    {
      file: 'src/lib/Combobox.svelte',
      match: 'style:width={controlWidth ? `${controlWidth}px` : undefined}',
      reason:
        'The option panel matches the measured control width so the popover cannot sit narrower or wider than the field.'
    }
  ] satisfies AllowlistEntry[],
  rawPx: [] satisfies AllowlistEntry[],
  important: [] satisfies AllowlistEntry[],
  viewportShell: [] satisfies AllowlistEntry[],
  fixedPosition: [
    {
      file: 'src/lib/AppShell.svelte',
      match: 'position: fixed',
      reason: 'The skip link is the documented fixed skip-link overlay.'
    },
    {
      file: 'src/lib/AlertDialog.svelte',
      match: 'position: fixed',
      reason: 'AlertDialog owns an overlay layer; fixed positioning is the documented overlay exception.'
    },
    {
      file: 'src/lib/Dialog.svelte',
      match: 'position: fixed',
      reason: 'Dialog owns an overlay layer; fixed positioning is the documented overlay exception.'
    },
    {
      file: 'src/lib/Sidebar.svelte',
      match: 'position: fixed',
      reason: 'The narrow sidebar becomes a drawer overlay; fixed positioning is the documented exception.'
    }
  ] satisfies AllowlistEntry[],
  outlineSuppression: [
    {
      file: 'src/lib/AppShell.svelte',
      match: 'content',
      reason:
        'The focusable main region is a non-interactive focus target; .content:focus-visible provides the real ring.'
    },
    {
      file: 'src/lib/Combobox.svelte',
      match: 'combobox-input',
      reason:
        'The native input outline is suppressed because .combobox-input-group:focus-within paints the shared field ring.'
    },
    {
      file: 'src/lib/Command.svelte',
      match: 'command-input',
      reason:
        'The native input outline is suppressed because .command-input-wrap:focus-within paints the field ring.'
    },
    {
      file: 'src/lib/ContextMenu.svelte',
      match: 'context-content',
      reason: 'Menu content is a non-interactive wrapper; items own the listbox highlight.'
    },
    {
      file: 'src/lib/DropdownMenu.svelte',
      match: 'dropdown-content',
      reason: 'Menu content is a non-interactive wrapper; items own the listbox highlight.'
    },
    {
      file: 'src/lib/Menubar.svelte',
      match: 'menubar-content',
      reason: 'Menu content is a non-interactive wrapper; items own the listbox highlight.'
    },
    {
      file: 'src/lib/Select.svelte',
      match: 'select-item',
      reason:
        'Listbox items use the [data-highlighted] surface as visual focus, which is the documented listbox exception.'
    },
    {
      file: 'src/lib/Combobox.svelte',
      match: 'combobox-item',
      reason:
        'Listbox items use the [data-highlighted] surface as visual focus, which is the documented listbox exception.'
    },
    {
      file: 'src/lib/Popover.svelte',
      match: 'popover-content',
      reason: 'Popover content is a non-interactive wrapper; its trigger owns the focus ring.'
    },
    {
      file: 'src/lib/LinkPreview.svelte',
      match: 'link-preview-content',
      reason: 'Preview content is a non-interactive wrapper; its trigger owns the focus ring.'
    }
  ] satisfies AllowlistEntry[],
  radius: [
    {
      file: 'src/lib/Avatar.svelte',
      match: '50%',
      reason: 'Avatars are intentionally circular controls.'
    },
    {
      file: 'src/lib/RadioGroup.svelte',
      match: '50%',
      reason: 'The radio control and its indicator dot are intentionally circular.'
    },
    {
      file: 'src/lib/Slider.svelte',
      match: '50%',
      reason: 'The slider thumb is intentionally circular.'
    },
    {
      file: 'src/lib/Switch.svelte',
      match: 'var(--radius-pill)',
      reason: 'DESIGN R32 reserves the pill radius for switch tracks and thumbs.'
    }
  ] satisfies AllowlistEntry[]
};

/** Story-only surface classes approved by global-scoping.test.ts. */
export const STORY_GLOBAL_CLASSES = new Map<string, string>([
  ['page', 'fullscreen story wrapper background; the wrapper is created by Storybook, not by a component']
]);

/** Story-only top-level elements approved by global-scoping.test.ts. */
export const STORY_GLOBAL_ELEMENTS = new Set(['body', 'h1', 'h2', 'h3']);

/** Properties a story `.page` wrapper may set: background and canvas chrome only. */
const STORY_PAGE_CHROME = new Set([
  'background',
  'background-color',
  'color',
  'box-sizing',
  'padding-block',
  'padding-top',
  'padding-bottom'
]);

/** Static components that never own a focus target of their own. */
export const STATIC_COMPONENTS = new Map<string, string>([
  ['Alert', 'Status text and role only; no control of its own.'],
  ['AppMark', 'Identity tile; it is an image or decorative label, not a control.'],
  ['AspectRatio', 'Media layout wrapper; the media element is consumer-provided.'],
  ['Badge', 'Static status label.'],
  ['Card', 'Static surface and heading.'],
  ['Code', 'Static code text.'],
  ['Container', 'Layout and padding wrapper.'],
  ['EmptyState', 'Static region; its one action is consumer-provided.'],
  ['Field', 'Form anatomy wrapper; the wrapped control owns focus.'],
  ['Grid', 'Layout wrapper.'],
  ['Hero', 'Static section; consumer actions own focus.'],
  ['Icon', 'Decorative or labelled image.'],
  ['Inline', 'Layout wrapper.'],
  ['List', 'Static list container.'],
  ['Meter', 'Read-only meter.'],
  ['Page', 'Measure and rhythm wrapper.'],
  ['PageHeader', 'Static heading block; consumer actions own focus.'],
  ['Progress', 'Read-only progress.'],
  ['Section', 'Static titled region.'],
  ['Separator', 'Non-interactive separator.'],
  ['Stack', 'Layout wrapper.'],
  ['TableCell', 'Static table cell.'],
  ['TableRow', 'Static table row.'],
  ['Text', 'Static typography.'],
  ['ThemeScope', 'Wrapper that applies token overrides.'],
  ['Tooltip', 'Supplementary content; its trigger is a Button.']
]);

/** Components whose interactivity is delegated and not visible as markup. */
export const EXPLICIT_INTERACTIVE_COMPONENTS = new Set([
  'AppShell',
  'Breadcrumbs',
  'Footer',
  'Label',
  'Table',
  'VisuallyHidden'
]);

const INTERACTIVE_MARKERS = /<(?:button|input|select|textarea|a)\b|\brole=|\bfrom\s+['"]bits-ui['"]/;

export const lineNumberAt = (source: string, index: number): number =>
  source.slice(0, Math.max(0, index)).split('\n').length;

export const ruleFailure = (
  ruleId: RuleId,
  file: string,
  line: number,
  detail: string
): string => `[${ruleId}] ${file}:${line} ${detail}`;

const stripCssComments = (source: string): string =>
  source.replace(/\/\*[\s\S]*?\*\//g, (match) => match.replace(/[^\n]/g, ' '));

export const walk = async (root: string): Promise<string[]> => {
  const entries = await readdir(root, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(root, entry.name);
      return entry.isDirectory() ? walk(path) : Promise.resolve([path]);
    })
  );
  return files.flat();
};

export const readSources = async (
  root: string,
  extensions: string[] = ['.svelte']
): Promise<SourceFile[]> => {
  const paths = (await walk(root)).filter((path) => extensions.includes(extname(path)));
  return Promise.all(
    paths.map(async (path) => ({
      path,
      relativePath: relative(uiRoot, path),
      source: await readFile(path, 'utf8')
    }))
  );
};

type StyleBlock = { content: string; offset: number };

const styleBlocks = (source: string): StyleBlock[] =>
  [...source.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((match) => ({
    content: stripCssComments(match[1]),
    offset: (match.index ?? 0) + match[0].indexOf('>') + 1
  }));

export type CssDeclaration = {
  property: string;
  value: string;
  selector: string;
  index: number;
  line: number;
};

const DECLARATION = /([a-zA-Z-]+)\s*:\s*([^;{}]+);?/g;

const declarationsIn = (
  body: string,
  bodyOffset: number,
  selector: string,
  source: string
): CssDeclaration[] =>
  [...body.matchAll(DECLARATION)].map((match) => {
    const index = bodyOffset + (match.index ?? 0);

    return {
      property: match[1].toLowerCase(),
      value: match[2].trim(),
      selector,
      index,
      line: lineNumberAt(source, index)
    };
  });

/** Every declaration inside a component or story <style> block. */
export const cssDeclarations = (source: string): CssDeclaration[] =>
  styleBlocks(source).flatMap((block) =>
    [...block.content.matchAll(/([^{}]+)\{([^{}]*)\}/g)].flatMap((rule) => {
      const selector = rule[1].trim().replace(/\s+/g, ' ');
      if (!selector || selector.startsWith('@')) return [];

      const bodyOffset = block.offset + (rule.index ?? 0) + rule[0].indexOf('{') + 1;

      return declarationsIn(rule[2], bodyOffset, selector, source);
    })
  );

type InlineStyle = {
  /** Full attribute including `style=` / `style:name=`. */
  value: string;
  /** Expression or quoted value without the outer delimiters. */
  body: string;
  bodyOffset: number;
  index: number;
};

const insideMarkupTag = (source: string, index: number): boolean => {
  const lastOpen = source.lastIndexOf('<', index);
  const lastClose = source.lastIndexOf('>', index);

  return lastOpen > lastClose;
};

const inlineStyles = (source: string): InlineStyle[] => {
  const ranges = styleBlockRanges(source);
  const found: InlineStyle[] = [];

  for (const match of source.matchAll(/\bstyle(:[A-Za-z-]+)?\s*=\s*/g)) {
    const index = match.index ?? 0;
    if (!insideMarkupTag(source, index)) continue;
    if (ranges.some(([start, end]) => index >= start && index <= end)) continue;

    const valueStart = index + match[0].length;
    const first = source[valueStart];
    let cursor = valueStart;
    let bodyOffset = valueStart;
    let body = '';

    if (first === '"' || first === "'") {
      cursor += 1;
      bodyOffset = cursor;
      while (cursor < source.length && source[cursor] !== first) {
        if (source[cursor] === '\\') cursor += 1;
        cursor += 1;
      }
      body = source.slice(bodyOffset, cursor);
      cursor += 1;
    } else if (first === '{') {
      let depth = 0;
      for (; cursor < source.length; cursor += 1) {
        if (source[cursor] === '{') depth += 1;
        if (source[cursor] === '}') {
          depth -= 1;
          if (depth === 0) {
            cursor += 1;
            break;
          }
        }
      }
      bodyOffset = valueStart + 1;
      body = source.slice(bodyOffset, cursor - 1);
    } else {
      while (cursor < source.length && !/[\s>]/.test(source[cursor])) cursor += 1;
      body = source.slice(bodyOffset, cursor);
    }

    found.push({
      value: source.slice(index, cursor),
      body,
      bodyOffset,
      index
    });
  }

  return found;
};

const inlineStyleDeclarations = (source: string): CssDeclaration[] =>
  inlineStyles(source).flatMap((style) =>
    declarationsIn(style.body, style.bodyOffset, 'inline style', source)
  );

const isAllowlisted = (
  allowlist: readonly AllowlistEntry[],
  file: string,
  value: string
): boolean => allowlist.some((entry) => entry.file === file && value.includes(entry.match));

const matchesWithLine = (
  sources: SourceFile[],
  pattern: RegExp,
  ruleId: RuleId,
  detail: (match: string) => string = (match) => match.trim()
): string[] =>
  sources.flatMap(({ relativePath, source }) =>
    [...source.matchAll(pattern)].map((match) =>
      ruleFailure(ruleId, relativePath, lineNumberAt(source, match.index ?? 0), detail(match[0]))
    )
  );

const RAW_PROSE = /<(p|h[1-6])\b/g;
const RAW_LIST = /<(ul|ol|li)\b/g;
const TYPE_DECLARATION = /(font-size|font-weight|line-height|font-family):\s*([^;]+);/g;
const RAW_STRUCTURE = /<(td|tr|th|thead|tbody|section|dl)\b/g;
const HEX_COLOR = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/g;
const TEXT_TRANSFORM = /text-transform/gi;
const POSITION_FIXED = /position:\s*fixed/gi;
const RAW_100VH = /100vh/g;

export const rawProseViolations = (sources: SourceFile[]): string[] =>
  matchesWithLine(sources, RAW_PROSE, 'framework.raw-prose');

export const rawListViolations = (sources: SourceFile[]): string[] =>
  matchesWithLine(sources, RAW_LIST, 'framework.raw-list');

export const literalTypeViolations = (sources: SourceFile[]): string[] =>
  sources.flatMap(({ relativePath, source }) =>
    [...source.matchAll(TYPE_DECLARATION)]
      .filter((match) => !match[2].trim().startsWith('var('))
      .map((match) =>
        ruleFailure(
          'framework.literal-type',
          relativePath,
          lineNumberAt(source, match.index ?? 0),
          match[0].trim()
        )
      )
  );

export const rawStructureViolations = (
  sources: SourceFile[],
  allowlist: readonly AllowlistEntry[] = allowlists.rawStructure
): string[] =>
  sources.flatMap(({ relativePath, source }) =>
    [...source.matchAll(RAW_STRUCTURE)]
      .filter((match) => !isAllowlisted(allowlist, relativePath, match[1]))
      .map((match) =>
        ruleFailure(
          'framework.raw-structure',
          relativePath,
          lineNumberAt(source, match.index ?? 0),
          `<${match[1]}> is raw structural markup; use the matching framework component`
        )
      )
  );

export const inlineStyleViolations = (
  sources: SourceFile[],
  allowlist: readonly AllowlistEntry[] = allowlists.inlineStyle
): string[] =>
  sources.flatMap(({ relativePath, source }) =>
    inlineStyles(source)
      .filter((style) => !isAllowlisted(allowlist, relativePath, style.value))
      .map((style) =>
        ruleFailure(
          'framework.inline-style',
          relativePath,
          lineNumberAt(source, style.index),
          `${style.value.trim()} should move to a class, or the dynamic case needs an allowlist reason`
        )
      )
  );

export const rawPxViolations = (
  sources: SourceFile[],
  options: {
    ruleId: RuleId;
    allowlist?: readonly AllowlistEntry[];
    maxAllowed?: number;
    includeInline?: boolean;
  }
): string[] => {
  const maxAllowed = options.maxAllowed ?? RAW_PX_ALLOWANCE.maximum;
  const allowlist = options.allowlist ?? allowlists.rawPx;

  return sources.flatMap((file) => {
    const declarations = options.includeInline
      ? [...cssDeclarations(file.source), ...inlineStyleDeclarations(file.source)]
      : cssDeclarations(file.source);

    return declarations.flatMap((declaration) =>
      [...declaration.value.matchAll(/(\d+(?:\.\d+)?)px/g)]
        .filter((match) => Number(match[1]) > maxAllowed)
        .filter(
          () => !isAllowlisted(allowlist, file.relativePath, `${declaration.property}: ${declaration.value}`)
        )
        .map((match) =>
          ruleFailure(
            options.ruleId,
            file.relativePath,
            declaration.line,
            `${declaration.property}: ${declaration.value} uses literal ${match[0]}`
          )
        )
    );
  });
};

const reducedMotionRanges = (source: string): [number, number][] => {
  const marker = '@media (prefers-reduced-motion: reduce)';
  const ranges: [number, number][] = [];
  let from = 0;
  let index = source.indexOf(marker, from);

  while (index !== -1) {
    const open = source.indexOf('{', index);
    if (open === -1) break;

    let depth = 0;
    let cursor = open;

    for (; cursor < source.length; cursor += 1) {
      if (source[cursor] === '{') depth += 1;
      if (source[cursor] === '}') {
        depth -= 1;
        if (depth === 0) {
          cursor += 1;
          break;
        }
      }
    }

    ranges.push([index, cursor]);
    from = cursor;
    index = source.indexOf(marker, from);
  }

  return ranges;
};

export const importantViolations = (
  sources: SourceFile[],
  options: { ruleId: RuleId; allowlist?: readonly AllowlistEntry[] }
): string[] => {
  const allowlist = options.allowlist ?? allowlists.important;

  return sources.flatMap(({ relativePath, source }) => {
    const ranges = reducedMotionRanges(source);

    return [...source.matchAll(/!important/g)]
      .filter((match) => {
        const index = match.index ?? 0;
        if (ranges.some(([start, end]) => index >= start && index <= end)) return false;
        return !isAllowlisted(allowlist, relativePath, '!important');
      })
      .map((match) =>
        ruleFailure(
          options.ruleId,
          relativePath,
          lineNumberAt(source, match.index ?? 0),
          '!important is only allowed inside the reduced-motion override'
        )
      );
  });
};

export const viewportShellViolations = (
  sources: SourceFile[],
  options: { ruleId: RuleId; allowlist?: readonly AllowlistEntry[] }
): string[] => {
  const allowlist = options.allowlist ?? allowlists.viewportShell;

  return matchesWithLine(
    sources.filter(({ relativePath }) => !isAllowlisted(allowlist, relativePath, '100vh')),
    RAW_100VH,
    options.ruleId,
    () => '100vh creates a viewport shell; keep normal document flow'
  );
};

export const hexColourViolations = (sources: SourceFile[]): string[] =>
  matchesWithLine(sources, HEX_COLOR, 'design.hex');

export const uppercaseViolations = (sources: SourceFile[]): string[] =>
  matchesWithLine(sources, TEXT_TRANSFORM, 'design.uppercase');

export const letterSpacingViolations = (sources: SourceFile[]): string[] =>
  sources.flatMap(({ relativePath, source }) => {
    const found: string[] = [];

    for (const match of source.matchAll(/letter-spacing:\s*([^;]+);/gi)) {
      const value = match[1].trim();
      for (const part of value.matchAll(/(-?\d*\.?\d+)(em|rem)/gi)) {
        if (Math.abs(Number(part[1])) > 0.02) {
          found.push(
            ruleFailure(
              'design.letter-spacing',
              relativePath,
              lineNumberAt(source, match.index ?? 0),
              `letter-spacing: ${value} exceeds 0.02em`
            )
          );
          break;
        }
      }
    }

    return found;
  });

export const fixedPositionViolations = (
  sources: SourceFile[],
  options: { ruleId: RuleId; allowlist?: readonly AllowlistEntry[] }
): string[] => {
  const allowlist = options.allowlist ?? [];

  return sources
    .filter(({ relativePath }) => !isAllowlisted(allowlist, relativePath, 'position: fixed'))
    .flatMap(({ relativePath, source }) =>
      [...source.matchAll(POSITION_FIXED)].map((match) =>
        ruleFailure(
          options.ruleId,
          relativePath,
          lineNumberAt(source, match.index ?? 0),
          'position: fixed outside an overlay layer or the skip link'
        )
      )
    );
};

const lastClassOf = (selector: string): string | null => {
  const classes = [...selector.matchAll(/\.([A-Za-z_][A-Za-z0-9_-]*)/g)];

  return classes.at(-1)?.[1] ?? null;
};

export const outlineSuppressionViolations = (
  sources: SourceFile[],
  allowlist: readonly AllowlistEntry[] = allowlists.outlineSuppression
): string[] =>
  sources.flatMap((file) => {
    const declarations = cssDeclarations(file.source);
    const focusVisibleStems = new Set(
      declarations
        .filter((declaration) => declaration.selector.includes(':focus-visible'))
        .map((declaration) => lastClassOf(declaration.selector))
        .filter((stem): stem is string => Boolean(stem))
    );

    return declarations
      .filter(
        (declaration) =>
          declaration.property === 'outline' &&
          /^(?:none|0)$/i.test(declaration.value.trim())
      )
      .filter((declaration) => {
        if (isAllowlisted(allowlist, file.relativePath, declaration.selector)) return false;

        const stem = lastClassOf(declaration.selector);
        // A rule that itself suppresses the native ring inside :focus-visible
        // is not a replacement; the wrapper or a sibling rule must paint it.
        if (!declaration.selector.includes(':focus-visible') && stem && focusVisibleStems.has(stem)) {
          return false;
        }

        return true;
      })
      .map((declaration) =>
        ruleFailure(
          'design.outline-suppression',
          file.relativePath,
          declaration.line,
          `${declaration.selector} suppresses the outline without a :focus-visible replacement`
        )
      );
  });

export const focusVisibleViolations = (sources: SourceFile[]): string[] =>
  sources.flatMap(({ relativePath, source, path }) => {
    const component = path.split('/').at(-1)?.replace('.svelte', '') ?? relativePath;
    if (STATIC_COMPONENTS.has(component)) return [];

    const interactive =
      INTERACTIVE_MARKERS.test(source) || EXPLICIT_INTERACTIVE_COMPONENTS.has(component);

    if (!interactive) {
      return [
        ruleFailure(
          'design.focus-visible',
          relativePath,
          1,
          `${component} is neither classified static nor interactive; add a :focus-visible rule or a STATIC_COMPONENTS reason`
        )
      ];
    }

    if (/:focus-visible/.test(source)) return [];

    return [
      ruleFailure(
        'design.focus-visible',
        relativePath,
        1,
        `${component} is interactive but has no :focus-visible rule`
      )
    ];
  });

export const radiusViolations = (
  sources: SourceFile[],
  allowlist: readonly AllowlistEntry[] = allowlists.radius
): string[] =>
  sources.flatMap((file) =>
    cssDeclarations(file.source)
      .filter((declaration) => declaration.property === 'border-radius')
      .flatMap((declaration) => {
        const value = declaration.value.trim();
        if (isAllowlisted(allowlist, file.relativePath, value)) return [];
        if (value === '0') return [];

        const token = value.match(/var\((--radius-[a-z-]+)\)/);
        if (token) {
          if (['--radius-sm', '--radius-md', '--radius-lg'].includes(token[1])) return [];
          return [
            ruleFailure(
              'design.radius',
              file.relativePath,
              declaration.line,
              `border-radius: ${value} is not a documented radius token`
            )
          ];
        }

        if (value.includes('%')) {
          return [
            ruleFailure(
              'design.radius',
              file.relativePath,
              declaration.line,
              `border-radius: ${value} is a percentage without a circular-control allowlist entry`
            )
          ];
        }

        const amounts = [...value.matchAll(/(\d*\.?\d+)(px|rem|em)/g)].map((match) => {
          const amount = Number(match[1]);
          if (match[2] === 'px') return amount;
          return amount * 16;
        });

        if (amounts.some((amount) => amount > 6)) {
          return [
            ruleFailure(
              'design.radius',
              file.relativePath,
              declaration.line,
              `border-radius: ${value} exceeds the 6px budget`
            )
          ];
        }

        return [];
      })
  );

export const pageSectionCssViolations = (
  sources: SourceFile[],
  allowlist: readonly AllowlistEntry[] = []
): string[] =>
  sources.flatMap((file) => {
    const grouped = new Map<string, CssDeclaration[]>();

    for (const declaration of cssDeclarations(file.source)) {
      const declarations = grouped.get(declaration.selector) ?? [];
      declarations.push(declaration);
      grouped.set(declaration.selector, declarations);
    }

    return [...grouped.entries()].flatMap(([selector, declarations]) => {
      if (isAllowlisted(allowlist, file.relativePath, selector)) return [];

      const classes = [...selector.matchAll(/\.([A-Za-z_][A-Za-z0-9_-]*)/g)].map(
        (match) => match[1]
      );
      const properties = new Set(declarations.map((declaration) => declaration.property));
      const line = declarations[0]?.line ?? 1;
      const failure = (detail: string) =>
        ruleFailure('framework.page-section-css', file.relativePath, line, detail);

      if (classes.some((name) => ['section', 'section-heading', 'settings-section'].includes(name))) {
        return [
          failure(
            `${selector} recreates Section layout; use Section instead, or document story-only chrome`
          )
        ];
      }

      if (classes.includes('page')) {
        const extra = [...properties].filter((property) => !STORY_PAGE_CHROME.has(property));
        if (extra.length > 0) {
          return [
            failure(
              `${selector} owns Page geometry through ${extra.join(', ')}; keep story .page to background and canvas chrome`
            )
          ];
        }
      }

      if (classes.includes('story')) {
        const recreatesMeasure =
          properties.has('max-width') &&
          (properties.has('margin') || properties.has('margin-inline'));
        const recreatesRhythm = properties.has('display') && properties.has('gap');

        if (recreatesMeasure || recreatesRhythm) {
          return [
            failure(
              `${selector} recreates Page measure or Section rhythm; use Page, Section, or a story-canvas class`
            )
          ];
        }
      }

      return [];
    });
  });

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

const firstClassOf = (value: string): string | null =>
  value.trim().match(/\.([A-Za-z_][A-Za-z0-9_-]*)/)?.[1] ?? null;

const firstTokenOf = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const match = trimmed.match(/^[A-Za-z*][A-Za-z0-9*-]*/);

  return match ? match[0] : trimmed[0];
};

const styleBlockRanges = (source: string): [number, number][] =>
  [...source.matchAll(/<style\b[^>]*>[\s\S]*?<\/style>/g)].map((match) => [
    match.index ?? 0,
    (match.index ?? 0) + match[0].length
  ]);

export const storyGlobalViolations = (sources: SourceFile[]): string[] =>
  sources.flatMap(({ relativePath, source }) => {
    const failures: string[] = [];
    const ranges = styleBlockRanges(source);

    for (const match of source.matchAll(/:global\(/g)) {
      const index = match.index ?? 0;
      if (!ranges.some(([start, end]) => index >= start && index <= end)) {
        failures.push(
          ruleFailure(
            'framework.story-global',
            relativePath,
            lineNumberAt(source, index),
            ':global() may only appear inside a <style> block'
          )
        );
      }
    }

    for (const block of styleBlocks(source)) {
      for (const rule of block.content.matchAll(/([^{}]+)\{/g)) {
        const prelude = rule[1].trim();
        if (!prelude || prelude.startsWith('@')) continue;

        for (const selector of splitTopLevel(prelude)) {
          if (!selector.includes(':global(')) continue;

          const anchored = !selector.trim().startsWith(':global(');
          if (anchored) continue;

          const blockValue = globalBlocks(selector)[0] ?? '';
          const className = firstClassOf(blockValue);
          const token = firstTokenOf(blockValue);

          if (className && STORY_GLOBAL_CLASSES.has(className)) continue;
          if (token && STORY_GLOBAL_ELEMENTS.has(token)) continue;

          failures.push(
            ruleFailure(
              'framework.story-global',
              relativePath,
              lineNumberAt(source, block.offset + (rule.index ?? 0)),
              `${selector} is not in the shared story-global allowlist; see global-scoping.test.ts`
            )
          );
        }
      }
    }

    return failures;
  });
