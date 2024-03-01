import { json, type MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { Icon } from '~/components/icon/Icon';
import { articleQuery } from '~/queries/article';
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
      <h2 className={styles.h2}>{'👋'}</h2>
      <p className={styles.post}>소프트웨어 엔지니어를 지향하며 프런트엔드 개발을 주로 합니다. 기술보다 사람을 좋아하며 타인에게 영향주는 일에 몰입하곤 합니다. 8년째 프런트엔드 개발 컨퍼런스 FEConf를 운영하고 있고 개발 생태계에 관심이 많습니다. 글을 쓰고 공유합니다. 웹과 프런트엔드 주제의 글을 주로 쓰며 가끔 평소 생각을 정리하곤 합니다. 7년째 꾸준히 블로그를 운영하고 있습니다. 수속성입니다. 주 3회 수영을 꾸준히 다닙니다. 스쿠버 다이빙을 하러 분기에 한 번 정도 해외에 나갑니다. 물 속에서의 고요함과 나를 잡아당기던 중력이 사라진 편안함이 좋습니다. 교육에 관심이 많습니다. 교육이 사회에 존재하는 많은 문제를 근본적으로 해결한다고 생각합니다. 어떻게 교육하는지 보단 무엇을 교육해야 하고 어떤 환경을 제공해야 하는지에 더 관심이 많습니다. 지속 가능성을 고민합니다. 설계 뿐만 아니라 프로세스, 시스템, 조직 문화에 대해 고민하곤 합니다. 넓게는 해양 생태계가 지속가능하길 바랍니다. 언젠가 마음 맞는 사람이 모여 영어 유치원을 다닐 필요없는 마을을 만들고 싶습니다.</p>
      <ul className={styles.rowlist}>
        <li>
          <Anchor label="GitHub 링크" href="https://github.com/JaeYeopHan">
            <Icon.GitHub />
          </Anchor>
        </li>
        <li>
          <Anchor label="Linkedin 링크" href="https://www.linkedin.com/in/jbee0">
            <Icon.LinkedIn />
          </Anchor>
        </li>
        <li>
          <Anchor label="X 링크" href="https://twitter.com/JbeeLjyhanll">
            <Icon.X />
          </Anchor>
        </li>
      </ul>
      <section className={styles.root}>
        <h3 className={styles.h3}>Recent articles</h3>
        <ul className={styles.list}>
          {articles.map(({ title, category }, index) => {
            return (
              <li key={index}>
                <Link className={styles.link} to={`/articles/${category}/${title}`} prefetch="intent">
                  <span>{title}</span>
                </Link>
              </li>
            )})}
        </ul>
      </section>
    </section>
  );
}

function Anchor({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
    <a className={styles.icon} aria-label={label} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  )
}
