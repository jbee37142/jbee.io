import { parseMarkdown } from 'content-layer/utils/parseMarkdown';
import fb from 'fast-glob';
import fs from 'fs-extra';
import path from 'node:path';
import { Article, ArticleFrontMatter, Category, Title } from './types';

export async function prepareArticles({ from: baseDirectory, to: destination }: {from:string;to:string}) {
  const markdownFiles = await fb.glob('**/*.md', { cwd: baseDirectory });
  
  const manifest: Article[] = []
  
  await Promise.all(markdownFiles.map(async (file) => {
    const text = await readFileToString(baseDirectory, file);
    const article = await buildArticle(text);
  
    if (article != null)  {
      manifest.push(article);
      await fs.outputJson(`${destination}/${article.id}.json`, article)
    }
  }));
  await fs.outputJson(`${destination}/manifest.json`, { articles: JSON.stringify(manifest) });
    
}

async function buildArticle(text: string) {
  const result = await parseMarkdown<ArticleFrontMatter>(text);
  
  if (result == null) {
    console.warn('Invalid frontmatter', text.substring(0, 30));
  
    return null;
  }
    
  const { html, attr } = result;
  
  if (new Date(attr.date).toString() === 'Invalid Date') {
    console.warn(`Invalid date: ${text.substring(0, 30)}`);
  
    return null;
  }
  const article: Article = {
    id: getArticleId(attr.category, attr.title),
    category: attr.category,
    content: html,
    title: attr.title,
    lastUpdatedAt: attr.date,
    thumbnail: attr.thumbnail, // TODO: default thumbnail
    readingTime: attr.readingTime,
  };
  
  return article;
}

export function getArticleId(category: Category, title: Title) {
  return `${category}+${title}`;
}
  
async function readFileToString(...args: string[]): Promise<string> {
  const data = await fs.readFile(path.join(...args), { encoding: 'utf-8' });
      
  return data.toString();
}
  
