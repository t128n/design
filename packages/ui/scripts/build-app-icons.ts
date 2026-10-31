/**
 * Export favicons and app icons from the identity registry.
 *
 *   bun run icons              # every app in the registry
 *   bun run icons design docs  # only the named apps
 *
 * Output: dist/app-icons/<id>/ with favicon.svg, the PNG ladder, favicon.ico,
 * and site.webmanifest. The geometry and the tokens are read from the same
 * modules the in-product AppMark uses, so the tab icon cannot drift from the
 * mark rendered in the interface.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import {
  APP_MARK_GEOMETRY,
  APP_MARK_RADIUS,
  opticalVariant,
  type AppIcon,
  type AppMarkVariant
} from '../src/lib/app-icons';
import { appRegistry } from '../src/lib/apps';

type CarbonCollection = { icons: Record<string, { body: string }> };

const uiRoot = fileURLToPath(new URL('..', import.meta.url));
const repoRoot = fileURLToPath(new URL('../../..', import.meta.url));
const outRoot = join(repoRoot, 'dist/app-icons');
const tokensPath = join(uiRoot, 'src/styles/tokens.css');

const carbon = JSON.parse(
  await readFile(fileURLToPath(import.meta.resolve('@iconify-json/carbon/icons.json')), 'utf8')
) as CarbonCollection;

const tokens = await readFile(tokensPath, 'utf8');

const token = (name: string) => {
  const match = tokens.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`));
  if (!match) throw new Error(`Missing --${name} in ${tokensPath}`);
  return match[1];
};

const foreground = token('app-mark-foreground');
const toneColor = (tone: AppIcon['tone']) => token(`app-tone-${tone}`);

/** Iconify Carbon artwork is a 32-unit square. */
const ICON_BOX = 32;

/**
 * One SVG, sized by the optical variant. `favicon.svg` uses the `tab` variant
 * because browsers render it at 16–32px; the raster ladder picks per size.
 */
const renderSvg = (app: AppIcon, variant: AppMarkVariant) => {
  const glyph = app.glyph && carbon.icons[app.glyph];
  if (!glyph) throw new Error(`${app.id}: no Carbon artwork for "${app.glyph}"`);

  const geometry = APP_MARK_GEOMETRY[variant];
  const inner = ICON_BOX * geometry.glyph;
  const offset = (ICON_BOX - inner) / 2;
  const scale = inner / ICON_BOX;
  const body = glyph.body.replaceAll('currentColor', foreground);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ICON_BOX} ${ICON_BOX}" width="${ICON_BOX}" height="${ICON_BOX}">
  <rect width="${ICON_BOX}" height="${ICON_BOX}" rx="${(ICON_BOX * APP_MARK_RADIUS).toFixed(2)}" fill="${toneColor(app.tone)}"/>
  <g transform="translate(${offset.toFixed(2)} ${offset.toFixed(2)}) scale(${scale.toFixed(4)})">${body}</g>
</svg>
`;
};

const png = (svg: string, size: number) =>
  new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();

/** ICO is a small container around PNG payloads; no extra dependency needed. */
const ico = (frames: { size: number; data: Uint8Array }[]) => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);

  const entries = Buffer.alloc(16 * frames.length);
  let offset = header.length + entries.length;

  frames.forEach((frame, index) => {
    const base = index * 16;
    entries.writeUInt8(frame.size >= 256 ? 0 : frame.size, base);
    entries.writeUInt8(frame.size >= 256 ? 0 : frame.size, base + 1);
    entries.writeUInt8(0, base + 2);
    entries.writeUInt8(0, base + 3);
    entries.writeUInt16LE(1, base + 4);
    entries.writeUInt16LE(32, base + 6);
    entries.writeUInt32LE(frame.data.length, base + 8);
    entries.writeUInt32LE(offset, base + 12);
    offset += frame.data.length;
  });

  return Buffer.concat([header, entries, ...frames.map((frame) => Buffer.from(frame.data))]);
};

const pngSizes = [16, 32, 48, 180, 192, 512];

const exportApp = async (app: AppIcon) => {
  const dir = join(outRoot, app.id);
  await mkdir(dir, { recursive: true });

  await writeFile(join(dir, 'favicon.svg'), renderSvg(app, 'tab'));

  const frames = await Promise.all(
    pngSizes.map(async (size) => ({
      size,
      data: png(renderSvg(app, opticalVariant(size)), size)
    }))
  );

  const nameFor = (size: number) =>
    size === 180 ? 'apple-touch-180.png' : `icon-${size}.png`;

  await Promise.all(
    frames.map((frame) => writeFile(join(dir, nameFor(frame.size)), frame.data))
  );

  // The tab icon is the only place a .ico still matters.
  await writeFile(
    join(dir, 'favicon.ico'),
    ico(frames.filter((frame) => frame.size <= 48))
  );

  await writeFile(
    join(dir, 'site.webmanifest'),
    `${JSON.stringify(
      {
        name: app.label,
        short_name: app.label,
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ],
        theme_color: toneColor(app.tone),
        background_color: token('color-workspace'),
        display: 'standalone'
      },
      null,
      2
    )}\n`
  );

  return dir;
};

const requested = process.argv.slice(2);
const apps = (Object.values(appRegistry) as AppIcon[]).filter(
  (app) => requested.length === 0 || requested.includes(app.id)
);

if (apps.length === 0) {
  throw new Error(`No matching apps. Known ids: ${Object.keys(appRegistry).join(', ')}`);
}

const withoutGlyph = apps.filter((app) => !app.glyph);
if (withoutGlyph.length > 0) {
  throw new Error(
    `Favicon export needs a Carbon glyph. Add one or drop: ${withoutGlyph
      .map((app) => app.id)
      .join(', ')}`
  );
}

for (const app of apps) {
  const dir = await exportApp(app);
  console.log(`${app.id.padEnd(14)} ${dir}`);
}

console.log(`\n${apps.length} app icon set(s) written to ${outRoot}`);
