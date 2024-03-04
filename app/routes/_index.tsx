import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Logo } from '~/components/icon/Logo';
import { SVGIcon } from '~/components/icon/SVGIcon';
import { ArticlesSection } from '~/modules/article/articles-section';
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
      <div className={styles.rowlist}>
        <Anchor label="GitHub 링크" href="https://github.com/JaeYeopHan">
          <SVGIcon.GitHub />
        </Anchor>
        <Anchor label="Linkedin 링크" href="https://www.linkedin.com/in/jbee0">
          <SVGIcon.LinkedIn />
        </Anchor>
        <Anchor label="X 링크" href="https://twitter.com/JbeeLjyhanll">
          <SVGIcon.X />
        </Anchor>
      </div>
      <ArticlesSection title="Recent articles" articles={articles} />
    </section>
  );
}

function Anchor({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
    <a className={styles.icon} aria-label={label} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  )
}
