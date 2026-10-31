// Type-only consumer fixture: compiles against the published entrypoints with strict mode.
import { Button, Dialog, Stack, Text } from '@t128n/ui';
import type { LayoutTag, Space, TextVariant } from '@t128n/ui';
import '@t128n/ui/styles';

export const gap: Space = 'md';
export const variant: TextVariant = 'body';
export const tag: LayoutTag = 'div';

export const components = { Button, Dialog, Stack, Text };
