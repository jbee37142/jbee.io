import type { Config } from "@react-router/dev/config";
import { vercelPreset } from '@vercel/react-router/vite';
import console from "node:console";
import fs from 'node:fs';
import path from 'node:path';

interface Article {
  category?: string;
  permalink?: string;
  title?: string;
}

interface Manifest {
  articles: string;
}

// Read manifest.json from the articles directory
const manifestPath = path.join(__dirname, '.generated/articles/manifest.json');
const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
const manifest: Manifest = JSON.parse(manifestContent) as Manifest;
const articles = JSON.parse(manifest.articles) as Article[]


// Process each article from manifest to create prerender paths
const articlePaths = articles.map((article: Article) => {
  try {
    if (!article.category) {
      console.warn(`Warning: Missing required fields in article:`, {
        category: article.category,
        permalink: article.permalink,
        title: article.title
      });
    }

    const category = encodeURIComponent(article.category || '');
    const slug = encodeURIComponent(article.permalink || article.title || '');
    return `/articles/${category}/${slug}`;
  } catch (error) {
    console.error(`Error processing article:`, error);
    return '';
  }
}).filter((path: string) => path !== '');

export default {
  ssr: true,
  prerender: () => [
    '/',
    '/brand',
    "/robots.txt",
    "/rss.xml",
    "/articles",
    ...articlePaths
  ],
  presets: [vercelPreset()],
} satisfies Config;
