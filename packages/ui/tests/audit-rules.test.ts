// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { describe, expect, it } from 'vitest';
import {
  focusVisibleViolations,
  importantViolations,
  inlineStyleViolations,
  outlineSuppressionViolations,
  pageSectionCssViolations,
  rawPxViolations,
  rawStructureViolations,
  storyGlobalViolations,
  type SourceFile
} from './audit-rules';

const source = (value: string, path = 'Synthetic.svelte'): SourceFile => ({
  path,
  relativePath: path,
  source: value
});

describe('audit rule behaviour', () => {
  it('test_raw_structure_rule: raw table and section markup is reported with file and line', () => {
    const failures = rawStructureViolations([
      source('<section>\n  <table><tr><td>Cell</td></tr></table>\n</section>')
    ]);

    expect(failures).toHaveLength(3);
    expect(failures[0]).toContain('[framework.raw-structure] Synthetic.svelte:1');
    expect(failures[1]).toContain('Synthetic.svelte:2');
  });

  it('test_inline_style_rule: a static style attribute is reported as actionable', () => {
    const failures = inlineStyleViolations([
      source('<div style="padding: 2rem; text-align: center;">Content</div>')
    ]);

    expect(failures).toEqual([
      expect.stringContaining('[framework.inline-style] Synthetic.svelte:1')
    ]);
  });

  it('test_raw_px_rule: border-scale pixels pass while larger geometry fails', () => {
    const failures = rawPxViolations(
      [source('<style>\n.x { padding: 28px; border: 2px solid var(--color-border); }\n</style>')],
      { ruleId: 'framework.raw-px' }
    );

    expect(failures).toHaveLength(1);
    expect(failures[0]).toContain('Synthetic.svelte:2');
    expect(failures[0]).toContain('28px');
  });

  it('test_important_rule: reduced motion is the only allowed !important block', () => {
    const failures = importantViolations(
      [
        source(`<style>
          @media (prefers-reduced-motion: reduce) {
            .x { transition-duration: 0.01ms !important; }
          }
          .y { color: red !important; }
        </style>`)
      ],
      { ruleId: 'framework.important' }
    );

    expect(failures).toHaveLength(1);
    expect(failures[0]).toContain('Synthetic.svelte:5');
  });

  it('test_outline_rule: a focus-visible replacement unlocks a suppressed outline', () => {
    expect(
      outlineSuppressionViolations([
        source('<style>\n.x { outline: none; }\n.x:focus-visible { outline: 2px solid red; }\n</style>')
      ])
    ).toEqual([]);

    const failures = outlineSuppressionViolations([
      source('<style>\n.x { outline: none; }\n</style>')
    ]);

    expect(failures).toHaveLength(1);
    expect(failures[0]).toContain('[design.outline-suppression] Synthetic.svelte:2');
  });

  it('test_focus_rule: an interactive component without a focus-visible rule fails', () => {
    expect(focusVisibleViolations([source('<button>Save</button>')])).toHaveLength(1);
    expect(
      focusVisibleViolations([
        source('<button>Save</button><style>.x:focus-visible { outline: 2px solid; }</style>')
      ])
    ).toEqual([]);
    expect(focusVisibleViolations([source('<span>Static</span>', 'Badge.svelte')])).toEqual([]);
  });

  it('test_story_global_rule: only the shared story allowlist is approved', () => {
    expect(storyGlobalViolations([source('<style>:global(.page) { background: white; }</style>')])).toEqual(
      []
    );
    expect(storyGlobalViolations([source('<style>:global(body) { margin: 0; }</style>')])).toEqual([]);

    const failures = storyGlobalViolations([
      source('<style>:global(.unapproved) { color: red; }</style>')
    ]);

    expect(failures).toHaveLength(1);
    expect(failures[0]).toContain('[framework.story-global] Synthetic.svelte:1');
  });

  it('test_page_section_rule: local Page geometry and Section selectors fail', () => {
    expect(
      pageSectionCssViolations([
        source('<style>\n.page { background: var(--color-workspace); }\n</style>')
      ])
    ).toEqual([]);

    const failures = pageSectionCssViolations([
      source('<style>\n.page { display: grid; }\n.section { display: grid; }\n</style>')
    ]);

    expect(failures).toHaveLength(2);
    expect(failures[0]).toContain('[framework.page-section-css] Synthetic.svelte:2');
    expect(failures[1]).toContain('Synthetic.svelte:3');
  });
});
