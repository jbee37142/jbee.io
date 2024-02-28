import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { articlesLayer } from '~/content-layer/articles';
import invariant from '~/utils/invariant';

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
    <section>
      <span>{category}</span>
      <h2>{title}</h2>
      <p>Updated At: {lastUpdatedAt}</p>
      <p>Time: {readingTime} minutes</p>
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
}

