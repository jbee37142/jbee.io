import { Link, json, useLoaderData } from '@remix-run/react';
import { GlobalNavigationBar } from '~/components/GlobalNavigationBar';
import { articlesLayer } from '~/content-layer/articles';

export async function loader() {
  return json(await articlesLayer.getArticles());
}

export default function ArticlesPage() {
  const articles = useLoaderData<typeof loader>();
  
  return (
    <main>
      <GlobalNavigationBar />
      <section>
        <h2>Articles</h2>
        <ul>
          {articles.map(({ title, category }, index) => (
            <li key={index}>
              <Link to={`/articles/${category}/${title}`} prefetch="intent">
                <div>
                  <h3>{title}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

