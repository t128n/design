import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLTimeAttributes } from 'svelte/elements';

export const textVariants = [
  'display',
  'heading',
  'subheading',
  'body',
  'body-sm',
  'label',
  'caption'
] as const;

export type TextVariant = (typeof textVariants)[number];

export const textTones = [
  'primary',
  'secondary',
  'muted',
  'inherit',
  'info',
  'progress',
  'success',
  'warning',
  'danger',
  'disabled'
] as const;

export type TextTone = (typeof textTones)[number];

export const textWeights = ['regular', 'medium', 'semibold'] as const;

export type TextWeight = (typeof textWeights)[number];

export const textTags = [
  'p',
  'span',
  'div',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'strong',
  'blockquote',
  'figcaption',
  'dt',
  'dd',
  'li',
  'legend',
  'time',
  'address'
] as const;

export type TextTag = (typeof textTags)[number];

export type TextAlign = 'start' | 'center' | 'end';

export const headingLevels = [1, 2, 3, 4, 5, 6] as const;

/** Heading levels are document order, not visual size. */
export type HeadingLevel = (typeof headingLevels)[number];

export type HeadingTag = `h${HeadingLevel}`;

/** Maps a semantic heading level to the matching native heading element. */
export function headingTag(level: HeadingLevel): HeadingTag {
  return `h${level}`;
}

/**
 * Attributes that differ by render target. Every other tag shares the generic
 * element attributes, so the type stays small while `time` still accepts
 * `datetime` and `li` accepts `value`. `a` and `button` are absent on purpose:
 * interaction belongs to `Link` and `Button`.
 */
type TextTagAttributes<Tag extends TextTag> = Tag extends 'time'
  ? HTMLTimeAttributes
  : Tag extends 'li'
    ? HTMLAttributes<HTMLLIElement>
    : HTMLAttributes<HTMLElement>;

type TextBaseProps = {
  variant?: TextVariant;
  tone?: TextTone;
  weight?: TextWeight;
  align?: TextAlign;
  numeric?: boolean;
  class?: string;
  children?: Snippet;
};

export type TextProps<Tag extends TextTag = 'p'> = TextBaseProps &
  TextTagAttributes<Tag> & {
    as?: Tag;
  };
