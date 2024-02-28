import { Link, json, useLoaderData } from '@remix-run/react';
import { Container } from '~/components/container/Container';
import { GlobalNavigationBar } from '~/components/gnb/GlobalNavigationBar';
import { List } from '~/components/list/List';
import { articlesLayer } from '~/content-layer/articles';
import { safelyFormatDate } from '~/utils/safelyFormatDate';
import * as styles from './articles.css';

export async function loader() {
  const articles = json(await articlesLayer.getArticles());

  return articles
}

export default function ArticlesPage() {
  const articles = useLoaderData<typeof loader>();

  return (
    <Container>
      <GlobalNavigationBar />
      <List>
        {articles.map(({ title, category, lastUpdatedAt }, index) => {
          return (
            <li key={index} className={styles.articleItem}>
              <Link to={`/articles/${category}/${title}`} className={styles.link} prefetch="intent">
                <span>{title}</span>
                <span className={styles.dateText}>{safelyFormatDate(lastUpdatedAt)}</span>
              </Link>
            </li>
          
          )})}
      </List>
    </Container>
  );
}

