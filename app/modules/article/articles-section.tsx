import { Link } from 'react-router';
import { Article } from 'content-layer/article/types';
import { ReactNode } from 'react';
import * as styles from './styles.css';

export interface ArticlesSectionProps {
  title: ReactNode;
  articles: Article[];
}

export function ArticlesSection({
  title,
  articles,
}: ArticlesSectionProps) {
  return (
    <section>
      {title}
      <ul className={styles.list}>
        {articles.map(({ title, category, permalink }, index) => {
          return (
            <li key={index}>
              <Link to={`/articles/${category}/${permalink ?? title}`} prefetch="intent">
                <span>{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
