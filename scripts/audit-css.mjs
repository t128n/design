#!/usr/bin/env node
// Static first pass for the t128n review skill. It reads CSS text, not a
// rendered page: comments, strings, and url() references are ignored, only
// declarations are inspected, and literal px values are compared. var() and
// other units are not resolved, so confirm every finding in a browser.

import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RULE_ORDER = [
  'no-shadow',
  'no-gradient',
  'no-blur',
  'no-large-radius',
  'no-small-type',
  'no-hardcoded-color',
];

const SHADOW_PROPERTY = /^(?:-\w+-)?(?:box|text)-shadow$/i;
const RADIUS_PROPERTY =
  /^(?:-\w+-)?(?:border-radius|border-(?:top|bottom)-(?:left|right)-radius)$/i;
const FONT_SIZE_PROPERTY = /^font-size$/i;
const GRADIENT_VALUE = /\b(?:repeating-)?(?:linear|radial|conic)-gradient\s*\(/i;
const BLUR_VALUE = /\bblur\s*\(/i;
const DROP_SHADOW_VALUE = /\bdrop-shadow\s*\(/i;
const HEX_COLOR = /#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})\b/i;
const COLOR_FUNCTION = /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\s*\(/i;
const PX_LENGTH = /-?(?:\d+\.?\d*|\.\d+)px\b/gi;

// A declaration starts at the beginning or after a `;` or any brace. The value
// stops at the next `;` or brace. Complex at-rule preludes do not start with a
// property name, so they are not mistaken for declarations.
const DECLARATION = /(?:^|[;{}])\s*([-\w]+)\s*:\s*([^;{}]*)/g;
const URL_REFERENCE = /url\([^)]*\)/gi;

const MIN_FONT_SIZE_PX = 12;
const MAX_RADIUS_PX = 3;

function blank(text) {
  return text.replace(/[^\r\n]/g, ' ');
}

// Replace comments, quoted strings, and url() references with spaces while
// preserving every newline, so offsets and line numbers still match the source.
function maskNonCode(source) {
  const chars = source.split('');
  let index = 0;

  while (index < source.length) {
    if (source[index] === '/' && source[index + 1] === '*') {
      const close = source.indexOf('*/', index + 2);
      const end = close === -1 ? source.length : close + 2;
      for (let cursor = index; cursor < end; cursor += 1) {
        if (chars[cursor] !== '\n' && chars[cursor] !== '\r') chars[cursor] = ' ';
      }
      index = end;
      continue;
    }

    if (source[index] === '"' || source[index] === "'") {
      const quote = source[index];
      let end = index + 1;
      while (end < source.length) {
        if (source[end] === '\\') {
          end += 2;
          continue;
        }
        if (source[end] === quote) {
          end += 1;
          break;
        }
        end += 1;
      }
      for (let cursor = index; cursor < end; cursor += 1) {
        if (chars[cursor] !== '\n' && chars[cursor] !== '\r') chars[cursor] = ' ';
      }
      index = end;
      continue;
    }

    index += 1;
  }

  return chars.join('').replace(URL_REFERENCE, blank);
}

function lineAt(source, index) {
  let line = 1;
  for (let cursor = 0; cursor < index; cursor += 1) {
    if (source[cursor] === '\n') line += 1;
  }
  return line;
}

function firstPx(value, test) {
  for (const match of value.matchAll(PX_LENGTH)) {
    const px = Number(match[0].slice(0, -2));
    if (test(px)) return { index: match.index, raw: match[0] };
  }
  return null;
}

/**
 * @typedef {{ rule: string, line: number, severity: 'error' | 'warning', message: string }} Finding
 */

/**
 * Audit CSS text against the t128n integrity rules.
 * @param {string} source
 * @returns {Finding[]}
 */
export function auditCss(source) {
  if (typeof source !== 'string') {
    throw new TypeError('auditCss expects CSS text');
  }

  const scan = maskNonCode(source);
  const findings = [];

  const add = (rule, index, message) => {
    findings.push({
      finding: {
        rule,
        line: lineAt(source, index),
        severity: 'error',
        message,
      },
      index,
    });
  };

  for (const match of scan.matchAll(DECLARATION)) {
    const property = match[1];
    const value = match[2];
    const propertyStart = match.index + match[0].indexOf(property);
    const valueStart = match.index + match[0].length - value.length;

    if (SHADOW_PROPERTY.test(property) && !/^none\b/i.test(value.trim())) {
      add('no-shadow', propertyStart, `Use rules, tints, and spacing instead of ${property}.`);
    }

    const dropShadow = DROP_SHADOW_VALUE.exec(value);
    if (dropShadow) {
      add(
        'no-shadow',
        valueStart + dropShadow.index,
        'Remove drop-shadow; use rules, tints, and spacing instead.',
      );
    }

    const gradient = GRADIENT_VALUE.exec(value);
    if (gradient) {
      add('no-gradient', valueStart + gradient.index, 'Use a solid surface tint instead of a gradient.');
    }

    const blur = BLUR_VALUE.exec(value);
    if (blur) {
      add('no-blur', valueStart + blur.index, 'Remove blur; it softens text and chrome.');
    }

    if (RADIUS_PROPERTY.test(property)) {
      const radius = firstPx(value, (px) => px > MAX_RADIUS_PX);
      if (radius) {
        add(
          'no-large-radius',
          valueStart + radius.index,
          `Radius ${radius.raw} exceeds the ${MAX_RADIUS_PX}px maximum; use a radius token.`,
        );
      }
    }

    if (FONT_SIZE_PROPERTY.test(property)) {
      const size = firstPx(value, (px) => px < MIN_FONT_SIZE_PX);
      if (size) {
        add(
          'no-small-type',
          valueStart + size.index,
          `Font size ${size.raw} is below the ${MIN_FONT_SIZE_PX}px minimum; use a type scale token.`,
        );
      }
    }

    const color = HEX_COLOR.exec(value) ?? COLOR_FUNCTION.exec(value);
    if (color) {
      add(
        'no-hardcoded-color',
        valueStart + color.index,
        `Hard-coded color ${color[0]}; use a color token from references/DESIGN.md.`,
      );
    }
  }

  return findings
    .sort(
      (left, right) =>
        left.finding.line - right.finding.line ||
        left.index - right.index ||
        RULE_ORDER.indexOf(left.finding.rule) - RULE_ORDER.indexOf(right.finding.rule),
    )
    .map(({ finding }) => finding);
}

async function main(argv) {
  const [file] = argv;
  if (!file) {
    console.error('usage: audit-css.mjs <file.css>');
    return 2;
  }

  let source;
  try {
    source = await readFile(file, 'utf8');
  } catch (error) {
    console.error(`audit-css: ${error.message}`);
    return 2;
  }

  const findings = auditCss(source);
  process.stdout.write(`${JSON.stringify(findings, null, 2)}\n`);
  return findings.some((finding) => finding.severity === 'error') ? 1 : 0;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = await main(process.argv.slice(2));
}
