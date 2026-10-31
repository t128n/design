export const spaceScale = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

export type Space = (typeof spaceScale)[number];

/**
 * Mirrors the `--breakpoint-*` tokens in `styles/tokens.css`.
 * CSS media queries cannot read custom properties, so components repeat these
 * literal numbers with a comment naming the token.
 */
export const breakpoints = { sm: 640, md: 800, lg: 1024 } as const;

export type Breakpoint = keyof typeof breakpoints;

export type CollapseAt = Breakpoint | 'never';

export const layoutTags = [
  'div',
  'section',
  'article',
  'header',
  'footer',
  'main',
  'nav',
  'aside',
  'ul',
  'ol',
  'dl',
  'form',
  'fieldset',
  'figure'
] as const;

export type LayoutTag = (typeof layoutTags)[number];

export const listMarkers = [
  'none',
  'disc',
  'circle',
  'square',
  'decimal',
  'lower-alpha',
  'upper-roman'
] as const;

export type ListMarker = (typeof listMarkers)[number];

