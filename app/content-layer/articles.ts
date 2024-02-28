import path from 'path';
import { readDir, readFileToString } from '~/utils/fs';
import invariant from '~/utils/invariant';
import { parseMarkdown } from '~/content-layer/markdown';
import BlogConfig, { ArticleFrontMatter } from 'blog.config';

type Category = string;
type Title = string;
type ArticleContent = string;

interface Article {
  /**
   * @description content/{category}/{filename}.md
   */
  category: Category;
  /**
   * @description Content of the article
   */
  content: ArticleContent;
  /**
   * @description frontmatter.title
   */
  title: Title;
  /**
   * @description frontmatter.date
   */
  lastUpdatedAt: Date;
  /**
   * @description frontmatter.thumbnail
   */
  thumbnail?: string;
  /**
   * @description calculated by 'reading-time' package
   */
  readingTime: number;
}

export interface ArticleMap {
  [category: Category]: {
    [title: Title]: Article;
  }
}

export type ArticleSummary = Omit<Article, 'content'>

const dirname = path.resolve();
const contentsDirectoryPath = BlogConfig.content.directory;

const articles = new Map<Category, Map<Title, Article>>()

async function prepareArticles() {
  if (articles.size > 0) {
    return articles;
  } else {

    const contentsDirectory = (await readDir(dirname, contentsDirectoryPath)).filter(x => x.isDirectory);
      
    await Promise.all(contentsDirectory.flatMap(async ({ name: category }) => {
      const files = (await readDir(contentsDirectoryPath, category)).filter(x => x.isFile());
  
      const articleByTitle = articles.has(category)
        ? articles.get(category)
        : new Map<Title, Article>();
  
      invariant(articleByTitle != null, 'articleByTitle is null');

      await Promise.all(files.flatMap(async ({ name: fileName }) => {
        const text = await readFileToString(contentsDirectoryPath, category, fileName);
        const article = await buildArticle(text);

        if (article != null) {
          articleByTitle.set(article.title, article);
        }
      }));
  
      articles.set(category, articleByTitle);
    }));
  
    return articles;
  }
}

async function buildArticle(text: string) {
  const result = await parseMarkdown<ArticleFrontMatter>(text);

  if (result == null) {
    return null;
  }
  
  const { html, attr } = result;

  if (new Date(attr.date).toString() === 'Invalid Date') {
    console.warn(`Invalid date: ${text.substring(0, 30)}`);

    return null;
  }
  const article: Article = {
    category: attr.category,
    content: html,
    title: attr.title,
    lastUpdatedAt: attr.date,
    thumbnail: attr.thumbnail, // TODO: default thumbnail
    readingTime: attr.readingTime,
  };

  return article;
}

export interface ArticeListQueryOptions {
  count?: number;
}

async function getArticles(options?: ArticeListQueryOptions): Promise<ArticleSummary[]> {
  const { count } = options ?? { count: null };
  const articles = await prepareArticles();
  
  const sortedArticles = [...articles.values()].flatMap(x => [...x.values()]).sort((a, b) => {
    return new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime();
  });

  if (count == null) {
    return sortedArticles;
  }

  return sortedArticles.slice(0, count);
}

async function getArticle(category: string, title: string): Promise<Article> {
  const articles = await prepareArticles();
  const categorized = articles.get(category);

  invariant(categorized != null, `Category '${category}' not found`);

  const article = categorized.get(title);

  invariant(article != null, `Article '${title}' not found`);

  return article;
}

export const articlesLayer = {
  getArticle,
  getArticles,
}
