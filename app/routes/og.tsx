import { LoaderFunctionArgs } from 'react-router';
import satori from 'satori';
import sharp from 'sharp';
import { OpenGraphTemplate } from '~/components/og/OpenGraphTemplate';
import { FreesentationFont } from '~/styles/font/freesentation';
import fs from '~/utils/fs/fs-extra.server';

export async function loader({
  request,
}: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const title = url.searchParams.get('title') ?? ''
  const date = url.searchParams.get('date') ?? ''

  const svg = await satori(<OpenGraphTemplate title={title} date={date} />, {
    width: 1280,
    height: 720,
    fonts: Object.entries(FreesentationFont).map(([, { filename, weight }]) => {
      return {
        name: 'Freesentation',
        data: fs.readFileSync(`./fonts/${filename}`),
        weight,
      }
    }),
  })

  return new Response(await svgBufferToPngBuffer(svg), {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
async function svgBufferToPngBuffer(svg: string) {
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return pngBuffer;
}
