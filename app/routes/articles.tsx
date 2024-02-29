import { Link, MetaFunction, json, useLoaderData } from '@remix-run/react';
import { articlesLayer } from '~/content-layer/articles';
import { safelyFormatDate } from '~/utils/safelyFormatDate';
import * as styles from './articles.css';

export const meta: MetaFunction = () => {
  return [
    { title: 'Articles | Jbee.io' },
    { name: '글 목록', content: 'Welcome to Jbee.io' },
  ];
};

export async function loader() {
  const articles = json(await articlesLayer.getArticles());

  return articles
}

export default function ArticlesPage() {
  const articles = useLoaderData<typeof loader>();

  return (
    <ul className={styles.root}>
      {articles.map(({ title, category, lastUpdatedAt }, index) => {
        return (
          <li key={index}>
            <Link to={`/articles/${category}/${title}`} className={styles.link} prefetch="intent">
              <span>{title}</span>
              <span className={styles.dateText}>{safelyFormatDate(lastUpdatedAt)}</span>
            </Link>
          </li>
        )})}
    </ul>

  );
}
