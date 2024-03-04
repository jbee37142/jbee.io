import { Link } from '@remix-run/react';
import * as styles from './styles.css';
import { Article } from 'content-layer/article/types';

export interface ArticlesSectionProps {
  title: string;
  articles: Article[];
}

export function ArticlesSection({
  title,
  articles,
}: ArticlesSectionProps) {
  return (
    <section>
      <h3>{title}</h3>
      <ul className={styles.list}>
        {articles.map(({ title, category }, index) => {
          return (
            <li key={index}>
              <Link to={`/articles/${category}/${title}`} prefetch="intent">
                <span>{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
