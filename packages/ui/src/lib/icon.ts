import type { Component } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

/**
 * A Carbon icon component imported through the build-time `unplugin-icons`
 * pipeline, for example `import Add from '~icons/carbon/add'`.
 */
export type IconComponent = Component<SvelteHTMLElements['svg']>;

/** Carbon's intended display sizes. 32 is reserved for large representations. */
export const iconSizes = [16, 20, 24, 32] as const;

export type IconSize = (typeof iconSizes)[number];
