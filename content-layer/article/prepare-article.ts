import rehypeShiki from '@shikijs/rehype';
import fb from 'fast-glob';
import fm from 'front-matter';
import fs from 'fs-extra';
import path from 'node:path';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { Article, ArticleFrontMatter, Category, Title } from './types';
import { urlToLink } from './url-to-link.js';

export async function prepareArticles({ from: baseDirectory, to: destination }: {from:string;to:string}) {
  const markdownFiles = await fb.glob('**/*.md', { cwd: baseDirectory });
  
  const manifest: Article[] = []
  
  await Promise.all(markdownFiles.map(async (file) => {
    const text = await readFileToString(baseDirectory, file);
    const article = await buildArticle(text);
  
    if (article != null)  {
      manifest.push(article);
      console.log('[content-layer] generated: ', article.title);
      await fs.outputJson(`${destination}/${article.id}.json`, article)
      if (article.permalink != null) {
        await fs.outputJson(`${destination}/${article.permalink}.json`, article)
      }
    }
  }));
  await fs.outputJson(`${destination}/manifest.json`, { articles: JSON.stringify(manifest) });
    
}

async function buildArticle(text: string) {
  const result = await parseMarkdown(text);
  
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
    lastUpdatedAt: attr.date.toString(),
    thumbnail: attr.thumbnail, // TODO: default thumbnail
    description: attr?.description,
    permalink: attr?.permalink,
    readingTime: attr.readingTime,
  };
  
  return article;
}
  
async function readFileToString(...args: string[]): Promise<string> {
  const data = await fs.readFile(path.join(...args), { encoding: 'utf-8' });
      
  return data.toString();
}

async function parseMarkdown(text: string) {
  const frontmatter = fm(text) as { attributes: ArticleFrontMatter; body: string };
      
  if (frontmatter == null) {
    return null;
  }
  
  const { attributes, body } = frontmatter;
  const time = Math.ceil(readingTime(text).minutes)
  const description = attributes.description ?? extractPlainText(body, { maxChars: 155 });
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
    .use(urlToLink)
    .use(rehypeExternalLinks, {rel: ['nofollow']})
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        className: ['hash'],
      },
    })
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .process(text)
    .then((value) => String(value));
  
  return {
    attr: {
      ...attributes,
      description,
      readingTime: time,
    },
    html,
  }
}
  
function getArticleId(category: Category, title: Title) {
  return `${category}+${title}`;
}


function extractPlainText(text: string, { maxChars = 100 }: { maxChars?: number } = {}): string {
  // Remove image references with descriptions
  text = text.replace(/!\[[^\]]*\]\([^)]*\)|!\([^)]*\)|!\S+/g, '');
  
  // Remove markdown headers
  text = text.replace(/^#{1,6}\s+/gm, '');
  
  // Remove markdown links while preserving text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  
  // Remove markdown emphasis/bold
  text = text.replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1');
  
  // Remove inline code blocks
  text = text.replace(/`[^`]+`/g, '');
  
  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, '');
  
  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, '');
  
  // Remove quotes
  text = text.replace(/^>\s+/gm, '');
  
  // Keep Korean text in parentheses but remove other special characters
  text = text.replace(/\([^)]*[\u3131-\u318E\uAC00-\uD7A3][^)]*\)|[^\u3131-\u318E\uAC00-\uD7A3\w\s.,!?()]/g, function(match) {
    return /[\u3131-\u318E\uAC00-\uD7A3]/.test(match) ? match : '';
  });
  
  // Normalize whitespace: replace newlines and multiple spaces with a single space
  text = text.replace(/\s+/g, ' ').trim();
  
  return text.substring(0, maxChars);
}
