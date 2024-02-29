import BlogConfig from '../blog.config.ts';
import fb from 'fast-glob';
import fs from 'fs-extra';
import path from 'node:path';

const DIRNAME = path.resolve();
const contentsDirectoryPath = path.join(DIRNAME, BlogConfig.content.directory);
const contentsImagePath = path.join(DIRNAME, 'public', 'articles');

async function prepareImages() {
  const images = await fb.glob(['**/*.png', '**/*.jpg', '**/*.jpeg'], {
    cwd: contentsDirectoryPath,
  });
  try {
    await Promise.all(images.map(async (image) => {
      await fs.copy(
        path.join(contentsDirectoryPath, image),
        path.join(contentsImagePath, image)
      );
    }));
  } catch (error) {
    console.error('[Content-layer] Failed to copy images -> ', error);
  }
}

prepareImages()
