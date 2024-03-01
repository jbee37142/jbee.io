  
import rehypeShiki from '@shikijs/rehype';
import fb from 'fast-glob';
import fm from 'front-matter';
import fs from 'fs-extra';
import path from 'node:path';
import readingTime from 'reading-time';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { Article, ArticleFrontMatter, Category, Title } from './types';

export async function prepareArticles({ from: baseDirectory, to: destination }: {from:string;to:string}) {
  const markdownFiles = await fb.glob('**/*.md', { cwd: baseDirectory });
  
  const manifest: Article[] = []
  
  await Promise.all(markdownFiles.map(async (file) => {
    const text = await readFileToString(baseDirectory, file);
    console.log('[content-layer] in: ', file);
    const article = await buildArticle(text);
  
    if (article != null)  {
      manifest.push(article);
      console.log('[content-layer] generated: ', article.title);
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

async function parseMarkdown<FrontMatterType>(text: string) {
  const frontmatter = fm<FrontMatterType>(text);
      
  if (frontmatter == null) {
    return null;
  }
  
  const attr = frontmatter.attributes;
  const time = Math.ceil(readingTime(text).minutes)
  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeShiki, {
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      }
    })
    .use(rehypeStringify)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .process(text)
    .then((value) => String(value));
  
  return {
    attr: {
      ...attr,
      readingTime: time,
    },
    html,
  }
}
  
