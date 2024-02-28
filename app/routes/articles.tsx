import { Link, json, useLoaderData } from '@remix-run/react';
import { Container } from '~/components/container/Container';
import { GlobalNavigationBar } from '~/components/gnb/GlobalNavigationBar';
import { List } from '~/components/list/List';
import { articlesLayer } from '~/content-layer/articles';
import { common } from '~/styles/element.css';

export async function loader() {
  return json(await articlesLayer.getArticles());
}

export default function ArticlesPage() {
  const articles = useLoaderData<typeof loader>();
  
  return (
    <Container>
      <GlobalNavigationBar />
      <List>
        {articles.map(({ title, category }, index) => (
          <li key={index} className={common.listitem}>
            <Link to={`/articles/${category}/${title}`} className={common.anchor} prefetch="intent">
              {title}
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}

