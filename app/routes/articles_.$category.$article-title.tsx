import type { MetaFunction } from '@remix-run/node';
import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { articleQuery } from '~/queries/article';
import invariant from '~/utils/invariant';
import { generateMeta } from '~/utils/meta/generate-meta';
import { safelyFormatDate } from '~/utils/safelyFormatDate';
import { pathJoin } from '~/utils/path';
import BlogConfig from '../../blog.config';
import * as styles from './article.css';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { category, title } = data ?? {};
  invariant(category != null, '\'category\' is required');
  invariant(title != null, '\'title\' is required');

  return generateMeta({
    title: [data?.title ?? 'Article', BlogConfig.seo.title],
    description: data?.description ?? BlogConfig.seo.description,
    image: pathJoin(BlogConfig.site, 'articles', category, data?.thumbnail ?? ''),
    author: BlogConfig.author.twitter,
    site: BlogConfig.site,
  });
};

export async function loader({ params }: LoaderFunctionArgs) {
  const category = params.category;
  const title = params['article-title'];

  invariant(category != null, '\'category\' is required');
  invariant(title != null, '\'title\' is required');

  const article = await articleQuery.getArticle(category, title);

  if (article == null) {
    return redirect('/404');
  }

  return json(article);
}

export default function ArticlePage() {
  const { category, title, content, lastUpdatedAt, readingTime } =
    useLoaderData<typeof loader>();

  return (
    <section className={styles.root}>
      <span className={styles.category}>{category}</span>
      <h1 className={styles.h1}>{title}</h1>
      <p className={styles.description}>
        <span className={styles.readingTime}>{readingTime} min read</span>|
        <span className={styles.updatedTime}>
          {safelyFormatDate(lastUpdatedAt)}
        </span>
      </p>
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
}
