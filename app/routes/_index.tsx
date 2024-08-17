import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Logo } from '~/components/icon/Logo';
import { ArticlesSection } from '~/modules/article/articles-section';
import { ContactList } from '~/modules/contact/ContactList';
import { articleQuery } from '~/queries/article';
import { generateMeta } from '~/utils/meta/generate-meta';
import { pathJoin } from '~/utils/path';
import BlogConfig from '../../blog.config';
import * as styles from './index.css';

export const meta: MetaFunction = () => {
  return generateMeta({
    title: [BlogConfig.seo.title],
    description: BlogConfig.seo.description,
    image: pathJoin(BlogConfig.site, BlogConfig.image.main),
    url: BlogConfig.site,
  });
};

export async function loader() {
  const articles = json(await articleQuery.getArticles({ count: 5 }));

  return articles
}

export default function HomePage() {
  const articles = useLoaderData<typeof loader>();
  
  return (
    <section className={styles.root}>
      <Logo size={32} />
      <p className={styles.post}>{BlogConfig.heroText}</p>
      <ContactList />
      <ArticlesSection title={<h3>Recent articles</h3>} articles={articles} />
    </section>
  );
}
