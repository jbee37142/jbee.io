import path from 'node:path';
import BlogConfig from '../blog.config.ts';
import { prepareArticles } from '../content-layer/article/prepare-article.ts';
import { prepareImages } from '../content-layer/article/prepare-images.ts';

const DIRNAME = path.resolve();

(async () => {
  await Promise.all([
    prepareArticles({
      from: path.join(DIRNAME, BlogConfig.articles.contentDirectory),
      to: path.join(DIRNAME, BlogConfig.articles.generatedDirectory, BlogConfig.articles.articlesDirectory),
    }),
    prepareImages({
      from:path.join(DIRNAME, BlogConfig.articles.contentDirectory),
      to: path.join(DIRNAME, 'public', 'articles'),
    }),
  ]);
})();

