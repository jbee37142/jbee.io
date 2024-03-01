import { json, type MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { articleQuery } from '~/queries/article';
import { common } from '~/styles/element.css';
import * as styles from './index.css';

export const meta: MetaFunction = () => {
  return [
    { title: 'Home | Jbee.io' },
    { name: '개발 블로그', content: 'Welcome to Jbee.io' },
  ];
};

export async function loader() {
  const articles = json(await articleQuery.getArticles({ count: 5 }));

  return articles
}

export default function HomePage() {
  const articles = useLoaderData<typeof loader>();
  
  return (
    <section className={styles.root}>
      <h2 className={styles.h2}>{'Hi, I\'m JaeYeop'}</h2>
      <p>사람에 관심이 많은 엔지니어 입니다. 더 나은 삶을 많은 사람이 누릴 수 있도록 영향미치고 싶습니다. 교육이 사회의 많은 문제를 해결할 수 있다고 생각하며 언젠가 마을을 만들고 싶다는 꿈이 있습니다.</p>
      <ul className={styles.list}>
        <li>
          <Anchor href="https://github.com/JaeYeopHan" />
        </li>
        <li>
          <Anchor href="https://www.linkedin.com/in/jbee0" />
        </li>
        <li>
          <Anchor href="https://twitter.com/JbeeLjyhanll" />
        </li>
      </ul>
      <section className={styles.root}>
        <h3 className={styles.h3}>Recent articles</h3>
        <ul className={styles.list}>
          {articles.map(({ title, category }, index) => {
            return (
              <li key={index}>
                <Link className={common.anchor} to={`/articles/${category}/${title}`} prefetch="intent">
                  <span>{title}</span>
                </Link>
              </li>
            )})}
        </ul>
      </section>
    </section>
  );
}

function Anchor({ href }: { href: string; }) {
  return (
    <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer">{href}/</a>
  )
}
