import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export async function loader({ params }: LoaderFunctionArgs) {
  return json({
    category: params['category'],
    title: params['article-title'],
  });
}

export default function ArticlePage() { 
  const { category, title } = useLoaderData<typeof loader>();

  return (
    <section>
      <span>{category}</span>
      <h2>{title}</h2>
    </section>
  );
}

