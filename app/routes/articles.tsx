import { Link } from '@remix-run/react';
import { GlobalNavigationBar } from '~/components/GlobalNavigationBar';

export default function ArticlesPage() {
  return (
    <main>
      <GlobalNavigationBar />
      <section>
        <h2>Articles</h2>
        <ul>
          <li>
            <Link to="/articles/web/test" prefetch="intent">test</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
