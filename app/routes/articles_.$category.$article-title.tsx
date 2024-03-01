import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { articlesLayer } from '~/content-layer/articles';
import invariant from '~/utils/invariant';
import * as styles from './article.css'
import { safelyFormatDate } from '~/utils/safelyFormatDate';
import type { LinksFunction } from '@remix-run/node';
import articleStyles from '~/styles/article.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: articleStyles },
];

export async function loader({ params }: LoaderFunctionArgs) {
  const category = params.category;
  const title = params['article-title'];
  
  invariant(category != null, '\'category\' is required');
  invariant(title != null, '\'title\' is required');

  return json(await articlesLayer.getArticle(category, title));
}

export default function ArticlePage() { 
  const { category, title, content, lastUpdatedAt, readingTime } = useLoaderData<typeof loader>();

  return (
    <section className={styles.root}>
      <span className={styles.category}>{category}</span>
      <h1 className={styles.h1}>{title}</h1>
      <p className={styles.description}>
        <span className={styles.readingTime}>{readingTime} min read</span>
        |
        <span className={styles.updatedTime}>{safelyFormatDate(lastUpdatedAt)}</span>
      </p>
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
}

