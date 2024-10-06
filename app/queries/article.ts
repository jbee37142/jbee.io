import BlogConfig from 'blog.config.ts';
import { getArticleId } from 'content-layer/article/getArticleId';
import { Article } from 'content-layer/article/types';
import fs from 'fs-extra';
import path from 'node:path';

const DIRNAME = path.resolve();
const articlesDir = (file: string) => path.join(DIRNAME, BlogConfig.articles.generatedDirectory, BlogConfig.articles.articlesDirectory, file);

export interface ArticeListQueryOptions {
    count?: number;
  }
  
async function getArticles(options?: ArticeListQueryOptions): Promise<Article[]> {
  const { count } = options ?? { count: null };
  
  const manifestFile = await fs.readJSON(articlesDir('manifest.json'));
  const articles = JSON.parse(manifestFile.articles) as Article[]
    
  const sortedArticles = articles.sort((a, b) => {
    return new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime();
  });
  
  if (count == null) {
    return sortedArticles;
  }
  
  return sortedArticles.slice(0, count);
}
  
async function getArticle(category: string, title: string): Promise<Article | null> {
  
  try {
    return await fs.readJSON(articlesDir(`${getArticleId(category, title)}.json`));
  } catch {
    console.error('Article not found: ', category, title);
  
    return null;
  }
}

async function getArticleByPermalink(permalink: string): Promise<Article | null> {
  try {
    return await fs.readJSON(articlesDir(`${permalink}.json`));
  } catch {
    return null;
  }
}

export const articleQuery = {
  getArticle,
  getArticles,
  getArticleByPermalink,
}
