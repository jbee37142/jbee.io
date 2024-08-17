import type { MetaFunction } from '@remix-run/node';
import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { pencileIcon } from '~/assets/icon/pencil';
import { ArticlesSection } from '~/modules/article/articles-section';
import { ContactList } from '~/modules/contact/ContactList';
import { articleQuery } from '~/queries/article';
import invariant from '~/utils/invariant';
import { generateMeta } from '~/utils/meta/generate-meta';
import { pathJoin } from '~/utils/path';
import { safelyFormatDate } from '~/utils/safelyFormatDate';
import BlogConfig from '../../blog.config';
import * as styles from './article.css';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { category, title } = data?.article ?? {};
  invariant(category != null, '\'category\' is required');
  invariant(title != null, '\'title\' is required');

  return generateMeta({
    title: [title, BlogConfig.seo.title],
    description: data?.article.description ?? BlogConfig.seo.description,
    image: data?.article.thumbnail != null
      ? pathJoin(BlogConfig.site, 'articles', category, data.article.thumbnail)
      : pathJoin(BlogConfig.site, BlogConfig.image.main),
    author: BlogConfig.author.twitter,
    site: BlogConfig.site,
  });
};

export async function loader({ params }: LoaderFunctionArgs) {
  const category = params.category;
  const title = params['article-title'];

  invariant(category != null, '\'category\' is required');
  invariant(title != null, '\'title\' is required');

  const [article, recentArticles] = await Promise.all([
    articleQuery.getArticle(category, title),
    articleQuery.getArticles({ count: 5 }),
  ]);

  if (article == null) {
    return redirect('/404');
  }

  return json({ article, recentArticles });
}

export default function ArticlePage() {
  const {
    article:{ category, title, content, lastUpdatedAt, readingTime },
    recentArticles,
  } = useLoaderData<typeof loader>();

  return (
    <section className={styles.root}>
      <div className={styles.top}>
        <span className={styles.category}>{category}</span>
        <a title="edit" href={BlogConfig.content.source + category + '/' + title + '.md'} className={styles.editButton}>
          <img
            src={pencileIcon}
            alt="edit button"
            width="18px"
            height="18px"
          />
        </a>
      </div>
      <h1 className={styles.h1}>{title}</h1>
      <p className={styles.description}>
        <span className={styles.readingTime}>{readingTime} min read</span>|
        <span className={styles.updatedTime}>
          {safelyFormatDate(lastUpdatedAt)}
        </span>
      </p>
      <article dangerouslySetInnerHTML={{ __html: content }} />
      <hr />
      <footer>
        <ContactList />
        <ArticlesSection title={<h5>Recent articles</h5>} articles={recentArticles} />
        <BackButton />
      </footer>
    </section>
  );
}

function BackButton() {
  return (
    <a href="/articles" className={styles.backButton}>
      ← Back to /articles
    </a>
  );
}
