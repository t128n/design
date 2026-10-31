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
