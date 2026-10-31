export const spaceScale = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

export type Space = (typeof spaceScale)[number];

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
