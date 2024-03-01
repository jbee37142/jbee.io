export type Category = string;
export type Title = string;
export type ArticleContent = string;

export interface Article {
  /**
   * @description {category}+{filename} generated
   */
  id: string;
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

export interface ArticleFrontMatter {
  title: string;
  date: Date;
  category: string;
  thumbnail?: string;
  draft?: boolean;
}
