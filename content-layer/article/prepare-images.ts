import fb from 'fast-glob';
import fs from 'fs-extra';
import path from 'node:path';

export async function prepareImages({ from: baseDirectory, to: destination }: {from:string;to:string}) {
  const images = await fb.glob(['**/*.png', '**/*.jpg', '**/*.jpeg'], {
    cwd: baseDirectory,
  });
  try {
    await Promise.all(images.map(async (image) => {
      await fs.copy(
        path.join(baseDirectory, image),
        path.join(destination, image)
      );
    }));
  } catch (error) {
    console.error('[Content-layer] Failed to copy images -> ', error);
  }
}
