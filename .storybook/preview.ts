// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import type { Preview } from '@storybook/svelte-vite';
import { docsTheme } from './theme';

const preview: Preview = {
  parameters: {
    a11y: {
      test: 'error'
    },
    docs: {
      theme: docsTheme
    },
    controls: {
      expanded: true
    },
    options: {
      storySort: {
        order: [
          'Foundations',
          [
            'Overview',
            'Manual',
            'Design language',
            'Theming',
            'Theming reference',
            'Components reference',
            'Contributing'
          ],
          'Primitives',
          'Layouts',
          'Components',
          ['Controls', 'Forms', 'Data', 'Feedback', 'Overlays', 'Navigation'],
          'Views'
        ]
      }
    },
    viewport: {
      options: {
        narrow320: {
          name: 'Narrow 320',
          styles: { width: '320px', height: '800px' },
          type: 'mobile'
        },
        narrow375: {
          name: 'Narrow 375',
          styles: { width: '375px', height: '812px' },
          type: 'mobile'
        },
        tablet768: {
          name: 'Tablet 768',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet'
        },
        desktop1280: {
          name: 'Desktop 1280',
          styles: { width: '1280px', height: '900px' },
          type: 'desktop'
        }
      }
    }
  }
};

export default preview;
