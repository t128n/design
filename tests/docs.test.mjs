import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { test } from 'bun:test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function readText(file) {
  return readFile(path.join(root, file), 'utf8');
}

test('docs describe the personal system', async () => {
  const readme = await readText('README.md');

  assert.match(readme, /^# t128n's personal design system$/m, 'README title is not the personal system name');
  assert.match(readme, /t128n's own tools/i, 'README does not describe a personal system for t128n\'s own tools');
  assert.match(readme, /personal design system/i, 'README does not say personal design system');
  assert.doesNotMatch(readme, /platform design system/i, 'README must not use "platform design system"');

  for (const heading of [
    'Purpose',
    'Install',
    'Repository layout',
    'Quick start',
    'Using the tokens',
    'Layouts',
    'Preview',
    'Dark mode',
    'Adopting in an app',
    'Versioning',
    'Enforcement',
    'Contributing',
  ]) {
    assert.match(readme, new RegExp(`^## ${heading}$`, 'm'), `README is missing the ${heading} section`);
  }

  for (const command of [
    'bun install',
    'bun test',
    'bun run check',
    'bun run build',
    'bun run lint',
    'bun run preview:dev',
    'bun run preview:build',
    'bunx --bun designmd lint skills/t128n-ui/references/DESIGN.md',
    'git diff --exit-code -- skills/t128n-ui/assets',
  ]) {
    assert.ok(readme.includes(command), `README does not document ${command}`);
  }

  for (const link of [
    '[skills/t128n-ui/references/DESIGN.md](skills/t128n-ui/references/DESIGN.md)',
    '[skills/t128n-ui/assets/tokens.css](skills/t128n-ui/assets/tokens.css)',
    '[skills/t128n-ui/assets/layouts.css](skills/t128n-ui/assets/layouts.css)',
    '[preview/pages/](preview/pages/)',
    '[preview](preview/)',
    '[evals](evals/)',
  ]) {
    assert.ok(readme.includes(link), `README does not link ${link}`);
  }

  for (const path of [
    'skills/t128n-ui/references/DESIGN.md',
    'skills/t128n-ui/assets/tokens.css',
    'skills/t128n-ui/assets/layouts.css',
    'skills/t128n-ui/scripts/audit-css.mjs',
  ]) {
    assert.ok(readme.includes(path), `README does not mention ${path}`);
  }

  for (const variable of [
    '--color-<name>',
    '--font-<type>',
    '--text-<type>-size',
    '--space-<name>',
    '--radius-<name>',
  ]) {
    assert.ok(readme.includes(variable), `README does not document ${variable}`);
  }

  assert.ok(readme.includes('data-theme'), 'README does not explain data-theme');
  assert.match(readme, /prefers-color-scheme/, 'README does not explain the media-query fallback');
  assert.match(readme, /pin a commit/i, 'README does not say to pin a commit');
  assert.match(
    readme,
    /single normative source/i,
    'README must state skills/t128n-ui/references/DESIGN.md as the authoritative source',
  );
  assert.ok(
    readme.includes('https://t128n.github.io/design/'),
    'README does not link the Pages preview',
  );

  const changelog = await readText('CHANGELOG.md');
  assert.match(changelog, /^#\s*Changelog\s*$/m);
  assert.match(changelog, /t128n's personal design system/i, 'CHANGELOG is not rebranded');
  assert.ok(/^## \[?0\.1\.0\]?/m.test(changelog), 'CHANGELOG does not contain the 0.1.0 release');
  assert.match(
    changelog,
    /### Changed[\s\S]*?skills\/t128n-ui\/references\/DESIGN\.md/,
    'CHANGELOG does not record the strict skill move',
  );
});

test('install commands are exact', async () => {
  const readme = await readText('README.md');
  assert.ok(
    readme.includes('npx skills add t128n/design'),
    'README does not document the published install command',
  );
  assert.ok(
    readme.includes('npx skills add ./skills/t128n-ui'),
    'README does not document the local copy install command',
  );
  assert.ok(
    readme.includes('mkdir -p ~/.agents/skills'),
    'README does not document creating the skills directory',
  );
  assert.ok(
    readme.includes('ln -sfn "$PWD/skills/t128n-ui" ~/.agents/skills/t128n-ui'),
    'README does not document the local symlink of the skill directory',
  );
});

test('README never symlinks the repo root', async () => {
  const readme = await readText('README.md');
  assert.match(
    readme,
    /never symlink the repo root/i,
    'README does not warn against symlinking the repo root',
  );
  assert.doesNotMatch(
    readme,
    /ln -sfn "\$PWD" ~\/\.agents\/skills\/t128n-ui/,
    'README must not symlink the repo root ($PWD) into the skills directory',
  );
  assert.doesNotMatch(
    readme,
    /npx skills add \.(?!\/)/,
    'README must not recommend installing the repo root; install the skill directory',
  );
});

test('no root skill paths', async () => {
  const readme = await readText('README.md');
  assert.doesNotMatch(readme, /dist\//, 'README still references the removed dist/ tree');
  assert.doesNotMatch(readme, /\[SKILL\.md\]/, 'README links a root SKILL.md');
  assert.doesNotMatch(readme, /\(assets\//, 'README links a root assets/ path');
  assert.doesNotMatch(readme, /\(references\//, 'README links a root references/ path');
  assert.doesNotMatch(readme, /\(scripts\//, 'README links a root scripts/ path');
});

test('every README link resolves', async () => {
  const readme = await readText('README.md');
  const links = [...readme.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map((m) => m[1]);
  assert.ok(links.length > 0, 'README has no markdown links');

  for (const target of links) {
    if (/^(https?:|#)/.test(target)) continue;
    const resolved = target.split('#')[0];
    assert.ok(
      existsSync(path.join(root, resolved)),
      `README links to a missing path: ${target}`,
    );
  }
});

test('docs describe mobile-first behavior', async () => {
  const readme = await readText('README.md');
  const layouts = readme.match(/^## Layouts\n([\s\S]*?)(?=^## )/m);
  assert.ok(layouts, 'README is missing the Layouts section');
  assert.match(layouts[1], /^### Mobile$/m, '### Mobile is not under ## Layouts');
  assert.doesNotMatch(readme, /^## Mobile$/m, 'README adds a ## Mobile heading');

  const mobile = layouts[1].slice(layouts[1].indexOf('### Mobile'));
  for (const text of ['mobile-first', '44px', '16px', '640px', '800px', '1024px', 'safe-area', 't128n-table-scroll', '--space-touch']) {
    assert.ok(mobile.includes(text), `README's Mobile section is missing ${text}`);
  }

  const ladder = mobile.match(/`min-width` values at `(\d+)px`, `(\d+)px`, and `(\d+)px`/);
  assert.ok(ladder, 'README does not state the min-width breakpoint ladder');
  const breakpoints = (css) => [...new Set([...css.matchAll(/@media \(min-width: (\d+)px\)/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
  const [layoutsCss, previewCss] = await Promise.all([
    readText('skills/t128n-ui/assets/layouts.css'),
    readText('preview/src/app.css'),
  ]);
  const documented = ladder.slice(1).map(Number);
  assert.deepEqual(documented, breakpoints(layoutsCss), 'README breakpoints do not match skills/t128n-ui/assets/layouts.css');
  for (const width of breakpoints(previewCss)) {
    assert.ok(documented.includes(width), `README does not document the preview ${width}px breakpoint`);
  }

  const changelog = await readText('CHANGELOG.md');
  const unreleased = changelog.indexOf('## [Unreleased]');
  const release = changelog.indexOf('## [0.1.0]');
  assert.ok(unreleased >= 0, 'CHANGELOG is missing ## [Unreleased]');
  assert.match(changelog, /^## \[Unreleased\]$/m, 'CHANGELOG is missing an Unreleased section');
  assert.ok(unreleased < release, '## [Unreleased] must precede ## [0.1.0]');
  const versions = [...changelog.matchAll(/^## \[([^\]]+)\]/gm)].map((m) => m[1]);
  assert.deepEqual(versions, ['Unreleased', '0.1.0'], 'CHANGELOG claims an unreleased version');
});
