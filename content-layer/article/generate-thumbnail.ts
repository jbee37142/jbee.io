import fs from 'fs-extra';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

/**
 * Build-time thumbnail generator.
 *
 * Renders the same layout as the hand-made AI series thumbnails:
 * the grid background + Jbee.io logo template, with the title and the
 * publish date on the top-left. Only the title and the date change.
 */

const WIDTH = 1920;
const HEIGHT = 1080;
/** The template is designed at 1280x720; every measurement below is in that unit. */
const SCALE = WIDTH / 1280;

const TEMPLATE_PATH = path.join('public', 'img', 'open-graph-template.png');
const FONT_DIR = path.join('public', 'fonts');

interface ThumbnailAssets {
  background: string;
  fonts: { name: string; data: Buffer; weight: 500 | 700 }[];
}

let assetsPromise: Promise<ThumbnailAssets> | null = null;

function loadAssets(rootDirectory: string): Promise<ThumbnailAssets> {
  assetsPromise ??= (async () => {
    const [template, bold, medium] = await Promise.all([
      fs.readFile(path.join(rootDirectory, TEMPLATE_PATH)),
      fs.readFile(path.join(rootDirectory, FONT_DIR, 'Freesentation-7Bold.ttf')),
      fs.readFile(path.join(rootDirectory, FONT_DIR, 'Freesentation-5Medium.ttf')),
    ]);

    return {
      background: `data:image/png;base64,${template.toString('base64')}`,
      fonts: [
        { name: 'Freesentation', data: bold, weight: 700 },
        { name: 'Freesentation', data: medium, weight: 500 },
      ],
    };
  })();

  return assetsPromise;
}

/**
 * Formats a date like the existing thumbnails: `Feb 9th, 2026`.
 */
export function formatThumbnailDate(value: Date | string): string {
  const date = new Date(value);
  const day = date.getUTCDate();
  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });

  return `${month} ${day}${ordinalSuffix(day)}, ${date.getUTCFullYear()}`;
}

function ordinalSuffix(day: number): string {
  if (day % 100 >= 11 && day % 100 <= 13) {
    return 'th';
  }

  return ({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[day % 10] ?? 'th';
}

type Node = { type: string; props: Record<string, unknown> };

function element(type: string, style: Record<string, unknown>, children?: unknown): Node {
  return { type, props: { style, children } };
}

export async function generateThumbnail({
  title,
  date,
  output,
  rootDirectory,
}: {
  title: string;
  date: Date | string;
  /** Absolute path of the jpg to write */
  output: string;
  /** Repository root, used to find the template and fonts */
  rootDirectory: string;
}) {
  const { background, fonts } = await loadAssets(rootDirectory);

  const tree = element(
    'div',
    { width: WIDTH, height: HEIGHT, display: 'flex', position: 'relative', fontFamily: 'Freesentation' },
    [
      { type: 'img', props: { src: background, width: WIDTH, height: HEIGHT, style: { position: 'absolute', top: 0, left: 0 } } },
      element(
        'div',
        { position: 'absolute', left: 87 * SCALE, top: 102 * SCALE, width: 1050 * SCALE, display: 'flex', flexDirection: 'column' },
        [
          element('div', { color: '#343A40', fontSize: 83 * SCALE, fontWeight: 700, lineHeight: 1.25, letterSpacing: -0.5, wordBreak: 'keep-all' }, title),
          element('div', { color: '#6E6E6E', fontSize: 33 * SCALE, fontWeight: 500, marginTop: 4 * SCALE }, formatThumbnailDate(date)),
        ],
      ),
    ],
  );

  // satori accepts plain `{ type, props }` objects as well as React elements.
  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], { width: WIDTH, height: HEIGHT, fonts });

  await fs.ensureDir(path.dirname(output));
  await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toFile(output);
}
